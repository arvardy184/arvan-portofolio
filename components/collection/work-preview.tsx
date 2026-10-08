"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useId, useRef } from "react";
import { ArrowUpRight, Plus, X } from "lucide-react";
import type { WorkItem } from "@/data/collection";
import type { Coded } from "@/lib/collection";
import { EXPAND, FEEDBACK } from "@/lib/motion";
import { useModal } from "@/lib/use-modal";
import { useOutsideClick } from "@/lib/use-outside-click";
import { Portal } from "../chrome/portal";
import { Plate } from "./plate";

type Props = {
  item: Coded<WorkItem> | undefined;
  onClose: () => void;
};

// Adapted from Aceternity UI's Expandable Card. Kept: the shared-layout idea
// (plate, title and role are the same elements on the sheet and in the opened
// view), the dimmed overlay, outside-click and Escape. Added: a portal with an
// inert page behind, a focus trap and focus restoration, a persistent close
// control, natural scrolling on phones, and a link to the full page.
export function WorkPreview({ item, onClose }: Props) {
  return (
    <Portal>
      <AnimatePresence>{item && <Preview key={item.id} item={item} onClose={onClose} />}</AnimatePresence>
    </Portal>
  );
}

function Preview({ item, onClose }: { item: Coded<WorkItem>; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useModal(panel, {
    onClose,
    restore: () => document.querySelector<HTMLElement>(`[data-trigger="${item.id}"]`),
  });
  useOutsideClick(panel, onClose);

  // Everything that is not a shared element fades in after the object has
  // started to move, so the eye follows the object rather than the chrome.
  const settle = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { ...EXPAND, delay: 0.12 } },
    exit: { opacity: 0, transition: FEEDBACK },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center md:items-center md:p-6">
      <motion.div
        className="absolute inset-0 bg-bg/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative flex w-full flex-col md:max-h-[min(54rem,calc(100dvh-3rem))] md:max-w-[56rem]"
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 border-rule bg-bg md:border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          {...settle}
          className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-10"
        >
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            className="meta flex h-11 items-center gap-2 border border-rule bg-bg px-3 text-ink transition-colors duration-150 hover:border-dim"
          >
            Close
            <X size={14} aria-hidden />
          </button>
        </motion.div>

        <motion.div layoutScroll className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <Plate
            id={item.id}
            code={item.code}
            mark={item.mark}
            media={item.media[0]}
            original
            // Capped so a short landscape screen still shows the title on open.
            className="aspect-[16/10] max-h-[46dvh] w-full sm:aspect-[21/9]"
          />

          <div className="grid gap-x-10 gap-y-9 px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-7 md:grid-cols-12 md:px-9 md:pb-9 md:pt-8">
            <div className="md:col-span-7">
              <motion.h2
                id={titleId}
                layoutId={`title-${item.id}`}
                layout="position"
                transition={EXPAND}
                className="w-fit text-[2.25rem] font-medium leading-[1] tracking-[-0.04em] md:text-[3rem]"
              >
                {item.title}
              </motion.h2>
              <motion.p
                layoutId={`role-${item.id}`}
                layout="position"
                transition={EXPAND}
                className="mt-3 w-fit text-[1.0625rem] leading-snug text-dim"
              >
                {item.role}
              </motion.p>

              <motion.div {...settle}>
                <p className="mt-7 text-pretty text-[1.1875rem] leading-[1.45]">{item.summary}</p>
                {item.body.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-pretty text-dim">
                    {paragraph}
                  </p>
                ))}

                {item.detail && (
                  <details className="group mt-7 border-y border-rule">
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 [&::-webkit-details-marker]:hidden">
                      <span className="font-medium">{item.detail.title}</span>
                      <Plus
                        size={16}
                        aria-hidden
                        className="shrink-0 text-dim transition-transform duration-150 group-open:rotate-45"
                      />
                    </summary>
                    <p className="pb-5 text-pretty text-dim">{item.detail.body}</p>
                  </details>
                )}
              </motion.div>
            </div>

            <motion.dl {...settle} className="self-start md:col-span-5 md:pt-2">
              <Fact term="Company">{item.employer}</Fact>
              <Fact term="Period">{item.period}</Fact>
              <Fact term="Built with">{item.technologies.join(", ")}</Fact>
              {item.sourceNote && <Fact term="Source">{item.sourceNote}</Fact>}
              {item.links.length > 0 && (
                <Fact term="Links">
                  {item.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-8 items-center gap-1 underline decoration-rule underline-offset-4 hover:decoration-ink"
                    >
                      {link.label}
                      <ArrowUpRight size={14} aria-hidden className="text-dim" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                </Fact>
              )}
            </motion.dl>

            <motion.p {...settle} className="border-t border-rule pt-5 md:col-span-12">
              <Link
                href={`/work/${item.id}/`}
                className="inline-flex min-h-11 items-center gap-1.5 underline decoration-rule underline-offset-4 hover:decoration-ink"
              >
                Open {item.title} as a page
              </Link>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Fact({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-x-4 border-t border-rule py-3 first:border-t-0 first:pt-0 md:first:border-t md:first:pt-3">
      <dt className="meta pt-1">{term}</dt>
      <dd className="text-[0.9375rem] leading-snug">{children}</dd>
    </div>
  );
}
