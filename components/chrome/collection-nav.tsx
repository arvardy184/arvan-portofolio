"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { views, type View } from "@/lib/collection";
import { REFLOW } from "@/lib/motion";

type Props = {
  active: View;
  /** False on item pages, where the view is an ancestor rather than this page. */
  exact: boolean;
  counts: Partial<Record<View, number>>;
  /** "rail" is the vertical list; "bar" is the bottom bar that becomes an inline row. */
  variant: "rail" | "bar";
  className?: string;
};

// Adapted from Aceternity UI's Animated Tabs. Only its shared-layout active
// indicator survives, reduced from a filled pill to a 6px selection mark that
// slides between views. The tabs are real links to real routes.
export function CollectionNav({ active, exact, counts, variant, className }: Props) {
  const rail = variant === "rail";
  return (
    <nav aria-label="Collection" className={className}>
      <ul className={rail ? "flex flex-col" : "flex md:gap-1"}>
        {views.map((view) => {
          const current = view.id === active;
          const count = counts[view.id];
          return (
            <li key={view.id} className={rail ? undefined : "flex-1 md:flex-none"}>
              <Link
                href={view.href}
                scroll={false}
                onClick={() => window.scrollTo({ top: 0 })}
                aria-current={current ? (exact ? "page" : "true") : undefined}
                className={cn(
                  "group relative transition-colors duration-150",
                  rail
                    ? "grid h-9 grid-cols-[18px_1fr_auto] items-center"
                    : "flex h-[var(--bar)] flex-col items-center justify-center gap-2 md:h-11 md:flex-row md:px-3",
                  current ? "text-ink" : "text-dim hover:text-ink",
                )}
              >
                <span className="flex h-[6px] w-[6px] items-center justify-center">
                  {current && (
                    <motion.span
                      layoutId={`view-mark-${variant}`}
                      transition={REFLOW}
                      className="mark"
                    />
                  )}
                </span>
                <span
                  className={cn(
                    rail ? "text-[0.9375rem]" : "text-[0.8125rem] md:text-[0.9375rem]",
                    current && "font-medium",
                  )}
                >
                  {view.label}
                </span>
                {count !== undefined && (
                  <span
                    className={cn("meta tabular", !rail && "hidden md:inline")}
                    aria-label={`${count} ${count === 1 ? "entry" : "entries"}`}
                  >
                    {String(count).padStart(2, "0")}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
