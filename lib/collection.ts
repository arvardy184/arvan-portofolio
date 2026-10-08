import type { FrameItem, Kind, NoteItem, WorkItem } from "@/data/collection";

// Types and helpers that are safe to import from client components. Nothing
// here imports content, so neither the collection nor the development
// fixtures are pulled into a browser bundle; the data itself is loaded on the
// server in ./get-collection.ts and handed down as props.

/** A published entry plus its stable catalog code, e.g. "W.01". */
export type Coded<T> = T & { code: string };

export type CollectionData = {
  works: Coded<WorkItem>[];
  frames: Coded<FrameItem>[];
  notes: Coded<NoteItem>[];
};

const LETTER: Record<Kind, string> = { work: "W", frame: "F", note: "N", info: "I" };

export function codeFor(kind: Kind, position: number): string {
  return `${LETTER[kind]}.${String(position).padStart(2, "0")}`;
}

/** Notes with a local body long enough to deserve their own page. */
export function hasPage(note: NoteItem): boolean {
  return note.form === "essay" && !!note.body?.length;
}

export const views = [
  { id: "index", label: "Index", href: "/" },
  { id: "work", label: "Work", href: "/work/" },
  { id: "frames", label: "Frames", href: "/frames/" },
  { id: "notes", label: "Notes", href: "/notes/" },
  { id: "info", label: "Info", href: "/info/" },
] as const;

export type View = (typeof views)[number]["id"];

/** Item routes highlight the collection they belong to. */
export function viewFromPath(pathname: string): View {
  const first = pathname.split("/").filter(Boolean)[0];
  const match = views.find((view) => view.id === first);
  return match ? match.id : "index";
}

/** Info objects that appear on the index: statement, record, exploring. */
export const INFO_OBJECTS = 3;

export function countFor(view: View, data: CollectionData): number | undefined {
  switch (view) {
    case "index":
      return data.works.length + data.frames.length + data.notes.length + INFO_OBJECTS;
    case "work":
      return data.works.length;
    case "frames":
      return data.frames.length;
    case "notes":
      return data.notes.length;
    default:
      return undefined;
  }
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
