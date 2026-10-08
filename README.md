# Arvan / Personal Index

Portfolio of Arvan Yudhistia, software engineer. A browsable index of work,
frames, and notes rather than a stacked landing page.

- Design rationale: [DESIGN.md](DESIGN.md)
- Content still needed: [MISSING_ASSETS.md](MISSING_ASSETS.md)

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npm run typecheck  # tsc --noEmit
```

To develop the Frames viewer and Notes layouts before real content exists:

```bash
NEXT_PUBLIC_FIXTURES=1 npm run dev               # bash
$env:NEXT_PUBLIC_FIXTURES = "1"; npm run dev     # PowerShell
```

Fixture builds show a banner and must not be deployed.

## Stack

Next.js 15 (App Router, static export), React 19, TypeScript, Tailwind CSS 3,
Motion, lucide-react. Four Aceternity UI components are adapted in place; see
the table in DESIGN.md.

## Where things live

| Path                       | What                                                         |
| -------------------------- | ------------------------------------------------------------ |
| `data/collection.ts`       | All real content: profile, employment, contact, work, frames, notes |
| `data/fixtures.ts`         | Development-only fixtures                                    |
| `lib/get-collection.ts`    | Loads published entries on the server (and fixtures, if on)  |
| `lib/collection.ts`        | Types, catalog codes, views: safe for client components      |
| `app/(index)/`             | Index, Work, Frames, Notes, Info: one shared sheet           |
| `app/[kind]/[slug]/`       | Static pages for single projects and essays                  |
| `components/collection/`   | The sheet, its objects, the preview, the frame viewer        |
| `components/chrome/`       | Identity frame, view navigation, command palette             |

## Routes

`/`, `/work/`, `/frames/`, `/notes/`, `/info/`, `/work/<id>/`, `/notes/<id>/`.
An opened preview or frame is held in the hash (`/#okejek`,
`/frames/#<id>`), so it survives reload and closes on Back.

## Deploy

`netlify.toml` builds with `npm run build` and publishes `out/`.
