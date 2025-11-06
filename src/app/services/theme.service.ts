import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark';
export type ColorTheme = 'blue' | 'green' | 'gray' | 'beige' | 'red' | 'purple' | 'orange' | 'yellow' | 'white' | 'pink';
export type ThemeEffect = 'none' | 'glassmorphism' | 'dark-neon';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeModeSubject = new BehaviorSubject<ThemeMode>('light');
  private colorThemeSubject = new BehaviorSubject<ColorTheme>('blue');
  private effectSubject = new BehaviorSubject<ThemeEffect>('none');
  
  public themeMode$ = this.themeModeSubject.asObservable();
  public colorTheme$ = this.colorThemeSubject.asObservable();
  public effect$ = this.effectSubject.asObservable();

  constructor() {
    this.loadThemeFromStorage();
  }

  private loadThemeFromStorage(): void {
    const savedThemeMode = localStorage.getItem('themeMode') as ThemeMode | null;
    const savedColorTheme = localStorage.getItem('colorTheme') as ColorTheme | null;
    const savedEffect = localStorage.getItem('themeEffect') as ThemeEffect | null;
    
    if (savedThemeMode) {
      this.setThemeMode(savedThemeMode);
    }
    
    if (savedColorTheme) {
      this.setColorTheme(savedColorTheme);
    }

    if (savedEffect) {
      this.setEffect(savedEffect);
    }
  }

  public setThemeMode(mode: ThemeMode): void {
    this.themeModeSubject.next(mode);
    localStorage.setItem('themeMode', mode);
    this.applyTheme();
  }

  public setColorTheme(theme: ColorTheme): void {
    this.colorThemeSubject.next(theme);
    localStorage.setItem('colorTheme', theme);
    this.applyTheme();
  }

  public setEffect(effect: ThemeEffect): void {
    this.effectSubject.next(effect);
    localStorage.setItem('themeEffect', effect);
    this.applyTheme();
  }

  public toggleThemeMode(): void {
    const newMode = this.themeModeSubject.value === 'light' ? 'dark' : 'light';
    this.setThemeMode(newMode);
  }

  private applyTheme(): void {
    const root = document.documentElement;
    const mode = this.themeModeSubject.value;
    const theme = this.colorThemeSubject.value;
    const effect = this.effectSubject.value;
    
    // Apply dark mode class
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Apply color theme
    root.setAttribute('data-theme', theme);

    // Apply visual effect as a data attribute so CSS can target it
    root.setAttribute('data-effect', effect);
  }

  public getCurrentThemeMode(): ThemeMode {
    return this.themeModeSubject.value;
  }

  public getCurrentColorTheme(): ColorTheme {
    return this.colorThemeSubject.value;
  }

  public getCurrentEffect(): ThemeEffect {
    return this.effectSubject.value;
  }
}
