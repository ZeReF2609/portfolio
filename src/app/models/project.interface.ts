export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string; // sin imagen se muestra una portada generada
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  category: string;
  caseStudy?: ProjectCaseStudy; // Problema → Datos → Análisis → Resultado
}

export interface ProjectCaseStudy {
  problem: string;
  data: string;
  analysis: string;
  result: string;
}
