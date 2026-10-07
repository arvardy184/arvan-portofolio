import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { siteConfig } from "@/data/portfolio";
import { hasItems, isResolved } from "@/lib/render-guard";
import { TechChip } from "@/components/ui/tech-chip";
import { PillLink } from "@/components/ui/pill-link";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article data-reveal className="project-card flex flex-col overflow-hidden rounded-lg border border-border bg-surface">
      {hasItems(project.screenshots) ? (
        <div className="aspect-[4/3] w-full overflow-hidden bg-surface-raised">
          <Image
            src={project.screenshots[0]}
            alt={`${project.name} application screenshot`}
            width={800}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-8 flex items-center justify-between" aria-hidden="true">
          <span className="project-index font-mono">0{index + 1}</span>
          <ArrowUpRight size={24} className="project-direction text-text-secondary" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary">{project.name}</h2>
        <p className="mt-1 text-sm text-text-secondary">{project.role}</p>
        <p className="mt-4 text-sm leading-relaxed text-text-secondary">{project.context}</p>

        <p className="project-challenge mt-5 text-sm leading-relaxed text-text-primary">
          <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-text-secondary">Engineering challenge</span>
          {project.challenge}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <TechChip key={tech} label={tech} />
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
          {siteConfig.caseStudyPublished && isResolved(project.caseStudyHref) && (
            <PillLink href={project.caseStudyHref} variant="primary">
              Read Case Study <ArrowUpRight size={16} aria-hidden="true" />
            </PillLink>
          )}
          {isResolved(project.playStoreUrl) && (
            <PillLink
              href={project.playStoreUrl}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Play Store
            </PillLink>
          )}
          {isResolved(project.githubUrl) && (
            <PillLink
              href={project.githubUrl}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} aria-hidden="true" /> GitHub
            </PillLink>
          )}
          {project.isPrivate &&
            !isResolved(project.caseStudyHref) &&
            !isResolved(project.playStoreUrl) &&
            !isResolved(project.githubUrl) && (
              <p className="text-sm italic text-text-secondary">
                Private production project. Technical details available on request.
              </p>
            )}
        </div>
      </div>
    </article>
  );
}
