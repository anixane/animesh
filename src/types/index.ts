// Interface for Patent data
export interface Patent {
  id: string;
  title: string;
  number: string;
  description: string;
  status: string;
  filingDate: string;
  inventors: string[];
  abstract: string;
  benefits: string[];
  productIntegration?: {
    name: string;
    logo: string;
    description: string;
  };
  relatedDocuments?: {
    title: string;
    url: string;
  }[];
}

// Interface for related documents within patents
export interface RelatedDocument {
  title: string;
  url: string;
}

// Interface for role progression within experiences
export interface RoleProgression {
  title: string;
  period: string;
  achievements: string[];
}

// Interface for experience data
export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  logo: string;
  longDescription: string;
  location: string;
  teamSize: string;
  techStack: string[];
  achievements: string[];
  roleProgression?: RoleProgression[];
}

// Interface for project data
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  role: string;
  duration: string;
  impact: string;
  image: string;
  company: string;
}

// Component Props interfaces
export interface PatentCardProps {
  title: string;
  number: string;
  description: string;
  status: string;
}

export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  company?: string;
  duration?: string;
  technologies?: string[];
}

export interface AchievementCardProps {
  icon: React.ReactNode;
  title: string;
  year: string;
}

export interface TypewriterTextProps {
  text: string;
}

export interface GithubRepo {
  id: string;
  name: string;
  description: string;
  language: string;
  languageColor?: string | null;
  stars: number;
  forks: number;
  size: number;
  url: string;
} 