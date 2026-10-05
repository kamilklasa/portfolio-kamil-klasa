import type { ReactNode } from "react";
import { useFaqItem } from "./faq-item.hooks";
import { motion, useReducedMotion } from "motion/react";

export function FaqItem({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  const { details, enhanced, open, visible, toggle, completeAnimation } =
    useFaqItem();
  const reduced = useReducedMotion();

  return (
    <details
      ref={details}
      className="faq-item"
      open={enhanced ? visible : undefined}
    >
      <summary aria-expanded={enhanced ? open : undefined} onClick={toggle}>
        <span>{question}</span>
        <span className="faq-toggle-icon" aria-hidden="true">
          <span />
          <motion.span
            initial={false}
            animate={{ scaleY: open ? 0 : 1 }}
            transition={{ duration: reduced ? 0 : 0.24 }}
          />
        </span>
      </summary>
      <motion.div
        className="faq-answer"
        initial={false}
        animate={
          enhanced
            ? { height: open ? "auto" : 0, opacity: open ? 1 : 0 }
            : undefined
        }
        transition={{
          height: { duration: reduced ? 0 : 0.4, ease: [0.4, 0, 0.2, 1] },
          opacity: {
            duration: reduced ? 0 : 0.22,
            delay: open && !reduced ? 0.06 : 0,
          },
        }}
        inert={enhanced && !open}
        onAnimationComplete={completeAnimation}
      >
        <div className="faq-answer-content">{children}</div>
      </motion.div>
    </details>
  );
}
