import { useEffect, useRef, useState } from "react";

export function useLightbox(initialIndex: number, imageCount: number) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(initialIndex);
  const previous = () =>
    setIndex((value) => (value - 1 + imageCount) % imageCount);
  const next = () => setIndex((value) => (value + 1) % imageCount);
  useEffect(() => {
    dialog.current?.showModal();
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = overflow;
    };
  }, []);
  return { dialog, index, previous, next };
}
