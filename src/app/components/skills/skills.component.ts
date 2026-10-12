import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { SkillCategory } from '../../models/skill.interface';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

interface Stat { label: string; value: number; shown: number; icon: string; }

@Component({
    selector: 'app-skills',
    imports: [CommonModule, ScrollAnimationDirective],
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('statsGrid') statsGrid?: ElementRef<HTMLElement>;
  skillCategories: SkillCategory[] = [];
  stats: Stat[] = [];
  private observer?: IntersectionObserver;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.skillCategories = this.dataService.getSkills();
    const s = this.dataService.getStats();
    this.stats = [
      { label: 'Años de experiencia', value: s.years, shown: s.years, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
      { label: 'Proyectos', value: s.projects, shown: s.projects, icon: 'M3 7h18M3 12h18M3 17h18' },
      { label: 'Certificaciones', value: s.certifications, shown: s.certifications, icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
      { label: 'Tecnologías', value: s.technologies, shown: s.technologies, icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' }
    ];
  }

  // Cuenta desde 0 cuando la sección entra en pantalla (los valores finales ya están renderizados por si no hay JS/observer)
  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined' || !this.statsGrid) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    this.observer = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      this.observer?.disconnect();
      const start = performance.now();
      const duration = 1200;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        this.stats.forEach(st => st.shown = Math.round(st.value * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    this.observer.observe(this.statsGrid.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
