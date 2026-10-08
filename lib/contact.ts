import { contact } from "@/data/collection";

export type ContactLink = {
  id: "resume" | "email" | "github" | "linkedin";
  label: string;
  href: string;
  /** Shown on the Info page next to the label. */
  display: string;
  external: boolean;
};

function resolved(value?: string): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Only links with a real destination. A missing value renders nothing. */
export function getContactLinks(): ContactLink[] {
  const links: ContactLink[] = [];
  if (resolved(contact.resume)) {
    links.push({ id: "resume", label: "Résumé", href: contact.resume, display: "Google Drive", external: true });
  }
  if (resolved(contact.email)) {
    links.push({
      id: "email",
      label: "Email",
      href: `mailto:${contact.email}`,
      display: contact.email,
      external: false,
    });
  }
  if (resolved(contact.github)) {
    links.push({
      id: "github",
      label: "GitHub",
      href: contact.github,
      display: contact.github.replace(/^https?:\/\/(www\.)?/, ""),
      external: true,
    });
  }
  if (resolved(contact.linkedin)) {
    links.push({
      id: "linkedin",
      label: "LinkedIn",
      href: contact.linkedin,
      display: contact.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
      external: true,
    });
  }
  return links;
}
