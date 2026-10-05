import type { MetaDescriptor } from "react-router";
import { profile } from "~/shared/config/profile";
import { getSiteOrigin } from "../config/site";

export function seo(
  title: string,
  description: string,
  path = "/",
  image = "/images/kamil-klasa.webp",
): MetaDescriptor[] {
  const site = getSiteOrigin(import.meta.env.VITE_SITE_URL);
  const url = new URL(path, site).href;
  const imageUrl = new URL(image, site).href;
  const portrait = image === "/images/kamil-klasa.webp";
  const imageAlt = portrait
    ? "Kamil Klasa — product designer i frontend developer"
    : title;
  const personId = `${site}/#kamil-klasa`;
  const websiteId = `${site}/#website`;
  return [
    { title },
    { name: "description", content: description },
    { name: "author", content: profile.name },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:site_name", content: "Kamil Klasa — Portfolio" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "pl_PL" },
    { property: "og:url", content: url },
    { property: "og:image", content: imageUrl },
    { property: "og:image:alt", content: imageAlt },
    {
      property: "og:image:type",
      content: image.endsWith(".webp")
        ? "image/webp"
        : image.endsWith(".png")
          ? "image/png"
          : "image/jpeg",
    },
    ...(portrait
      ? [
          { property: "og:image:width", content: "800" },
          { property: "og:image:height", content: "800" },
        ]
      : []),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: imageAlt },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": personId,
            name: profile.name,
            url: site + "/",
            image: site + "/images/kamil-klasa.webp",
            jobTitle: profile.role,
            email: profile.email,
            sameAs: [profile.dribbble, profile.linkedIn, profile.github],
          },
          {
            "@type": "WebSite",
            "@id": websiteId,
            name: "Kamil Klasa — Portfolio",
            url: site + "/",
            inLanguage: "pl-PL",
            publisher: { "@id": personId },
          },
          {
            "@type":
              path === "/o-mnie"
                ? "ProfilePage"
                : path === "/kontakt"
                  ? "ContactPage"
                  : "WebPage",
            "@id": url + "#webpage",
            url,
            name: title,
            description,
            inLanguage: "pl-PL",
            isPartOf: { "@id": websiteId },
            about: { "@id": personId },
            ...(path === "/o-mnie" ? { mainEntity: { "@id": personId } } : {}),
          },
        ],
      },
    },
  ];
}
