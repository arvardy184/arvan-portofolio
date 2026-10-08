"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { viewFromPath, views, type View } from "@/lib/collection";
import type { ContactLink } from "@/lib/contact";
import { CollectionNav } from "./collection-nav";
import { CommandPalette, type Command } from "./command-palette";

/** A collection entry as the command palette needs it. */
export type PaletteEntry = {
  id: string;
  title: string;
  code: string;
  kind: string;
  href: string;
  /** "hash" entries open in place on their collection view. */
  mode: "route" | "hash" | "external";
};

type Props = {
  children: ReactNode;
  name: string;
  role: string;
  supporting: string;
  counts: Partial<Record<View, number>>;
  links: ContactLink[];
  entries: PaletteEntry[];
  fixtures: boolean;
};

function isTyping(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
  );
}

export function Shell({ children, name, role, supporting, counts, links, entries, fixtures }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const view = viewFromPath(pathname);
  const exact = views.some((item) => item.href === pathname || item.href === `${pathname}/`);

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [negative, setNegative] = useState(false);
  const [shortcut, setShortcut] = useState("Ctrl K");

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setShortcut("⌘K");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("negative", negative);
  }, [negative]);

  const go = useCallback(
    (href: string) => {
      router.push(href, { scroll: false });
      window.scrollTo({ top: 0 });
    },
    [router],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const modalOpen = document.documentElement.classList.contains("modal-open");
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        // Another dialog owns the screen; leave it alone.
        if (modalOpen && !paletteOpen) return;
        event.preventDefault();
        setPaletteOpen((open) => !open);
        return;
      }
      if (modalOpen || isTyping(event.target)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const position = Number(event.key);
      if (Number.isInteger(position) && position >= 1 && position <= views.length) {
        go(views[position - 1].href);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go, paletteOpen]);

  const commands = useMemo<Command[]>(() => {
    const openEntry = (entry: PaletteEntry) => () => {
      if (entry.mode === "external") {
        window.open(entry.href, "_blank", "noopener,noreferrer");
      } else if (entry.mode === "hash") {
        const [path, id] = entry.href.split("#");
        // Same view: a native hash change is what the collection listens for.
        if (window.location.pathname === path) window.location.hash = id;
        else router.push(entry.href);
      } else {
        go(entry.href);
      }
    };
    return [
      ...views.map((item, i) => ({
        id: `view-${item.id}`,
        group: "Views",
        label: item.label,
        hint: String(i + 1),
        run: () => go(item.href),
      })),
      ...entries.map((entry) => ({
        id: `entry-${entry.id}`,
        group: "Entries",
        label: entry.title,
        hint: entry.code,
        keywords: entry.kind,
        run: openEntry(entry),
      })),
      ...links.map((link) => ({
        id: `link-${link.id}`,
        group: "Contact",
        label: link.label,
        hint: link.external ? "New tab" : undefined,
        keywords: "contact cv",
        run: () => {
          if (link.external) window.open(link.href, "_blank", "noopener,noreferrer");
          else window.location.href = link.href;
        },
      })),
      {
        id: "negative",
        group: "Sheet",
        label: negative ? "Return to the dark sheet" : "Print the sheet as a positive",
        keywords: "invert negative light theme",
        run: () => setNegative((value) => !value),
      },
    ];
  }, [entries, go, links, negative, router]);

  return (
    <>
      <div id="site" className="min-h-[100dvh] rail:pl-[var(--rail)]">
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <header
          className={cn(
            "border-b border-rule px-4 pt-3.5 md:px-6 md:pt-5",
            "rail:fixed rail:inset-y-0 rail:left-0 rail:flex rail:w-[var(--rail)] rail:flex-col rail:overflow-y-auto rail:border-b-0 rail:border-r rail:px-6 rail:py-7",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <Link href="/" scroll={false} onClick={() => window.scrollTo({ top: 0 })} className="block min-h-11">
              <span className="block text-[1.125rem] font-semibold leading-tight tracking-[-0.015em]">
                {name}
              </span>
              <span className="meta mt-1.5 block">{role}</span>
            </Link>
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Search the index"
              className="-mr-2 -mt-2 flex h-11 items-center gap-2 px-2 text-dim hover:text-ink rail:hidden"
            >
              <Search size={18} aria-hidden />
              <span className="meta hidden text-inherit md:inline">Search</span>
            </button>
          </div>

          <p className="mt-2.5 max-w-[38ch] text-[0.9375rem] leading-snug text-dim rail:mt-6">
            {supporting}
          </p>

          {/* Compact contact row: phones and tablets. */}
          {links.length > 0 && (
            <ul className="mt-1 flex flex-wrap gap-x-4 sm:gap-x-5 rail:hidden" aria-label="Contact">
              {links.map((link) => (
                <li key={link.id}>
                  <ContactAnchor link={link} className="h-11" />
                </li>
              ))}
            </ul>
          )}

          <CollectionNav
            active={view}
            exact={exact}
            counts={counts}
            variant="bar"
            className="fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-bg pb-[env(safe-area-inset-bottom)] md:static md:-ml-3 md:mt-1 md:border-t-0 md:bg-transparent md:pb-0 rail:hidden"
          />
          <CollectionNav
            active={view}
            exact={exact}
            counts={counts}
            variant="rail"
            className="mt-9 hidden border-y border-rule py-3 rail:block"
          />

          {/* Rail foot: contact and search stay in reach at every scroll position. */}
          <div className="mt-auto hidden pt-8 rail:block">
            {links.length > 0 && (
              <ul aria-label="Contact" className="mb-5">
                {links.map((link) => (
                  <li key={link.id}>
                    <ContactAnchor link={link} className="h-8 w-full justify-between" />
                  </li>
                ))}
              </ul>
            )}
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="flex h-10 w-full items-center justify-between border border-rule px-3 text-[0.875rem] text-dim transition-colors duration-150 hover:border-dim hover:text-ink"
            >
              <span className="flex items-center gap-2">
                <Search size={15} aria-hidden />
                Search the index
              </span>
              <kbd className="meta">{shortcut}</kbd>
            </button>
          </div>
        </header>

        {fixtures && (
          <p className="meta flex items-center gap-2 border-b border-rule px-4 py-2.5 md:px-6 rail:px-8">
            <span className="mark" aria-hidden />
            Fixture content is on. Development only, not portfolio content.
          </p>
        )}

        <main id="main" className="pb-safe-bar px-4 md:px-6 rail:px-8">
          {children}
        </main>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} commands={commands} />
    </>
  );
}

function ContactAnchor({ link, className }: { link: ContactLink; className?: string }) {
  return (
    <a
      href={link.href}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex items-center gap-1 text-[0.875rem] text-ink underline sm:text-[0.9375rem] decoration-rule decoration-1 underline-offset-4 transition-colors duration-150 hover:decoration-ink",
        className,
      )}
    >
      {link.label}
      <ArrowUpRight size={14} aria-hidden className="text-dim transition-colors group-hover:text-ink" />
      {link.external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
