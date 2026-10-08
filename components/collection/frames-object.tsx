"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import type { FrameItem } from "@/data/collection";
import { cn } from "@/lib/cn";
import type { Coded } from "@/lib/collection";
import { REFLOW } from "@/lib/motion";
import { isPlainClick } from "@/lib/use-modal";

type Props = {
  frames: Coded<FrameItem>[];
  /** "strip" is the index excerpt; "sheet" is the full Frames view. */
  variant: "strip" | "sheet";
  activeId: string | null;
  onOpen: (id: string) => void;
};

const STRIP_COUNT = 5;
const STRIP_COUNT_PHONE = 3;

// Adapted from Aceternity UI's Layout Grid. Kept: each thumbnail expands into
// its opened view through a shared layoutId. Changed: the fixed bento grid is
// replaced by a justified contact sheet that keeps every image's own aspect
// ratio, thumbnails are links, and the opened state lives in frame-viewer.tsx.
export function FramesObject({ frames, variant, activeId, onOpen }: Props) {
  if (frames.length === 0) return <EmptySheet />;

  const strip = variant === "strip";
  const shown = strip ? frames.slice(0, STRIP_COUNT) : frames;

  return (
    <section aria-label="Frames" className={cn(strip && "border-t border-rule pt-4")}>
      {strip && (
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 className="text-[1.375rem] font-medium tracking-[-0.025em]">
            Frames
            <span className="ml-3 text-[0.9375rem] font-normal tracking-normal text-dim">
              Things I wanted to keep.
            </span>
          </h2>
          <Link
            href="/frames/"
            scroll={false}
            onClick={() => window.scrollTo({ top: 0 })}
            className="meta shrink-0 text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
          >
            All {frames.length}
          </Link>
        </div>
      )}

      <ul
        className={cn(
          "flex gap-x-3 gap-y-6",
          // The strip is always one row; the sheet wraps into justified rows.
          strip ? "[--row:0px]" : "flex-wrap [--row:128px] md:[--row:220px]",
        )}
      >
        {shown.map((frame, i) => {
          const ratio = frame.media.width / frame.media.height;
          // Equal grow and basis per unit of aspect ratio gives every image in
          // a row the same height: a justified row with no cropping.
          const cell: CSSProperties = {
            flexGrow: ratio,
            flexBasis: `calc(${ratio} * var(--row))`,
            maxWidth: strip ? undefined : `calc(${ratio} * var(--row) * 1.9)`,
          };
          return (
            <li
              key={frame.id}
              id={frame.id}
              style={cell}
              className={cn("min-w-0 scroll-mt-6", strip && i >= STRIP_COUNT_PHONE && "hidden md:block")}
            >
              <a
                href={`/frames/#${frame.id}`}
                data-trigger={frame.id}
                data-selected={activeId === frame.id}
                aria-haspopup="dialog"
                aria-label={`${frame.code}: ${frame.title}. Open in the viewer.`}
                onClick={(event) => {
                  if (!isPlainClick(event)) return;
                  event.preventDefault();
                  onOpen(frame.id);
                }}
                className="object block"
              >
                <motion.div
                  layoutId={`frame-${frame.id}`}
                  transition={REFLOW}
                  style={{ aspectRatio: ratio }}
                  className="overflow-hidden bg-raised"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={frame.media.src}
                    width={frame.media.width}
                    height={frame.media.height}
                    alt={frame.media.alt}
                    loading="lazy"
                    decoding="async"
                    className="thumb block h-full w-full object-cover"
                  />
                </motion.div>
                <motion.span
                  layout="position"
                  transition={REFLOW}
                  className="meta mt-2 flex items-center gap-2"
                >
                  {frame.code}
                  <span className="select-mark mark" aria-hidden />
                </motion.span>
              </a>
            </li>
          );
        })}
        {/* Soaks up the leftover space so a short last row is not stretched. */}
        {!strip && <li aria-hidden className="h-0 grow-[100]" />}
      </ul>
    </section>
  );
}

const BLANKS = [3 / 2, 2 / 3, 1, 16 / 9, 4 / 5];

/** An honest empty state: a blank sheet, not stand-in pictures. */
function EmptySheet() {
  return (
    <section aria-label="Frames">
      {/* One row; the sheet edge crops whatever does not fit. */}
      <ul aria-hidden className="flex gap-3 overflow-hidden [--row:96px] md:[--row:168px]">
        {BLANKS.map((ratio) => (
          <li
            key={ratio}
            style={{ aspectRatio: ratio, height: "var(--row)" }}
            className="shrink-0 border border-rule"
          />
        ))}
      </ul>
      <h2 className="mt-9 text-[1.75rem] font-medium leading-[1.1] tracking-[-0.03em]">No frames yet.</h2>
      <p className="mt-3 max-w-[44ch] text-dim">
        This sheet fills in as images are added. Until then, the work is the place to look.
      </p>
      <p className="mt-5">
        <Link
          href="/work/"
          scroll={false}
          onClick={() => window.scrollTo({ top: 0 })}
          className="inline-flex min-h-11 items-center underline decoration-rule underline-offset-4 hover:decoration-ink"
        >
          Go to Work
        </Link>
      </p>
    </section>
  );
}
