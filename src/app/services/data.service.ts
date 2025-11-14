import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { Project } from '../models/project.interface';
import { SkillCategory } from '../models/skill.interface';
import { ContactInfo } from '../models/contact.interface';
import { Certification, Event } from '../models/certification.interface';
import { Community, BlogPost } from '../models/community.interface';
import { Experience } from '../models/experience.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  getUserData(): User {
    return {
      name: 'Wilder Rojas',
      profession: 'Full Stack Developer & Software Engineer',
      description: 'Desarrollador de Software apasionado por crear soluciones escalables e innovadoras. Especializado en tecnologías modernas como Java, Spring Boot, Angular, TypeScript y Flutter. Con experiencia en desarrollo Full Stack y un enfoque en la calidad del código y las mejores prácticas.',
      email: 'wilderrojasmarin@gmail.com',
      location: 'Lima, Perú',
      profileImage: 'assets/images/profile.jpg',
      socialLinks: [
        { platform: 'GitHub', url: 'https://github.com/ZeReF2609/', icon: 'github' },
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/wilderrojasmarin/', icon: 'linkedin' },
        { platform: 'Instagram', url: 'https://www.instagram.com/zereff.26', icon: 'instagram' }
      ]
    };
  }

  getProjects(): Project[] {
    return [
      {
        id: 1,
        title: 'Zafar E-Commerce',
        description: 'Plataforma de e-commerce moderna para ropa y accesorios. Incluye carrito persistente, sistema de checkout, cuenta de usuario, y panel de administración. Desarrollado con las últimas tecnologías.',
        image: 'assets/project/zafar_ecommerce.png',
        technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'ShadCN UI', 'Zustand', 'React Hook Form', 'Zod'],
        demoUrl: 'https://zafar-ecommerce-wp5b.vercel.app',
        githubUrl: 'https://github.com/ZeReF2609/zafarEcommerce',
        category: 'Web'
      },
      {
        id: 2,
        title: 'Portfolio Personal',
        description: 'Mi portafolio personal desarrollado con Angular, mostrando mis habilidades, proyectos y experiencia profesional. Diseño moderno y responsivo con sistema de temas personalizable.',
        image: 'assets/project/portafolio1.png',
        technologies: ['Angular', 'TypeScript', 'SCSS', 'Lottie', 'Responsive Design'],
        demoUrl: 'https://portafolio-theta-lilac.vercel.app',
        githubUrl: 'https://github.com/ZeReF2609/portafolio',
        category: 'Web'
      },
      {
        id: 3,
        title: 'Ticket Support App',
        description: 'Sistema multiplataforma para gestión de tickets de soporte técnico (roles, tickets, chat, calendario, dashboard y métricas). Arquitectura modular con Riverpod y SQLite; UI basada en Material 3 y componentes Syncfusion/FL Chart.',
        image: 'assets/project/ticket_support_app.png',
        technologies: ['Flutter', 'Dart', 'Riverpod', 'SQLite', 'Syncfusion', 'FL Chart', 'Provider'],
        githubUrl: 'https://github.com/ZeReF2609/ticket_support_app',
        category: 'Mobile'
      }
    ];
  }

  getCertifications(): Certification[] {
    return [
      // Cisco Certifications
      { 
        id: 1, 
        title: 'Python Essentials 1', 
        organization: 'Cisco Networking Academy', 
        date: '23 Sep 2025',
        description: 'Fundamentos de programación en Python',
        pdfUrl: '/assets/certificates/cisco/Python_Essentials_1_certificate.pdf'
      },
      { 
        id: 2, 
        title: 'Introduction to IoT', 
        organization: 'Cisco Networking Academy', 
        date: '14 Nov 2023',
        description: 'Conceptos básicos de Internet de las Cosas (IoT)',
        pdfUrl: '/assets/certificates/cisco/Introduction_to_IoT_certificate.pdf'
      },
      
      // Platzi Certifications
      { 
        id: 3, 
        title: 'Backend con Node.js', 
        organization: 'Platzi', 
        date: '24 Ago 2025',
        description: 'Desarrollo backend con Node.js y Express',
        pdfUrl: '/assets/certificates/platzi/diploma-backend.pdf'
      },
      { 
        id: 4, 
        title: 'Desarrollo con Flutter', 
        organization: 'Platzi', 
        date: '31 Jul 2025',
        description: 'Desarrollo de aplicaciones móviles con Flutter',
        pdfUrl: '/assets/certificates/platzi/diploma-flutter.pdf'
      },
      { 
        id: 5, 
        title: 'Git y GitHub', 
        organization: 'Platzi', 
        date: '30 Jul 2025',
        description: 'Control de versiones con Git y GitHub',
        pdfUrl: '/assets/certificates/platzi/diploma-gitgithub.pdf'
      },
      { 
        id: 6, 
        title: 'GitHub Copilot', 
        organization: 'Platzi', 
        date: '31 Jul 2025',
        description: 'Programación asistida con IA',
        pdfUrl: '/assets/certificates/platzi/diploma-github-copilot.pdf'
      },
      { 
        id: 7, 
        title: 'Gestión de Proyectos PMBOK', 
        organization: 'Platzi', 
        date: '24 Ago 2025',
        description: 'Metodología de gestión de proyectos',
        pdfUrl: '/assets/certificates/platzi/diploma-proyectos-pmbok.pdf'
      },
      { 
        id: 8, 
        title: 'Programación en Python', 
        organization: 'Platzi', 
        date: '27 Jul 2025',
        description: 'Python desde cero hasta avanzado',
        pdfUrl: '/assets/certificates/platzi/diploma-python.pdf'
      },
      
      // UPN Certifications
      { 
        id: 9, 
        title: 'Ingeniería del Futuro', 
        organization: 'Universidad Privada del Norte', 
        date: '29 Oct 2025',
        description: 'Conferencia sobre tendencias en ingeniería',
        pdfUrl: '/assets/certificates/upn/IngenieriaDelFuturo.pdf'
      },
      
      // Cibertec Certifications
      { 
        id: 10, 
        title: 'Certificación de Participación', 
        organization: 'Cibertec', 
        date: '07 Nov 2023',
        description: 'Certificación de participación en programa académico',
        pdfUrl: '/assets/certificates/cibertec/Certificación_de_Participación_Rojas Marin, Wilder Enrique.pdf'
      },
      { 
        id: 11, 
        title: 'Constancia de Egresado', 
        organization: 'Cibertec', 
        date: '30 Dic 2024',
        description: 'Constancia de Término de Estudios en Cibertec',
        pdfUrl: '/assets/certificates/cibertec/COVT.CIB-2025-001588_ROJAS MARIN, WILDER ENRIQUE.pdf'
      },
      { 
        id: 12, 
        title: 'Certificado Modular', 
        organization: 'Cibertec', 
        date: '10 Dic 2023',
        description: 'Certificación de cumplimiento de módulos académicos',
        pdfUrl: '/assets/certificates/cibertec/M2202382-202030368-ROJAS MARIN, WILDER ENRIQUE-COMPUTACIÓN E INFORMÁTICA.pdf'
      }
    ];
  }

  getEvents(): Event[] {
    return [
      {
        id: 1,
        title: 'Firebase Day 2025',
        organization: 'GDG Callao',
        location: 'Universidad Peruana de Ciencias Aplicadas',
        date: 'Junio 2025',
        description: 'Conferencias y workshops sobre Firebase, Cloud, Android, Flutter, Machine Learning y Vertex AI.',
        topics: ['Firebase', 'Cloud', 'Android', 'Flutter', 'ML', 'Vertex AI']
      },
      {
        id: 2,
        title: 'AI Developer Day: Build with AI',
        organization: 'GDG Callao',
        location: 'UPC Campus San Miguel',
        date: 'Julio 2025',
        description: 'Talleres y charlas sobre Machine Learning, TensorFlow, Gemini, Flutter y Cloud.',
        topics: ['Machine Learning', 'TensorFlow', 'Gemini', 'Flutter', 'Cloud']
      },
      {
        id: 3,
        title: 'Ng Conf Perú 2025',
        organization: 'GDG Callao',
        location: 'Universidad Tecnológica del Perú',
        date: 'Septiembre 2025',
        description: 'Conferencia internacional enfocada en Angular, mejores prácticas, casos de estudio y tendencias de desarrollo frontend.',
        topics: ['Angular', 'Frontend', 'Best Practices', 'Case Studies']
      }
    ];
  }

  getCommunities(): Community[] {
    return [
      { id: 1, name: 'GDG Callao', role: 'Miembro Activo', url: 'https://gdg.community.dev/gdg-callao/' },
      { id: 2, name: 'Platzi Community', role: 'Estudiante', url: 'https://platzi.com/' },
      { id: 3, name: 'Stack Overflow', role: 'Contributor' },
      { id: 4, name: 'GitHub Community', role: 'Open Source Contributor', url: 'https://github.com/ZeReF2609' }
    ];
  }

  getBlogPosts(): BlogPost[] {
    return [
      // Preparado para futuros artículos
    ];
  }

  getCVUrl(): string {
    return 'assets/cv_wilder_rojas_marin.pdf';
  }

  getSkills(): SkillCategory[] {
    return [
      {
        name: 'Frontend',
        skills: [
          { name: 'HTML5', level: 95, category: 'Frontend' },
          { name: 'CSS3', level: 92, category: 'Frontend' },
          { name: 'JavaScript', level: 90, category: 'Frontend' },
          { name: 'TypeScript', level: 88, category: 'Frontend' },
          { name: 'Angular', level: 90, category: 'Frontend' },
          { name: 'Vue.js', level: 80, category: 'Frontend' },
          { name: 'Sass/SCSS', level: 87, category: 'Frontend' }
        ]
      },
      {
        name: 'Backend y Bases de Datos',
        skills: [
          { name: 'Node.js', level: 85, category: 'Backend' },
          { name: 'Python', level: 80, category: 'Backend' },
          { name: 'Java', level: 90, category: 'Backend' },
          { name: 'C#', level: 82, category: 'Backend' },
          { name: 'MySQL', level: 88, category: 'Backend' },
          { name: 'PostgreSQL', level: 85, category: 'Backend' },
          { name: 'MongoDB', level: 83, category: 'Backend' },
          { name: 'Firebase', level: 80, category: 'Backend' }
        ]
      },
      {
        name: 'Herramientas y DevOps',
        skills: [
          { name: 'Git', level: 92, category: 'Herramientas' },
          { name: 'GitHub', level: 90, category: 'Herramientas' },
          { name: 'Docker', level: 78, category: 'Herramientas' },
          { name: 'AWS', level: 75, category: 'Herramientas' },
          { name: 'Linux', level: 80, category: 'Herramientas' },
          { name: 'VS Code', level: 95, category: 'Herramientas' }
        ]
      }
    ];
  }

  getContactInfo(): ContactInfo {
    return {
      email: 'wilderrojasmarin@gmail.com',
      location: 'Perú'
    };
  }

  getExperience(): Experience[] {
    return [
      {
        id: 1,
        company: 'Manufacturas San Isidro S.A.C.',
        position: 'Desarrollador Full Stack',
        startDate: '2025-02',
        endDate: '2025-12',
        description: 'Implementación de sistema de monitoreo de PLC en tiempo real optimizando el control de procesos industriales (35% mejora). Digitalización del proceso de visitas reduciendo tiempos de validación en 40%. Optimización de gestión de reportes eléctricos y productivos automatizando la recopilación de datos (30% reducción). Desarrollo de sistemas integrando lecturas de PLC con Python y APIs en C#, generando reportes y dashboards en Flutter (80% mejora en eficiencia).',
        current: true
      },
      {
        id: 2,
        company: 'Manufacturas San Isidro S.A.C.',
        position: 'Prácticas Profesionales',
        startDate: '2024-08',
        endDate: '2025-02',
        description: 'Configuración y administración de bases de datos para aplicaciones web responsivas mejorando disponibilidad en 25%. Implementación de medidas de seguridad reduciendo vulnerabilidades en 30% y optimización SEO. Aplicación de buenas prácticas logrando 20% de mejora en estabilidad y escalabilidad de sistemas internos.',
        current: false
      }
    ];
  }
}
