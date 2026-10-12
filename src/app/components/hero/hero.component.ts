import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user.interface';
import { I18nService } from '../../services/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
    selector: 'app-hero',
    imports: [CommonModule, TranslatePipe],
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  user: User | null = null;
  cvUrl: string = '';
  typedText = signal('');
  private texts: string[];
  private textIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timerId: number | undefined;

  constructor(private dataService: DataService, private i18n: I18nService) {
    this.cvUrl = this.dataService.getCVUrl();
    this.texts = [0, 1, 2, 3, 4].map(i => this.i18n.t(`hero.typing.${i}`));
  }

  ngOnInit(): void {
    this.user = this.dataService.getUserData();
    this.typeEffect();
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

  copied = signal(false);

  async copyEmail(): Promise<void> {
    if (!this.user?.email) return;
    try {
      await navigator.clipboard.writeText(this.user.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      window.location.href = `mailto:${this.user.email}`;
    }
  }

  private typeEffect(): void {
    const currentText = this.texts[this.textIndex];
    
    if (this.isDeleting) {
      this.typedText.set(currentText.substring(0, this.charIndex - 1));
      this.charIndex--;
    } else {
      this.typedText.set(currentText.substring(0, this.charIndex + 1));
      this.charIndex++;
    }

    let timeout = this.isDeleting ? 50 : 100;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      timeout = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      timeout = 500;
    }

    // store timer id so we can clear it when the component is destroyed
    this.timerId = window.setTimeout(() => this.typeEffect(), timeout);
  }
  
  ngOnDestroy(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }
  
}
