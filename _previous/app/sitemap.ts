import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.canonicalUrl,
      lastModified: new Date(),
      priority: 1,
    },
    // "/work/okejek" is added here once the case-study route ships in Phase 4.
  ];
}
