import { Hero } from "@/components/hero/hero";
import { CredibilityBar } from "@/components/credibility-bar/credibility-bar";
import { WorkTeaser } from "@/components/work-teaser/work-teaser";
import { SelectedWork } from "@/components/selected-work/selected-work";
import { Experience } from "@/components/experience/experience";
import { HowIWork } from "@/components/how-i-work/how-i-work";
import { About } from "@/components/about/about";
import { Contact } from "@/components/contact/contact";
import { SectionMotion } from "@/components/ui/section-motion";

export default function HomePage() {
  return (
    <>
      <SectionMotion />
      <Hero />
      <CredibilityBar />
      <WorkTeaser />
      <SelectedWork />
      <Experience />
      <HowIWork />
      <About />
      <Contact />
    </>
  );
}
