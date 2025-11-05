import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { SkillCategory } from '../../models/skill.interface';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillCategories: SkillCategory[] = [];
  selectedCategory: string = 'Frontend';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.skillCategories = this.dataService.getSkills();
  }

  selectCategory(categoryName: string): void {
    this.selectedCategory = categoryName;
  }

  get currentSkills(): SkillCategory | undefined {
    return this.skillCategories.find(cat => cat.name === this.selectedCategory);
  }
}
