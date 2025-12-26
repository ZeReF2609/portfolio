import { Component, OnInit, OnDestroy, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DataService } from '../../services/data.service';
import { CarouselService } from '../../services/carousel.service';
import { Certification, Event } from '../../models/certification.interface';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import Splide from '@splidejs/splide';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent implements OnInit, OnDestroy, AfterViewInit {
  certifications: Certification[] = [];
  events: Event[] = [];
  certificationsByOrg: { [key: string]: Certification[] } = {};
  organizations: string[] = [];

  // Navigation and visibility controls
  activeOrg: string = 'Todas';
  showAllCerts = false;
  showAllEvents = false;
  certLimit = 8;
  eventLimit = 3;
  sidebarOpen = true;
  orgVisibleCounts: { [key: string]: number } = {};
  initialVisibleCount = 8;

  // Carousel state
  carouselIntervals: { [eventId: number]: any } = {};
  currentImageIndex: { [eventId: number]: number } = {};
  openGallery: { [eventId: number]: boolean } = {};

  // Splide instance
  splide: Splide | null = null;

  // Carousel config subscription
  private carouselSubscription?: Subscription;

  constructor(
    private dataService: DataService,
    private carouselService: CarouselService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.certifications = this.dataService.getCertifications();
    this.events = this.dataService.getEvents();
    // Ordenar eventos por fecha (más reciente primero). Soportamos formatos como "Mayo 2025" y fechas ISO "YYYY-MM-DD".
    const monthMap: { [key: string]: number } = {
      'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
      'julio': 6, 'agosto': 7, 'septiembre': 8, 'setiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
    };

    function parseDateString(s: string): Date {
      if (!s) return new Date(0);
      const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (isoMatch) return new Date(Number(isoMatch[1]), Number(isoMatch[2]) - 1, Number(isoMatch[3]));
      const parts = s.trim().split(/\s+/);
      if (parts.length >= 2) {
        const monthName = parts[0].toLowerCase().replace(',', '');
        const year = Number(parts[1]);
        const month = monthMap[monthName] ?? 0;
        return new Date(year, month, 1);
      }
      const parsed = Date.parse(s);
      return isNaN(parsed) ? new Date(0) : new Date(parsed);
    }

    this.events.sort((a, b) => {
      const da = parseDateString(a.date);
      const db = parseDateString(b.date);
      return db.getTime() - da.getTime();
    });
    this.groupCertificationsByOrganization();
    this.initializeCarousels();

    // Suscribirse al servicio de carrusel para actualizar cuando cambie la configuración
    if (isPlatformBrowser(this.platformId)) {
      this.carouselSubscription = this.carouselService.config$.subscribe(config => {
        setTimeout(() => {
          if (this.splide) {
            this.splide.destroy();
          }
          this.initializeSplide();
        }, 100);
      });
    }
  }

  ngOnDestroy(): void {
    // Limpiar todos los intervalos cuando se destruya el componente
    Object.values(this.carouselIntervals).forEach(interval => {
      if (interval) clearInterval(interval);
    });

    // Destruir instancia de Splide
    if (this.splide) {
      this.splide.destroy();
    }

    // Cancelar suscripción
    if (this.carouselSubscription) {
      this.carouselSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    // Solo inicializar Splide en el navegador
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initializeSplide();
      }, 100);
    }
  }

  initializeSplide(): void {
    const splideElement = document.querySelector('.splide') as HTMLElement | null;
    if (splideElement && this.events.length > 0) {
      const finalConfig = this.getSplideConfig();
      
      // Destroy previous instance if any
      if (this.splide) {
        try { this.splide.destroy(); } catch (e) { /* ignore */ }
        this.splide = null;
      }
      this.splide = new Splide(splideElement, finalConfig);
      this.splide.mount();
      
      // Iniciar autoplay manualmente si está habilitado
      const config = this.carouselService.getCurrentConfig();
      if (config.autoplay && this.splide) {
        // Usar el método Components de Splide para acceder al Autoplay
        const autoplay = this.splide.Components.Autoplay;
        if (autoplay) {
          autoplay.play();
        }
      }
    }
  }

  getSplideConfig(): any {
    const config = this.carouselService.getCurrentConfig();
    const modeConfig = this.carouselService.availableModes
      .find(m => m.id === config.mode);

    // Obtener perPage del modo seleccionado (soporta decimales como 2.5)
    const perPage = modeConfig?.perPage ?? 3;
    const gap = modeConfig?.gap ?? '1.5rem';

    return {
      type: 'loop',
      arrows: config.showArrows,
      pagination: config.showPagination,
      drag: 'free',
      snap: true,
      perPage: perPage,
      gap: gap,
      padding: modeConfig?.padding ?? '2rem',
      autoplay: config.autoplay,
      interval: config.speed,
      pauseOnHover: false,
      pauseOnFocus: false,
      resetProgress: false,
      perMove: 1,
      speed: 800,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      rewind: true,
      rewindSpeed: 1000,
      waitForTransition: false,
      updateOnMove: true,
      trimSpace: false,
      focus: (modeConfig as any)?.focus ?? 0,
      autoHeight: (modeConfig as any)?.autoHeight ?? false,
      breakpoints: modeConfig?.breakpoints ?? {
        1280: { perPage: Math.min(perPage, 2), gap: '1rem', padding: '1rem' },
        768: { perPage: 1, gap: '0.75rem', padding: '0.5rem' },
      },
    };
  }


  initializeCarousels(): void {
    this.events.forEach(event => {
      if (event.images && event.images.length > 0) {
        this.currentImageIndex[event.id] = 0;
        // Auto-avanzar cada 3 segundos
        this.carouselIntervals[event.id] = setInterval(() => {
          this.nextImage(event.id, event.images!);
        }, 3000);
      }
    });
  }

  nextImage(eventId: number, images: string[]): void {
    if (!images || images.length === 0) return;
    this.currentImageIndex[eventId] = (this.currentImageIndex[eventId] + 1) % images.length;
  }

  prevImage(eventId: number, images: string[]): void {
    if (!images || images.length === 0) return;
    this.currentImageIndex[eventId] =
      (this.currentImageIndex[eventId] - 1 + images.length) % images.length;
  }

  goToImage(eventId: number, index: number): void {
    this.currentImageIndex[eventId] = index;
  }

  getCurrentImageIndex(eventId: number): number {
    return this.currentImageIndex[eventId] || 0;
  }

  toggleGallery(eventId: number): void {
    this.openGallery[eventId] = !this.openGallery[eventId];
  }

  // isGalleryOpen(eventId: number): boolean {
  //   return this.openGallery[eventId] || false;
  // }

  groupCertificationsByOrganization(): void {
    this.certificationsByOrg = this.certifications.reduce((groups, cert) => {
      const org = cert.organization;
      if (!groups[org]) {
        groups[org] = [];
      }
      groups[org].push(cert);
      return groups;
    }, {} as { [key: string]: Certification[] });

    this.organizations = Object.keys(this.certificationsByOrg);

    // Inicializar contadores de visibilidad (mostrar 6 inicialmente por organización)
    this.organizations.forEach(org => {
      this.orgVisibleCounts[org] = this.initialVisibleCount;
    });
  }

  openCertificate(pdfUrl: string | undefined): void {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  }

  selectOrg(org: string): void {
    this.activeOrg = org;
    this.showAllCerts = false;
  }

  get filteredCertifications(): Certification[] {
    if (this.activeOrg === 'Todas') {
      return this.certifications;
    }
    return this.certificationsByOrg[this.activeOrg] || [];
  }

  get visibleCertifications(): Certification[] {
    const filtered = this.filteredCertifications;
    return this.showAllCerts ? filtered : filtered.slice(0, this.certLimit);
  }

  get visibleEvents(): Event[] {
    return this.showAllEvents ? this.events : this.events.slice(0, this.eventLimit);
  }

  toggleCerts(): void {
    this.showAllCerts = !this.showAllCerts;
  }

  toggleEvents(): void {
    this.showAllEvents = !this.showAllEvents;
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  getVisibleCertsForOrg(org: string): Certification[] {
    const certs = this.certificationsByOrg[org] || [];
    const count = this.orgVisibleCounts[org] || this.initialVisibleCount;
    return certs.slice(0, count);
  }

  showMoreCerts(org: string): void {
    const totalCerts = this.certificationsByOrg[org]?.length || 0;
    // Mostrar todos los certificados
    this.orgVisibleCounts[org] = totalCerts;
  }

  canShowMore(org: string): boolean {
    const certs = this.certificationsByOrg[org] || [];
    const currentCount = this.orgVisibleCounts[org] || this.initialVisibleCount;
    // Mostrar botón si hay más certificados que los visibles actualmente
    return certs.length > currentCount;
  }

  getTotalCertsForOrg(org: string): number {
    return this.certificationsByOrg[org]?.length || 0;
  }
}
