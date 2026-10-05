import { Link } from "~/shared/ui/navigation-link";
import type { Project } from "../model/project.types";
import { ProjectPreview } from "./project-preview";
import { Arrow } from "~/shared/ui/icons";
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="project-card-frame">
      <div className="project-card">
        <Link
          to={`/projekty/${project.slug}`}
          className="project-link"
          aria-label={`Zobacz projekt ${project.name}`}
        >
          <div className="project-visual">
            <ProjectPreview
              image={{
                src: project.image,
                alt: project.alt,
                width: project.width,
                height: project.height,
              }}
              priority={index === 0}
              background={project.background}
            />
            <span className="view-project">
              Zobacz projekt <Arrow diagonal />
            </span>
          </div>
          <div className="project-caption">
            <div>
              <span className="project-number">
                {String(index + 1).padStart(2, "0")}
                {project.year && ` / ${project.year}`}
              </span>
              <h2>{project.name}</h2>
            </div>
            <div className="caption-tags">
              {project.tags.slice(0, 2).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <span className="project-arrow">
              <Arrow diagonal />
            </span>
          </div>
        </Link>
      </div>
    </article>
  );
}
