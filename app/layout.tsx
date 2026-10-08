import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { Shell, type PaletteEntry } from "@/components/chrome/shell";
import { contact, profile, site } from "@/data/collection";
import { countFor, hasPage, views } from "@/lib/collection";
import { fixturesEnabled, getCollection } from "@/lib/get-collection";
import { getContactLinks } from "@/lib/contact";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${profile.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
    siteName: profile.name,
    type: "website",
    locale: "en",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${profile.name}, personal index` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
  viewportFit: "cover",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: site.url,
  address: { "@type": "PostalAddress", addressCountry: "ID" },
  sameAs: [contact.github, contact.linkedin].filter(Boolean),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const data = getCollection();
  const counts = Object.fromEntries(views.map((view) => [view.id, countFor(view.id, data)]));

  const entries: PaletteEntry[] = [
    ...data.works.map((item) => ({
      id: item.id,
      title: item.title,
      code: item.code,
      kind: "work project",
      href: `/work/${item.id}/`,
      mode: "route" as const,
    })),
    ...data.frames.map((item) => ({
      id: item.id,
      title: item.title,
      code: item.code,
      kind: "frame image",
      href: `/frames/#${item.id}`,
      mode: "hash" as const,
    })),
    ...data.notes.map((item) => {
      const external = item.form === "external" && !!item.externalUrl;
      return {
        id: item.id,
        title: item.title,
        code: item.code,
        kind: "note writing",
        href: external ? item.externalUrl! : hasPage(item) ? `/notes/${item.id}/` : `/notes/#${item.id}`,
        mode: external ? ("external" as const) : hasPage(item) ? ("route" as const) : ("hash" as const),
      };
    }),
  ];

  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Shell
          name={profile.name}
          role={profile.role}
          supporting={profile.supporting}
          counts={counts}
          links={getContactLinks()}
          entries={entries}
          fixtures={fixturesEnabled}
        >
          {children}
        </Shell>
      </body>
    </html>
  );
}
