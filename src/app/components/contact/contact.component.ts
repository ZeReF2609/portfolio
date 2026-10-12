import { Component, signal, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { DataService } from '../../services/data.service';
import { ContactInfo } from '../../models/contact.interface';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { I18nService } from '../../services/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

interface ContactMethod {
  title: string;
  value: string;
  icon: string;
  link: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // honeypot
}

@Component({
    selector: 'app-contact',
    imports: [CommonModule, FormsModule, ScrollAnimationDirective, TranslatePipe],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private emailService = inject(EmailService);
  private dataService = inject(DataService);
  private i18n = inject(I18nService);

  // Estado del formulario
  protected readonly isSubmitting = signal(false);
  protected readonly submitStatus = signal<'idle' | 'success' | 'error'>('idle');
  protected readonly submitMessage = signal('');
  
  // Rate limit: allow 1 submission every X seconds per browser
  private readonly RATE_LIMIT_SECONDS = 30;
  
  // Contact info from data service
  contactInfo: ContactInfo | null = null;
  
  protected readonly contactMethods = signal<ContactMethod[]>([
    {
      title: 'Email',
      value: 'wilderrojasmarin@gmail.com',
      icon: 'email',
      link: 'mailto:wilderrojasmarin@gmail.com'
    },
    {
      title: 'LinkedIn',
      value: 'linkedin.com/in/wilderrojasmarin',
      icon: 'link',
      link: 'https://www.linkedin.com/in/wilderrojasmarin/'
    },
    {
      title: 'Instagram',
      value: 'instagram.com/zereff.26',
      icon: 'photo_camera',
      link: 'https://www.instagram.com/zereff.26'
    }
  ]);

  protected readonly socialLinks = signal<SocialLink[]>([
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/wilderrojasmarin/',
      icon: 'link'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/zereff.26',
      icon: 'photo_camera'
    }
  ]);

  protected formData: FormData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  ngOnInit(): void {
    this.contactInfo = this.dataService.getContactInfo();
  }

  // Helper getters for template binding
  isSubmittingState() {
    return this.isSubmitting();
  }

  submitStatusValue() {
    return this.submitStatus();
  }

  submitMessageValue() {
    return this.submitMessage();
  }

  private isRateLimited(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    try {
      const last = localStorage.getItem('contact_last_submit');
      if (!last) return false;
      const lastTs = parseInt(last, 10);
      const now = Date.now();
      return (now - lastTs) < (this.RATE_LIMIT_SECONDS * 1000);
    } catch (e) {
      return false;
    }
  }

  private updateLastSubmit() {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      localStorage.setItem('contact_last_submit', Date.now().toString());
    } catch (e) {
      // ignore
    }
  }

  onSubmit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Honeypot: must be empty
    if (this.formData.website) {
      console.warn('Honeypot filled; possible bot. Rejecting submission.');
      this.submitStatus.set('error');
      this.submitMessage.set(this.i18n.t('contact.msg.error'));
      return;
    }

    // Rate limiting (client-side fallback)
    if (this.isRateLimited()) {
      this.submitStatus.set('error');
      this.submitMessage.set(this.i18n.t('contact.msg.rateLimited'));
      return;
    }

    // Validar formulario
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      this.submitStatus.set('error');
      this.submitMessage.set(this.i18n.t('contact.msg.required'));
      return;
    }

    this.isSubmitting.set(true);
    this.submitStatus.set('idle');
    this.submitMessage.set('');

    // update last submit timestamp
    this.updateLastSubmit();

    // Enviar email usando el servicio
    this.emailService.sendContactEmail(this.formData)
      .then((response: any) => {
        console.log('Email enviado exitosamente:', response);
        this.submitStatus.set('success');
        this.submitMessage.set(this.i18n.t('contact.msg.success'));
        
        // Resetear formulario
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
      })
      .catch((error: any) => {
        console.error('Error al enviar email:', error);
        
        // Mostrar mensaje de error más específico
        let errorMessage = this.i18n.t('contact.msg.errorPrefix');
        
        if (error.message && error.message.includes('credenciales')) {
          errorMessage = this.i18n.t('contact.msg.notConfigured');
        } else if (error.text) {
          errorMessage += this.i18n.t('contact.msg.details') + error.text;
        } else if (error.message) {
          errorMessage += error.message;
        } else {
          errorMessage += this.i18n.t('contact.msg.fallback');
        }
        
        this.submitStatus.set('error');
        this.submitMessage.set(errorMessage);
      })
      .finally(() => {
        this.isSubmitting.set(false);
        
        // Limpiar mensaje después de 8 segundos
        setTimeout(() => {
          this.submitStatus.set('idle');
          this.submitMessage.set('');
        }, 8000);
      });
  }

  openEmail(): void {
    if (!this.contactInfo?.email) {
      return;
    }
    window.location.href = `mailto:${this.contactInfo.email}`;
  }
}
