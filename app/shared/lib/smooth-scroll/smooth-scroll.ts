import type Lenis from "lenis";

let activeController: Lenis | null = null;

export function setScrollController(controller: Lenis | null) {
  activeController = controller;
}

export function synchronizeScroll(position = window.scrollY) {
  if (!activeController) {
    window.scrollTo({ top: position, left: 0, behavior: "instant" });
    return;
  }
  activeController.resize();
  activeController.scrollTo(position, { immediate: true, force: true });
}
