import { motion, useScroll } from "motion/react";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="reading-progress"
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
