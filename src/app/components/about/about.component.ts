import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user.interface';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  // allow null initially so templates can safely use optional chaining
  user: User | null = null;

  interests = [
    'Full Stack Development',
    'Desarrollo Móvil',
    'Soluciones Escalables',
    'Algoritmos y Estructuras de Datos',
    'Code Quality',
    'Continuous Learning'
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.user = this.dataService.getUserData();
  }
}
