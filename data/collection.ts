// Single source of truth for everything the site says. Only verified content
// belongs here. Development fixtures live in ./fixtures.ts and never mix in
// unless NEXT_PUBLIC_FIXTURES=1 — see lib/collection.ts.

export type Kind = "work" | "frame" | "note" | "info";

/** Only "published" entries are rendered or routed. */
export type Status = "published" | "draft";

export type Media = {
  src: string;
  /** Intrinsic pixel size, used to reserve layout space. */
  width: number;
  height: number;
  alt: string;
};

export type ExternalLink = {
  label: string;
  href: string;
};

type Base = {
  /** URL-safe and unique across the whole collection. */
  id: string;
  title: string;
  summary: string;
  status: Status;
  /** Ids of related entries. Only set real relationships. */
  related?: string[];
  /** True for development fixtures. Never set in this file. */
  fixture?: boolean;
};

export type WorkItem = Base & {
  kind: "work";
  /** Short word set large on the plate while no screenshot exists. */
  mark: string;
  role: string;
  employer: string;
  period: string;
  /** Preview copy, 100–180 words in total with the summary. */
  body: string[];
  /** Optional extra detail, shown behind a disclosure. */
  detail?: { title: string; body: string };
  technologies: string[];
  /** Real screenshots only. Empty until supplied. */
  media: Media[];
  links: ExternalLink[];
  sourceNote?: string;
};

export type FrameItem = Base & {
  kind: "frame";
  media: Media;
  /** One short observation. */
  caption?: string;
};

export type NoteItem = Base & {
  kind: "note";
  /** ISO date, only when the real publication date is known. */
  date?: string;
  /** Short notes carry their whole text in `body` and are read in place. */
  form: "field-note" | "essay" | "external";
  body?: string[];
  /** Verified destination for notes published elsewhere. */
  externalUrl?: string;
  publication?: string;
};

export type CollectionItem = WorkItem | FrameItem | NoteItem;

export const site = {
  url: "https://arvardy.netlify.app",
  title: "Arvan Yudhistia — Software Engineer",
  description:
    "A personal index of software projects, visual observations, and notes by Arvan Yudhistia, a software engineer from Indonesia.",
};

export const profile = {
  name: "Arvan Yudhistia",
  role: "Software Engineer",
  location: "Indonesia",
  experience: "3+ years of production mobile engineering experience.",
  // The word joiner keeps the dash attached to "products" when the line wraps.
  statement: "I build products⁠—and solve the problems behind them.",
  supporting:
    "Software engineer from Indonesia. Working with products, systems, and the details in between.",
  about:
    "My strongest experience is in production mobile applications. I’m interested in the systems beneath the interface: architecture, integrations, debugging, and turning incomplete context into working products.",
  leadership:
    "Mobile technical ownership, coordination, code review, and mentoring three interns.",
  exploring: ["Kotlin Multiplatform", "Mobile Performance", "Open Source"],
};

export type Employment = {
  title: string;
  company: string;
  start: string;
  end: string;
};

// Dates are kept exactly as provided, including the overlaps.
export const employment: Employment[] = [
  {
    title: "Software Engineer (Mobile)",
    company: "PT Okejek Kreasi Indonesia",
    start: "August 2024",
    end: "Present",
  },
  {
    title: "Android Developer",
    company: "PT Inovasi Solusindo Sukses",
    start: "October 2023",
    end: "January 2025",
  },
  {
    title: "Flutter Developer",
    company: "PT Putra Kencana",
    start: "July 2023",
    end: "February 2024",
  },
];

// Carried over from the previous site data in this repository. Leave a value
// undefined to remove its link everywhere — nothing renders for a missing
// destination. See MISSING_ASSETS.md for what still needs confirming.
export const contact: {
  email?: string;
  github?: string;
  linkedin?: string;
  resume?: string;
} = {
  email: "arvanardana1@gmail.com",
  github: "https://github.com/arvardy184",
  linkedin: "https://linkedin.com/in/arvanardana",
  resume:
    "https://drive.google.com/file/d/1EP8HDGFKnUYd1pp4EAxOh0ALU4cSMlNe/view?usp=sharing",
};

export const works: WorkItem[] = [
  {
    id: "okejek",
    kind: "work",
    status: "published",
    title: "Okejek",
    mark: "Okejek",
    role: "Software Engineer (Mobile)",
    employer: "PT Okejek Kreasi Indonesia",
    period: "August 2024 – Present",
    summary:
      "A production multi-service mobile application spanning transportation, delivery, marketplace functionality, maps, and real-time communication.",
    body: [
      "I rebuilt the app from an incomplete handover, reintegrated it with the existing backend APIs, and improved the architecture so the codebase could keep growing. The MVP reached production in approximately three months.",
      "Since then the work has been investigating production issues, coordinating technical work, reviewing code, and mentoring three interns.",
    ],
    detail: {
      title: "A real-time bug worth keeping",
      body: "A stuttering real-time feature was traced to incorrect pairing-ID usage between mobile and backend. Correcting the identifier usage and coordinating the backend integration improved smoothness and reliability.",
    },
    technologies: [
      "Flutter",
      "Dart",
      "REST APIs",
      "WebSocket",
      "Firebase",
      "Google Maps",
      "Hive / local persistence",
    ],
    media: [],
    links: [
      {
        label: "Google Play listing",
        href: "https://play.google.com/store/apps/details?id=id.okejack.okejackapp&hl=en",
      },
    ],
    sourceNote: "Source code is private.",
  },
  {
    id: "iso-document-management",
    kind: "work",
    status: "published",
    title: "ISO Document Management",
    mark: "ISO",
    role: "Android Developer",
    employer: "PT Inovasi Solusindo Sukses",
    period: "October 2023 – January 2025",
    summary:
      "An Android application supporting document and certification workflows.",
    body: [],
    technologies: ["Kotlin", "Jetpack Compose", "Room Database", "REST API"],
    media: [],
    links: [],
    sourceNote: "Source code is private.",
  },
  {
    id: "employee-attendance-system",
    kind: "work",
    status: "published",
    title: "Employee Attendance System",
    mark: "Attendance",
    role: "Flutter Developer",
    employer: "PT Putra Kencana",
    period: "July 2023 – February 2024",
    summary:
      "A Flutter application involving geolocation, leave, overtime, expenses, and approval workflows.",
    body: [],
    technologies: ["Flutter", "Dart", "Geolocation", "Firebase", "Google Maps"],
    media: [],
    links: [],
    sourceNote: "Source code is private.",
  },
];

// No real images have been supplied yet. Add entries here with files under
// public/frames/ and their true pixel dimensions.
export const frames: FrameItem[] = [];

// No writing has been supplied yet. Ideas stay out of this list until there
// is a real body or a verified destination.
export const notes: NoteItem[] = [];
