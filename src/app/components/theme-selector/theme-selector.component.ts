import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeEffect } from '../../services/theme.service';
import { CarouselService, CarouselMode, CarouselConfig } from '../../services/carousel.service';
import { Observable, map } from 'rxjs';
import { I18nService } from '../../services/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
    selector: 'app-theme-selector',
    templateUrl: './theme-selector.component.html',
    styleUrls: ['./theme-selector.component.css'],
    imports: [CommonModule, TranslatePipe]
})
export class ThemeSelectorComponent {
  isOpen = false;
  activeAccordion: 'appearance' | 'carousel' | null = 'appearance';

  // Paleta de temas con etiquetas y colores consistentes
  // label = clave de traducción
  colorThemes = [
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

  // Modos de carrusel
  carouselModes: Array<{ id: CarouselMode; name: string; description: string; icon: string; perPage: number }> = [];

  currentTheme$!: Observable<string>;
  currentMode$!: Observable<string>;
  currentEffect$!: Observable<string>;
  carouselConfig$!: Observable<CarouselConfig>;
  currentCarouselMode$!: Observable<CarouselMode>;

  constructor(
    private themeService: ThemeService,
    private carouselService: CarouselService,
    private i18n: I18nService
  ) {
    this.currentTheme$ = this.themeService.colorTheme$;
    this.currentMode$ = this.themeService.themeMode$;
    this.currentEffect$ = this.themeService.effect$;
    this.carouselConfig$ = this.carouselService.config$;
    this.currentCarouselMode$ = this.carouselService.config$.pipe(map(c => c.mode));
    
    // Cargar modos disponibles del servicio
    this.carouselModes = this.carouselService.availableModes.map(m => ({
      id: m.id,
      name: this.translateOr(`carouselFull.${m.id}.name`, m.name),
      description: this.translateOr(`carouselFull.${m.id}.desc`, m.description),
      icon: m.icon,
      perPage: typeof m.perPage === 'number' ? m.perPage : Math.floor(m.perPage)
    }));
  }

  private translateOr(key: string, fallback: string): string {
    const value = this.i18n.t(key);
    return value === key ? fallback : value;
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

