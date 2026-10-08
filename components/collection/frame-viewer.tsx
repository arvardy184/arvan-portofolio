"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { FrameItem } from "@/data/collection";
import type { Coded } from "@/lib/collection";
import { EXPAND, FEEDBACK } from "@/lib/motion";
import { useModal } from "@/lib/use-modal";
import { Portal } from "../chrome/portal";

export type RelatedLink = { id: string; label: string; href: string };

type Props = {
  frames: Coded<FrameItem>[];
  /** Index into `frames`, or -1 when closed. */
  index: number;
  related: (frame: FrameItem) => RelatedLink[];
  onStep: (id: string) => void;
  onClose: () => void;
};

// The opened state of the Frames sheet (see frames-object.tsx for the Layout
// Grid adaptation). The thumbnail grows into the viewer through a shared
// layoutId; inside, images keep their aspect ratio and original color.
export function FrameViewer({ frames, index, related, onStep, onClose }: Props) {
  return (
    <Portal>
      <AnimatePresence>
        {index >= 0 && (
          <Viewer frames={frames} index={index} related={related} onStep={onStep} onClose={onClose} />
        )}
      </AnimatePresence>
    </Portal>
  );
}

const SWIPE_DISTANCE = 48;

function Viewer({ frames, index, related, onStep, onClose }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const frame = frames[index];
  const current = useRef(frame.id);
  current.current = frame.id;

  // After the first step, images swap in place instead of flying in from
  // their thumbnails; only opening and closing use the shared transition.
  const [stepped, setStepped] = useState(false);
  const [direction, setDirection] = useState(1);
  const gesture = useRef<{ x: number; y: number } | null>(null);

  useModal(root, {
    onClose,
    restore: () => document.querySelector<HTMLElement>(`[data-trigger="${current.current}"]`),
  });

  const step = (delta: number) => {
    if (frames.length < 2) return;
    setStepped(true);
    setDirection(delta);
    onStep(frames[(index + delta + frames.length) % frames.length].id);
  };
  const stepRef = useRef(step);
  stepRef.current = step;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") stepRef.current(1);
      else if (event.key === "ArrowLeft") stepRef.current(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const ratio = frame.media.width / frame.media.height;
  const links = related(frame);
  const many = frames.length > 1;

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`Frame ${frame.code}`}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex flex-col"
    >
      <motion.div
        className="absolute inset-0 bg-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { ...FEEDBACK, delay: 0.15 } }}
        exit={{ opacity: 0, transition: FEEDBACK }}
        className="relative flex h-16 shrink-0 items-center justify-between pl-4 pr-3 pt-[env(safe-area-inset-top)] md:pl-6 md:pr-5"
      >
        <p className="meta flex items-center gap-2.5 text-ink" aria-live="polite">
          <span className="mark" aria-hidden />
          {frame.code}
          <span className="tabular text-dim">
            {index + 1} of {frames.length}
          </span>
        </p>
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          className="meta flex h-11 items-center gap-2 border border-rule bg-bg px-3 text-ink transition-colors duration-150 hover:border-dim"
        >
          Close
          <X size={14} aria-hidden />
        </button>
      </motion.header>

      {/* pan-y keeps vertical scrolling and pinch-zoom native; only a clearly
          horizontal drag is read as previous / next. */}
      <div
        className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-4 md:px-6"
        onPointerDown={(event) => {
          if (event.pointerType === "mouse") return;
          gesture.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={(event) => {
          const start = gesture.current;
          gesture.current = null;
          if (!start) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => (gesture.current = null)}
      >
        <motion.div
          key={frame.id}
          layoutId={`frame-${frame.id}`}
          initial={stepped ? { opacity: 0, x: direction * 16 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...FEEDBACK, duration: 0.2, layout: stepped ? { duration: 0 } : EXPAND }}
          style={{
            aspectRatio: ratio,
            // Largest box of this ratio that fits the space between the bars.
            width: `min(100%, calc((100dvh - 12.5rem) * ${ratio}))`,
          }}
          className="bg-raised"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frame.media.src}
            width={frame.media.width}
            height={frame.media.height}
            alt={frame.media.alt}
            draggable={false}
            className="block h-full w-full select-none object-contain"
          />
        </motion.div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { ...FEEDBACK, delay: 0.15 } }}
        exit={{ opacity: 0, transition: FEEDBACK }}
        className="relative flex shrink-0 flex-col gap-3 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 md:flex-row md:items-end md:justify-between md:px-6 md:pb-5"
      >
        <div className="min-h-[2.75rem] max-w-[52ch]">
          {frame.caption && <p className="text-[0.9375rem] leading-snug">{frame.caption}</p>}
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="mt-1 inline-flex min-h-8 items-center text-[0.9375rem] text-dim underline decoration-rule underline-offset-4 hover:text-ink"
            >
              Related: {link.label}
            </Link>
          ))}
        </div>

        {many && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              className="meta flex h-12 flex-1 items-center justify-center gap-2 border border-rule px-4 text-ink transition-colors duration-150 hover:border-dim md:h-11 md:flex-none"
            >
              <ArrowLeft size={14} aria-hidden />
              Previous
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="meta flex h-12 flex-1 items-center justify-center gap-2 border border-rule px-4 text-ink transition-colors duration-150 hover:border-dim md:h-11 md:flex-none"
            >
              Next
              <ArrowRight size={14} aria-hidden />
            </button>
          </div>
        )}
      </motion.footer>
    </div>
  );
}
