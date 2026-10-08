"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { NoteItem } from "@/data/collection";
import { cn } from "@/lib/cn";
import { formatDate, hasPage, type Coded } from "@/lib/collection";
import { REFLOW } from "@/lib/motion";

type Props = {
  notes: Coded<NoteItem>[];
  /** "digest" is the index excerpt; "full" is the Notes view. */
  variant: "digest" | "full";
};

const DIGEST_COUNT = 3;

const FORM_LABEL: Record<NoteItem["form"], string> = {
  "field-note": "Field note",
  essay: "Essay",
  external: "Elsewhere",
};

const LINK =
  "underline decoration-rule decoration-1 underline-offset-[0.18em] transition-colors duration-150 hover:decoration-ink";

/**
 * Notes are set as type, never as cards. Short field notes are read right
 * here; essays open their own page; pieces published elsewhere link out.
 */
export function NotesObject({ notes, variant }: Props) {
  if (notes.length === 0) return <EmptyNotes />;

  const full = variant === "full";
  const shown = full ? notes : notes.slice(0, DIGEST_COUNT);

  return (
    <section aria-label="Notes" className={cn(!full && "border-t border-rule pt-4")}>
      {!full && (
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <h2 className="text-[1.375rem] font-medium tracking-[-0.025em]">Notes</h2>
          <Link
            href="/notes/"
            scroll={false}
            onClick={() => window.scrollTo({ top: 0 })}
            className="meta shrink-0 text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
          >
            All {notes.length}
          </Link>
        </div>
      )}

      <ol>
        {shown.map((note) => {
          const Heading = full ? "h2" : "h3";
          return (
            <motion.li
              key={note.id}
              id={note.id}
              layout="position"
              transition={REFLOW}
              className={cn(
                "scroll-mt-6 border-b border-rule",
                full
                  ? "grid gap-x-8 gap-y-3 py-8 first:pt-0 md:grid-cols-[8.5rem_minmax(0,42rem)] md:py-10"
                  : "py-5",
              )}
            >
              <p className={cn("meta flex gap-3", full ? "md:flex-col md:gap-1.5 md:pt-2.5" : "mb-2")}>
                <span className="text-ink">{note.code}</span>
                <span>{FORM_LABEL[note.form]}</span>
                {note.date && <time dateTime={note.date}>{formatDate(note.date)}</time>}
              </p>

              <div>
                <Heading
                  className={cn(
                    "text-balance font-medium",
                    full
                      ? "text-[1.75rem] leading-[1.08] tracking-[-0.03em] md:text-[2.5rem]"
                      : "text-[1.25rem] leading-[1.2] tracking-[-0.02em]",
                  )}
                >
                  <NoteTitle note={note} linkToList={!full} />
                </Heading>

                {full && note.form === "field-note" && note.body?.length ? (
                  <div className="prose-note mt-4 text-pretty text-[1.0625rem] leading-[1.6]">
                    {note.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className={cn("text-pretty text-dim", full ? "mt-4 text-[1.0625rem]" : "mt-1.5")}>
                    {note.summary}
                  </p>
                )}

                {full && note.form === "external" && note.publication && (
                  <p className="meta mt-4">Published on {note.publication}</p>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}

function NoteTitle({ note, linkToList }: { note: Coded<NoteItem>; linkToList: boolean }) {
  if (note.form === "external" && note.externalUrl) {
    return (
      <a href={note.externalUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
        {note.title}
        <ArrowUpRight aria-hidden className="ml-1 inline-block h-[0.7em] w-[0.7em] align-baseline text-dim" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  if (hasPage(note)) {
    return (
      <Link href={`/notes/${note.id}/`} className={LINK}>
        {note.title}
      </Link>
    );
  }
  // A field note has no page of its own: from the index, go to it in the list.
  if (linkToList) {
    return (
      <Link href={`/notes/#${note.id}`} className={LINK}>
        {note.title}
      </Link>
    );
  }
  return <>{note.title}</>;
}

function EmptyNotes() {
  return (
    <section aria-label="Notes" className="max-w-[44rem]">
      <h2 className="text-[1.75rem] font-medium leading-[1.1] tracking-[-0.03em]">No notes published yet.</h2>
      <p className="mt-3 max-w-[44ch] text-dim">
        Short observations and longer writing will be listed here once they are finished.
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
