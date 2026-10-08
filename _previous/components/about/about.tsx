import { about, currentlyExploring } from "@/data/portfolio";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { ScrollRevealText } from "@/components/about/scroll-reveal-text";

export function About() {
  const [firstParagraph, ...rest] = about.paragraphs;

  return (
    <section id="about" className="content-section border-b border-border">
      <Container>
        <SectionLabel number="05" label="About" />
        <div className="about-layout">

        <h2 data-reveal className="section-heading">
          {about.heading}
        </h2>

        <div className="space-y-6 text-text-secondary">
          <ScrollRevealText text={firstParagraph} />
          {rest.map((paragraph) => (
            <p key={paragraph} className="max-w-prose text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        </div>

        <p className="exploring-line mt-8 text-sm leading-relaxed text-text-secondary">
          <span className="text-text-primary">Currently exploring: </span>
          {currentlyExploring.join(" · ")}
        </p>
      </Container>
    </section>
  );
}
