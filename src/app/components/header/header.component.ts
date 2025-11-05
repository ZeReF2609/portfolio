import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeMode, ColorTheme } from '../../services/theme.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isScrolled = false;
  isMobileMenuOpen = false;
  isThemeMenuOpen = false;
  currentThemeMode: ThemeMode = 'light';
  currentColorTheme: ColorTheme = 'blue';
  cvUrl: string = '';

  menuItems = [
    { label: 'Inicio', anchor: 'hero' },
    { label: 'Sobre mí', anchor: 'about' },
    { label: 'Habilidades', anchor: 'skills' },
    { label: 'Proyectos', anchor: 'projects' },
    { label: 'Certificaciones', anchor: 'certifications' },
    { label: 'Blog', anchor: 'blog' },
    { label: 'Contacto', anchor: 'contact' }
  ];

  colorThemes: { name: ColorTheme; label: string; color: string }[] = [
    { name: 'blue', label: 'Azul', color: '#3b82f6' },
    { name: 'green', label: 'Verde', color: '#22c55e' },
    { name: 'gray', label: 'Gris', color: '#6b7280' },
    { name: 'beige', label: 'Beige', color: '#b8a080' },
    { name: 'red', label: 'Rojo', color: '#ef4444' },
    { name: 'purple', label: 'Púrpura', color: '#a855f7' },
    { name: 'orange', label: 'Naranja', color: '#f97316' },
    { name: 'yellow', label: 'Amarillo', color: '#eab308' },
    { name: 'white', label: 'Blanco', color: '#ffffff' },
    { name: 'pink', label: 'Rosa', color: '#ec4899' }
  ];

  constructor(
    private themeService: ThemeService,
    private dataService: DataService
  ) {
    this.cvUrl = this.dataService.getCVUrl();
    this.themeService.themeMode$.subscribe(mode => {
      this.currentThemeMode = mode;
    });
    this.themeService.colorTheme$.subscribe(theme => {
      this.currentColorTheme = theme;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  scrollToSection(anchor: string): void {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.isMobileMenuOpen = false;
    }
  }

  toggleThemeMode(): void {
    this.themeService.toggleThemeMode();
  }

  setColorTheme(theme: ColorTheme): void {
    this.themeService.setColorTheme(theme);
    this.isThemeMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleThemeMenu(): void {
    this.isThemeMenuOpen = !this.isThemeMenuOpen;
  }

  downloadCV(): void {
    window.open(this.cvUrl, '_blank');
  }
}
