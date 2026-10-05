import type { Technology } from "~/shared/config/technology.types";

export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};
export type Project = {
  slug: string;
  name: string;
  category: string;
  year: string;
  format: string;
  overview: string;
  overviewTitle?: string;
  challenge: string;
  solution: string;
  scope: string[];
  technologies: Technology[];
  tagline: string;
  description: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  tags: string[];
  background: string;
  url?: string;
  sourceUrl?: string;
  role?: string;
  gallery: [ProjectImage, ...ProjectImage[]];
};
