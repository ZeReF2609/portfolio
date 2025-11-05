import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  user: User | null = null;
  cvUrl: string = '';

  constructor(private dataService: DataService) {
    this.cvUrl = this.dataService.getCVUrl();
  }

  ngOnInit(): void {
    this.user = this.dataService.getUserData();
  }

  scrollToContact(): void {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }

  downloadCV(): void {
    window.open(this.cvUrl, '_blank');
  }
}
