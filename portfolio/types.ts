
export interface NewsItem {
  date: string;
  content: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  tech: string[];
  description: string;
  content: string; // Markdown content for detail view
  details?: string;
  links: {
    github?: string;
    pdf?: string;
    demo?: string;
  };
  figure?: {
    id: string;
    label: string;
    src: string;
  };
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
  doi?: string;
  status: 'Published' | 'Preprint' | 'In Preparation';
  content: string; // Markdown content for detail view
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface ZenPost {
  id: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

export type Tab = 'HOME' | 'CV' | 'PROJECTS' | 'PUBLICATIONS' | 'ZEN';
export type Article = Project | Publication | ZenPost;
