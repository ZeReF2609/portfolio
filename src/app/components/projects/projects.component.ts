import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Project } from '../../models/project.interface';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  allProjects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedCategory: string = 'all';
  categories: string[] = ['all', 'Web', 'Mobile', 'Tool'];

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

  openLink(url: string | undefined): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/image/image.png';
  }
}
