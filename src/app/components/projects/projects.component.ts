import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Project } from '../../models/project.interface';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
    selector: 'app-projects',
    imports: [CommonModule, ScrollAnimationDirective],
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  allProjects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedCategory: string = 'all';
  categories: string[] = ['all', 'Data', 'Web', 'Mobile'];

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
    if (category === 'all') {
      this.filteredProjects = this.allProjects;
    } else {
      this.filteredProjects = this.allProjects.filter(
        project => project.category === category
      );
    }
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
