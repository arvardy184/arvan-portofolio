"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Words start dimmed (still AA-readable) and brighten progressively as the
 * paragraph scrolls through the viewport. Renders fully bright by default
 * so the no-JS and reduced-motion states are simply "readable, unanimated."
 */
export function ScrollRevealText({ text }: { text: string }) {
  const words = text.split(" ");
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [revealCount, setRevealCount] = useState(words.length);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const el = containerRef.current;
    if (!el) return;

    let frame = 0;
    let visible = false;

    function onScroll() {
      frame = 0;
      if (preference.matches) { setRevealCount(words.length); return; }
      const rect = el!.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const start = viewportH * 0.9;
      const end = viewportH * 0.4;
      const raw = (start - rect.top) / (start - end);
      const progress = Math.min(1, Math.max(0, raw));
      setRevealCount(Math.round(progress * words.length));
    }

    function schedule() {
      if (visible && !preference.matches && !frame) frame = requestAnimationFrame(onScroll);
    }
    function onPreferenceChange() {
      cancelAnimationFrame(frame);
      frame = 0;
      if (preference.matches) setRevealCount(words.length);
      else schedule();
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else { cancelAnimationFrame(frame); frame = 0; }
    });
    observer.observe(el);
    preference.addEventListener("change", onPreferenceChange);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      preference.removeEventListener("change", onPreferenceChange);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [words.length]);

  return (
    <p ref={containerRef} className="max-w-prose text-lg leading-relaxed">
      {words.map((word, i) => (
        <span
          key={i}
          className="transition-colors duration-300"
          style={{
            color: i < revealCount ? "var(--color-text-primary)" : "var(--color-text-secondary)",
          }}
        >
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
