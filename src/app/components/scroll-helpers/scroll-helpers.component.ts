import { Component, HostListener, signal } from '@angular/core';

// Barra de progreso de lectura (arriba) y botón "volver arriba" (abajo a la izquierda,
// para no chocar con el selector de temas de la derecha).
@Component({
  selector: 'app-scroll-helpers',
  template: `
    <div class="fixed top-0 left-0 right-0 h-1 z-[70] pointer-events-none" aria-hidden="true">
      <div class="h-full bg-gradient-to-r from-primary-600 to-primary-400 transition-[width] duration-75"
           [style.width.%]="progress()"></div>
    </div>
    @if (showTop()) {
      <button type="button" (click)="toTop()"
        class="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        aria-label="Volver arriba">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
        </svg>
      </button>
    }
  `
})
export class ScrollHelpersComponent {
  progress = signal(0);
  showTop = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(max > 0 ? (window.scrollY / max) * 100 : 0);
    this.showTop.set(window.scrollY > 600);
  }

  toTop(): void {
    const smooth = !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  }
}
