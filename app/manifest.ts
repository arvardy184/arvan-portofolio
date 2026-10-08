import type { MetadataRoute } from "next";
import { profile, site } from "@/data/collection";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: profile.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#0A0A0A",
    theme_color: "#0A0A0A",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
