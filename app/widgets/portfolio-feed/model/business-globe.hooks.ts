import { useEffect, useRef } from "react";
import type { Globe } from "cobe";

export function useBusinessGlobe() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = canvas.current;
    const host = element?.parentElement;
    if (!element || !host) return;
    let globe: Globe | undefined,
      disposed = false,
      loading = false,
      visible = false;
    let frame = 0,
      previous = 0,
      phi = 2.8;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
    }
    function tick(now: number) {
      const elapsed = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
      previous = now;
      phi += elapsed * 0.15;
      globe?.update({ phi });
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      if (globe && visible && !document.hidden && !reduced.matches) {
        if (!frame) frame = requestAnimationFrame(tick);
      } else stop();
    }
    function resize() {
      const width = host!.getBoundingClientRect().width;
      globe?.update({ width, height: width });
    }
    async function init() {
      if (globe || loading || disposed) return;
      loading = true;
      try {
        const { default: createGlobe } = await import("cobe");
        if (disposed) return;
        const width = host!.getBoundingClientRect().width;
        globe = createGlobe(element!, {
          width,
          height: width,
          devicePixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
          phi,
          theta: 0.25,
          dark: 1,
          diffuse: 0.8,
          scale: 1,
          mapSamples: 14000,
          mapBrightness: 4,
          mapBaseBrightness: 0,
          baseColor: [1, 1, 1],
          markerColor: [0.2, 0.2, 0.2],
          glowColor: [0, 0, 0],
          markers: [],
          opacity: 1,
          context: { alpha: true, antialias: true },
        });
        if (element!.getContext("webgl2") || element!.getContext("webgl"))
          host!.dataset.ready = "true";
        sync();
      } catch {
        /* Dekoracja SVG pozostaje widoczna, gdy WebGL jest niedostępne. */
      } finally {
        loading = false;
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) void init();
      sync();
    });
    observer.observe(host);
    const sizing = new ResizeObserver(resize);
    sizing.observe(host);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      sizing.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      globe?.destroy();
      delete host.dataset.ready;
    };
  }, []);
  return canvas;
}
