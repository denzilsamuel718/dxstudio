export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  descriptor: string;
  category: string;
  year: string;
  role: string;
  client?: string;
  featured: boolean;
  accentColor?: string;
  layoutVariant: 'sticky-hero' | 'editorial-split' | 'fullscreen-focus' | 'minimal-stacked';
  overview: string;
  challenge: string;
  solution: string;
  results: string[];
  deliverables: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  galleryImages: string[];
}
