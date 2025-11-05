export interface Community {
  id: number;
  name: string;
  role: string;
  url?: string;
  icon?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  url?: string;
  date?: string;
}
