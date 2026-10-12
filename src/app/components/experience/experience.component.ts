import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Experience } from '../../models/experience.interface';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { I18nService } from '../../services/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
    selector: 'app-experience',
    imports: [CommonModule, ScrollAnimationDirective, TranslatePipe],
    templateUrl: './experience.component.html'
})
export class ExperienceComponent implements OnInit {
  experience: Experience[] = [];
  constructor(private dataService: DataService, private i18n: I18nService) {}

  ngOnInit(): void {
    this.experience = this.dataService.getExperience();
  }

  formatDate(date: string | undefined): string {
    if (!date) return '';
    const [year, month] = date.split('-');
    const months = this.i18n.t('common.monthsShort').split(',');
    const m = parseInt(month, 10);
    return `${months[m - 1]} ${year}`;
  }

  trackById(index: number, item: { id: number }) {
    return item.id;
  }
}
