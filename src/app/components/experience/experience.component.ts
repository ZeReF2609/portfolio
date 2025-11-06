import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Experience } from '../../models/experience.interface';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  templateUrl: './experience.component.html'
})
export class ExperienceComponent implements OnInit {
  experience: Experience[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.experience = this.dataService.getExperience();
  }

  formatDate(date: string | undefined): string {
    if (!date) return '';
    const [year, month] = date.split('-');
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const m = parseInt(month, 10);
    return `${months[m - 1]} ${year}`;
  }

  trackById(index: number, item: { id: number }) {
    return item.id;
  }
}
