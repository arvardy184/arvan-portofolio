import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { hero, links, profile } from "@/data/portfolio";
import { isResolved } from "@/lib/render-guard";
import { PillLink } from "@/components/ui/pill-link";
import { HeroGridCanvas } from "@/components/hero/hero-grid-canvas";

export function Hero() {
  return (
    <section
      id="top"
      className="hero-section relative overflow-hidden border-b border-border"
    >
      <div className="hero-grid-static absolute inset-0" aria-hidden="true">
        <HeroGridCanvas />
      </div>
      {/* Fade the grid toward the edges so hero text stays fully legible. */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_var(--color-bg)_75%)]"
        aria-hidden="true"
      />

      <div className="hero-content relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="hero-intro flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium">{profile.name} <span className="text-text-secondary">/ {profile.location}</span></p>
          <span className="hero-availability"><span aria-hidden="true" />{hero.availabilityShort}</span>
        </div>
        <p className="hero-eyebrow font-mono text-xs tracking-widest text-text-secondary">
          {hero.eyebrow}
        </p>

        <h1 className="hero-title">
          {hero.heading.split(hero.headingAccent)[0]}<span className="hero-accent">{hero.headingAccent}<span className="text-text-primary">.</span></span>
        </h1>

        <div className="hero-bottom">
        <div>
        <p className="max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {hero.paragraph}
        </p>

        <p className="mt-4 text-sm text-text-secondary">{hero.proofLine}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <PillLink href={hero.primaryCta.href} variant="primary">
            {hero.primaryCta.label}<ArrowDownRight size={18} aria-hidden="true" />
          </PillLink>
          {isResolved(links.resume) && (
            <PillLink href={links.resume} variant="secondary" target="_blank" rel="noopener noreferrer">
              Download Résumé
            </PillLink>
          )}
        </div>
        </div>
        <a href={hero.primaryCta.href} className="hero-proof" aria-label={hero.experienceLinkLabel}>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">{hero.experienceLabel}</span>
          <span className="hero-proof-number">{profile.yearsExperience}<span>+</span></span>
          <span className="max-w-[140px] text-sm text-text-secondary">{hero.experienceCaption}</span>
          <ArrowUpRight className="hero-proof-arrow" size={22} aria-hidden="true" />
        </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-text-secondary">
          {isResolved(links.github) && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-text-primary"
            >
              <Github size={16} aria-hidden="true" /> GitHub
            </a>
          )}
          {isResolved(links.linkedin) && (
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-text-primary"
            >
              <Linkedin size={16} aria-hidden="true" /> LinkedIn
            </a>
          )}
          {isResolved(links.email) && (
            <a
              href={`mailto:${links.email}`}
              className="inline-flex items-center gap-2 hover:text-text-primary"
            >
              <Mail size={16} aria-hidden="true" /> Email
            </a>
          )}
        </div>

      </div>
    </section>
  );
}
