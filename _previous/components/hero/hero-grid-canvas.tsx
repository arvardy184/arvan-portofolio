"use client";

import { useEffect, useRef } from "react";

const CELL = 48;
const GLOW_RADIUS = 220;

export function HeroGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.closest("section");
    if (!canvas || !container) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let mouseX = -9999;
    let mouseY = -9999;
    let visible = false;
    let rafId = 0;
    let targetX = mouseX;
    let targetY = mouseY;
    let opacity = 0;
    let inside = false;
    const accent = getComputedStyle(container).getPropertyValue("--color-accent").trim();
    const enabled = () => visible && !motionQuery.matches && pointerQuery.matches && !document.hidden;
    function schedule() {
      if (!rafId && enabled()) rafId = requestAnimationFrame(tick);
    }

    function resize() {
      const rect = container!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      schedule();
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.strokeStyle = accent;
      ctx!.globalAlpha = opacity * 0.45;
      ctx!.lineWidth = 1;

      ctx!.beginPath();
      for (let x = 0; x <= width; x += CELL) {
        ctx!.moveTo(x + 0.5, 0);
        ctx!.lineTo(x + 0.5, height);
      }
      for (let y = 0; y <= height; y += CELL) {
        ctx!.moveTo(0, y + 0.5);
        ctx!.lineTo(width, y + 0.5);
      }
      ctx!.stroke();

      // Brighten only the grid pixels already drawn, near the cursor.
      ctx!.globalAlpha = 1;
      ctx!.globalCompositeOperation = "destination-in";
      const gradient = ctx!.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        GLOW_RADIUS
      );
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx!.fillStyle = gradient;
      ctx!.fillRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "source-over";
    }

    function tick() {
      rafId = 0;
      if (!enabled()) return;
      mouseX += (targetX - mouseX) * 0.16;
      mouseY += (targetY - mouseY) * 0.16;
      opacity += ((inside ? 1 : 0) - opacity) * 0.12;
      draw();
      if (Math.abs(targetX - mouseX) + Math.abs(targetY - mouseY) > 0.2 || Math.abs((inside ? 1 : 0) - opacity) > 0.002) schedule();
    }

    function onPointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      if (!inside) { mouseX = targetX; mouseY = targetY; }
      inside = true;
      schedule();
    }

    function onPointerLeave() {
      inside = false;
      schedule();
    }
    function reset() {
      cancelAnimationFrame(rafId);
      rafId = 0;
      if (!enabled()) { inside = false; opacity = 0; ctx!.clearRect(0, 0, width, height); }
      else schedule();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        reset();
      },
      { threshold: 0 }
    );
    io.observe(container);

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    resize();
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    motionQuery.addEventListener("change", reset);
    pointerQuery.addEventListener("change", reset);
    document.addEventListener("visibilitychange", reset);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      motionQuery.removeEventListener("change", reset);
      pointerQuery.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", reset);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
