import { frames, notes, works, type Kind } from "@/data/collection";
import { fixtureFrames, fixtureNotes } from "@/data/fixtures";
import { codeFor, type Coded, type CollectionData } from "./collection";

// Server-side only: imported by layouts, pages and the sitemap, never by a
// client component, so fixtures cannot reach a browser bundle of a real build.

/** Development fixtures are opt-in and never part of a normal build. */
export const fixturesEnabled = process.env.NEXT_PUBLIC_FIXTURES === "1";

function publish<T extends { status: string; kind: Kind }>(list: T[]): Coded<T>[] {
  return list
    .filter((entry) => entry.status === "published")
    .map((entry, i) => ({ ...entry, code: codeFor(entry.kind, i + 1) }));
}

export function getCollection(): CollectionData {
  return {
    works: publish(works),
    frames: publish(fixturesEnabled ? [...frames, ...fixtureFrames] : frames),
    notes: publish(fixturesEnabled ? [...notes, ...fixtureNotes] : notes),
  };
}
