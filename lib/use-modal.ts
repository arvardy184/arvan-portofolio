"use client";

import { useIsPresent } from "motion/react";
import { useEffect, useRef, type MouseEvent as ReactMouseEvent, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

type Options = {
  onClose: () => void;
  /** Where focus returns on close. Falls back to the element focused at open. */
  restore?: () => HTMLElement | null;
};

/**
 * Modal behavior shared by the preview, the frame viewer, and the palette:
 * moves focus in, traps Tab, closes on Escape, makes the page behind inert and
 * unscrollable, and puts focus back where it came from. Everything is released
 * the moment the dialog starts to exit, not when its animation ends.
 */
export function useModal(ref: RefObject<HTMLElement | null>, options: Options) {
  const isPresent = useIsPresent();
  const latest = useRef(options);
  latest.current = options;

  useEffect(() => {
    if (!isPresent) return;
    const node = ref.current;
    const site = document.getElementById("site");
    const previous = document.activeElement as HTMLElement | null;

    site?.setAttribute("inert", "");
    document.documentElement.classList.add("modal-open");
    (node?.querySelector<HTMLElement>("[data-autofocus]") ?? node)?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        latest.current.onClose();
        return;
      }
      if (event.key !== "Tab" || !node) return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0,
      );
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      if (event.shiftKey && (current === first || !node.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !node.contains(current))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      site?.removeAttribute("inert");
      document.documentElement.classList.remove("modal-open");
      const target = latest.current.restore?.() ?? previous;
      target?.focus({ preventScroll: true });
    };
  }, [isPresent, ref]);
}

/** True for clicks that should be enhanced; modified clicks keep link behavior. */
export function isPlainClick(event: ReactMouseEvent): boolean {
  return (
    event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
  );
}
