"use client";

import { motion } from "motion/react";
import { Plus } from "lucide-react";
import type { WorkItem } from "@/data/collection";
import { cn } from "@/lib/cn";
import type { Coded } from "@/lib/collection";
import { REFLOW } from "@/lib/motion";
import { isPlainClick } from "@/lib/use-modal";
import { Plate } from "./plate";

export type WorkVariant = "lead" | "small" | "wide" | "half";

type Props = {
  item: Coded<WorkItem>;
  /** "lead" and "small" are index sizes; "wide" and "half" add professional context. */
  variant: WorkVariant;
  selected: boolean;
  onOpen: (id: string) => void;
};

const PLATE: Record<WorkVariant, string> = {
  lead: "aspect-[5/4] sm:aspect-[3/2] md:aspect-auto md:min-h-[320px] md:flex-1",
  // A shared height keeps the captions of neighbouring plates on one line.
  small: "aspect-[4/3] md:aspect-auto md:h-[clamp(190px,19vw,272px)]",
  wide: "aspect-[16/10] md:col-span-7 md:aspect-[16/9]",
  half: "aspect-[16/10]",
};

/**
 * A project on the sheet. Underneath it is an ordinary link to the project's
 * page; with JavaScript a plain click opens the preview in place instead.
 */
export function WorkObject({ item, variant, selected, onOpen }: Props) {
  const detailed = variant === "wide" || variant === "half";
  return (
    <article id={item.id} className="h-full scroll-mt-6">
      <a
        href={`/work/${item.id}/`}
        data-trigger={item.id}
        data-selected={selected}
        aria-haspopup="dialog"
        onClick={(event) => {
          if (!isPlainClick(event)) return;
          event.preventDefault();
          onOpen(item.id);
        }}
        className={cn(
          "object flex h-full flex-col gap-4",
          variant === "wide" && "md:grid md:grid-cols-12 md:gap-x-5",
        )}
      >
        <Plate
          id={item.id}
          code={item.code}
          mark={item.mark}
          media={item.media[0]}
          className={PLATE[variant]}
        />

        <motion.div
          layout="position"
          transition={REFLOW}
          className={cn(variant === "wide" && "md:col-span-5")}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="meta">Work</span>
            <span className="meta flex items-center gap-1 text-ink">
              Open
              <Plus size={12} aria-hidden />
            </span>
          </div>

          <motion.h2
            layoutId={`title-${item.id}`}
            layout="position"
            transition={REFLOW}
            className={cn(
              "mt-3 w-fit font-medium tracking-[-0.025em]",
              variant === "small"
                ? "text-[1.125rem] leading-[1.15] md:text-[1.375rem]"
                : "text-[1.75rem] leading-[1.05] md:text-[2rem]",
            )}
          >
            {item.title}
          </motion.h2>
          <motion.p
            layoutId={`role-${item.id}`}
            layout="position"
            transition={REFLOW}
            className="mt-1.5 w-fit text-[0.9375rem] leading-snug text-dim"
          >
            {item.role}
          </motion.p>

          {detailed ? (
            <>
              <p className="mt-1 text-[0.9375rem] leading-snug text-dim">{item.employer}</p>
              <p className="meta mt-3">{item.period}</p>
              <p className="mt-5 max-w-[46ch] text-pretty">{item.summary}</p>
              <p className="meta mt-5 max-w-[46ch] leading-[1.7]">{item.technologies.join(" / ")}</p>
            </>
          ) : (
            <p className="meta mt-3">{item.period}</p>
          )}
        </motion.div>
      </a>
    </article>
  );
}
