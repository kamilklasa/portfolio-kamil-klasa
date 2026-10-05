import { useEffect, useRef, useState, type MouseEvent } from "react";

export function useFaqItem() {
  const details = useRef<HTMLDetailsElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const initiallyOpen = details.current?.open ?? false;
    setOpen(initiallyOpen);
    setVisible(initiallyOpen);
    setEnhanced(true);
  }, []);

  function toggle(event: MouseEvent<HTMLElement>) {
    if (!enhanced) return;
    event.preventDefault();
    if (!open) setVisible(true);
    setOpen(!open);
  }

  return {
    details,
    enhanced,
    open,
    visible,
    toggle,
    completeAnimation: () => {
      if (!open) setVisible(false);
    },
  };
}
