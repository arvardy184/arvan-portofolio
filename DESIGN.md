# ARVAN / PERSONAL INDEX — design notes

A personal index of work, frames, and notes, laid out like a photographer's
contact sheet: numbered objects on a dark sheet, one red grease-pencil mark
for whatever is currently selected.

## Identity

| Token     | Value     | Use                                               |
| --------- | --------- | ------------------------------------------------- |
| `bg`      | `#0A0A0A` | The sheet                                         |
| `raised`  | `#141414` | Plates, dialogs                                   |
| `ink`     | `#F5F5F5` | Primary text, outlines, focus ring                |
| `dim`     | `#A6A6A6` | Secondary text and metadata (8:1 on the sheet)    |
| `rule`    | `#303030` | Hairlines, frame edges                            |
| `signal`  | `#FF2D20` | Selection only: active view, hovered/open object  |

Red has one meaning, borrowed from the contact sheet: _this one is selected_.
It never colors a surface, heading, border, or button. Selected states always
pair it with a shape (a square marker) and a text change, so nothing depends on
color alone.

Type: **Space Grotesk** for titles and reading text, **IBM Plex Mono** for
catalog codes and metadata (both OFL, loaded through `next/font`). Mono is
reserved for things that behave like edge markings: codes (`W.01`), kinds,
dates, counts.

The static signature is the **plate**: a raised frame holding one oversized
outlined word, cropped by the frame edge. It is the stand-in for project
imagery until real screenshots exist, and it is typographic on purpose so it
can never be mistaken for product evidence. When `media` is supplied the same
slot shows the image.

## Composition

The page is one sheet, not stacked sections. An identity frame holds the name,
the five views, and contact links; the sheet holds objects on a 12-column grid
(4 columns on phones).

```
┌ rail ────────┬ sheet ───────────────────────────────────────────┐
│ Arvan        │ Index                         6 objects  Explore │
│ Yudhistia    │ ┌───────────────────────────┐ I build products — │
│              │ │ W.01                      │ and solve the …    │
│ ■ Index   06 │ │                           │ ────────────────── │
│   Work    03 │ │ Okejek (outlined, cropped)│ Record             │
│   Frames  00 │ └───────────────────────────┘ 3 roles            │
│   Notes   00 │ ┌──────────────┐ ┌──────────┐ Exploring          │
│   Info       │ │ W.02 ISO     │ │ W.03 Att │ …                  │
│ Résumé Email │ └──────────────┘ └──────────┘                    │
└──────────────┴──────────────────────────────────────────────────┘
```

- Objects are uneven by design: one lead plate, two smaller plates, and
  type-only objects (statement, record, exploring) that sit directly on the
  sheet under a hairline. Frames and notes join the index once they exist;
  empty collections are never padded with placeholders on the index.
- Every object carries a stable catalog code (`W.01`, `F.03`, `N.02`, `I.01`),
  its kind, a title or visual, minimal metadata, and a visible "Open" control.
- Each view has its own presentation in the same language: Work pairs plates
  with professional context, Frames is a justified contact sheet at original
  aspect ratios, Notes is a typographic column, Info is a profile and record.
- **List** is the compact alternative to **Explore**: one row per object, no
  layout animation, fully usable by touch and with reduced motion.

## Navigation

`Index / Work / Frames / Notes / Info` are real routes (`/`, `/work/`, …)
rendered by one persistent client shell, so switching views reflows the same
mounted objects instead of loading a new page. Item pages (`/work/okejek/`,
`/notes/<slug>/`) are ordinary static routes. Previews and the frame viewer
live in the URL hash (`/#okejek`, `/frames/#<id>`), so reload, sharing, and
Back all behave; every enhanced control is an ordinary link underneath.

Keyboard: `Ctrl/⌘ K` opens the command palette (there is also a visible
button), `1`–`5` switch views, arrows and `Esc` drive the viewer. Shortcuts are
ignored while typing.

## Aceternity adaptations

Source was taken from the Aceternity registry and rewritten for this design;
no demo content, color, or layout is kept.

| Aceternity        | Here                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| Expandable Card   | `work-preview.tsx` — plate, title and meta share `layoutId`s with the grid object. Added: portal, focus trap and restore, inert background, Back closes. |
| Layout Grid       | `frames-object.tsx` + `frame-viewer.tsx` — thumbnail expands into the viewer by `layoutId`; rebuilt as a justified sheet with prev/next, swipe, captions. |
| Animated Tabs     | `collection-nav.tsx` — only the shared-layout active indicator is kept, reduced to a 6px red marker.     |
| Text Hover Effect | `wordmark.tsx` — the ARVAN colophon, used once. Monochrome; the mask follows the pointer without React state per frame. |

One animation engine (`motion`). Three signature interactions, nothing else
moves: collection reflow (350ms), object expansion (500ms), gallery
inspection. `MotionConfig reducedMotion="user"` turns layout movement into
plain fades.

## Mobile

- 360–767px: compact identity header, then the sheet immediately. Views sit in
  a bottom bar within thumb reach, with safe-area padding.
- The index stays varied: a tall lead plate, type objects, a two-up pair of
  small plates. Nothing is hover-only; codes, titles and "Open" are always
  visible. No pointer tracking, no pinned scrolling.
- The preview becomes a full-height sheet that scrolls naturally; viewer
  controls sit at the bottom; horizontal swipe uses `touch-action: pan-y` so
  vertical scrolling is never trapped.
- 768–1099px: identity and views move to a top bar; the 12-column sheet is
  unchanged. From 1100px the identity frame becomes a fixed left rail.

## Content

All content lives in `data/collection.ts` as a typed collection
(`work | frame | note | info`). Development fixtures live in
`data/fixtures.ts`, load only with `NEXT_PUBLIC_FIXTURES=1`, and are read only
on the server, so a normal build ships none of them; a banner marks every
fixture build. Missing links render nothing. See `MISSING_ASSETS.md`.
