import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { prerenderPaths } from "./prerender";
import { getSiteOrigin } from "../shared/config/site";

export function generateSeoFiles(
  siteUrl: string | undefined,
  publicDir: string,
) {
  const origin = getSiteOrigin(siteUrl);
  const entries = prerenderPaths
    .map((path) => `<url><loc>${origin}${path}</loc></url>`)
    .join("");
  writeFileSync(
    join(publicDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`,
  );
  writeFileSync(
    join(publicDir, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
  );
}
