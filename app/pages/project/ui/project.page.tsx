import { ButtonLink } from "~/shared/ui/button-link";
import { Link } from "~/shared/ui/navigation-link";
import type { Route } from "./+types/project.page";
import { getProjectDetails } from "~/entities/project";
import { seo } from "~/shared/lib/seo";
import { Arrow } from "~/shared/ui/icons";
import { TechnologyBadges } from "~/shared/ui/technology-badges";
import { ProjectGallery } from "~/features/project-gallery";
function loadProject(slug: string) {
  const details = getProjectDetails(slug);
  if (!details) throw new Response("Nie znaleziono projektu", { status: 404 });
  return details;
}

export function loader({ params }: Route.LoaderArgs) {
  return loadProject(params.slug);
}

export function clientLoader({ params }: Route.ClientLoaderArgs) {
  return loadProject(params.slug);
}

export function meta({ data }: Route.MetaArgs) {
  if (!data)
    return [
      { title: "Nie znaleziono projektu — Kamil Klasa" },
      { name: "robots", content: "noindex" },
    ];
  return seo(
    `${data.project.name} — Kamil Klasa`,
    data.project.description,
    `/projekty/${data.project.slug}`,
    data.project.image,
  );
}
export default function Project({
  loaderData: { project, next, gaming },
}: Route.ComponentProps) {
  return (
    <article className="project-page case-study">
      <header className="case-header page-panel">
        <div className="case-header-top">
          <Link
            to={gaming ? "/gaming#projekty" : "/#projekty"}
            className="case-back"
          >
            <span>Wszystkie projekty</span>
            <span className="case-back-icon">
              <Arrow />
            </span>
          </Link>
          <span className="eyebrow">{project.category}</span>
        </div>
        <h1>{project.name}</h1>
        <p className="case-tagline">{project.tagline}</p>
        <dl className="case-facts" data-no-year={!project.year || undefined}>
          {project.year && (
            <div>
              <dt>Rok</dt>
              <dd>{project.year}</dd>
            </div>
          )}
          <div>
            <dt>Format</dt>
            <dd>{project.format}</dd>
          </div>
          <div>
            <dt>Zakres</dt>
            <dd>{project.role ?? "Design + development"}</dd>
          </div>
        </dl>
        {(project.url || project.sourceUrl) && (
          <div className="case-actions">
            {project.url && (
              <ButtonLink href={project.url} target="_blank" arrow>
                Otwórz stronę
              </ButtonLink>
            )}
            {project.sourceUrl && (
              <ButtonLink
                href={project.sourceUrl}
                target="_blank"
                variant="light"
                arrow
              >
                Kod na GitHubie
              </ButtonLink>
            )}
          </div>
        )}
      </header>
      <ProjectGallery key={project.slug} project={project}>
        <section className="case-overview">
          <span className="eyebrow">O PROJEKCIE</span>
          <h2>
            {project.overviewTitle ?? "Prosta forma. Wyrazisty charakter."}
          </h2>
          <p className="case-introduction">{project.overview}</p>
          <div className="case-story-grid">
            <div>
              <h3>Wyzwanie</h3>
              <p>{project.challenge}</p>
            </div>
            <div>
              <h3>Rozwiązanie</h3>
              <p>{project.solution}</p>
            </div>
          </div>
          <div className="case-scope">
            <h3>Zakres prac</h3>
            <ul>
              {project.scope.map((item, index) => (
                <li key={item}>
                  <span aria-hidden="true">0{index + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {project.technologies.length > 0 && (
            <div className="case-technologies">
              <h3>Technologie i narzędzia</h3>
              <TechnologyBadges technologies={project.technologies} />
            </div>
          )}
        </section>
      </ProjectGallery>
      <Link className="case-next" to={`/projekty/${next.slug}`}>
        <div>
          <span className="eyebrow">NASTĘPNY PROJEKT</span>
          <h2>{next.name}</h2>
        </div>
        <span className="project-arrow">
          <Arrow diagonal />
        </span>
      </Link>
    </article>
  );
}
