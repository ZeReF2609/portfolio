import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type CarouselMode = 
  | 'single' 
  | 'double' 
  | 'triple' 
  | 'grid' 
  | 'compact'
  | 'showcase'
  | 'timeline'
  | 'masonry';

export interface CarouselConfig {
  mode: CarouselMode;
  autoplay: boolean;
  speed: number;
  showArrows: boolean;
  showPagination: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  private defaultConfig: CarouselConfig = {
    mode: 'triple',
    autoplay: true,
    speed: 2500,
    showArrows: false,
    showPagination: false
  };

  private configSubject = new BehaviorSubject<CarouselConfig>(this.defaultConfig);
  public config$: Observable<CarouselConfig> = this.configSubject.asObservable();

  // Modos disponibles con sus configuraciones
  public availableModes = [
    {
      id: 'single' as CarouselMode,
      name: 'Vista Única',
      description: 'Un elemento destacado',
      icon: 'M12 2v20m0-20l-4 4m4-4l4 4',
      perPage: 1,
      gap: '2rem',
      padding: { left: '15%', right: '15%' },
      breakpoints: {
        768: { padding: '1rem' },
      }
    },
    {
      id: 'double' as CarouselMode,
      name: 'Vista Doble',
      description: 'Dos elementos lado a lado',
      icon: 'M9 3h6M9 12h6M9 21h6',
      perPage: 2,
      gap: '2rem',
      padding: '3rem',
      breakpoints: {
        1024: { perPage: 1, gap: '1rem', padding: '1rem' },
      }
    },
    {
      id: 'triple' as CarouselMode,
      name: 'Vista Triple',
      description: 'Tres elementos visibles',
      icon: 'M4 6h16M4 12h16M4 18h16',
      perPage: 3,
      gap: '1.5rem',
      padding: '2rem',
      breakpoints: {
        1280: { perPage: 2, gap: '1rem', padding: '1rem' },
        768: { perPage: 1, gap: '1rem', padding: '0.5rem' },
      }
    },
    {
      id: 'grid' as CarouselMode,
      name: 'Vista Grid',
      description: 'Cuatro elementos en cuadrícula',
      icon: 'M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z',
      perPage: 4,
      gap: '1rem',
      padding: '1rem',
      breakpoints: {
        1536: { perPage: 3, gap: '1rem' },
        1024: { perPage: 2, gap: '1rem' },
        640: { perPage: 1, gap: '0.5rem', padding: '0.5rem' },
      }
    },
    {
      id: 'compact' as CarouselMode,
      name: 'Vista Compacta',
      description: 'Cinco elementos compactos',
      icon: 'M2 4h4v4H2zm5 0h4v4H7zm5 0h4v4h-4zm5 0h4v4h-4zM2 9h4v4H2z',
      perPage: 5,
      gap: '0.75rem',
      padding: '0.5rem',
      breakpoints: {
        1536: { perPage: 4 },
        1280: { perPage: 3 },
        1024: { perPage: 2 },
        640: { perPage: 1 },
      }
    },
    {
      id: 'showcase' as CarouselMode,
      name: 'Vista Showcase',
      description: 'Elemento central destacado',
      icon: 'M12 8v8m-4-4h8',
      perPage: 3,
      gap: '1rem',
      padding: '5%',
      focus: 'center',
      breakpoints: {
        1024: { perPage: 2 },
        768: { perPage: 1 },
      }
    },
    {
      id: 'timeline' as CarouselMode,
      name: 'Vista Timeline',
      description: 'Línea de tiempo horizontal',
      icon: 'M3 12h18M9 5l7 7-7 7',
      perPage: 2.5,
      gap: '1.5rem',
      padding: '2rem',
      breakpoints: {
        1024: { perPage: 1.5 },
        768: { perPage: 1 },
      }
    },
    {
      id: 'masonry' as CarouselMode,
      name: 'Vista Masonry',
      description: 'Disposición dinámica tipo Pinterest',
      icon: 'M3 3h4v8H3zm5 0h4v5H8zm5 0h4v6h-4zM3 12h4v6H3zm5 6h4v6H8zm5-1h4v7h-4z',
      perPage: 3,
      gap: '1rem',
      padding: '1rem',
      autoHeight: true,
      breakpoints: {
        1280: { perPage: 2 },
        768: { perPage: 1 },
      }
    }
  ];

  constructor() {
    // Cargar configuración guardada del localStorage
    this.loadConfig();
  }

  getCurrentConfig(): CarouselConfig {
    return this.configSubject.value;
  }

  getConfig(): CarouselConfig {
    return this.configSubject.value;
  }

  setMode(mode: CarouselMode): void {
    const newConfig = { ...this.configSubject.value, mode };
    this.configSubject.next(newConfig);
    this.saveConfig(newConfig);
  }

  setAutoplay(autoplay: boolean): void {
    const newConfig = { ...this.configSubject.value, autoplay };
    this.configSubject.next(newConfig);
    this.saveConfig(newConfig);
  }

  setSpeed(speed: number): void {
    const newConfig = { ...this.configSubject.value, speed };
    this.configSubject.next(newConfig);
    this.saveConfig(newConfig);
  }

  toggleArrows(): void {
    const newConfig = { 
      ...this.configSubject.value, 
      showArrows: !this.configSubject.value.showArrows 
    };
    this.configSubject.next(newConfig);
    this.saveConfig(newConfig);
  }

  togglePagination(): void {
    const newConfig = { 
      ...this.configSubject.value, 
      showPagination: !this.configSubject.value.showPagination 
    };
    this.configSubject.next(newConfig);
    this.saveConfig(newConfig);
  }

  resetToDefaults(): void {
    this.configSubject.next(this.defaultConfig);
    this.saveConfig(this.defaultConfig);
  }

  getModeConfig(mode: CarouselMode) {
    return this.availableModes.find(m => m.id === mode);
  }

  private saveConfig(config: CarouselConfig): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('carouselConfig', JSON.stringify(config));
    }
  }

  private loadConfig(): void {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('carouselConfig');
      if (saved) {
        try {
          const config = JSON.parse(saved);
          this.configSubject.next(config);
        } catch (e) {
          console.error('Error loading carousel config:', e);
        }
      }
    }
  }
}
