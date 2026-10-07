import { Github, Linkedin, Mail } from "lucide-react";
import { contact, links } from "@/data/portfolio";
import { isResolved } from "@/lib/render-guard";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { PillLink } from "@/components/ui/pill-link";

export function Contact() {
  return (
    <section id="contact" className="content-section">
      <Container>
      <div data-reveal className="contact-panel text-center">
        <div className="flex justify-center">
          <SectionLabel number="06" label="Contact" />
        </div>

        <p className="mt-8 font-mono text-xs text-text-secondary">{contact.eyebrow}</p>
        <h2 className="contact-heading mx-auto mt-4 max-w-2xl">
          {contact.heading}
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-secondary">
          {contact.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {isResolved(links.email) && (
            <PillLink href={`mailto:${links.email}`} variant="primary">
              <Mail size={16} aria-hidden="true" /> Send Me an Email
            </PillLink>
          )}
          {isResolved(links.linkedin) && (
            <PillLink href={links.linkedin} variant="secondary" target="_blank" rel="noopener noreferrer">
              <Linkedin size={16} aria-hidden="true" /> LinkedIn
            </PillLink>
          )}
          {isResolved(links.github) && (
            <PillLink href={links.github} variant="secondary" target="_blank" rel="noopener noreferrer">
              <Github size={16} aria-hidden="true" /> GitHub
            </PillLink>
          )}
          {isResolved(links.resume) && (
            <PillLink href={links.resume} variant="secondary" target="_blank" rel="noopener noreferrer">
              Download Résumé
            </PillLink>
          )}
        </div>
      </div>
      </Container>
    </section>
  );
}
