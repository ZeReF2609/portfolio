import { Injectable, signal } from '@angular/core';
import { ES } from '../i18n/es';
import { EN } from '../i18n/en';

export type Lang = 'es' | 'en';

const DICTIONARIES: Record<Lang, Record<string, string>> = { es: ES, en: EN };

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  readonly lang = signal<Lang>(I18nService.detectLang());

  constructor() {
    try {
      document.documentElement.lang = this.lang();
    } catch {
      // ignore (no DOM)
    }
  }

  private static detectLang(): Lang {
    try {
      const stored = localStorage.getItem('lang');
      if (stored === 'es' || stored === 'en') return stored;
    } catch {
      // ignore (storage blocked)
    }
    try {
      if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('en')) {
        return 'en';
      }
    } catch {
      // ignore
    }
    return 'es';
  }

  get isEnglish(): boolean {
    return this.lang() === 'en';
  }

  t(key: string): string {
    return DICTIONARIES[this.lang()][key] ?? ES[key] ?? key;
  }

  setLang(l: Lang): void {
    try {
      localStorage.setItem('lang', l);
    } catch {
      // ignore (storage blocked)
    }
    this.lang.set(l);
    try {
      document.documentElement.lang = l;
    } catch {
      // ignore
    }
    // Los componentes cargan sus datos en ngOnInit: recargar es lo más simple y fiable.
    location.reload();
  }

  toggle(): void {
    this.setLang(this.lang() === 'es' ? 'en' : 'es');
  }
}
