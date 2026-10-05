import { useEffect, useRef, type MouseEvent } from "react";
import { usePageNavigate } from "~/shared/lib/navigation/navigation.hooks";

export function useMobileMenu(open: boolean, onClose: () => void) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pendingRoute = useRef<string | null>(null);
  const savedOverflow = useRef<string | null>(null);
  const navigate = usePageNavigate();

  useEffect(() => {
    if (!open || !dialog.current) return;
    dialog.current.showModal();
    if (savedOverflow.current === null)
      savedOverflow.current = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
  }, [open]);

  function unlockScroll() {
    if (savedOverflow.current === null) return;
    document.documentElement.style.overflow = savedOverflow.current;
    savedOverflow.current = null;
  }
  useEffect(() => () => unlockScroll(), []);

  function selectRoute(event: MouseEvent<HTMLAnchorElement>, to: string) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    event.stopPropagation();
    pendingRoute.current = to;
    onClose();
  }

  function completeClose() {
    unlockScroll();
    const to = pendingRoute.current;
    pendingRoute.current = null;
    if (to) navigate(to);
  }

  return { dialog, selectRoute, completeClose };
}
