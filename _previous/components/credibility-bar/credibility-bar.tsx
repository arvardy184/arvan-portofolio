import { credibilityBar, focusAreas } from "@/data/portfolio";
import { Container } from "@/components/ui/container";

export function CredibilityBar() {
  return (
    <section className="border-b border-border py-10" aria-label="Credibility summary">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-x-8">
          {credibilityBar.map((item) => (
            <div key={item.label}>
              <dt className="sr-only">{item.label}</dt>
              <dd className="text-lg font-semibold text-text-primary sm:text-xl">
                {item.value}
                {item.unit && (
                  <span className="ml-1 text-text-secondary">{item.unit}</span>
                )}
              </dd>
              <p className="mt-1 text-sm text-text-secondary">{item.label}</p>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-sm text-text-secondary">
          <span className="text-text-primary">What I work on: </span>
          {focusAreas.join(" · ")}
        </p>
      </Container>
    </section>
  );
}
