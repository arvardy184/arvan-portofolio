import { experience } from "@/data/portfolio";
import { isResolved } from "@/lib/render-guard";
import { computeTimeline } from "@/lib/timeline";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { TechChip } from "@/components/ui/tech-chip";

export function Experience() {
  const timeline = computeTimeline(experience);
  return (
    <section id="experience" className="content-section border-b border-border">
      <Container>
        <SectionLabel number="03" label="Experience" />
        <div data-reveal className="experience-chart mt-8" aria-label="Employment timeline showing overlapping roles">
          <div className="mb-5 flex justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-text-secondary">
            <span>Overlapping roles</span><span>{timeline.rangeStartLabel} — {timeline.rangeEndLabel}</span>
          </div>
          {experience.map((role, i) => (
            <div key={role.company} className="chart-row">
              <span className="text-xs text-text-secondary">{role.company}</span>
              <div className="chart-track" aria-hidden="true"><div className={`chart-bar chart-bar-${i}`} style={{ left: `${timeline.bars[i].leftPct}%`, width: `${timeline.bars[i].widthPct}%` }} /></div>
            </div>
          ))}
        </div>
        <ol className="mt-6">
          {experience.map((role, index) => (
            <li data-reveal key={role.company} className="experience-entry">
              <div className="experience-date">
                <span className="mb-3 block font-mono text-xs text-accent">0{index + 1}</span>
                <p className="text-sm leading-relaxed text-text-secondary">{role.startDate} – {role.endDate}</p>
                {isResolved(role.engagementType) && <p className="mt-2 text-xs text-text-secondary">{role.engagementType}</p>}
              </div>
              <div>
                <h2 className="text-xl font-medium tracking-tight sm:text-2xl">{role.title}</h2>
                <p className="mt-2 text-sm text-text-secondary">{role.company}</p>
                <p className="mt-4 max-w-prose text-sm leading-relaxed text-text-secondary">{role.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">{role.technologies.map((tech) => <TechChip key={tech} label={tech} />)}</div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
