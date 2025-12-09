import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly serviceId = 'service_9yhwo2c';
  private readonly templateId = 'template_nm0xs9o';
  private readonly publicKey = '8DBVHneY49gwvfsnz';

  constructor() {
    // Inicializar EmailJS con tu clave pública
    emailjs.init(this.publicKey);
  }

  async sendContactEmail(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<any> {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject || 'Nuevo mensaje desde el portafolio',
      message: formData.message,
      to_email: 'wilderrojasmarin@gmail.com',
      reply_to: formData.email,
      user_name: formData.name,
      user_email: formData.email,
      message_subject: formData.subject,
      message_content: formData.message
    };

    try {
      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
