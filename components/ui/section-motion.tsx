"use client";

import { useEffect } from "react";

/** Animate visible HTML once; no hidden initial state or scroll listener. */
export function SectionMotion() {
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    function setup() {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      if (preference.matches || !Element.prototype.animate) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          observer?.unobserve(target);
          const animation = target.animate(
            [{ transform: "translateY(20px)", opacity: 0.72 }, { transform: "translateY(0)", opacity: 1 }],
            { duration: 650, easing: "cubic-bezier(.22,1,.36,1)" }
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      }, { threshold: 0.08 });
      document.querySelectorAll("[data-reveal]").forEach((element) => observer?.observe(element));
    }
    setup();
    preference.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", setup);
    };
  }, []);
  return null;
}
