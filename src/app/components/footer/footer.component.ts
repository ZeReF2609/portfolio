import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user.interface';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
    selector: 'app-footer',
    imports: [CommonModule, TranslatePipe],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  // allow null initially so templates can use optional chaining safely
  user: User | null = null;
  currentYear = new Date().getFullYear();

  // label = clave de traducción
  menuItems = [
    { label: 'nav.home', anchor: 'hero' },
    { label: 'nav.about', anchor: 'about' },
    { label: 'nav.skills', anchor: 'skills' },
    { label: 'nav.projects', anchor: 'projects' },
    { label: 'nav.contact', anchor: 'contact' }
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.user = this.dataService.getUserData();
  }

  scrollToSection(anchor: string): void {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }
}
