"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "motion/react";
import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { Employment, FrameItem } from "@/data/collection";
import { cn } from "@/lib/cn";
import {
  countFor,
  hasPage,
  viewFromPath,
  type CollectionData,
  type View,
} from "@/lib/collection";
import type { ContactLink } from "@/lib/contact";
import { FEEDBACK, REFLOW } from "@/lib/motion";
import { useHashTarget } from "@/lib/use-hash-target";
import { isPlainClick } from "@/lib/use-modal";
import { FrameViewer, type RelatedLink } from "./frame-viewer";
import { FramesObject } from "./frames-object";
import {
  ContactObject,
  ExploringObject,
  RecordObject,
  StatementObject,
  type Profile,
} from "./info-objects";
import { ListView, type ListRow } from "./list-view";
import { NotesObject } from "./notes-object";
import { WorkObject } from "./work-object";
import { WorkPreview } from "./work-preview";
import { Wordmark } from "./wordmark";

type Mode = "explore" | "list";

type Props = {
  data: CollectionData;
  profile: Profile;
  employment: Employment[];
  links: ContactLink[];
};

const HEADINGS: Record<View, { title: string; descriptor: string; unit?: [string, string] }> = {
  index: {
    title: "Index",
    descriptor: "A living collection of things I make, collect, write, and notice.",
    unit: ["object", "objects"],
  },
  work: {
    title: "Work",
    descriptor: "Production software, with the role I held on each.",
    unit: ["project", "projects"],
  },
  frames: { title: "Frames.", descriptor: "Things I wanted to keep.", unit: ["frame", "frames"] },
  notes: {
    title: "Notes from the process.",
    descriptor: "Short observations and longer writing.",
    unit: ["note", "notes"],
  },
  info: { title: "Info", descriptor: "Profile, employment record, and contact." },
};

/** One placed object on the sheet. The key is stable across views. */
type Slot = { key: string; span: string; node: ReactNode };

const FULL = "col-span-4 md:col-span-12";

/**
 * The sheet. One mounted component renders every view, so switching between
 * Index, Work, Frames, Notes and Info moves the same objects into a new
 * composition instead of replacing the page.
 */
export function Collection({ data, profile, employment, links }: Props) {
  const view = viewFromPath(usePathname());
  const [mode, setMode] = useState<Mode>("explore");
  const { target, open, swap, close } = useHashTarget();

  const activeWork = data.works.find((work) => work.id === target);
  const activeFrame = data.frames.findIndex((frame) => frame.id === target);

  const related = useCallback(
    (frame: FrameItem): RelatedLink[] =>
      (frame.related ?? []).flatMap((id) => {
        const work = data.works.find((entry) => entry.id === id);
        if (work) return [{ id, label: work.title, href: `/work/${id}/` }];
        const note = data.notes.find((entry) => entry.id === id);
        if (note) return [{ id, label: note.title, href: hasPage(note) ? `/notes/${id}/` : `/notes/#${id}` }];
        return [];
      }),
    [data],
  );

  const slots = useMemo<Slot[]>(() => {
    const work = (index: number, variant: "lead" | "small" | "wide" | "half", span: string): Slot => {
      const item = data.works[index];
      return {
        key: `work-${item.id}`,
        span,
        node: <WorkObject item={item} variant={variant} selected={target === item.id} onOpen={open} />,
      };
    };
    const statement = (expanded: boolean, span: string): Slot => ({
      key: "statement",
      span,
      node: <StatementObject profile={profile} expanded={expanded} />,
    });
    const record = (expanded: boolean, span: string): Slot => ({
      key: "record",
      span,
      node: <RecordObject employment={employment} expanded={expanded} />,
    });
    const exploring = (expanded: boolean, span: string): Slot => ({
      key: "exploring",
      span,
      node: <ExploringObject profile={profile} expanded={expanded} />,
    });
    const framesSlot = (variant: "strip" | "sheet", span: string): Slot => ({
      key: "frames",
      span,
      node: <FramesObject frames={data.frames} variant={variant} activeId={target} onOpen={open} />,
    });
    const notesSlot = (variant: "digest" | "full", span: string): Slot => ({
      key: "notes",
      span,
      node: <NotesObject notes={data.notes} variant={variant} />,
    });

    switch (view) {
      case "work":
        return data.works.map((_, i) =>
          i === 0 ? work(i, "wide", FULL) : work(i, "half", "col-span-4 md:col-span-6"),
        );
      case "frames":
        return [framesSlot("sheet", FULL)];
      case "notes":
        return [notesSlot("full", FULL)];
      case "info":
        return [
          statement(true, "col-span-4 md:col-span-7"),
          record(true, "col-span-4 md:col-span-5"),
          exploring(true, "col-span-4 md:col-span-7"),
          ...(links.length
            ? [{ key: "contact", span: "col-span-4 md:col-span-5", node: <ContactObject links={links} /> }]
            : []),
        ];
      default: {
        const hasFrames = data.frames.length > 0;
        const hasNotes = data.notes.length > 0;
        const rest = data.works.slice(1);
        return [
          ...(data.works.length ? [work(0, "lead", "col-span-4 md:col-span-8 md:row-span-2")] : []),
          statement(false, "col-span-4 md:col-span-4"),
          record(false, "col-span-4 md:col-span-4"),
          ...rest.map((_, i) =>
            work(
              i + 1,
              "small",
              cn(
                // Two-up on phones; an odd one out takes the full width.
                rest.length % 2 === 1 && i === rest.length - 1 ? "col-span-4" : "col-span-2",
                i === 0 ? "md:col-span-5" : "md:col-span-4",
              ),
            ),
          ),
          exploring(false, "col-span-4 md:col-span-3"),
          // Empty collections are not padded with placeholders on the index.
          ...(hasFrames ? [framesSlot("strip", hasNotes ? "col-span-4 md:col-span-7" : FULL)] : []),
          ...(hasNotes ? [notesSlot("digest", hasFrames ? "col-span-4 md:col-span-5" : FULL)] : []),
          { key: "wordmark", span: cn(FULL, "pt-6 md:pt-10"), node: <Wordmark text="ARVAN" /> },
        ];
      }
    }
  }, [view, data, profile, employment, links, target, open]);

  const rows = useMemo<ListRow[]>(() => {
    const workRows: ListRow[] = data.works.map((item) => ({
      id: item.id,
      code: item.code,
      kind: "Work",
      title: item.title,
      detail: `${item.role}, ${item.employer}`,
      when: item.period,
      href: `/work/${item.id}/`,
      trigger: item.id,
      onClick: (event) => {
        if (!isPlainClick(event)) return;
        event.preventDefault();
        open(item.id);
      },
    }));
    const frameRows: ListRow[] = data.frames.map((item) => ({
      id: item.id,
      code: item.code,
      kind: "Frame",
      title: item.title,
      detail: item.caption,
      href: `/frames/#${item.id}`,
      trigger: item.id,
      onClick: (event) => {
        if (!isPlainClick(event)) return;
        event.preventDefault();
        open(item.id);
      },
    }));
    const noteRows: ListRow[] = data.notes.map((item) => {
      const external = item.form === "external" && !!item.externalUrl;
      return {
        id: item.id,
        code: item.code,
        kind: "Note",
        title: item.title,
        detail: item.summary,
        when: item.date,
        href: external ? item.externalUrl! : hasPage(item) ? `/notes/${item.id}/` : `/notes/#${item.id}`,
        external,
        // A field note is read in the explore presentation of Notes.
        onClick: !external && !hasPage(item) ? () => setMode("explore") : undefined,
      };
    });
    const infoRows: ListRow[] = [
      { id: "statement", code: "I.01", kind: "Info", title: "Profile", detail: profile.statement, href: "/info/" },
      {
        id: "record",
        code: "I.02",
        kind: "Info",
        title: "Employment record",
        detail: `${employment.length} roles`,
        when: `${employment[employment.length - 1]?.start} – ${employment[0]?.end}`,
        href: "/info/",
      },
      {
        id: "exploring",
        code: "I.03",
        kind: "Info",
        title: "Currently exploring",
        detail: profile.exploring.join(", "),
        href: "/info/",
      },
    ];
    switch (view) {
      case "work":
        return workRows;
      case "frames":
        return frameRows;
      case "notes":
        return noteRows;
      case "info":
        return [];
      default:
        return [...workRows, ...frameRows, ...noteRows, ...infoRows];
    }
  }, [view, data, profile, employment, open]);

  const heading = HEADINGS[view];
  const count = countFor(view, data);
  const countLabel =
    count !== undefined && heading.unit ? `${count} ${heading.unit[count === 1 ? 0 : 1]}` : undefined;
  const listing = mode === "list" && view !== "info";

  return (
    <LayoutGroup id="sheet">
      <MotionConfig reducedMotion="user" transition={REFLOW}>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-x-6 gap-y-2.5 pb-5 pt-6 md:pb-8 md:pt-9 rail:pt-8">
          <h1 className="text-[2rem] font-medium leading-[1] tracking-[-0.035em] md:text-[2.5rem]">
            {view === "index" && <span className="sr-only">{profile.name}, {profile.role}. </span>}
            {heading.title}
          </h1>
          <p className="col-span-2 row-start-2 max-w-[52ch] text-[0.9375rem] leading-snug text-dim md:col-span-1">
            {heading.descriptor}
          </p>

          {view !== "info" && (
            <div className="col-start-2 row-start-1 flex items-center gap-5 md:row-span-2 md:self-end">
              {countLabel && <p className="meta tabular hidden sm:block">{countLabel}</p>}
              <div role="group" aria-label="Presentation" className="flex border border-rule">
                {(["explore", "list"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={mode === option}
                    onClick={() => setMode(option)}
                    className={cn(
                      "meta flex h-11 items-center gap-2 px-3 transition-colors duration-150 md:h-9",
                      mode === option ? "bg-raised text-ink" : "hover:text-ink",
                    )}
                  >
                    <span className="flex w-[6px] justify-center">
                      {mode === option && <motion.span layoutId="mode-mark" className="mark" />}
                    </span>
                    {option === "explore" ? "Explore" : "List"}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {heading.title}
          {countLabel ? `, ${countLabel}` : ""}
          {listing ? ", list" : ""}
        </p>

        {listing ? (
          <ListView rows={rows} empty={`No ${heading.unit?.[1] ?? "entries"} yet.`} />
        ) : (
          <div className="relative grid grid-cols-4 gap-x-4 gap-y-12 border-t border-rule pt-6 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-5 md:gap-y-14 md:pt-8">
            <AnimatePresence mode="popLayout" initial={false}>
              {slots.map((slot) => (
                <motion.div
                  key={slot.key}
                  className={cn("min-w-0", slot.span)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { ...REFLOW, delay: 0.1 } }}
                  exit={{ opacity: 0, transition: FEEDBACK }}
                >
                  {slot.node}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <WorkPreview item={activeWork} onClose={close} />
        <FrameViewer frames={data.frames} index={activeFrame} related={related} onStep={swap} onClose={close} />
      </MotionConfig>
    </LayoutGroup>
  );
}
