import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ContactInfo } from '../../models/contact.interface';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ScrollAnimationDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  // allow null initially so template optional chaining is valid
  contactInfo: ContactInfo | null = null;
  isSubmitted = false;
  showSuccessMessage = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.contactInfo = this.dataService.getContactInfo();
    this.initializeForm();
  }

  initializeForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    
    if (field?.hasError('email')) {
      return 'Email inválido';
    }
    
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    
    return '';
  }

  onSubmit(): void {
    this.isSubmitted = true;
    
    if (this.contactForm.valid) {
      // Here you would typically send the form data to a backend service
      console.log('Form data:', this.contactForm.value);
      
      // Show success message
      this.showSuccessMessage = true;
      
      // Reset form after 3 seconds
      setTimeout(() => {
        this.contactForm.reset();
        this.isSubmitted = false;
        this.showSuccessMessage = false;
      }, 3000);
    }
  }

  openEmail(): void {
    // guard in case contactInfo is not yet available
    if (!this.contactInfo?.email) {
      return;
    }

    window.location.href = `mailto:${this.contactInfo.email}`;
  }
}
