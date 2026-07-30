import { useEffect, useRef } from "react";
import { useReducedMotion, usePointerRef } from "../lib/hooks";

/* ============================================================
   Constellation canvas
   شبکه‌ی نورونی تعاملی که با موس واکنش می‌ده
   ============================================================ */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  base: number;
}

export function Constellation() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      // تراکم نودها بسته به مساحت
      const density = Math.min(60, Math.max(24, Math.floor((w * h) / 22000)));
      nodes = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
        base: Math.random() * 0.5 + 0.3,
      }));
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = e.clientX - rect.left;
      pointer.current.y = e.clientY - rect.top;
      pointer.current.active = true;
    };
    const onLeave = () => {
      pointer.current.active = false;
      pointer.current.x = -9999;
      pointer.current.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const mx = pointer.current.x;
      const my = pointer.current.y;
      const mouseRadius = 180;

      for (const n of nodes) {
        // حرکت
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        // جذب به موس
        if (pointer.current.active) {
          const dx = mx - n.x;
          const dy = my - n.y;
          const d = Math.hypot(dx, dy);
          if (d < mouseRadius) {
            const f = (1 - d / mouseRadius) * 0.04;
            n.vx += (dx / d) * f;
            n.vy += (dy / d) * f;
          }
        }

        // اصطکاک
        n.vx *= 0.98;
        n.vy *= 0.98;
      }

      // خطوط اتصال
      const linkRadius = 140;
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkRadius) {
            const alpha = (1 - d / linkRadius) * 0.35;
            ctx.strokeStyle = `rgba(53, 224, 200, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // خط به موس
        if (pointer.current.active) {
          const a = nodes[i];
          const d = Math.hypot(a.x - mx, a.y - my);
          if (d < mouseRadius) {
            const alpha = (1 - d / mouseRadius) * 0.6;
            ctx.strokeStyle = `rgba(242, 180, 65, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }
      }

      // رسم نقاط
      for (const n of nodes) {
        let glow = 1;
        if (pointer.current.active) {
          const d = Math.hypot(n.x - mx, n.y - my);
          if (d < mouseRadius) glow = 1 + (1 - d / mouseRadius) * 2.5;
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * glow, 0, Math.PI * 2);
        ctx.fillStyle = pointer.current.active ? "rgba(53, 224, 200, 0.9)" : "rgba(139, 154, 171, 0.6)";
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

/* ============================================================
   Magnetic wrapper — فرزند به سمت موس کشیده می‌شه
   ============================================================ */

import { cloneElement, isValidElement, type ReactElement } from "react";

export function Magnetic({
  children,
  strength = 0.35,
  radius = 80,
}: {
  children: ReactElement;
  strength?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const pointer = usePointerRef();

  useEffect(() => {
    if (reduced) return;
    const host = ref.current;
    if (!host) return;
    const inner = host.firstElementChild as HTMLElement | null;
    if (!inner) return;
    innerRef.current = inner;
    inner.style.transition = "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)";
    inner.style.willChange = "transform";

    let raf = 0;
    let cx = 0;
    let cy = 0;
    let rect = host.getBoundingClientRect();

    // فقط هنگام تغییر اندازه/اسکرول قابل‌توجه، rect را دوباره می‌خوانیم (نه هر فریم)
    const refresh = () => {
      rect = host.getBoundingClientRect();
    };
    window.addEventListener("resize", refresh, { passive: true });
    window.addEventListener("scroll", refresh, { passive: true });

    const loop = () => {
      const px = pointer.current.x - (rect.left + rect.width / 2);
      const py = pointer.current.y - (rect.top + rect.height / 2);
      const d = Math.hypot(px, py);
      const near = d < radius + Math.max(rect.width, rect.height) / 2;
      const tx = near ? px * strength : 0;
      const ty = near ? py * strength : 0;
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("scroll", refresh);
      cancelAnimationFrame(raf);
      if (innerRef.current) innerRef.current.style.transform = "";
    };
  }, [reduced, strength, radius, pointer]);

  if (!isValidElement(children)) return <>{children}</>;
  return (
    <div ref={ref} className="inline-block">
      {cloneElement(children)}
    </div>
  );
}

/* ============================================================
   Tilt — کارت با زاویه‌ی موس کج می‌شه (3D)
   ============================================================ */

export function Tilt({
  children,
  max = 8,
  glare = true,
}: {
  children: ReactElement;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const pointer = usePointerRef();

  useEffect(() => {
    if (reduced) return;
    const host = ref.current;
    if (!host) return;
    const inner = host.firstElementChild as HTMLElement | null;
    if (!inner) return;
    inner.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";

    let raf = 0;
    let trx = 0;
    let try_ = 0;
    let crx = 0;
    let cry = 0;
    let hovering = false;
    let rect = host.getBoundingClientRect();

    // rect فقط یک‌بار در شروع هاور خوانده می‌شود، نه در هر رویداد mousemove
    const onEnter = () => {
      rect = host.getBoundingClientRect();
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
      trx = 0;
      try_ = 0;
      if (glareRef.current) glareRef.current.style.opacity = "0";
    };

    const loop = () => {
      if (hovering) {
        const nx = (pointer.current.x - rect.left) / rect.width - 0.5;
        const ny = (pointer.current.y - rect.top) / rect.height - 0.5;
        try_ = nx * max;
        trx = -ny * max;
        if (glareRef.current) {
          glareRef.current.style.background = `radial-gradient(circle at ${(nx + 0.5) * 100}% ${(ny + 0.5) * 100}%, rgba(255,255,255,0.14), transparent 55%)`;
          glareRef.current.style.opacity = "1";
        }
      }
      crx += (trx - crx) * 0.12;
      cry += (try_ - cry) * 0.12;
      inner.style.transform = `perspective(900px) rotateX(${crx.toFixed(2)}deg) rotateY(${cry.toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };

    host.addEventListener("mouseenter", onEnter);
    host.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      host.removeEventListener("mouseenter", onEnter);
      host.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      inner.style.transform = "";
    };
  }, [reduced, max, pointer]);

  if (!isValidElement(children)) return <>{children}</>;
  return (
    <div ref={ref} className="tilt-host relative">
      {cloneElement(children)}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/* ============================================================
   Parallax — حرکت عنصر نسبت به اسکرول
   ============================================================ */

import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";

export function useParallax(speed = 0.2) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;
        const center = rect.top + rect.height / 2;
        const d = center - viewH / 2;
        setOffset(d * speed);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return { ref, offset };
}

export function Parallax({
  children,
  speed = 0.2,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const { ref, offset } = useParallax(speed);
  const style: CSSProperties = { transform: `translate3d(0, ${offset}px, 0)` };
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
