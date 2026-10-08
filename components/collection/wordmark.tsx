"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState, type PointerEvent } from "react";

const WIDTH = 1000;
const HEIGHT = 204;

// Adapted from Aceternity UI's Text Hover Effect, used once as the sheet's
// colophon. Kept: outlined SVG type, a one-time stroke draw, and a radial mask
// that reveals a brighter stroke under the pointer. Changed: monochrome only,
// the mask is moved by writing attributes inside requestAnimationFrame rather
// than React state on every pointer event, touch input is ignored, and the
// word is decorative (the readable name lives in the identity frame).
export function Wordmark({ text }: { text: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const gradient = useRef<SVGRadialGradientElement>(null);
  const frame = useRef(0);
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, "");

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (event.pointerType === "touch") return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = svg.current?.getBoundingClientRect();
      if (!rect || !gradient.current) return;
      gradient.current.setAttribute("cx", `${((clientX - rect.left) / rect.width) * WIDTH}`);
      gradient.current.setAttribute("cy", `${((clientY - rect.top) / rect.height) * HEIGHT}`);
    });
  };

  // The fill matches the sheet and is painted over the inner half of the
  // stroke, which also hides overlapping contours in the variable font.
  const outline = {
    x: 4,
    y: 196,
    textLength: WIDTH - 8,
    lengthAdjust: "spacing" as const,
    fill: "var(--bg)",
    strokeWidth: 3,
    paintOrder: "stroke",
    style: {
      fontFamily: "var(--font-display), sans-serif",
      fontSize: 268,
      fontWeight: 700,
    },
  };

  return (
    <svg
      ref={svg}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      aria-hidden
      focusable="false"
      className="block h-auto w-full select-none"
      onPointerEnter={(event) => event.pointerType !== "touch" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerMove={onPointerMove}
    >
      <defs>
        <radialGradient
          ref={gradient}
          id={`reveal-${uid}`}
          gradientUnits="userSpaceOnUse"
          cx={WIDTH / 2}
          cy={HEIGHT / 2}
          r={WIDTH * 0.2}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id={`mask-${uid}`}>
          <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill={`url(#reveal-${uid})`} />
        </mask>
      </defs>

      <motion.text
        {...outline}
        className="wordmark-base"
        initial={reduceMotion ? false : { strokeDasharray: 1600, strokeDashoffset: 1600 }}
        whileInView={{ strokeDasharray: 1600, strokeDashoffset: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
      <text
        {...outline}
        stroke="var(--ink)"
        mask={`url(#mask-${uid})`}
        style={{ ...outline.style, opacity: hovered ? 1 : 0, transition: "opacity 200ms linear" }}
      >
        {text}
      </text>
    </svg>
  );
}
