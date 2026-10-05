import { useRef } from "react";
import { ProjectFade } from "./project-fade";
import { GamingTeaser } from "./gaming-teaser";
import { ProjectCard } from "~/entities/project";
import { Arrow } from "~/shared/ui/icons";
import { profile } from "~/shared/config/profile";
import type { Project } from "~/entities/project";

export function PortfolioFeed({
  gaming = false,
  items,
}: {
  gaming?: boolean;
  items: Project[];
}) {
  const projectsRef = useRef<HTMLElement>(null);
  return (
    <>
      <section
        ref={projectsRef}
        id="projekty"
        className="projects-column"
        aria-label="Wybrane projekty"
      >
        {items.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
        <GamingTeaser business={gaming} />
        <section className="project-contact">
          <h2>Masz projekt na myśli?</h2>
          <a className="project-contact-email" href={`mailto:${profile.email}`}>
            <span>{profile.email}</span>
            <Arrow diagonal />
          </a>
        </section>
      </section>
      <ProjectFade sectionRef={projectsRef} />
    </>
  );
}
