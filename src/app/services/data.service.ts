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
      { id: 1, title: 'Curso de Introducción al Desarrollo Backend', organization: 'Platzi', date: '2025' },
      { id: 2, title: 'Curso de Project Management con PMBOK', organization: 'Platzi', date: '2025' },
      { id: 3, title: 'Curso de GitHub Copilot', organization: 'Platzi', date: '2025' },
      { id: 4, title: 'Curso de Flutter', organization: 'Platzi', date: '2025' },
      { id: 5, title: 'Curso de Git y GitHub', organization: 'Platzi', date: '2025' },
      { id: 6, title: 'Curso de Python', organization: 'Platzi', date: '2025' }
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
    return 'https://portafolio-theta-lilac.vercel.app/assets/doc/cv_wilder_rojas_marin.pdf';
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
          { name: 'React', level: 85, category: 'Frontend' },
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
