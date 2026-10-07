import { Github, Linkedin, Mail } from "lucide-react";
import { footer, links, profile } from "@/data/portfolio";
import { isResolved } from "@/lib/render-guard";
import { Container } from "@/components/ui/container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-text-primary">{profile.name}</p>
          <p className="text-sm text-text-secondary">{footer.role}</p>
        </div>

        <div className="flex items-center gap-5 text-sm text-text-secondary">
          {isResolved(links.github) && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-text-primary"
            >
              <Github size={18} />
            </a>
          )}
          {isResolved(links.linkedin) && (
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-text-primary"
            >
              <Linkedin size={18} />
            </a>
          )}
          {isResolved(links.email) && (
            <a
              href={`mailto:${links.email}`}
              aria-label="Email"
              className="hover:text-text-primary"
            >
              <Mail size={18} />
            </a>
          )}
        </div>

        <p className="text-xs text-text-secondary">
          © {year} {profile.name}
        </p>
      </Container>
    </footer>
  );
}
