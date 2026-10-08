# Missing assets

What the site still needs from you, and exactly where each thing goes. Nothing
below blocks the site from running: a missing item simply does not render.

## 1. Confirm these links (currently live on the site)

These were not supplied with the brief. They were carried over from the
previous site data in this repository (`_previous/data/portfolio.ts`) and are
rendered now. Check each one; to remove a link everywhere, delete its value in
`contact` in `data/collection.ts`.

| Link            | Current value                                                                          | Checked on 2026-10-08                                                |
| --------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Email           | `arvanardana1@gmail.com`                                                               | Not verifiable from here. Please confirm.                            |
| GitHub          | `https://github.com/arvardy184`                                                        | Responds; the profile name is "Arvan Ardana".                        |
| LinkedIn        | `https://linkedin.com/in/arvanardana`                                                  | LinkedIn blocks automated checks. Please confirm.                    |
| Résumé          | `https://drive.google.com/file/d/1EP8HDGFKnUYd1pp4EAxOh0ALU4cSMlNe/view?usp=sharing`   | Responds. Contents and sharing setting not inspected.                |
| Okejek on Play  | `https://play.google.com/store/apps/details?id=id.okejack.okejackapp&hl=en`            | Responds; listing title is "OKEJEK Transportasi & Makanan".          |

Also confirm two statements made from context rather than from the brief:

- "Source code is private." appears on all three projects. The previous data
  marked ISO Document Management and the attendance system as private; Okejek
  is assumed private as a company product. Edit `sourceNote` on any project
  where this is wrong.
- Each project is attributed to an employer (ISO Document Management to PT
  Inovasi Solusindo Sukses, the attendance system to PT Putra Kencana). This
  mapping comes from the previous data's role descriptions.

## 2. Project screenshots

None exist, so each project shows a typographic plate instead of imagery.

- Put real screenshots in `public/work/<project-id>/`.
- Add them to that project's `media` array in `data/collection.ts` with the
  true pixel `width` and `height` and a descriptive `alt`.
- The first image replaces the plate on the sheet and in the preview; the rest
  appear on the project's page.

Project ids: `okejek`, `iso-document-management`, `employee-attendance-system`.

Only real screenshots of the shipped apps. Check that nothing in them is
confidential before publishing.

## 3. Frames

No images have been supplied. `/frames/` shows an empty sheet, and Frames stays
off the index until there is at least one.

- Put images in `public/frames/`. Do not pre-convert to grayscale: the sheet
  applies it in CSS and the viewer shows the original.
- Add an entry per image to `frames` in `data/collection.ts`:

  ```ts
  {
    id: "unique-url-safe-id",
    kind: "frame",
    status: "published",
    title: "Short factual title",      // used for labels, not shown as a caption
    summary: "",
    caption: "One short observation.", // optional
    media: { src: "/frames/file.jpg", width: 3000, height: 2000, alt: "What is in the picture" },
    related: ["okejek"],               // optional, only for real relationships
  }
  ```

Needed from you: the images, their real dimensions, alt text, and any captions.
No locations, dates, or camera details are shown unless you add them.

## 4. Notes

No writing has been supplied. `/notes/` shows an empty state, and Notes stays
off the index until there is at least one.

Add entries to `notes` in `data/collection.ts`. Three forms are supported:

| `form`       | Needs                                   | Behaviour                         |
| ------------ | --------------------------------------- | --------------------------------- |
| `field-note` | `body` (a paragraph or two)             | Read in place on `/notes/`        |
| `essay`      | `body` (paragraphs)                     | Gets its own page `/notes/<id>/`  |
| `external`   | `externalUrl`, optionally `publication` | Links out to the real destination |

`date` is optional; set it only to the real publication date (`YYYY-MM-DD`).
Use `status: "draft"` to keep an entry in the file without publishing it.
"Rebuilding without a handover" is a possible topic, not a published note.

## 5. Other gaps

- **Store or project URLs** for ISO Document Management and the attendance
  system: none known, none shown.
- **Okejek Google login / Firebase ownership issue**: unresolved when reported,
  so it is not mentioned on the site.
- **Deployment domain**: canonical URLs use `https://arvardy.netlify.app`
  (`site.url` in `data/collection.ts`). Change it if the site moves.
- **Open Graph image**: `public/og.png` is a typographic card generated from
  the site's own type, not a photograph. Replace it if you want something else.

## Development fixtures

`data/fixtures.ts` holds abstract studies and placeholder notes used to build
and test the Frames viewer and Notes layouts. They are labeled as fixtures on
screen, load only with `NEXT_PUBLIC_FIXTURES=1`, and are not part of a normal
build. They are not portfolio content and should never be published.
