import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user.interface';
import { Education } from '../../models/experience.interface';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
    selector: 'app-about',
    imports: [CommonModule, ScrollAnimationDirective, TranslatePipe],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  // allow null initially so templates can safely use optional chaining
  user: User | null = null;
  education: Education[] = [];
  languages: { name: string; level: string }[] = [];

  // Claves de traducción (about.interest.N en src/app/i18n)
  interests = [0, 1, 2, 3, 4, 5].map(i => `about.interest.${i}`);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.user = this.dataService.getUserData();
    this.education = this.dataService.getEducation();
    this.languages = this.dataService.getLanguages();
  }
}
