import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Project } from '../../models/project.interface';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
    selector: 'app-projects',
    imports: [CommonModule, ScrollAnimationDirective, TranslatePipe],
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  allProjects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedCategory: string = 'all';
  selectedTech: string | null = null;
  categories: string[] = ['all', 'Data', 'Web', 'Mobile'];

  // Pasos del caso de estudio (Problema → Datos → Análisis → Resultado)
  readonly caseSteps: { key: 'problem' | 'data' | 'analysis' | 'result'; label: string }[] = [
    { key: 'problem', label: 'px.problem' },
    { key: 'data', label: 'px.data' },
    { key: 'analysis', label: 'px.analysis' },
    { key: 'result', label: 'px.result' }
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.allProjects = this.dataService.getProjects();
    this.allProjects.forEach(p => {
      if (p.image && typeof p.image === 'string' && p.image.includes('..')) {
        p.image = p.image.replace(/\.\./g, '.');
      }
    });
    this.filteredProjects = this.allProjects;
  }

  filterProjects(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  // Filtro por tecnología (combinable con la categoría). Clic en el chip activo lo desactiva.
  filterByTech(tech: string, event?: Event, fromModal = false): void {
    event?.stopPropagation();
    this.selectedTech = this.selectedTech === tech && !fromModal ? null : tech;
    this.applyFilters();
    if (fromModal) {
      this.closeDetails();
      setTimeout(() => document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  }

  clearTech(): void {
    this.selectedTech = null;
    this.applyFilters();
  }

  private applyFilters(): void {
    const tech = this.selectedTech;
    this.filteredProjects = this.allProjects.filter(p =>
      (this.selectedCategory === 'all' || p.category === this.selectedCategory) &&
      (!tech || p.technologies.includes(tech))
    );
  }

  selected: Project | null = null;
  private lastFocused: HTMLElement | null = null;

  openDetails(project: Project): void {
    this.lastFocused = document.activeElement as HTMLElement | null;
    this.selected = project;
    document.body.style.overflow = 'hidden';
    setTimeout(() => (document.querySelector('[role=dialog] button') as HTMLElement | null)?.focus());
  }

  @HostListener('document:keydown.escape')
  closeDetails(): void {
    if (!this.selected) return;
    this.selected = null;
    document.body.style.overflow = '';
    this.lastFocused?.focus();
  }

  openLink(url: string | undefined): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/image.webp';
  }
}
