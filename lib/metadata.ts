import type { Metadata } from "next";
import { profile, site } from "@/data/collection";

const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: `${profile.name}, personal index` };

/**
 * Metadata for a page below the root. Next replaces nested objects rather
 * than merging them, so the shared Open Graph fields are repeated here.
 */
export function pageMetadata(page: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${page.title} — ${profile.name}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      title: fullTitle,
      description: page.description,
      url: page.path,
      siteName: profile.name,
      type: "website",
      locale: "en",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: page.description,
      images: [OG_IMAGE.url],
    },
  };
}

export { OG_IMAGE, site };
