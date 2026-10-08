export function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="section-label flex items-center gap-3 text-xs">
      <span className="font-mono text-accent">{number}</span>
      <span className="uppercase tracking-widest text-text-secondary">{label}</span>
    </div>
  );
}
