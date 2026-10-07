"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, profile, links } from "@/data/portfolio";
import { isResolved } from "@/lib/render-guard";
import { PillLink } from "@/components/ui/pill-link";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    focusable?.[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", closeOnDesktop);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className={`flex w-full max-w-3xl items-center justify-between rounded-pill border border-border px-4 py-2.5 transition-colors duration-200 ${
          scrolled ? "bg-surface/90 backdrop-blur-md" : "bg-surface/40 backdrop-blur-sm"
        }`}
        aria-label="Primary"
      >
        <a
          href="/#top"
          className="rounded-pill px-2 py-1 text-sm font-semibold tracking-tight text-text-primary"
        >
          {profile.monogram}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-pill px-3 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          {isResolved(links.resume) && (
            <PillLink href={links.resume} variant="secondary" target="_blank" rel="noopener noreferrer">
              Résumé
            </PillLink>
          )}
        </div>

        <button
          ref={triggerRef}
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-pill text-text-primary md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-x-4 top-20 z-50 rounded-lg border border-border bg-surface-raised p-6 shadow-xl md:hidden"
        >
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="ml-auto flex h-11 w-11 items-center justify-center rounded-pill hover:bg-surface">
            <X size={20} aria-hidden="true" />
          </button>
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-base text-text-primary hover:bg-surface"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {isResolved(links.resume) && (
            <PillLink
              href={links.resume}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full"
            >
              Résumé
            </PillLink>
          )}
        </div>
      )}
    </header>
  );
}
