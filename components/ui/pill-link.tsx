import type { ReactNode } from "react";

type PillLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  target?: string;
  rel?: string;
};

const variantClasses: Record<NonNullable<PillLinkProps["variant"]>, string> = {
  primary:
    "bg-accent text-[#0a0a0a] hover:bg-accent-hover font-semibold",
  secondary:
    "border border-border text-text-primary hover:border-accent hover:text-accent",
  ghost: "text-text-secondary hover:text-text-primary",
};

export function PillLink({
  href,
  children,
  variant = "secondary",
  className = "",
  target,
  rel,
}: PillLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`pill-action inline-flex items-center justify-center gap-2 rounded-pill px-5 py-2.5 text-sm min-h-[44px] ${variantClasses[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
