import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark';
export type ColorTheme = 'blue' | 'green' | 'gray' | 'beige' | 'red' | 'purple' | 'orange' | 'yellow' | 'white' | 'pink';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeModeSubject = new BehaviorSubject<ThemeMode>('light');
  private colorThemeSubject = new BehaviorSubject<ColorTheme>('blue');
  
  public themeMode$ = this.themeModeSubject.asObservable();
  public colorTheme$ = this.colorThemeSubject.asObservable();

  constructor() {
    this.loadThemeFromStorage();
  }

  private loadThemeFromStorage(): void {
    const savedThemeMode = localStorage.getItem('themeMode') as ThemeMode;
    const savedColorTheme = localStorage.getItem('colorTheme') as ColorTheme;
    
    if (savedThemeMode) {
      this.setThemeMode(savedThemeMode);
    }
    
    if (savedColorTheme) {
      this.setColorTheme(savedColorTheme);
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

  public toggleThemeMode(): void {
    const newMode = this.themeModeSubject.value === 'light' ? 'dark' : 'light';
    this.setThemeMode(newMode);
  }

  private applyTheme(): void {
    const root = document.documentElement;
    const mode = this.themeModeSubject.value;
    const theme = this.colorThemeSubject.value;
    
    // Apply dark mode class
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Apply color theme
    root.setAttribute('data-theme', theme);
  }

  public getCurrentThemeMode(): ThemeMode {
    return this.themeModeSubject.value;
  }

  public getCurrentColorTheme(): ColorTheme {
    return this.colorThemeSubject.value;
  }
}
