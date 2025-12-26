import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeMode, ColorTheme } from '../../services/theme.service';
import { DataService } from '../../services/data.service';
import { CarouselService, CarouselMode } from '../../services/carousel.service';

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
  isCarouselMenuOpen = false;
  currentThemeMode: ThemeMode = 'light';
  currentColorTheme: ColorTheme = 'blue';
  currentCarouselMode: CarouselMode = 'triple';
  carouselAutoplay = false;
  cvUrl: string = '';
  // ownerMode = localStorage.getItem('owner_mode') === '1';

  menuItems = [
    { label: 'Inicio', anchor: 'hero' },
    { label: 'Sobre mí', anchor: 'about' },
    { label: 'Habilidades', anchor: 'skills' },
    { label: 'Proyectos', anchor: 'projects' },
    { label: 'Certificaciones', anchor: 'certifications' },
    { label: 'Experiencia', anchor: 'experience' },
    // { label: 'Blog', anchor: 'blog' },
    { label: 'Contacto', anchor: 'contact' },
    
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

  carouselModes = [
    { 
      id: 'single' as CarouselMode, 
      name: 'Individual', 
      description: '1 card',
      icon: 'M4 6h16M4 12h16M4 18h16'
    },
    { 
      id: 'double' as CarouselMode, 
      name: 'Doble', 
      description: '2 cards',
      icon: 'M4 6h7M13 6h7M4 12h7M13 12h7M4 18h7M13 18h7'
    },
    { 
      id: 'triple' as CarouselMode, 
      name: 'Triple', 
      description: '3 cards',
      icon: 'M4 6h4M10 6h4M16 6h4M4 12h4M10 12h4M16 12h4M4 18h4M10 18h4M16 18h4'
    },
    { 
      id: 'grid' as CarouselMode, 
      name: 'Cuadrícula', 
      description: '4 cards',
      icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z'
    },
    { 
      id: 'compact' as CarouselMode, 
      name: 'Compacto', 
      description: '5 cards',
      icon: 'M3 4h2M7 4h2M11 4h2M15 4h2M19 4h2M3 12h2M7 12h2M11 12h2M15 12h2M19 12h2M3 20h2M7 20h2M11 20h2M15 20h2M19 20h2'
    },
    { 
      id: 'showcase' as CarouselMode, 
      name: 'Destacado', 
      description: 'Centro',
      icon: 'M2 6h5M9 6h6M17 6h5M2 12h5M9 12h6M17 12h5M2 18h5M9 18h6M17 18h5'
    },
    { 
      id: 'timeline' as CarouselMode, 
      name: 'Timeline', 
      description: 'Línea',
      icon: 'M12 2v20M8 6h8M8 12h8M8 18h8'
    },
    { 
      id: 'masonry' as CarouselMode, 
      name: 'Mosaico', 
      description: 'Dinámico',
      icon: 'M3 3h5v5H3zM10 3h11v3H10zM10 8h5v8h-5zM17 8h4v4h-4zM3 10h5v11H3zM17 14h4v7h-4z'
    }
  ];

  constructor(
    private themeService: ThemeService,
    private dataService: DataService,
    private carouselService: CarouselService
  ) {
    this.cvUrl = this.dataService.getCVUrl();
    this.themeService.themeMode$.subscribe(mode => {
      this.currentThemeMode = mode;
    });
    this.themeService.colorTheme$.subscribe(theme => {
      this.currentColorTheme = theme;
    });
    this.carouselService.config$.subscribe(config => {
      this.currentCarouselMode = config.mode;
      this.carouselAutoplay = config.autoplay;
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

  toggleCarouselMenu(): void {
    this.isCarouselMenuOpen = !this.isCarouselMenuOpen;
  }

  setCarouselMode(mode: CarouselMode): void {
    this.carouselService.setMode(mode);
  }

  toggleAutoplay(): void {
    this.carouselService.setAutoplay(!this.carouselAutoplay);
  }

  downloadCV(): void {
    window.open(this.cvUrl, '_blank');
  }
}
