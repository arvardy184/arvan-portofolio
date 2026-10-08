import { howIWork } from "@/data/portfolio";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export function HowIWork() {
  return (
    <section className="content-section border-b border-border">
      <Container className="approach-layout">
        <SectionLabel number="04" label="How I Work" />

        <div className="divide-y divide-border border-t border-border">
          {howIWork.map((step) => (
            <div data-reveal key={step.number} className="approach-row flex gap-5 py-6 sm:gap-8">
              <span className="font-mono text-sm text-accent sm:w-10 sm:shrink-0">
                {step.number}
              </span>
              <div>
                <h2 className="font-semibold text-text-primary">{step.title}</h2>
                <p className="mt-1 max-w-prose text-sm leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
