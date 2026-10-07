import { projects } from "@/data/portfolio";
import { hasItems } from "@/lib/render-guard";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { ProjectCard } from "@/components/selected-work/project-card";

export function SelectedWork() {
  // Project 3 (Attendance System) only ships once real evidence exists for it.
  const visibleProjects = projects.filter(
    (p) => p.id !== "attendance-system" || hasItems(p.screenshots)
  );

  return (
    <section className="content-section border-b border-border">
      <Container>
        <SectionLabel number="02" label="Selected Work" />

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
