import { useEffect } from "react";
import { useLocation } from "react-router";
import { cancelFrame, frame } from "motion/react";
import Lenis from "lenis";
import { setScrollController, synchronizeScroll } from "./smooth-scroll";

export function useSmoothScroll() {
  const { key } = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.075,
      smoothWheel: true,
      syncTouch: false,
      anchors: {
        duration: 1.2,
        easing: (t) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      },
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
    });
    setScrollController(lenis);
    const update = ({ timestamp }: { timestamp: number }) =>
      lenis.raf(timestamp);
    frame.update(update, true);
    return () => {
      cancelFrame(update);
      lenis.destroy();
      setScrollController(null);
    };
  }, []);

  useEffect(() => {
    synchronizeScroll();
  }, [key]);
}
