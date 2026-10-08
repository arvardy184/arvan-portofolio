"use client";

import { motion } from "motion/react";
import type { Media } from "@/data/collection";
import { cn } from "@/lib/cn";
import { EXPAND } from "@/lib/motion";

type Props = {
  id: string;
  code: string;
  /** Word set large while there is no screenshot. Decorative. */
  mark: string;
  /** A real screenshot, when one exists, replaces the typographic mark. */
  media?: Media;
  /** Show the image in its original color (opened views). */
  original?: boolean;
  className?: string;
};

/**
 * The visual half of a work object. The plate, its mark, and its code each
 * carry a layoutId so the same object can move between the sheet, a different
 * view, and the opened preview.
 */
export function Plate({ id, code, mark, media, original, className }: Props) {
  return (
    <motion.div
      layoutId={`plate-${id}`}
      transition={EXPAND}
      style={{ borderRadius: 2 }}
      className={cn("plate", className)}
    >
      {media ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.src}
          width={media.width}
          height={media.height}
          alt={media.alt}
          loading="lazy"
          decoding="async"
          className={cn("absolute inset-0 h-full w-full object-cover object-top", !original && "thumb")}
        />
      ) : (
        <motion.span
          layoutId={`plate-mark-${id}`}
          transition={EXPAND}
          aria-hidden
          className="plate-mark"
        >
          {mark}
        </motion.span>
      )}
      <motion.span
        layoutId={`plate-code-${id}`}
        layout="position"
        transition={EXPAND}
        className="meta absolute left-[14px] top-[14px] flex items-center gap-2 text-ink"
      >
        {code}
        <span className="select-mark mark" aria-hidden />
      </motion.span>
    </motion.div>
  );
}
