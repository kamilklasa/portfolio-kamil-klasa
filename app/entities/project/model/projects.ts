import { projects } from "./business-projects";
import { gamingProjects } from "./gaming-projects";

export { projects, gamingProjects };

export const allProjects = [...projects, ...gamingProjects];

export function isGamingPath(pathname: string): boolean {
  return (
    /^\/gaming(?:\/|$)/.test(pathname) ||
    gamingProjects.some(
      (project) => pathname.replace(/\/$/, "") === `/projekty/${project.slug}`,
    )
  );
}

export function getProjectDetails(slug: string) {
  const project = allProjects.find((project) => project.slug === slug);
  if (!project) return null;
  const gaming = gamingProjects.includes(project);
  const collection = gaming ? gamingProjects : projects;
  const next =
    collection[(collection.indexOf(project) + 1) % collection.length];
  return { project, gaming, next };
}
