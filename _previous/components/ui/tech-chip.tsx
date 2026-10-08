export function TechChip({ label }: { label: string }) {
  return (
    <span className="rounded-pill border border-border px-3 py-1 font-mono text-xs text-text-secondary">
      {label}
    </span>
  );
}
