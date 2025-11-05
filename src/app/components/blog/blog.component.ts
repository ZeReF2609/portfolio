import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Community, BlogPost } from '../../models/community.interface';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  communities: Community[] = [];
  blogPosts: BlogPost[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.communities = this.dataService.getCommunities();
    this.blogPosts = this.dataService.getBlogPosts();
  }

  openLink(url?: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
