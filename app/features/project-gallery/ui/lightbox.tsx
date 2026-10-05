import { motion, useReducedMotion } from "motion/react";
import type { ProjectImage } from "~/entities/project";
import { Arrow } from "~/shared/ui/icons";
import { useLightbox } from "../model/project-gallery.hooks";

export function Lightbox({
  images,
  initialIndex,
  name,
  onClose,
}: {
  images: ProjectImage[];
  initialIndex: number;
  name: string;
  onClose: () => void;
}) {
  const { dialog, index, previous, next } = useLightbox(
    initialIndex,
    images.length,
  );
  const reduced = useReducedMotion();
  const image = images[index];
  return (
    <motion.dialog
      ref={dialog}
      className="gallery-lightbox"
      aria-labelledby="gallery-dialog-title"
      data-lenis-prevent
      variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: reduced ? 0 : 0.18 }}
      onAnimationComplete={(variant) => {
        if (variant === "hidden") dialog.current?.close();
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          previous();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          next();
        }
      }}
    >
      <header className="gallery-lightbox-header">
        <span id="gallery-dialog-title">
          {name} <span>/ Galeria projektu</span>
        </span>
        <button
          className="gallery-round-button"
          type="button"
          autoFocus
          onClick={onClose}
          aria-label="Zamknij galerię"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </header>
      <div className="gallery-lightbox-image">
        <motion.img
          key={index}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          initial={{ opacity: reduced ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.16 }}
        />
      </div>
      <footer className="gallery-lightbox-footer">
        <div aria-live="polite" aria-atomic="true">
          <span className="gallery-counter">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>
          <p>{image.caption}</p>
        </div>
        <div className="gallery-navigation">
          <button
            className="gallery-round-button gallery-previous"
            type="button"
            aria-label="Poprzednie zdjęcie"
            onClick={previous}
          >
            <Arrow />
          </button>
          <button
            className="gallery-round-button"
            type="button"
            aria-label="Następne zdjęcie"
            onClick={next}
          >
            <Arrow />
          </button>
        </div>
      </footer>
    </motion.dialog>
  );
}
