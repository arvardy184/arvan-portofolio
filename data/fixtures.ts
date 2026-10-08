// DEVELOPMENT FIXTURES — not portfolio content.
//
// These exist only to exercise the Frames sheet, the image viewer, and the
// Notes layouts while no real material has been supplied. They load only when
// NEXT_PUBLIC_FIXTURES=1 and every one is labeled as a fixture on screen.
// Nothing here may be presented as Arvan's photography or writing.

import type { FrameItem, NoteItem } from "./collection";

type Study = { w: number; h: number; ground: string; figure: string };

// Nonrepresentational studies in deliberately un-photographic color, so the
// grayscale-thumbnail / original-color-viewer behavior can be checked.
const studies: Study[] = [
  { w: 1500, h: 1000, ground: "#1d3f8f", figure: "#f2c230" },
  { w: 1000, h: 1500, ground: "#0f6b52", figure: "#f3ede0" },
  { w: 1200, h: 1200, ground: "#b3321f", figure: "#141414" },
  { w: 1600, h: 900, ground: "#2a2a2a", figure: "#4fb3d9" },
  { w: 1000, h: 1250, ground: "#e0d6c2", figure: "#1d3f8f" },
  { w: 1500, h: 1000, ground: "#51307a", figure: "#f2c230" },
  { w: 1800, h: 800, ground: "#0e0e0e", figure: "#e8e8e8" },
];

function studySvg({ w, h, ground, figure }: Study, n: number): string {
  const unit = Math.min(w, h);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">` +
    `<rect width="${w}" height="${h}" fill="${ground}"/>` +
    `<circle cx="${w * 0.36}" cy="${h * 0.46}" r="${unit * 0.28}" fill="${figure}"/>` +
    `<rect x="${w * 0.52}" y="${h * 0.18}" width="${w * 0.3}" height="${h * 0.64}" fill="none" stroke="${figure}" stroke-width="${unit * 0.012}"/>` +
    `<line x1="0" y1="${h * 0.82}" x2="${w}" y2="${h * 0.82}" stroke="${figure}" stroke-width="${unit * 0.006}"/>` +
    `<text x="${w * 0.04}" y="${h * 0.94}" font-family="monospace" font-size="${unit * 0.045}" fill="${figure}">FIXTURE ${String(n).padStart(2, "0")} / NOT PORTFOLIO CONTENT</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const fixtureFrames: FrameItem[] = studies.map((study, i) => ({
  id: `fixture-frame-${i + 1}`,
  kind: "frame",
  status: "published",
  fixture: true,
  title: `Fixture study ${i + 1}`,
  summary: "Development fixture.",
  caption: i % 3 === 2 ? undefined : "Fixture caption. One short line sits here.",
  media: {
    src: studySvg(study, i + 1),
    width: study.w,
    height: study.h,
    alt: `Development fixture ${i + 1}: an abstract geometric study, not portfolio content.`,
  },
}));

export const fixtureNotes: NoteItem[] = [
  {
    id: "fixture-field-note",
    kind: "note",
    status: "published",
    fixture: true,
    form: "field-note",
    title: "Fixture field note",
    summary: "A short note is read in place, without leaving the list.",
    body: [
      "This is fixture text standing in for a short field note. It is here to check line length, spacing, and how a note of two or three sentences sits beside longer entries.",
    ],
  },
  {
    id: "fixture-essay",
    kind: "note",
    status: "published",
    fixture: true,
    form: "essay",
    title: "Fixture essay with a longer title to test wrapping",
    summary: "A longer local essay opens on its own page.",
    body: [
      "This is fixture text standing in for a longer essay. It exists to check the reading measure, paragraph spacing, and the item page template.",
      "A second fixture paragraph follows so the page has enough length to judge rhythm. None of this is published writing.",
    ],
  },
  {
    id: "fixture-external",
    kind: "note",
    status: "published",
    fixture: true,
    form: "external",
    title: "Fixture external article",
    summary: "A note published elsewhere links out to its real destination.",
    externalUrl: "https://example.com/",
    publication: "example.com",
  },
];
