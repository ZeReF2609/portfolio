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

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.certifications = this.dataService.getCertifications();
    this.events = this.dataService.getEvents();
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
  }

  openCertificate(pdfUrl: string | undefined): void {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  }
}
