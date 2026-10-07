
export interface Project {
  id: string;
  title: string;
  year: string;
  tech: string[];
  description: string;
  content: string; // Markdown content for detail view
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

export interface ZenPost {
  id: string;
  title: string;
  date: string;
  tag: string;
  description: string;
  content: string;
}

export interface Work {
  id: string;
  title: string;
  year: string;
  kind: string;
  tagline: string;
  cover?: string;
  url?: string;
  github?: string;
  content: string;
}

export type Tab = 'HOME' | 'WORK' | 'ACADEMIC' | 'CV' | 'ZEN';
export type Article = Work | Project | Publication | ZenPost;
