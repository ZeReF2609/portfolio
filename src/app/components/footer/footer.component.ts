import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  // allow null initially so templates can use optional chaining safely
  user: User | null = null;
  currentYear = new Date().getFullYear();

  menuItems = [
    { label: 'Inicio', anchor: 'hero' },
    { label: 'Sobre mí', anchor: 'about' },
    { label: 'Habilidades', anchor: 'skills' },
    { label: 'Proyectos', anchor: 'projects' },
    { label: 'Contacto', anchor: 'contact' }
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
