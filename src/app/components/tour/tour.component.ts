import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  computed,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { I18nService } from '../../services/i18n.service';
import { TourService } from '../../services/tour.service';

interface TourStep {
  /** Sufijo de las claves i18n: tour.step.<key>.title / .text */
  key: string;
  /** Selector CSS del elemento a resaltar. */
  selector: string;
  /** Si hay que desplazar la página hasta el objetivo (false para elementos fijos como el header). */
  scroll: boolean;
}

interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}

const STEPS: TourStep[] = [
  { key: 'hero', selector: '#hero', scroll: true },
  { key: 'about', selector: '#about', scroll: true },
  { key: 'skills', selector: '#skills', scroll: true },
  { key: 'projects', selector: '#projects', scroll: true },
  { key: 'playground', selector: '#playground', scroll: true },
  { key: 'certifications', selector: '#certifications', scroll: true },
  { key: 'experience', selector: '#experience', scroll: true },
  { key: 'contact', selector: '#contact', scroll: true },
  { key: 'lang', selector: '[data-tour="lang"]', scroll: false }
];

const STORAGE_KEY = 'tourSeen';
const AVATAR_SRC = 'assets/images/avatar.webp';
const AVATAR_FALLBACK = 'assets/images/profilegit.webp';
const HEADER_OFFSET = 80;
const SPOT_PAD = 8;
const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];

@Component({
  selector: 'app-tour',
  imports: [TranslatePipe],
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit, OnDestroy {
  private readonly tourService = inject(TourService);
  private readonly i18n = inject(I18nService);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('card') private cardRef?: ElementRef<HTMLElement>;

  // --- estado del tour ---
  readonly active = signal(false);
  readonly steps = signal<TourStep[]>([]);
  readonly index = signal(0);
  readonly spot = signal<Box | null>(null);
  readonly cardPos = signal<{ top: number; left: number } | null>(null);
  readonly mobile = signal(false);

  readonly current = computed<TourStep | null>(() => this.steps()[this.index()] ?? null);
  readonly isFirst = computed(() => this.index() === 0);
  readonly isLast = computed(() => this.index() >= this.steps().length - 1);
  readonly titleKey = computed(() => `tour.step.${this.current()?.key ?? 'hero'}.title`);
  readonly textKey = computed(() => `tour.step.${this.current()?.key ?? 'hero'}.text`);

  // --- invitación de primera visita / easter egg ---
  readonly inviteVisible = signal(false);
  readonly toastVisible = signal(false);
  readonly avatarSrc = signal(AVATAR_SRC);

  private lastFocused: HTMLElement | null = null;
  private rafId = 0;
  private konamiPos = 0;
  private inviteTimer: ReturnType<typeof setTimeout> | undefined;
  private toastTimer: ReturnType<typeof setTimeout> | undefined;
  private settleTimer: ReturnType<typeof setTimeout> | undefined;
  private confettiCanvas: HTMLCanvasElement | null = null;
  private confettiRaf = 0;

  ngOnInit(): void {
    this.tourService.startRequested$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.start());

    if (!this.hasSeen()) {
      this.inviteTimer = setTimeout(() => {
        if (!this.active()) this.inviteVisible.set(true);
      }, 2500);
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.inviteTimer);
    clearTimeout(this.toastTimer);
    clearTimeout(this.settleTimer);
    cancelAnimationFrame(this.rafId);
    this.stopConfetti();
  }

  // ================= API del tour =================

  start(): void {
    const available = STEPS.filter(s => !!this.findTarget(s));
    if (!available.length) return;
    this.inviteVisible.set(false);
    clearTimeout(this.inviteTimer);
    if (!this.active()) {
      const focused = document.activeElement;
      this.lastFocused = focused instanceof HTMLElement ? focused : null;
    }
    this.steps.set(available);
    this.active.set(true);
    this.goTo(0, 1);
  }

  next(): void {
    if (this.isLast()) {
      this.finish();
    } else {
      this.goTo(this.index() + 1, 1);
    }
  }

  back(): void {
    if (!this.isFirst()) this.goTo(this.index() - 1, -1);
  }

  /** Saltar / Esc / Terminar: cierra y recuerda que ya se vio. */
  finish(): void {
    this.markSeen();
    this.close();
  }

  acceptInvite(): void {
    this.start();
  }

  declineInvite(): void {
    this.inviteVisible.set(false);
    this.markSeen();
  }

  onAvatarError(): void {
    if (this.avatarSrc() !== AVATAR_FALLBACK) this.avatarSrc.set(AVATAR_FALLBACK);
  }

  closeToast(): void {
    clearTimeout(this.toastTimer);
    this.toastVisible.set(false);
  }

  // ================= navegación interna =================

  /** Va al paso `i`; si su objetivo ya no existe, salta en la dirección `dir`. */
  private goTo(i: number, dir: 1 | -1): void {
    const steps = this.steps();
    let target = i;
    while (target >= 0 && target < steps.length && !this.findTarget(steps[target])) {
      target += dir;
    }
    if (target < 0 || target >= steps.length) {
      // No queda nada en esa dirección.
      if (dir === 1) this.finish();
      return;
    }
    this.index.set(target);
    const el = this.findTarget(steps[target]);
    if (el && steps[target].scroll) this.scrollToTarget(el);
    this.scheduleLayout();
    // Vuelve a medir cuando termine el desplazamiento suave y la tarjeta tenga su tamaño final.
    clearTimeout(this.settleTimer);
    this.settleTimer = setTimeout(() => this.scheduleLayout(), this.reducedMotion() ? 30 : 450);
  }

  private close(): void {
    this.active.set(false);
    this.spot.set(null);
    this.cardPos.set(null);
    clearTimeout(this.settleTimer);
    const toFocus = this.lastFocused;
    this.lastFocused = null;
    if (toFocus && document.contains(toFocus)) {
      try {
        toFocus.focus({ preventScroll: true });
      } catch {
        // ignore
      }
    }
  }

  private findTarget(step: TourStep): HTMLElement | null {
    const el = document.querySelector<HTMLElement>(step.selector);
    if (!el || el.getClientRects().length === 0) return null;
    return el;
  }

  private scrollToTarget(el: HTMLElement): void {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const available = vh - HEADER_OFFSET;
    let top: number;
    if (r.height <= available * 0.8) {
      // Elemento pequeño: centrarlo en el área visible bajo el header.
      top = window.scrollY + r.top - HEADER_OFFSET - (available - r.height) / 2;
    } else {
      top = window.scrollY + r.top - HEADER_OFFSET;
    }
    window.scrollTo({ top: Math.max(0, top), behavior: this.reducedMotion() ? 'auto' : 'smooth' });
  }

  // ================= posicionamiento =================

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onViewportChange(): void {
    if (this.active()) this.scheduleLayout();
  }

  private scheduleLayout(): void {
    cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => this.layout());
  }

  private layout(): void {
    const step = this.current();
    if (!this.active() || !step) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 640;
    this.mobile.set(isMobile);

    const el = this.findTarget(step);
    let box: Box | null = null;
    if (el) {
      const r = el.getBoundingClientRect();
      const top = Math.max(r.top - SPOT_PAD, 4);
      const left = Math.max(r.left - SPOT_PAD, 4);
      const bottom = Math.min(r.bottom + SPOT_PAD, vh - 4);
      const right = Math.min(r.right + SPOT_PAD, vw - 4);
      if (bottom - top > 4 && right - left > 4) {
        box = { top, left, width: right - left, height: bottom - top };
      }
    }
    this.spot.set(box);

    if (isMobile) {
      this.cardPos.set(null); // anclada abajo vía CSS
    } else {
      const card = this.cardRef?.nativeElement;
      const cw = card?.offsetWidth || 360;
      const ch = card?.offsetHeight || 220;
      const gap = 12;
      const margin = 16;
      let cTop: number;
      let cLeft: number;
      if (!box) {
        cTop = vh - ch - margin;
        cLeft = (vw - cw) / 2;
      } else {
        const below = box.top + box.height + gap;
        const above = box.top - ch - gap;
        if (below + ch <= vh - margin) {
          cTop = below;
        } else if (above >= margin) {
          cTop = above;
        } else {
          // El objetivo ocupa toda la pantalla: la tarjeta flota dentro, abajo.
          cTop = vh - ch - margin - 8;
        }
        cLeft = box.left;
      }
      cLeft = Math.min(Math.max(cLeft, margin), Math.max(margin, vw - cw - margin));
      cTop = Math.min(Math.max(cTop, margin), Math.max(margin, vh - ch - margin));
      this.cardPos.set({ top: Math.round(cTop), left: Math.round(cLeft) });
    }

    // El foco debe estar siempre dentro del diálogo.
    const card = this.cardRef?.nativeElement;
    if (card && !card.contains(document.activeElement)) {
      card.focus({ preventScroll: true });
    }
  }

  // ================= teclado =================

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    this.trackKonami(e);
    if (!this.active()) return;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        this.next();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.back();
        break;
      case 'Escape':
        e.preventDefault();
        this.finish();
        break;
      case 'Tab':
        this.trapFocus(e);
        break;
    }
  }

  private trapFocus(e: KeyboardEvent): void {
    const card = this.cardRef?.nativeElement;
    if (!card) return;
    const focusables = Array.from(
      card.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')
    );
    if (!focusables.length) {
      e.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const activeEl = document.activeElement;
    if (e.shiftKey && (activeEl === first || activeEl === card)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && activeEl === last) {
      e.preventDefault();
      first.focus();
    } else if (!card.contains(activeEl)) {
      e.preventDefault();
      first.focus();
    }
  }

  // ================= easter egg (código Konami) =================

  private trackKonami(e: KeyboardEvent): void {
    const t = e.target;
    if (t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) {
      this.konamiPos = 0;
      return;
    }
    const k = (e.key || '').toLowerCase();
    if (k === KONAMI[this.konamiPos]) {
      this.konamiPos++;
      if (this.konamiPos === KONAMI.length) {
        this.konamiPos = 0;
        this.triggerEasterEgg();
      }
    } else {
      // "↑↑↑" mantiene la secuencia en 2; cualquier otro fallo reinicia.
      this.konamiPos = k === 'arrowup' ? (this.konamiPos === 2 ? 2 : 1) : 0;
    }
  }

  private triggerEasterEgg(): void {
    this.burstConfetti();
    this.toastVisible.set(true);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastVisible.set(false), 5000);
  }

  private burstConfetti(): void {
    if (this.reducedMotion()) return;
    this.stopConfetti();

    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:1005;';
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    document.body.appendChild(canvas);
    this.confettiCanvas = canvas;

    const css = getComputedStyle(document.documentElement);
    const colors = ['--color-primary-400', '--color-primary-500', '--color-primary-600']
      .map(v => css.getPropertyValue(v).trim())
      .filter(Boolean)
      .concat(['#facc15', '#f472b6', '#34d399', '#60a5fa', '#ffffff']);

    const particles = Array.from({ length: 130 }, () => ({
      x: w / 2 + (Math.random() - 0.5) * 80,
      y: h * 0.4,
      vx: (Math.random() - 0.5) * 16,
      vy: -(Math.random() * 13 + 5),
      size: Math.random() * 6 + 5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      round: Math.random() < 0.3
    }));

    const duration = 2000;
    const startAt = performance.now();
    this.zone.runOutsideAngular(() => {
      const frame = (now: number) => {
        const elapsed = now - startAt;
        if (elapsed >= duration) {
          this.stopConfetti();
          return;
        }
        ctx.clearRect(0, 0, w, h);
        ctx.globalAlpha = elapsed > duration - 600 ? Math.max(0, (duration - elapsed) / 600) : 1;
        for (const p of particles) {
          p.vy += 0.35;
          p.vx *= 0.99;
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vr;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          if (p.round) {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          }
          ctx.restore();
        }
        this.confettiRaf = requestAnimationFrame(frame);
      };
      this.confettiRaf = requestAnimationFrame(frame);
    });
  }

  private stopConfetti(): void {
    cancelAnimationFrame(this.confettiRaf);
    this.confettiCanvas?.remove();
    this.confettiCanvas = null;
  }

  // ================= utilidades =================

  /** Texto accesible del progreso, p. ej. "Paso 3 de 9". */
  progressLabel(): string {
    return `${this.i18n.t('tour.progressLabel')} ${this.index() + 1} ${this.i18n.t('tour.progressOf')} ${this.steps().length}`;
  }

  private reducedMotion(): boolean {
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return false;
    }
  }

  private hasSeen(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  }

  private markSeen(): void {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore (storage bloqueado)
    }
  }
}
