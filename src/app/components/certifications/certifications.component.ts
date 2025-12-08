import { Component, OnInit } from '@angular/core';
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
export class CertificationsComponent implements OnInit {
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
  expandedOrgs: Set<string> = new Set();
  orgVisibleCounts: { [key: string]: number } = {};

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
    
    // Inicializar contadores de visibilidad (mostrar 1 inicialmente por organización)
    this.organizations.forEach(org => {
      this.orgVisibleCounts[org] = 5;
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

  toggleOrg(org: string): void {
    if (this.expandedOrgs.has(org)) {
      this.expandedOrgs.delete(org);
    } else {
      this.expandedOrgs.add(org);
    }
  }

  isOrgExpanded(org: string): boolean {
    return this.expandedOrgs.has(org);
  }

  // Devuelve true si todas las organizaciones están expandidas
  get allOrgsExpanded(): boolean {
    return this.organizations.length > 0 && this.organizations.every(org => this.expandedOrgs.has(org));
  }

  // Alterna: si todas están expandidas las colapsa, si no las expande
  toggleAllOrgs(): void {
    if (this.allOrgsExpanded) {
      this.expandedOrgs.clear();
    } else {
      this.organizations.forEach(org => this.expandedOrgs.add(org));
    }
  }

  getVisibleCertsForOrg(org: string): Certification[] {
    const certs = this.certificationsByOrg[org] || [];
    const count = this.orgVisibleCounts[org] || 1;
    return certs.slice(0, count);
  }

  showMoreCerts(org: string): void {
    const totalCerts = this.certificationsByOrg[org]?.length || 0;
    // Si tiene 5 o menos, mostrar todos. Si tiene más, mostrar 5
    this.orgVisibleCounts[org] = totalCerts <= 5 ? totalCerts : 5;
  }

  showAllCertsForOrg(org: string): void {
    const totalCerts = this.certificationsByOrg[org]?.length || 0;
    this.orgVisibleCounts[org] = totalCerts;
  }

  canShowMore(org: string): boolean {
    const certs = this.certificationsByOrg[org] || [];
    const currentCount = this.orgVisibleCounts[org] || 1;
    // Solo mostrar "ver más" si tiene más de 1 certificación y aún no se han mostrado todas
    return certs.length > 1 && currentCount < certs.length;
  }

  canShowAll(org: string): boolean {
    const certs = this.certificationsByOrg[org] || [];
    const currentCount = this.orgVisibleCounts[org] || 1;
    // Solo mostrar "ver todos" si tiene más de 5 y no se están mostrando todas
    return certs.length > 5 && currentCount < certs.length;
  }

  getTotalCertsForOrg(org: string): number {
    return this.certificationsByOrg[org]?.length || 0;
  }
}
