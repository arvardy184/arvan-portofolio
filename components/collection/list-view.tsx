"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";

export type ListRow = {
  id: string;
  code: string;
  kind: string;
  title: string;
  detail?: string;
  when?: string;
  href: string;
  external?: boolean;
  /** Matches the explore object's trigger so focus can return here too. */
  trigger?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

const ROW =
  "object grid min-h-12 grid-cols-[3.5rem_minmax(0,1fr)_auto] items-baseline gap-x-4 py-3.5 md:grid-cols-[4.5rem_5.5rem_minmax(0,1.1fr)_minmax(0,1fr)_14.5rem]";

/**
 * The compact presentation of any view: one row per object. No layout
 * animation, nothing hover-only, so it reads the same by touch, keyboard, and
 * with reduced motion.
 */
export function ListView({ rows, empty }: { rows: ListRow[]; empty: string }) {
  if (rows.length === 0) {
    return <p className="border-t border-rule py-8 text-dim">{empty}</p>;
  }

  return (
    <div>
      <div className={`${ROW} meta min-h-0 border-b border-rule !py-2.5`} aria-hidden>
        <span>No.</span>
        <span className="hidden md:block">Kind</span>
        <span>Title</span>
        <span className="hidden md:block">Detail</span>
        <span className="hidden text-right md:block">When</span>
      </div>
      <ol>
        {rows.map((row) => {
          const content = (
            <>
              <span className="meta flex items-center gap-2 text-ink">{row.code}</span>
              <span className="meta hidden md:block">{row.kind}</span>
              <span className="min-w-0">
                <span className="block text-[1.0625rem] font-medium leading-snug tracking-[-0.01em]">
                  {row.title}
                </span>
                <span className="meta mt-1.5 block md:hidden">
                  {[row.kind, row.when].filter(Boolean).join(" / ")}
                </span>
              </span>
              <span className="hidden min-w-0 text-[0.9375rem] leading-snug text-dim md:block">
                {row.detail}
              </span>
              <span className="flex items-center justify-end gap-2.5">
                <span className="meta hidden md:block">{row.when}</span>
                <span className="select-mark mark" aria-hidden />
                {row.external && <ArrowUpRight size={14} aria-hidden className="text-dim" />}
              </span>
            </>
          );
          return (
            <li key={row.id} className="border-b border-rule">
              {row.external ? (
                <a href={row.href} target="_blank" rel="noopener noreferrer" className={ROW}>
                  {content}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link href={row.href} data-trigger={row.trigger} onClick={row.onClick} className={ROW}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
