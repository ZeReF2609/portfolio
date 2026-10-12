import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeMode, ColorTheme } from '../../services/theme.service';
import { DataService } from '../../services/data.service';
import { CarouselService, CarouselMode } from '../../services/carousel.service';
import { I18nService } from '../../services/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { TourService } from '../../services/tour.service';

@Component({
    selector: 'app-header',
    imports: [CommonModule, TranslatePipe],
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

  // label = clave de traducción (ver src/app/i18n/es.ts / en.ts)
  menuItems = [
    { label: 'nav.home', anchor: 'hero' },
    { label: 'nav.about', anchor: 'about' },
    { label: 'nav.skills', anchor: 'skills' },
    { label: 'nav.projects', anchor: 'projects' },
    { label: 'nav.certifications', anchor: 'certifications' },
    { label: 'nav.experience', anchor: 'experience' },
    // { label: 'Blog', anchor: 'blog' },
    { label: 'nav.contact', anchor: 'contact' },

  ];

  // label = clave de traducción
  colorThemes: { name: ColorTheme; label: string; color: string }[] = [
    { name: 'blue', label: 'color.blue', color: '#3b82f6' },
    { name: 'green', label: 'color.green', color: '#22c55e' },
    { name: 'gray', label: 'color.gray', color: '#6b7280' },
    { name: 'beige', label: 'color.beige', color: '#b8a080' },
    { name: 'red', label: 'color.red', color: '#ef4444' },
    { name: 'purple', label: 'color.purple', color: '#a855f7' },
    { name: 'orange', label: 'color.orange', color: '#f97316' },
    { name: 'yellow', label: 'color.yellow', color: '#eab308' },
    { name: 'white', label: 'color.white', color: '#ffffff' },
    { name: 'pink', label: 'color.pink', color: '#ec4899' }
  ];

  carouselModes = [
    { 
      id: 'single' as CarouselMode, 
      name: 'carousel.single.name', 
      description: 'carousel.single.desc',
      icon: 'M4 6h16M4 12h16M4 18h16'
    },
    { 
      id: 'double' as CarouselMode, 
      name: 'carousel.double.name', 
      description: 'carousel.double.desc',
      icon: 'M4 6h7M13 6h7M4 12h7M13 12h7M4 18h7M13 18h7'
    },
    { 
      id: 'triple' as CarouselMode, 
      name: 'carousel.triple.name', 
      description: 'carousel.triple.desc',
      icon: 'M4 6h4M10 6h4M16 6h4M4 12h4M10 12h4M16 12h4M4 18h4M10 18h4M16 18h4'
    },
    { 
      id: 'grid' as CarouselMode, 
      name: 'carousel.grid.name', 
      description: 'carousel.grid.desc',
      icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z'
    },
    { 
      id: 'compact' as CarouselMode, 
      name: 'carousel.compact.name', 
      description: 'carousel.compact.desc',
      icon: 'M3 4h2M7 4h2M11 4h2M15 4h2M19 4h2M3 12h2M7 12h2M11 12h2M15 12h2M19 12h2M3 20h2M7 20h2M11 20h2M15 20h2M19 20h2'
    },
    { 
      id: 'showcase' as CarouselMode, 
      name: 'carousel.showcase.name', 
      description: 'carousel.showcase.desc',
      icon: 'M2 6h5M9 6h6M17 6h5M2 12h5M9 12h6M17 12h5M2 18h5M9 18h6M17 18h5'
    },
    { 
      id: 'timeline' as CarouselMode, 
      name: 'carousel.timeline.name', 
      description: 'carousel.timeline.desc',
      icon: 'M12 2v20M8 6h8M8 12h8M8 18h8'
    },
    { 
      id: 'masonry' as CarouselMode, 
      name: 'carousel.masonry.name', 
      description: 'carousel.masonry.desc',
      icon: 'M3 3h5v5H3zM10 3h11v3H10zM10 8h5v8h-5zM17 8h4v4h-4zM3 10h5v11H3zM17 14h4v7h-4z'
    }
  ];

  constructor(
    private themeService: ThemeService,
    private dataService: DataService,
    private carouselService: CarouselService,
    public i18n: I18nService,
    private tourService: TourService
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

  startTour(): void {
    this.isMobileMenuOpen = false;
    this.isThemeMenuOpen = false;
    this.isCarouselMenuOpen = false;
    this.tourService.start();
  }

  toggleLanguage(): void {
    this.i18n.toggle();
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
