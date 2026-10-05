import { useRef } from "react";
import { useNavigate, type NavigateOptions, type To } from "react-router";
import { useAnimate, useReducedMotion } from "motion/react";
import { isGamingPath } from "~/entities/project";
import { synchronizeScroll } from "~/shared/lib/smooth-scroll";

export function useNavigationTransition() {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const running = useRef(false);

  async function navigatePage(to: To, options: NavigateOptions = {}) {
    if (running.current) return;
    running.current = true;
    synchronizeScroll();
    const destination =
      typeof to === "string"
        ? new URL(to, window.location.href).pathname
        : (to.pathname ?? window.location.pathname);
    const themeChanges =
      isGamingPath(destination) !== isGamingPath(window.location.pathname);
    const targets =
      !themeChanges && window.matchMedia("(max-width:700px)").matches
        ? ".route-content, .footer, .left-column"
        : ".route-content, .footer";
    try {
      scope.current.dataset.pageTransition = "leaving";
      await animate(
        targets,
        { opacity: 0 },
        {
          duration: reduced || themeChanges ? 0 : 0.2,
          ease: [0.42, 0, 0.58, 1],
        },
      );
      await navigate(to, {
        ...options,
        viewTransition: false,
        flushSync: true,
      });
      // Router przywraca scroll, a przeglądarka aktualizuje rozmiar nowej strony.
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );
      const projectEntry =
        /^\/projekty\/[^/]+\/?$/.test(window.location.pathname) &&
        !window.location.hash;
      synchronizeScroll(projectEntry ? 0 : window.scrollY);
      scope.current.dataset.pageTransition = "entering";
      await animate(
        targets,
        { opacity: 1 },
        { duration: reduced ? 0 : 0.4, ease: [0.42, 0, 0.58, 1] },
      );
    } finally {
      scope.current
        ?.querySelectorAll<HTMLElement>(".route-content, .footer, .left-column")
        .forEach((element) => element.style.removeProperty("opacity"));
      if (scope.current) scope.current.dataset.pageTransition = "idle";
      running.current = false;
    }
  }

  return { scope, navigatePage };
}
