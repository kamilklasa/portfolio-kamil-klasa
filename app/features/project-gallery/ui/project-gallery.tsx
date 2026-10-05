import { useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import {
  ProjectPreview,
  type Project,
  type ProjectImage,
} from "~/entities/project";
import { Lightbox } from "./lightbox";

export function ProjectGallery({
  project,
  children,
}: {
  project: Project;
  children: ReactNode;
}) {
  const [active, setActive] = useState<number | null>(null);
  const images = project.gallery;
  function photograph(image: ProjectImage, index: number, hero = false) {
    return (
      <figure className={hero ? "case-cover" : "case-gallery-item"} key={index}>
        <button
          type="button"
          className="case-image-button"
          onClick={() => setActive(index)}
          aria-label={`Otwórz zdjęcie: ${image.caption}`}
          aria-haspopup="dialog"
        >
          <ProjectPreview
            image={image}
            priority={hero}
            background={project.background}
          />
          <span className="gallery-expand" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
            </svg>
          </span>
        </button>
        {!hero && (
          <figcaption>
            <span>0{index + 1}</span>
            {image.caption}
          </figcaption>
        )}
      </figure>
    );
  }
  return (
    <>
      {photograph(images[0], 0, true)}
      {children}
      {images.length > 1 && (
        <section
          className="case-gallery"
          aria-labelledby={`gallery-${project.slug}`}
        >
          <div className="case-section-heading">
            <div>
              <span className="eyebrow">BLIŻEJ PROJEKTU</span>
              <h2 id={`gallery-${project.slug}`}>Z bliska.</h2>
            </div>
            <span className="case-gallery-count">
              {String(images.length).padStart(2, "0")} ujęcia
            </span>
          </div>
          <div className="case-gallery-grid">
            {images
              .slice(1)
              .map((image, offset) => photograph(image, offset + 1))}
          </div>
        </section>
      )}
      <AnimatePresence>
        {active !== null && (
          <Lightbox
            key="project-lightbox"
            images={images}
            initialIndex={active}
            name={project.name}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
