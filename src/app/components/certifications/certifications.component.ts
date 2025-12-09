import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Certification, Event } from '../../models/certification.interface';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent implements OnInit, OnDestroy {
  certifications: Certification[] = [];
  events: Event[] = [];
  certificationsByOrg: { [key: string]: Certification[] } = {};
  organizations: string[] = [];
  
  // Navigation and visibility controls
  activeOrg: string = 'Todas';
  showAllCerts = false;
  showAllEvents = false;
  certLimit = 6;
  eventLimit = 3;
  sidebarOpen = true;
  orgVisibleCounts: { [key: string]: number } = {};
  initialVisibleCount = 6; // Mostrar 6 certificados inicialmente por organización

  // Carousel state
  carouselIntervals: { [eventId: number]: any } = {};
  currentImageIndex: { [eventId: number]: number } = {};
  openGallery: { [eventId: number]: boolean } = {};

  constructor(private dataService: DataService) {}

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
  }

  ngOnDestroy(): void {
    // Limpiar todos los intervalos cuando se destruya el componente
    Object.values(this.carouselIntervals).forEach(interval => {
      if (interval) clearInterval(interval);
    });
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

  isGalleryOpen(eventId: number): boolean {
    return this.openGallery[eventId] || false;
  }

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

  get hasMoreCerts(): boolean {
    return this.filteredCertifications.length > this.certLimit;
  }

  get hasMoreEvents(): boolean {
    return this.events.length > this.eventLimit;
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
