import { useBusinessGlobe } from "../model/business-globe.hooks";

export function BusinessGlobe() {
  const canvas = useBusinessGlobe();
  return (
    <div className="business-globe" aria-hidden="true">
      <svg
        className="business-globe-fallback"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="88" />
        <ellipse cx="100" cy="100" rx="42" ry="88" />
        <ellipse cx="100" cy="100" rx="88" ry="34" />
        <path d="M12 100h176M100 12v176" />
      </svg>
      <canvas ref={canvas} width={280} height={280} />
    </div>
  );
}
