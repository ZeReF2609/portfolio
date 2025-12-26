import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeEffect } from '../../services/theme.service';
import { CarouselService, CarouselMode, CarouselConfig } from '../../services/carousel.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ThemeSelectorComponent {
  isOpen = false;
  activeAccordion: 'appearance' | 'carousel' | null = 'appearance';

  // Paleta de temas con etiquetas y colores consistentes
  colorThemes = [
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

  // Modos de carrusel
  carouselModes: Array<{ id: CarouselMode; name: string; description: string; icon: string; perPage: number }> = [];

  currentTheme$!: Observable<string>;
  currentMode$!: Observable<string>;
  currentEffect$!: Observable<string>;
  carouselConfig$!: Observable<CarouselConfig>;
  currentCarouselMode$!: Observable<CarouselMode>;

  constructor(
    private themeService: ThemeService,
    private carouselService: CarouselService
  ) {
    this.currentTheme$ = this.themeService.colorTheme$;
    this.currentMode$ = this.themeService.themeMode$;
    this.currentEffect$ = this.themeService.effect$;
    this.carouselConfig$ = this.carouselService.config$;
    this.currentCarouselMode$ = this.carouselService.config$.pipe(map(c => c.mode));
    
    // Cargar modos disponibles del servicio
    this.carouselModes = this.carouselService.availableModes.map(m => ({
      id: m.id,
      name: m.name,
      description: m.description,
      icon: m.icon,
      perPage: typeof m.perPage === 'number' ? m.perPage : Math.floor(m.perPage)
    }));
  }

  toggleSelector(): void {
    this.isOpen = !this.isOpen;
  }

  closeSelector(): void {
    this.isOpen = false;
  }

  toggleAccordion(section: 'appearance' | 'carousel'): void {
    this.activeAccordion = this.activeAccordion === section ? null : section;
  }

  selectTheme(theme: string): void {
    this.themeService.setColorTheme(theme as any);
  }

  setMode(mode: 'light' | 'dark'): void {
    this.themeService.setThemeMode(mode);
  }

  setEffect(effect: ThemeEffect): void {
    this.themeService.setEffect(effect);
  }

  // Métodos del carrusel
  selectCarouselMode(mode: CarouselMode): void {
    this.carouselService.setMode(mode);
  }

  toggleAutoplay(): void {
    const current = this.carouselService.getCurrentConfig();
    this.carouselService.setAutoplay(!current.autoplay);
  }

  onSpeedChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.carouselService.setSpeed(Number(target.value));
  }

  resetAll(): void {
    this.themeService.setColorTheme('blue');
    this.themeService.setThemeMode('light');
    this.carouselService.resetToDefaults();
  }
}

