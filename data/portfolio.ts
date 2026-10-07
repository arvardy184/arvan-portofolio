// Single source of truth for site content. Anything left undefined or as an
// empty array is a pending item — see lib/render-guard.ts, which is the only
// place that decides whether dependent UI renders.

export const siteConfig = {
  caseStudyPublished: false,
  canonicalUrl: "https://arvardy.netlify.app",
  title: "Arvan Yudhistia — Mobile Engineer | Flutter & Kotlin",
  description:
    "Mobile Engineer specializing in Flutter, Kotlin, and Android. Explore Arvan Yudhistia's production mobile projects, engineering case studies, leadership experience, and approach to solving real-world application problems.",
  // Real Open Graph image, once supplied. Until then, no og:image tag renders.
  ogImage: undefined as string | undefined,
};

export const profile = {
  name: "Arvan Yudhistia",
  monogram: "AY",
  title: "Software Engineer (Mobile)",
  specialization: "Mobile Engineer: Flutter & Kotlin",
  location: "Indonesia",
  yearsExperience: 3,
  availability: "Open to Mobile Engineering opportunities",
};

export const links = {
  email: "arvanardana1@gmail.com",
  linkedin: "https://linkedin.com/in/arvanardana",
  github: "https://github.com/arvardy184",
  resume:
    "https://drive.google.com/file/d/1EP8HDGFKnUYd1pp4EAxOh0ALU4cSMlNe/view?usp=sharing",
  okejekPlayStoreUrl:
    "https://play.google.com/store/apps/details?id=id.okejack.okejackapp&hl=en",
};

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  headingAccent: "real world",
  availabilityShort: "Open to opportunities",
  experienceLabel: "Production experience",
  experienceCaption: "years building for the real world",
  experienceLinkLabel: "Explore my production mobile engineering work",
  eyebrow: "MOBILE ENGINEER · FLUTTER · KOTLIN · ANDROID",
  heading: "I build mobile products that survive the real world.",
  paragraph:
    "I'm Arvan, a Mobile Engineer specializing in Flutter and Kotlin. I turn complex product requirements, existing systems, and production problems into reliable mobile experiences.",
  proofLine: "3+ years building and maintaining production mobile applications.",
  primaryCta: { label: "View Selected Work", href: "/#work" },
};

export const credibilityBar = [
  { value: "3+", unit: "Years", label: "Mobile Engineering" },
  { value: "Flutter + Kotlin", unit: "", label: "Production Stack" },
  { value: "End-to-End", unit: "", label: "Feature Ownership" },
  { value: "Production", unit: "", label: "Debugging & Optimization" },
];

export const focusAreas = [
  "Production Mobile Apps",
  "Real-Time Systems",
  "App Performance",
  "System Integration",
  "Mobile Architecture",
];

export const currentlyExploring = [
  "Kotlin Multiplatform",
  "Modern Android Architecture",
  "Mobile Performance",
  "Open Source",
];

export type Project = {
  id: string;
  name: string;
  context: string;
  role: string;
  challenge: string;
  technologies: string[];
  screenshots: string[];
  playStoreUrl?: string;
  githubUrl?: string;
  caseStudyHref?: string;
  isPrivate?: boolean;
};

export const projects: Project[] = [
  {
    id: "okejek",
    name: "Okejek",
    context:
      "A production multi-service mobile platform spanning transportation, delivery, marketplace functionality, real-time communication, maps, and backend integrations.",
    role: "Software Engineer (Mobile)",
    challenge: "Real-time tracking: WebSocket + Google Maps + location handling.",
    technologies: ["Flutter", "Dart", "REST API", "WebSocket", "Firebase", "Google Maps"],
    // Add files to public/screenshots/okejek/ then list them here, e.g. "/screenshots/okejek/1.png"
    screenshots: [],
    playStoreUrl: links.okejekPlayStoreUrl,
    caseStudyHref: "/work/okejek/",
  },
  {
    id: "iso-document-management",
    name: "ISO Document Management",
    context:
      "An Android application supporting ISO document management and certification workflows.",
    role: "Android Developer",
    challenge: "Document workflows and local persistence on modern Android architecture.",
    technologies: ["Kotlin", "Android", "Jetpack Compose", "Room Database", "REST API"],
    // Add files to public/screenshots/iso/ then list them here.
    screenshots: [],
    isPrivate: true,
  },
  {
    id: "attendance-system",
    name: "Employee Attendance System",
    context:
      "A Flutter-based employee attendance application involving geolocation, overtime, leave requests, expenses, and approval workflows.",
    role: "Flutter Developer",
    challenge: "Geolocation-based attendance with approval workflows.",
    technologies: ["Flutter", "Dart", "Geolocation", "Firebase", "Google Maps"],
    // This project only ships on the site once real evidence exists here.
    screenshots: [],
    isPrivate: true,
  },
];

export type ExperienceEntry = {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  engagementType?: string;
};

export const experience: ExperienceEntry[] = [
  {
    title: "Software Engineer (Mobile)",
    company: "PT Okejek Kreasi Indonesia",
    startDate: "August 2024",
    endDate: "Present",
    description:
      "Own mobile development for a multi-service production application, working across Flutter development, application architecture, API integration, real-time features, production debugging, and cross-team technical coordination. Review code, coordinate mobile engineering work, and mentor three interns.",
    responsibilities: [
      "Mobile technical ownership",
      "Flutter development",
      "Production delivery",
      "Architecture decisions",
      "API and WebSocket integration",
      "Code review",
      "Backend coordination",
      "Mentoring three interns",
    ],
    technologies: ["Flutter", "Dart", "REST API", "WebSocket", "Firebase", "Google Maps"],
  },
  {
    title: "Android Developer",
    company: "PT Inovasi Solusindo Sukses",
    startDate: "October 2023",
    endDate: "January 2025",
    description:
      "Developed an Android-based ISO document management application using Kotlin and Jetpack Compose, supporting document workflows, local persistence, API integration, and certification-related processes.",
    responsibilities: [],
    technologies: ["Kotlin", "Android", "Jetpack Compose", "Room Database", "REST API"],
  },
  {
    title: "Flutter Developer",
    company: "PT Putra Kencana",
    startDate: "July 2023",
    endDate: "February 2024",
    description:
      "Developed a Flutter-based employee attendance application involving geolocation, leave, overtime, expenses, and approval workflows.",
    responsibilities: [],
    technologies: ["Flutter", "Dart", "Geolocation", "Firebase", "Google Maps"],
  },
];

export const howIWork = [
  {
    number: "01",
    title: "Understand the system",
    description:
      "I begin by understanding product behavior, existing constraints, data flow, API contracts, and the actual source of a problem.",
  },
  {
    number: "02",
    title: "Build maintainable foundations",
    description:
      "I organize code around clear responsibilities so features remain easier to understand, test, debug, and extend.",
  },
  {
    number: "03",
    title: "Measure before optimizing",
    description:
      "I investigate observable behavior and real bottlenecks instead of optimizing based on assumptions.",
  },
  {
    number: "04",
    title: "Own the outcome",
    description:
      "I work beyond the mobile layer when solving a problem requires coordination with backend, database, design, infrastructure, or product teams.",
  },
];

export const about = {
  heading: "I like solving the problems behind the screen.",
  paragraphs: [
    "I'm a Mobile Engineer from Indonesia with more than three years of experience building applications with Flutter and Kotlin. I enjoy working on products where engineering requires more than implementing screens: understanding existing systems, investigating production problems, coordinating across teams, and creating foundations that remain maintainable as a product grows.",
    "I started primarily as a mobile developer, but production needs gradually led me to contribute to architecture, design decisions, backend integration, databases, debugging, and product problem-solving. I now own mobile engineering work, review code, coordinate technical implementation, and mentor junior developers and interns.",
  ],
};

export const contact = {
  eyebrow: "Let's build something reliable.",
  heading: "Have a mobile problem worth solving?",
  description:
    "I'm open to Mobile Engineering opportunities and collaborations involving Flutter, Android, Kotlin, or Kotlin Multiplatform.",
};

export const okejekCaseStudy = {
  productLabel: "Okejek / Production mobile platform",
  diagram: {
    label: "Tracing the real-time issue",
    caption: "Simplified data flow from the WebSocket investigation.",
    mobile: "Mobile application",
    connection: "WebSocket",
    backend: "Existing backend",
    before: "Before: mismatched pairing identifier",
    after: "After: corrected identifier usage",
  },
  slug: "okejek",
  title: "Rebuilding a production mobile application without its original source code",
  metaTitle: "Okejek Case Study — Arvan Yudhistia, Mobile Engineer",
  metaDescription:
    "How I rebuilt Okejek, a production multi-service mobile platform, without the original source code: reverse-engineering, API reintegration, real-time debugging, and mentoring.",
  teaserBullets: [
    { label: "Role", value: "Software Engineer (Mobile)" },
    { label: "Timeline", value: "~3 months to rebuilt MVP" },
    { label: "Scope", value: "Full mobile rebuild, API reintegration, real-time features" },
    { label: "Outcome", value: "Cleaner, more maintainable foundation for continued development" },
  ],
  teaserStatement:
    "Rebuilding Okejek required more than implementing screens. It involved reverse-engineering an existing production application, restoring integrations, restructuring the mobile foundation, and coordinating technical issues across multiple parts of the system.",
  bugCallout:
    "A stuttering, laggy real-time feature turned out to be a mismatched pairing identifier between the app and backend — not a UI problem at all.",
  situation: [
    "The previous developer left without providing the original source code.",
    "There was no complete technical handover.",
    "The existing production application contained accumulated bugs and performance issues.",
    "Some external integrations depended on accounts or infrastructure controlled by previous parties.",
    "The application needed to be rebuilt while maintaining compatibility with the existing backend.",
  ],
  role: {
    title: "Software Engineer (Mobile)",
    responsibilities: [
      "Owning mobile development",
      "Rebuilding the application",
      "Mobile architecture decisions",
      "UI implementation",
      "API reintegration",
      "Real-time feature integration",
      "Production debugging",
      "Backend coordination",
      "Database and product support when required",
      "Code review",
      "Coordinating technical work",
      "Mentoring three interns",
    ],
  },
  approach: [
    "Reverse-engineered the behavior and flows of the existing Play Store application.",
    "Rebuilt the mobile application from scratch.",
    "Reconnected the application to existing backend APIs.",
    "Created a more maintainable mobile architecture.",
    "Implemented local persistence where appropriate.",
    "Investigated performance and real-time communication problems.",
    "Coordinated with backend stakeholders to resolve integration issues.",
    "Reviewed technical work and mentored three interns.",
    "Prepared the rebuilt MVP for production in approximately three months.",
  ],
  difficultBug: {
    title: "The difficult bug",
    description:
      "A stuttering and lag problem appeared in a real-time feature that used WebSocket communication. Investigation showed the mobile application and backend were using an incorrect or mismatched pairing identifier. I traced the data flow, corrected the identifier usage, and coordinated the integration with the backend side. This improved the reliability and smoothness of the real-time feature.",
  },
  constraints: {
    title: "External integration constraint",
    description:
      "The Google login flow was affected by Firebase ownership being tied to a previous owner or developer. This was not fully resolved at the time of reporting.",
  },
  outcome:
    "The rebuild created a cleaner foundation for continued development, reduced accumulated application issues, improved overall smoothness, and made the mobile codebase easier to maintain and extend.",
  // Add files to public/screenshots/okejek/ then list them here.
  screenshots: [] as string[],
};

export const footer = {
  role: "Software Engineer (Mobile)",
};
