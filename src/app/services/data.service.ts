import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { Project } from '../models/project.interface';
import { SkillCategory } from '../models/skill.interface';
import { ContactInfo } from '../models/contact.interface';
import { Certification, Event } from '../models/certification.interface';
import { Community, BlogPost } from '../models/community.interface';
import { Experience, Education } from '../models/experience.interface';
import certificationsData from '../data/certifications.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getUserData(): User {
    return {
      name: 'Wilder Rojas',
      profession: 'Analista de Datos Junior · Científico de Datos',
      description: 'Científico de Datos con experiencia práctica en análisis, modelado predictivo y visualización de datos para la toma de decisiones de negocio. Trabajo con Python (pandas, scikit-learn, matplotlib), SQL Server, Jupyter y Power BI para construir pipelines de datos, proyecciones y dashboards. Mi base en ingeniería de software me permite integrar los datos con sistemas reales usando Docker y Git.',
      email: 'wilderrojasmarin@gmail.com',
      location: 'Lima, Perú',
      profileImage: 'assets/images/profile.webp',
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
        id: 12,
        title: 'Titanic — Dashboard de supervivencia en Power BI',
        description: 'Dashboard en Power BI sobre 891 pasajeros del Titanic: KPIs y tasa de supervivencia por clase, sexo, grupo de edad y puerto de embarque. Modelo semántico con medidas DAX y columnas calculadas, Power Query para la carga y formato PBIP versionado en Git. Hallazgo clave: las mujeres sobrevivieron 4 veces más que los hombres (74 % vs 19 %).',
        image: 'assets/project/titanic_powerbi.webp',
        technologies: ['Power BI', 'DAX', 'Power Query (M)', 'PBIP / TMDL', 'Data Storytelling'],
        githubUrl: 'https://github.com/ZeReF2609/titanic-powerbi-dashboard',
        category: 'Data'
      },
      {
        id: 6,
        title: 'Finanzas360 — Gastos con OCR y Machine Learning',
        description: 'Sistema de finanzas personales que registra gastos a partir de la foto o PDF de una boleta/factura. Un microservicio de IA extrae emisor, RUC, fecha, total e ítems (EasyOCR + OpenCV) y clasifica cada producto en una categoría de gasto con KNN sobre embeddings semánticos (sentence-transformers), con reentrenamiento. Incluye API REST con JWT, dashboard y presupuestos.',
        image: 'assets/project/finanzas360_arch.svg',
        technologies: ['Python', 'FastAPI', 'EasyOCR', 'scikit-learn', 'sentence-transformers', '.NET 10', 'Dapper', 'SQL Server', 'Angular 20', 'Docker'],
        githubUrl: 'https://github.com/ZeReF2609/OCR',
        category: 'Data'
      },
      {
        id: 7,
        title: 'Clasificación y Clustering — Breast Cancer Wisconsin',
        description: 'Análisis de Machine Learning supervisado y no supervisado: árbol de decisión para predecir tumores benignos/malignos (accuracy, precision, recall, F1 y matriz de confusión) y K-Means con método del codo y PCA para segmentación. Generación automática de la presentación de resultados con Python.',
        image: 'assets/project/ml_breast_cancer.webp',
        technologies: ['Python', 'pandas', 'scikit-learn', 'matplotlib', 'seaborn', 'Jupyter'],
        githubUrl: 'https://github.com/ZeReF2609/ml-breast-cancer-clasificacion',
        category: 'Data'
      },
      {
        id: 13,
        title: 'Redes Neuronales con Keras — 5 casos prácticos',
        description: 'Cinco modelos de deep learning aplicados a problemas reales: diagnóstico de diabetes (MLP), precio de viviendas (regresión), clasificación de prendas Fashion-MNIST (CNN), detección de spam (Embedding) y predicción de ventas con series de tiempo (LSTM).',
        image: 'assets/project/redes_neuronales_arch.svg',
        technologies: ['Python', 'TensorFlow', 'Keras', 'CNN', 'LSTM', 'NLP'],
        githubUrl: 'https://github.com/ZeReF2609/redes-neuronales-keras',
        category: 'Data'
      },
      {
        id: 8,
        title: 'Monitoreo de PLC en tiempo real (Industria 4.0)',
        description: 'Servicio para una planta industrial que lee en tiempo real los PLC de secadoras vía Modbus TCP, decodifica los registros, los persiste en SQL Server y los transmite a clientes web para dashboards operativos. Detección automática de nuevos equipos y despliegue como ejecutable. Proyecto de empresa (código privado).',
        image: 'assets/project/plc_monitoring_arch.svg',
        technologies: ['Python', 'Modbus TCP', 'SQL Server', 'Sockets', 'Multithreading', 'PyInstaller'],
        category: 'Data'
      },
      {
        id: 9,
        title: 'FieldSync — Inspecciones de campo offline-first',
        description: 'App móvil para registrar inspecciones con fotografía sin depender de la conexión. Persistencia local con estados (pendiente, sincronizado, fallido), sincronización automática al recuperar red con reintentos y compresión de imágenes. Arquitectura con Cubit y pruebas unitarias.',
        image: 'assets/project/fieldsync.webp',
        technologies: ['Flutter', 'Dart', 'flutter_bloc', 'Hive', 'Camera', 'Mocktail'],
        githubUrl: 'https://github.com/ZeReF2609/FieldSync',
        category: 'Mobile'
      },
      {
        id: 10,
        title: 'Velocicommerce — E-commerce de alto rendimiento',
        description: 'E-commerce diseñado para alto tráfico: patrón BFF (Composite API) que reduce 10–15 peticiones por página a una sola, caché cache-aside, carrito y rate limiting en Redis, y pruebas de carga con k6. Frontend con SSR.',
        image: 'assets/project/velocicommerce_arch.svg',
        technologies: ['Go', 'Gin', 'Redis', 'MySQL', 'Nuxt 3', 'Vue 3', 'Docker', 'k6'],
        githubUrl: 'https://github.com/ZeReF2609/velocicommerce',
        category: 'Web'
      },
      {
        id: 11,
        title: 'Portal Corporativo (Intranet, RR.HH. y e-commerce)',
        description: 'Aplicación web corporativa desarrollada en equipo: portal del trabajador y boletas, control de visitas, cotizaciones, HelpDesk con notificaciones en tiempo real, tablero Scrum, reportes en Excel/PDF y módulos de e-commerce con IA generativa (Gemini). Autenticación con Active Directory. Proyecto de empresa (código privado).',
        image: 'assets/project/portal_corporativo_arch.svg',
        technologies: ['C#', 'ASP.NET Core MVC', 'SQL Server', 'MySQL', 'Vue.js', 'Gemini AI', 'Active Directory'],
        category: 'Web'
      },
      {
        id: 14,
        title: 'Mi Repositorio Académico — Planificador de horarios',
        description: 'Web app para estudiantes que organiza instituciones, ciclos y cursos; genera el cronograma y la vista semanal automáticamente, detecta choques de horario y guarda notas y archivos por curso. 100 % en el navegador, sin frameworks.',
        image: 'assets/project/horarios.webp',
        technologies: ['JavaScript', 'ES Modules', 'IndexedDB', 'HTML5', 'CSS3'],
        githubUrl: 'https://github.com/ZeReF2609/mi-repositorio-academico',
        category: 'Web'
      },
      {
        id: 1,
        title: 'Zafar E-Commerce',
        description: 'Plataforma de e-commerce moderna para ropa y accesorios. Incluye carrito persistente, sistema de checkout, cuenta de usuario, y panel de administración. Desarrollado con las últimas tecnologías.',
        image: 'assets/project/zafar_ecommerce.webp',
        technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'ShadCN UI', 'Zustand', 'React Hook Form', 'Zod'],
        demoUrl: 'https://zafar-ecommerce-wp5b.vercel.app',
        githubUrl: 'https://github.com/ZeReF2609/zafarEcommerce',
        category: 'Web'
      },
      {
        id: 5,
        title: "expenseIQ V2",
        description: "Plataforma de inteligencia financiera para control de gastos y presupuestos. Reconocimiento automático de comprobantes (OCR) con IA (Gemini), dashboards analíticos en tiempo real, soporte multi-idioma y sistema de diseño 'Crimson' (Dark Mode nativo). Arquitectura serverless.",
        image: "assets/project/expense_iq_v2.webp",
        technologies: ["Next.js", "Firebase", "TypeScript", "Gemini AI", "Tailwind CSS", "Data Connect"],
        githubUrl: "https://github.com/ZeReF2609/expenseIQV2",
        category: "Web"
      },
      {
        id: 4,
        title: "expenseIQ",
        description: "Primera versión de la plataforma de control de gastos y presupuestos con OCR mediante Gemini, dashboards analíticos y arquitectura serverless.",
        image: "assets/project/expense_iq.webp",
        technologies: ["Next.js", "Firebase", "TypeScript", "Gemini AI", "Tailwind CSS", "Data Connect"],
        githubUrl: "https://github.com/ZeReF2609/expenseIQ",
        category: "Web"
      },
      {
        id: 3,
        title: 'Ticket Support App',
        description: 'Sistema multiplataforma para gestión de tickets de soporte técnico (roles, tickets, chat, calendario, dashboard y métricas). Arquitectura modular con Riverpod y SQLite; UI basada en Material 3 y componentes Syncfusion/FL Chart.',
        image: 'assets/project/ticket_support_app.webp',
        technologies: ['Flutter', 'Dart', 'Riverpod', 'SQLite', 'Syncfusion', 'FL Chart', 'Provider'],
        githubUrl: 'https://github.com/ZeReF2609/ticket_support_app',
        category: 'Mobile'
      },
      {
        id: 2,
        title: 'Portfolio Personal',
        description: 'Este portafolio: Angular con componentes standalone, Tailwind, sistema de temas personalizable y datos desacoplados en JSON para actualizar certificaciones sin tocar código.',
        image: 'assets/project/portafolio1.webp',
        technologies: ['Angular', 'TypeScript', 'Tailwind CSS', 'Responsive Design'],
        demoUrl: 'https://wilder-rojas-marin.vercel.app',
        githubUrl: 'https://github.com/ZeReF2609/portfolio',
        category: 'Web'
      }
    ];
  }

  getCertifications(): Certification[] {
    // Fuente única: src/app/data/certifications.json (fechas ISO YYYY-MM-DD). Más reciente primero.
    return [...(certificationsData as Certification[])].sort((a, b) => b.date.localeCompare(a.date));
  }

  getEvents(): Event[] {
    return [
      {
        id: 1,
        title: 'Ethereum Lima Day 2025',
        organization: 'Ethereum Lima',
        location: 'Av. Arequipa 265, Lima, Perú',
        date: 'Mayo 2025',
        description: 'Charlas y workshops sobre Ethereum, Web3, blockchain y AI con ponentes nacionales e internacionales.',
        topics: ['Ethereum', 'Web3', 'Blockchain', 'AI'],
        folder: 'Ethereum2025',
        images: [
          'assets/events/Ethereum2025/1.webp',
          'assets/events/Ethereum2025/2.webp',
          'assets/events/Ethereum2025/3.webp',
          'assets/events/Ethereum2025/4.webp',
          'assets/events/Ethereum2025/5.webp',
          'assets/events/Ethereum2025/6.webp',
          'assets/events/Ethereum2025/7.webp',
          'assets/events/Ethereum2025/8.webp',
        ]
      },
      {
        id: 2,
        title: 'Firebase Day 2025',
        organization: 'GDG Callao',
        location: 'Universidad Peruana de Ciencias Aplicadas',
        date: 'Junio 2025',
        description: 'Conferencias y workshops centrados en Firebase, Cloud, Android, Flutter, Machine Learning y Vertex AI.',
        topics: ['Firebase', 'Cloud', 'Android', 'Flutter', 'ML', 'Vertex AI'],
        folder: 'FireBase2025',
        images: [
          'assets/events/FireBase2025/1.webp',
          'assets/events/FireBase2025/2.webp',
          'assets/events/FireBase2025/3.webp',
          'assets/events/FireBase2025/5.webp',
          'assets/events/FireBase2025/6.webp',
        ]
      },
      {
        id: 7,
        title: 'AI Developer Day: Build with AI',
        organization: 'GDG Callao',
        location: 'UPC San Miguel, Lima',
        date: 'Julio 2025',
        description: 'Jornada de charlas y talleres sobre desarrollo con inteligencia artificial: Machine Learning, TensorFlow, Gemini y Cloud.',
        topics: ['ML', 'TensorFlow', 'Gemini', 'Cloud']
      },
      {
        id: 3,
        title: 'Ng Conf Perú 2025',
        organization: 'GDG Callao',
        location: 'Universidad Tecnológica del Perú',
        date: 'Septiembre 2025',
        description: 'Conferencia internacional enfocada en Angular, mejores prácticas, casos de estudio y tendencias de desarrollo frontend.',
        topics: ['Angular', 'Frontend', 'Best Practices', 'Case Studies'],
        folder: 'NgConf2025',
        images: [
          'assets/events/NgConf2025/1.webp',
          'assets/events/NgConf2025/2.webp',
          'assets/events/NgConf2025/3.webp',
          'assets/events/NgConf2025/4.webp',
          'assets/events/NgConf2025/5.webp',
          'assets/events/NgConf2025/6.webp',
        ]
      },
      {
        id: 4,
        title: 'CodeOn 2025 (1ª edición)',
        organization: 'CodeOn / GDG',
        location: 'Av. Arequipa 265, Lima, Perú',
        date: 'Octubre 2025',
        description: 'Día de charlas, talleres y networking sobre AI, Android, DevOps, Firebase y desarrollo web.',
        topics: ['AI', 'Android', 'DevOps', 'Firebase', 'Web'],
        folder: 'CodeonN12025',
        images: [
          'assets/events/CodeonN12025/1.webp',
          'assets/events/CodeonN12025/2.webp',
          'assets/events/CodeonN12025/3.webp',
          'assets/events/CodeonN12025/4.webp',
          'assets/events/CodeonN12025/5.webp',
          'assets/events/CodeonN12025/6.webp',
          'assets/events/CodeonN12025/7.webp',
        ]
      },
      {
        id: 5,
        title: 'CodeOn 2025 (2ª edición)',
        organization: 'CodeOn / GDG',
        location: 'Av. Arequipa 265, Lima, Perú',
        date: 'Noviembre 2025',
        description: 'Talleres prácticos y sesiones técnicas sobre CI/CD (GitHub Actions), Docker, Kubernetes, Serverless, Firebase, Supabase, Android y Flutter.',
        topics: ['CI/CD', 'Docker', 'Kubernetes', 'Serverless', 'Firebase', 'Supabase', 'Android', 'Flutter', 'Web Performance', 'Observability'],
        folder: 'CodeonN22025',
        images: [
          'assets/events/CodeonN22025/1.webp',
          'assets/events/CodeonN22025/2.webp',
          'assets/events/CodeonN22025/3.webp',
          'assets/events/CodeonN22025/4.webp',
          'assets/events/CodeonN22025/5.webp',
          'assets/events/CodeonN22025/6.webp',
          'assets/events/CodeonN22025/7.webp',
          'assets/events/CodeonN22025/8.webp',
          'assets/events/CodeonN22025/9.webp',
        ]
      },
      {
        id: 6,
        title: 'DevFest Lima 2025',
        organization: 'GDG Lima (Google Developers Group)',
        location: 'UPC Campus Villa, 11 Avenida Alameda San Marcos, Chorrillos, 15067',
        date: 'Noviembre 2025',
        description: 'Conferencia anual de desarrolladores de GDG Lima enfocada en tecnologías emergentes de Google, AI/ML, Cloud, Web, Mobile, Flutter y Android.',
        topics: ['AI/ML', 'Cloud', 'GCP', 'Serverless', 'Web', 'Mobile', 'Flutter', 'Android', 'Security', 'Observability'],
        folder: 'DevFestLima2025',
        images: [
          'assets/events/DevFestLima2025/1.webp',
          'assets/events/DevFestLima2025/2.webp',
          'assets/events/DevFestLima2025/3.webp',
          'assets/events/DevFestLima2025/4.webp',
          'assets/events/DevFestLima2025/5.webp',
          'assets/events/DevFestLima2025/6.webp',
          'assets/events/DevFestLima2025/7.webp',
          'assets/events/DevFestLima2025/8.webp',
          'assets/events/DevFestLima2025/9.webp',
          'assets/events/DevFestLima2025/10.webp',
        ]
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

  // Cifras del resumen calculadas a partir de los datos (no hay que actualizarlas a mano)
  getStats(): { years: number; projects: number; certifications: number; technologies: number } {
    const firstJob = new Date(2024, 7, 1); // Prácticas profesionales, ago 2024
    const years = Math.max(1, Math.floor((Date.now() - firstJob.getTime()) / (365.25 * 24 * 3600 * 1000)));
    const technologies = new Set(this.getSkills().flatMap(c => c.skills.map(s => s.name))).size;
    return {
      years,
      projects: this.getProjects().length,
      certifications: this.getCertifications().length,
      technologies
    };
  }

  getCVUrl(): string {
    return 'assets/cv_wilder_rojas_marin.pdf';
  }

  // Sin porcentajes: las habilidades se agrupan por área, sin autoevaluaciones numéricas.
  getSkills(): SkillCategory[] {
    const group = (name: string, skills: string[]): SkillCategory => ({
      name,
      skills: skills.map(s => ({ name: s, category: name }))
    });
    return [
      group('Data & Analytics', ['Python', 'pandas', 'NumPy', 'scikit-learn', 'matplotlib', 'seaborn', 'Jupyter', 'Machine Learning']),
      group('Bases de Datos & SQL', ['SQL Server', 'SQL avanzado (CTEs, ventanas)', 'MySQL', 'MongoDB']),
      group('Visualización & BI', ['Power BI', 'DAX', 'Modelado de datos', 'Excel avanzado']),
      group('Desarrollo de Software', ['Java', 'C# / .NET', 'TypeScript', 'Angular', 'Flutter / Dart', 'FastAPI']),
      group('DevOps & Herramientas', ['Docker', 'Git', 'GitHub', 'GitLab', 'VS Code', 'Visual Studio']),
      group('Industrial & Metodologías', ['Lectura de PLC', 'Monitoreo eléctrico', 'Automatización', 'Scrum', 'Kanban', 'PMBOK'])
    ];
  }

  getEducation(): Education[] {
    return [
      { institution: 'Universidad Privada del Norte', degree: 'Ingeniería de Sistemas Computacionales', period: 'Mar 2025 – En curso' },
      { institution: 'Instituto Sinergia', degree: 'Ingeniería de Software', period: 'May 2025 – Ene 2026' },
      { institution: 'Instituto Superior Tecnológico Cibertec', degree: 'Computación e Informática', period: 'Oct 2020 – Dic 2024' }
    ];
  }

  getLanguages(): { name: string; level: string }[] {
    return [
      { name: 'Español', level: 'Nativo' },
      { name: 'Inglés', level: 'B1 (Cibertec)' }
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
        id: 4,
        company: 'Manufacturas San Isidro S.A.C.',
        position: 'Analista de Datos Junior',
        startDate: '2026-08',
        description: 'Dashboards interactivos en Power BI conectados a SQL Server, con análisis de valor por minuto y KPIs operativos para decisiones en tiempo real. Modelos de proyección de ventas en Python (pandas, scikit-learn) con pronósticos semanales para la planificación comercial y operativa. Consultas SQL avanzadas (CTEs, funciones de ventana, joins complejos) para reportes de producción. Reportes periódicos de proyección de valor minuto para identificar cuellos de botella. Documentación de pipelines y notebooks en Jupyter para garantizar reproducibilidad.',
        current: true
      },
      {
        id: 1,
        company: 'Manufacturas San Isidro S.A.C.',
        position: 'Desarrollador Full Stack',
        startDate: '2025-02',
        endDate: '2026-07',
        description: 'Sistema de monitoreo de PLC en tiempo real: 35% de mejora en la detección temprana de incidencias industriales. Dashboards y reportes automatizados con Python y Flutter, reduciendo 30% el tiempo de elaboración de reportes productivos. Integración de APIs en C# y Python con lectura de PLC: 80% más eficiencia en captura y análisis de datos. Digitalización del proceso de visitas, reduciendo 40% los tiempos de validación manual.',
        current: false
      },
      {
        id: 2,
        company: 'Manufacturas San Isidro S.A.C.',
        position: 'Prácticas Profesionales',
        startDate: '2024-08',
        endDate: '2025-02',
        description: 'Configuración y administración de bases de datos para aplicaciones web, mejorando 25% la disponibilidad de la información. Medidas de seguridad que redujeron vulnerabilidades en 30%. Buenas prácticas de desarrollo con 20% de mejora en estabilidad y escalabilidad de sistemas internos.',
        current: false
      },
      {
        id: 3,
        company: 'Transporte Guías',
        position: 'Prácticas Pre Profesionales',
        startDate: '2023-09-21',
        endDate: '2023-10-20',
        description: 'Prácticas pre profesionales en Transporte Guías: apoyo en logística y coordinación de rutas, manejo de documentación de transporte y atención a clientes.',
        current: false
      }
    ];
  }
}
