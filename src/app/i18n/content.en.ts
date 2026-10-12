// English overrides for content returned by DataService (merged when lang === 'en').
// Keyed by id; proper nouns, company names and technology names stay as-is.

export const USER_EN = {
  profession: 'Junior Data Analyst · Data Scientist',
  description: 'Data Scientist with hands-on experience in data analysis, predictive modeling and data visualization to support business decisions. I work with Python (pandas, scikit-learn, matplotlib), SQL Server, Jupyter and Power BI to build data pipelines, forecasts and dashboards. My software engineering background lets me integrate data with real-world systems using Docker and Git.',
  location: 'Lima, Peru'
};

export const CONTACT_LOCATION_EN = 'Peru';

export const PROJECTS_EN: Record<number, {
  title: string;
  description: string;
  caseStudy?: { problem: string; data: string; analysis: string; result: string };
}> = {
  12: {
    title: 'Titanic — Survival Dashboard in Power BI',
    description: 'Power BI dashboard covering 891 Titanic passengers: KPIs and survival rate by class, sex, age group and port of embarkation. Semantic model with DAX measures and calculated columns, Power Query for data loading and PBIP format versioned in Git. Key insight: women survived at 4 times the rate of men (74 % vs 19 %).',
    caseStudy: {
      problem: 'Which factors explain who survived the Titanic sinking?',
      data: 'Kaggle training set: 891 passengers and 12 variables, in a CSV whose passenger names contain commas.',
      analysis: 'Power Query load (CSV QuoteStyle, en-US types), calculated columns (age group, class, port), DAX measures (survival rate) and visuals by class, sex, age and port.',
      result: '38.4 % survived; women 74.2 % vs men 18.9 %; 1st class 63.0 % vs 3rd class 24.2 %; children aged 0–12 58.0 %.'
    }
  },
  6: {
    title: 'Finanzas360 — Expense Tracking with OCR and Machine Learning',
    description: 'Personal finance system that records expenses from a photo or PDF of a receipt/invoice. An AI microservice extracts the issuer, tax ID (RUC), date, total and line items (EasyOCR + OpenCV) and classifies each product into a spending category using KNN over semantic embeddings (sentence-transformers), with retraining. Includes a JWT-secured REST API, dashboard and budgets.',
    caseStudy: {
      problem: 'Recording expenses by hand is slow and error-prone.',
      data: 'Photos/PDFs of Peruvian receipts and invoices (tax ID/RUC, issuer, total, line items).',
      analysis: 'EasyOCR + OpenCV extract the fields; line items are classified with KNN (k=5) over multilingual embeddings (paraphrase-multilingual-MiniLM-L12-v2) using cosine similarity, retrainable through an endpoint.',
      result: 'The user uploads a receipt and gets a categorized expense ready for the dashboard and budgets.'
    }
  },
  7: {
    title: 'Classification and Clustering — Breast Cancer Wisconsin',
    description: 'Supervised and unsupervised Machine Learning analysis: a decision tree to predict benign/malignant tumors (accuracy, precision, recall, F1 and confusion matrix) and K-Means with the elbow method and PCA for segmentation. The results presentation is generated automatically with Python.',
    caseStudy: {
      problem: 'Support the detection of malignant tumors.',
      data: 'Breast Cancer Wisconsin dataset: 569 samples, 30 variables.',
      analysis: 'EDA and a decision tree classifier; K-Means with the elbow method and PCA for segmentation.',
      result: '158 of 171 test cases correctly classified (≈92 %); clusters consistent with the diagnosis.'
    }
  },
  13: {
    title: 'Neural Networks with Keras — 5 Hands-on Case Studies',
    description: 'Five deep learning models applied to real-world problems: diabetes diagnosis (MLP), house price prediction (regression), Fashion-MNIST clothing classification (CNN), spam detection (Embedding) and time-series sales forecasting (LSTM).'
  },
  8: {
    title: 'Real-time PLC Monitoring (Industry 4.0)',
    description: 'Service for an industrial plant that reads dryer PLCs in real time via Modbus TCP, decodes the registers, persists them in SQL Server and streams them to web clients for operational dashboards. Automatic detection of new equipment and deployment as a standalone executable. Company project (private code).',
    caseStudy: {
      problem: 'Readings from the industrial dryers were not centralized.',
      data: 'Modbus TCP registers from several PLCs (real-time values, processes, maintenance, steps).',
      analysis: 'Multithreaded Python service that decodes the registers, stores them in SQL Server and streams them over sockets.',
      result: '35 % improvement in early incident detection; data available for operational dashboards.'
    }
  },
  9: {
    title: 'FieldSync — Offline-first Field Inspections',
    description: 'Mobile app for recording photo-based inspections without relying on connectivity. Local persistence with statuses (pending, synced, failed), automatic sync with retries once the connection is restored, and image compression. Cubit-based architecture with unit tests.'
  },
  10: {
    title: 'Velocicommerce — High-performance E-commerce',
    description: 'E-commerce built for high traffic: a BFF (Composite API) pattern that reduces 10–15 requests per page to a single one, cache-aside caching, Redis-backed cart and rate limiting, and load testing with k6. SSR frontend.'
  },
  11: {
    title: 'Corporate Portal (Intranet, HR and E-commerce)',
    description: 'Corporate web application built as part of a team: employee portal and payslips, visitor management, quotes, HelpDesk with real-time notifications, Scrum board, Excel/PDF reports and e-commerce modules with generative AI (Gemini). Active Directory authentication. Company project (private code).'
  },
  14: {
    title: 'Mi Repositorio Académico — Class Schedule Planner',
    description: 'Web app for students that organizes institutions, terms and courses; it automatically builds the schedule and weekly view, detects time conflicts and stores notes and files per course. Runs 100 % in the browser, no frameworks.'
  },
  1: {
    title: 'Zafar E-Commerce',
    description: 'Modern e-commerce platform for clothing and accessories. Includes a persistent cart, checkout flow, user accounts and an admin panel. Built with the latest technologies.'
  },
  5: {
    title: 'expenseIQ V2',
    description: "Financial intelligence platform for expense and budget tracking. Automatic receipt recognition (OCR) with AI (Gemini), real-time analytics dashboards, multi-language support and the 'Crimson' design system (native Dark Mode). Serverless architecture."
  },
  4: {
    title: 'expenseIQ',
    description: 'First version of the expense and budget tracking platform, with Gemini-powered OCR, analytics dashboards and a serverless architecture.'
  },
  3: {
    title: 'Ticket Support App',
    description: 'Cross-platform system for managing technical support tickets (roles, tickets, chat, calendar, dashboard and metrics). Modular architecture with Riverpod and SQLite; UI based on Material 3 and Syncfusion/FL Chart components.'
  },
  2: {
    title: 'Personal Portfolio',
    description: 'This portfolio: Angular with standalone components, Tailwind, a customizable theme system and data decoupled into JSON so certifications can be updated without touching code.'
  }
};

export const EXPERIENCE_EN: Record<number, { position: string; description: string }> = {
  4: {
    position: 'Junior Data Analyst',
    description: 'Interactive Power BI dashboards connected to SQL Server, with value-per-minute analysis and operational KPIs for real-time decision-making. Sales forecasting models in Python (pandas, scikit-learn) with weekly forecasts for commercial and operational planning. Advanced SQL queries (CTEs, window functions, complex joins) for production reporting. Periodic value-per-minute projection reports to identify bottlenecks. Documentation of pipelines and Jupyter notebooks to ensure reproducibility.'
  },
  1: {
    position: 'Full Stack Developer',
    description: 'Real-time PLC monitoring system: 35% improvement in early detection of industrial incidents. Automated dashboards and reports with Python and Flutter, cutting production report preparation time by 30%. API integration in C# and Python with PLC data acquisition: 80% more efficiency in data capture and analysis. Digitalization of the visitor process, reducing manual validation times by 40%.'
  },
  2: {
    position: 'Professional Internship',
    description: 'Configured and administered databases for web applications, improving data availability by 25%. Implemented security measures that reduced vulnerabilities by 30%. Applied development best practices, achieving a 20% improvement in the stability and scalability of internal systems.'
  },
  3: {
    position: 'Pre-professional Internship',
    description: 'Pre-professional internship at Transporte Guías: supported logistics and route coordination, handled transport documentation and provided customer service.'
  }
};

export const SKILL_CATEGORIES_EN: Record<string, string> = {
  'Data & Analytics': 'Data & Analytics',
  'Bases de Datos & SQL': 'Databases & SQL',
  'Visualización & BI': 'Visualization & BI',
  'Desarrollo de Software': 'Software Development',
  'DevOps & Herramientas': 'DevOps & Tools',
  'Industrial & Metodologías': 'Industrial & Methodologies'
};

export const SKILLS_EN: Record<string, string> = {
  'SQL avanzado (CTEs, ventanas)': 'Advanced SQL (CTEs, window functions)',
  'Modelado de datos': 'Data modeling',
  'Excel avanzado': 'Advanced Excel',
  'Lectura de PLC': 'PLC data acquisition',
  'Monitoreo eléctrico': 'Electrical monitoring',
  'Automatización': 'Automation'
};

// Keyed by institution name
export const EDUCATION_EN: Record<string, { degree: string; period: string }> = {
  'Universidad Privada del Norte': { degree: 'Computer Systems Engineering', period: 'Mar 2025 – Present' },
  'Instituto Sinergia': { degree: 'Software Engineering', period: 'May 2025 – Jan 2026' },
  'Instituto Superior Tecnológico Cibertec': { degree: 'Computing and Information Technology', period: 'Oct 2020 – Dec 2024' }
};

export const LANGUAGES_EN: { name: string; level: string }[] = [
  { name: 'Spanish', level: 'Native' },
  { name: 'English', level: 'B1 (Cibertec)' }
];

export const EVENTS_EN: Record<number, { date: string; description: string; title?: string }> = {
  1: {
    date: 'May 2025',
    description: 'Talks and workshops on Ethereum, Web3, blockchain and AI with national and international speakers.'
  },
  2: {
    date: 'June 2025',
    description: 'Talks and workshops focused on Firebase, Cloud, Android, Flutter, Machine Learning and Vertex AI.'
  },
  7: {
    date: 'July 2025',
    description: 'A day of talks and workshops on building with artificial intelligence: Machine Learning, TensorFlow, Gemini and Cloud.'
  },
  3: {
    date: 'September 2025',
    description: 'International conference focused on Angular, best practices, case studies and frontend development trends.'
  },
  4: {
    date: 'October 2025',
    title: 'CodeOn 2025 (1st edition)',
    description: 'A day of talks, workshops and networking on AI, Android, DevOps, Firebase and web development.'
  },
  5: {
    date: 'November 2025',
    title: 'CodeOn 2025 (2nd edition)',
    description: 'Hands-on workshops and technical sessions on CI/CD (GitHub Actions), Docker, Kubernetes, Serverless, Firebase, Supabase, Android and Flutter.'
  },
  6: {
    date: 'November 2025',
    description: "GDG Lima's annual developer conference focused on emerging Google technologies, AI/ML, Cloud, Web, Mobile, Flutter and Android."
  }
};

export const COMMUNITY_ROLES_EN: Record<number, string> = {
  1: 'Active Member',
  2: 'Student',
  3: 'Contributor',
  4: 'Open Source Contributor'
};

// Certification titles stay as-is; only descriptions are translated.
export const CERTIFICATIONS_EN: Record<number, string> = {
  1: 'Python programming fundamentals',
  2: 'Basic concepts of the Internet of Things (IoT)',
  3: 'Backend development with Node.js and Express',
  4: 'Mobile app development with Flutter',
  5: 'Version control with Git and GitHub',
  6: 'AI-assisted programming',
  7: 'Project management methodology',
  8: 'Python from beginner to advanced',
  9: 'Conference on engineering trends',
  10: 'Certificate of participation in an academic program',
  11: 'Certificate of completion of studies at Cibertec',
  12: 'Certificate of completion of academic modules',
  13: "Diploma awarded for completing MiBanco's MiConsultor program, in partnership with Universidad Privada del Norte. Signed by MiBanco's Sustainability and Financial Inclusion Management and the Dean of UPN's School of Business.",
  14: "Badge awarded for completing AWS Academy's Cloud Operations program. Covers cloud operations, infrastructure management, deployment, monitoring and AWS best practices.",
  15: 'Introductory course on artificial intelligence using Python. Covers core concepts, algorithms and practical AI applications.',
  16: 'Fundamentals of modern artificial intelligence: generative models, machine learning and responsible use of AI.'
};
