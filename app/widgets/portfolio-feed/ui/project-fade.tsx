import type { RefObject } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

export function ProjectFade({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const visible = useInView(sectionRef);
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.94, 1], [1, 1, 0]);
  return (
    <motion.div
      className="project-bottom-fade"
      aria-hidden="true"
      style={{ opacity: visible ? opacity : 0 }}
    />
  );
}
