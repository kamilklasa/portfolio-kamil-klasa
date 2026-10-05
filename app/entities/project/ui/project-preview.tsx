import type { ProjectImage } from "../model/project.types";

type Props = {
  image: Pick<ProjectImage, "src" | "alt" | "width" | "height">;
  priority?: boolean;
  background?: string;
};

export function ProjectPreview({ image, priority = false, background }: Props) {
  return (
    <span className="project-preview" style={{ backgroundColor: background }}>
      <span className="project-preview-frame">
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      </span>
    </span>
  );
}
