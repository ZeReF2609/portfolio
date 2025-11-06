import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeEffect } from '../../services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ThemeSelectorComponent {
  isOpen = false;

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

  currentTheme$!: Observable<string>;
  currentMode$!: Observable<string>;
  currentEffect$!: Observable<string>;

  constructor(private themeService: ThemeService) {
    this.currentTheme$ = this.themeService.colorTheme$;
    this.currentMode$ = this.themeService.themeMode$;
    this.currentEffect$ = this.themeService.effect$;
  }

  toggleSelector(): void {
    this.isOpen = !this.isOpen;
  }

  closeSelector(): void {
    this.isOpen = false;
  }

  selectTheme(theme: string): void {
    this.themeService.setColorTheme(theme as any);
    this.isOpen = false;
  }

  setMode(mode: 'light' | 'dark'): void {
    this.themeService.setThemeMode(mode);
  }

  setEffect(effect: ThemeEffect): void {
    this.themeService.setEffect(effect);
  }
}

