import type { MetadataRoute } from "next";
import { site } from "@/data/collection";
import { hasPage, views } from "@/lib/collection";
import { getCollection } from "@/lib/get-collection";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const data = getCollection();
  const paths = [
    ...views.map((view) => view.href),
    ...data.works.map((item) => `/work/${item.id}/`),
    ...data.notes.filter(hasPage).map((item) => `/notes/${item.id}/`),
  ];
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    priority: path === "/" ? 1 : 0.7,
  }));
}
