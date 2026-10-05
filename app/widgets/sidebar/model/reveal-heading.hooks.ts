import { useEffect, useRef, useState } from "react";

export function useRevealHeading(heading: "h1" | "h2") {
  const [finished, setFinished] = useState(false);
  const initialHeading = useRef(heading);
  useEffect(() => {
    if (heading !== initialHeading.current) setFinished(true);
  }, [heading]);
  return {
    revealed: finished || heading !== initialHeading.current,
    finish: () => setFinished(true),
  };
}
