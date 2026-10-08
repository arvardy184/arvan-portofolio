import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { siteConfig, profile, links } from "@/data/portfolio";
import { isResolved } from "@/lib/render-guard";
import { Nav } from "@/components/nav/nav";
import { Footer } from "@/components/footer/footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.canonicalUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.canonicalUrl,
    siteName: profile.name,
    type: "website",
    ...(isResolved(siteConfig.ogImage) ? { images: [siteConfig.ogImage] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    ...(isResolved(siteConfig.ogImage) ? { images: [siteConfig.ogImage] } : {}),
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: siteConfig.canonicalUrl,
  sameAs: [links.github, links.linkedin].filter(isResolved),
  ...(isResolved(links.email) ? { email: links.email } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
