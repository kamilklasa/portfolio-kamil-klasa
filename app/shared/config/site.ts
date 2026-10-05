export function getSiteOrigin(configuredUrl?: string): string {
  const url = new URL(configuredUrl || "https://kamilklasa.pl");
  if (
    !["https:", "http:"].includes(url.protocol) ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error("VITE_SITE_URL musi być domeną http(s), bez ścieżki.");
  }
  return url.origin;
}
