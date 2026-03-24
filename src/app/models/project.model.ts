export interface Project {
  id: number;
  order: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  tags: string[];
  githubUrl: string;
  featured?: boolean;
  accent?: 'warm' | 'cool';
}
