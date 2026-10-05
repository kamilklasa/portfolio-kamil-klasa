import { useEffect, type RefObject } from "react";
import { board } from "./breakout";

export function useArcadeLayout(layer: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const element = layer.current;
    const host = element?.closest<HTMLElement>(".left-column");
    const actions = host?.querySelector<HTMLElement>(".hero-actions");
    const copy = host?.querySelector<HTMLElement>(".hero-copy");
    if (!element || !host || !actions || !copy) return;
    let mounted = true;
    function place() {
      const box = host!.getBoundingClientRect();
      const contentBottom = actions!.getBoundingClientRect().bottom;
      const pills = Array.from(
        host!.querySelectorAll<HTMLElement>(".skills>span"),
      );
      const pillsRight = Math.max(
        box.left,
        ...pills.map((pill) => pill.getBoundingClientRect().right),
      );
      const firstPill = pills[0]?.getBoundingClientRect();
      const toggleBottom = firstPill
        ? box.bottom - firstPill.top - firstPill.height / 2 - 17
        : 17;
      host!.style.setProperty("--arcade-toggle-bottom", `${toggleBottom}px`);
      const bottom = window.matchMedia("(max-width:700px)").matches
        ? 24
        : toggleBottom + 44;
      const height = Math.max(0, box.bottom - bottom - contentBottom - 24);
      const width = Math.max(
        0,
        Math.min(
          box.width * 0.72,
          (height * board.width) / board.height,
          box.right - pillsRight - 20,
        ),
      );
      element!.style.width = `${Math.floor(width)}px`;
      element!.style.height = `${Math.floor((width * board.height) / board.width)}px`;
      host!.dataset.arcadeVisible = String(width >= 110);
    }
    place();
    const observer = new ResizeObserver(place);
    observer.observe(host);
    observer.observe(copy);
    const skills = host.querySelector<HTMLElement>(".skills");
    if (skills) observer.observe(skills);
    document.fonts.ready.then(() => {
      if (mounted) place();
    });
    return () => {
      mounted = false;
      observer.disconnect();
      delete host.dataset.arcadeVisible;
      host.style.removeProperty("--arcade-toggle-bottom");
    };
  }, []);
}
