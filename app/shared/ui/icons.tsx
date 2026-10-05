export function Arrow({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M6 18 18 6M6 6h12v12" />
      ) : (
        <path d="M4 12h15m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}
export function Spark() {
  return (
    <svg width="29" height="29" viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="m16 0 2.5 10.5L27.3 4.7l-5.8 8.8L32 16l-10.5 2.5 5.8 8.8-8.8-5.8L16 32l-2.5-10.5-8.8 5.8 5.8-8.8L0 16l10.5-2.5-5.8-8.8 8.8 5.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SocialIcon({ name }: { name: "Dribbble" | "LinkedIn" }) {
  if (name === "Dribbble")
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle
          cx="12"
          cy="12"
          r="9.2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path d="M7 4.4c4.4 5.2 7.1 10.9 8.3 16.2M3 11.2c6 .1 11.6-1.4 15.3-5.6M5.1 18.7c3.1-5.2 8.2-7.2 15.8-5.5" />
      </svg>
    );
  return <LinkedInIcon className="social-icon-filled" />;
}

export function LinkedInIcon({ className }: { className?: string } = {}) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="4" cy="4" r="2" />
      <path d="M2 8h4v14H2V8Zm7 0h4v2c.8-1.4 2.2-2.3 4.1-2.3 3.2 0 4.9 2 4.9 5.7V22h-4v-7.8c0-2-.6-3.2-2.3-3.2-1.8 0-2.7 1.2-2.7 3.2V22H9V8Z" />
    </svg>
  );
}
