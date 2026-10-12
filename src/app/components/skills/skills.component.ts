import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { SkillCategory } from '../../models/skill.interface';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
    selector: 'app-skills',
    imports: [CommonModule, ScrollAnimationDirective],
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillCategories: SkillCategory[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.skillCategories = this.dataService.getSkills();
  }
}
