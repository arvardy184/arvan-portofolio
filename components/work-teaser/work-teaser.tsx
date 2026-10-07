import Image from "next/image";
import { ArrowRight, ArrowDown, Smartphone, Server, Cable } from "lucide-react";
import { okejekCaseStudy, links, siteConfig } from "@/data/portfolio";
import { hasItems, isResolved } from "@/lib/render-guard";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { PillLink } from "@/components/ui/pill-link";

export function WorkTeaser() {
  const diagram = okejekCaseStudy.diagram;
  return (
    <section id="work" className="content-section border-b border-border">
      <Container>
        <SectionLabel number="01" label="Featured Case Study" />
        <article data-reveal className="featured-work mt-8">
          <div className="featured-story">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">{okejekCaseStudy.productLabel}</p>
            <h2 className="section-heading mt-5">{okejekCaseStudy.title}</h2>
            <p className="mt-5 text-sm leading-relaxed text-text-secondary sm:text-base">{okejekCaseStudy.teaserStatement}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {siteConfig.caseStudyPublished && (
                <PillLink href="/work/okejek/" variant="primary">Read Full Case Study <ArrowRight size={16} aria-hidden="true" /></PillLink>
              )}
              {isResolved(links.okejekPlayStoreUrl) && (
                <PillLink href={links.okejekPlayStoreUrl} variant="secondary" target="_blank" rel="noopener noreferrer">View on Play Store <ArrowRight size={16} aria-hidden="true" /></PillLink>
              )}
            </div>
          </div>
          <div className="featured-evidence">
            {hasItems(okejekCaseStudy.screenshots) && (
              <Image src={okejekCaseStudy.screenshots[0]} alt="Okejek application screenshot" width={800} height={600} className="mb-6 h-auto w-full rounded-md object-contain" />
            )}
            <figure className="system-diagram">
              <figcaption className="mb-6 font-mono text-[10px] uppercase tracking-widest text-text-secondary">{diagram.label}</figcaption>
              <div className="diagram-node"><Smartphone size={19} aria-hidden="true" /><span>{diagram.mobile}</span></div>
              <div className="diagram-connection"><span className="diagram-line" aria-hidden="true" /><span><Cable size={13} aria-hidden="true" />{diagram.connection}</span><span className="diagram-line" aria-hidden="true" /></div>
              <div className="diagram-node"><Server size={19} aria-hidden="true" /><span>{diagram.backend}</span></div>
              <div className="diagram-resolution">
                <p className="text-text-secondary">{diagram.before}</p>
                <ArrowDown size={14} className="my-2 text-accent" aria-hidden="true" />
                <p>{diagram.after}</p>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-text-secondary">{diagram.caption}</p>
            </figure>
          </div>
          <dl className="featured-metadata">
            {okejekCaseStudy.teaserBullets.map((bullet) => (
              <div key={bullet.label}>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">{bullet.label}</dt>
                <dd className="mt-2 text-sm leading-relaxed">{bullet.value}</dd>
              </div>
            ))}
          </dl>
          <div className="featured-bug">
            <span className="font-mono text-xs text-accent">The bug</span>
            <p className="text-sm leading-relaxed text-text-secondary">{okejekCaseStudy.bugCallout}</p>
          </div>
        </article>
      </Container>
    </section>
  );
}
