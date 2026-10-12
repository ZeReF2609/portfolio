export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string; // sin imagen se muestra una portada generada
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  category: string;
}
