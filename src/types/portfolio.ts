export interface HeroData {
  firstName: string;
  lastName: string;
  titles: string[];
  bio: string;
  cvLink: string;
  twitterUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export interface CourseItem {
  id: string;
  name: string;
  provider: string;
}

export interface AboutData {
  heading: string;
  highlightedText: string;
  bio: string;
  skills: SkillCategory[];
  experiences: ExperienceItem[];
  educations: EducationItem[];
  courses: CourseItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  gradient?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  emoji: string;
  liveLink: string;
  githubLink: string;
  gradient?: string;
}

export interface FooterData {
  tagline: string;
  email: string;
  location: string;
  twitterUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  copyrightText: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  date?: string;
  link?: string;
  linkText?: string;
  tags?: string[];
  icon?: string;
}

export interface CustomSection {
  id: string;
  slug: string;
  title: string;
  highlightWord?: string;
  description?: string;
  layout?: "grid" | "cards" | "list";
  items: CustomSectionItem[];
  visible: boolean;
}

export interface SectionVisibility {
  hero: boolean;
  about: boolean;
  services: boolean;
  projects: boolean;
  footer: boolean;
}

export type ThemePresetKey = "teal" | "emerald" | "violet" | "blue" | "rose" | "amber" | "cyan";

export interface ThemeConfig {
  preset: ThemePresetKey;
  mode?: "dark" | "light" | "system";
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  services: ServiceItem[];
  projects: ProjectItem[];
  footer: FooterData;
  customSections: CustomSection[];
  visibility: SectionVisibility;
  theme: ThemeConfig;
}
