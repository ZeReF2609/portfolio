import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user.interface';
import { Education } from '../../models/experience.interface';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
    selector: 'app-about',
    imports: [CommonModule, ScrollAnimationDirective],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  // allow null initially so templates can safely use optional chaining
  user: User | null = null;
  education: Education[] = [];
  languages: { name: string; level: string }[] = [];

  interests = [
    'Análisis de Datos',
    'Machine Learning',
    'Business Intelligence',
    'Modelos Predictivos',
    'Industria 4.0',
    'Desarrollo Full Stack'
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.user = this.dataService.getUserData();
    this.education = this.dataService.getEducation();
    this.languages = this.dataService.getLanguages();
  }
}
