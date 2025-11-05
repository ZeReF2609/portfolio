export interface Certification {
  id: number;
  title: string;
  organization: string;
  date: string;
  description?: string;
  icon?: string;
}

export interface Event {
  id: number;
  title: string;
  organization: string;
  location: string;
  date: string;
  description: string;
  topics?: string[];
}
