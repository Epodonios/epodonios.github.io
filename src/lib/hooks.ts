import { useEffect, useMemo, useRef, useState } from "react";

/* تبدیل ارقام لاتین به فارسی — نگه‌داشته‌شده برای سازگاری؛ برای چندزبانه از digits() در i18n استفاده کنید */
export const fa = (v: string | number) =>
  String(v).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

/* ============================================================
   ردیاب سراسری موس — یک شنونده‌ی mousemove روی window به‌جای
   ده‌ها شنونده‌ی جدا برای هر کامپوننت (رفع تاخیر و لگ موس)
   ============================================================ */
const pointerState = { x: -9999, y: -9999 };
const pointerListeners = new Set<() => void>();
let pointerBound = false;

function ensurePointerTracking() {
  if (pointerBound || typeof window === "undefined") return;
  pointerBound = true;
  window.addEventListener(
    "mousemove",
    (e) => {
      pointerState.x = e.clientX;
      pointerState.y = e.clientY;
      pointerListeners.forEach((fn) => fn());
    },
    { passive: true },
  );
}

/** یک ref زنده که مختصات فعلی موس را نگه می‌دارد؛ بدون ری‌رندر و بدون شنونده‌ی اضافه */
export function usePointerRef() {
  ensurePointerTracking();
  const ref = useRef(pointerState);
  return ref;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, shown };
}

/* افکت رمزگشایی حروف — بر اساس زبان فعلی، حروف مناسب همون رسم‌الخط رو نشون می‌ده */
const POOL_FA = "ابپتثجچحخدذرزسشصطعفقکگلمنوهی۰۱۲۳۴۵۶۷۸۹</>{}*#";
const POOL_LATIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</>{}*#";
const POOL_RUNIC = "ᚨᛒᚲᛞᛖᚠᚷᚺᛁᛃᚲᛚᛗᚾᛟᛈᚱᛊᛏᚢᚹᚹᚲᛊᛃᛉ0123456789</>{}*#";

function pickPool(text: string) {
  if (/[\u0600-\u06FF]/.test(text)) return POOL_FA;
  if (/[\u16A0-\u16FF]/.test(text)) return POOL_RUNIC;
  return POOL_LATIN;
}

export function useScramble(text: string, play: boolean, step = 30) {
  const reduced = useReducedMotion();
  const [out, setOut] = useState(play && !reduced ? "" : text);
  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    if (!play) {
      setOut("");
      return;
    }
    const POOL = pickPool(text);
    let frame = 0;
    const total = text.length;
    setOut("");
    const id = window.setInterval(() => {
      frame += 1;
      const locked = Math.floor(frame / 2);
      let s = "";
      for (let i = 0; i < total; i += 1) {
        const ch = text[i];
        if (ch === " " || ch === "\u200c") {
          s += ch;
          continue;
        }
        s += i < locked ? ch : POOL[Math.floor(Math.random() * POOL.length)];
      }
      setOut(s);
      if (locked >= total) window.clearInterval(id);
    }, step);
    return () => window.clearInterval(id);
  }, [text, play, reduced, step]);
  return out;
}

/* تایپ چرخشی عبارت‌ها */
export function useTypewriter(phrases: string[], active: boolean, typeMs = 75, holdMs = 1700) {
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [len, setLen] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced || !active) return;
    const current = phrases[idx % phrases.length];
    let t: number | undefined;
    if (!deleting && len < current.length) {
      t = window.setTimeout(() => setLen((l) => l + 1), typeMs);
    } else if (!deleting) {
      t = window.setTimeout(() => setDeleting(true), holdMs);
    } else if (len > 0) {
      t = window.setTimeout(() => setLen((l) => l - 1), 28);
    } else {
      setDeleting(false);
      setIdx((i) => (i + 1) % phrases.length);
    }
    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [len, deleting, idx, phrases, reduced, active, typeMs, holdMs]);

  if (reduced) return phrases[0];
  if (!active) return "";
  return phrases[idx % phrases.length].slice(0, len);
}

/* شمارنده‌ی متحرک */
export function useCountUp(target: number, play: boolean, duration = 1500) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    if (!play || target === 0) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, play, duration, reduced]);
  return value;
}

/* ساعت و تاریخ زنده — لوکیل قابل‌تنظیم برای چندزبانه بودن */
export function useClock(locale = "fa-IR") {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const time = useMemo(
    () => new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(now),
    [now, locale],
  );
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(now),
    [now, locale],
  );
  return { time, date, now };
}

/* درصد اسکرول صفحه — با throttle در rAF تا از layout thrashing هنگام اسکرول جلوگیری شود */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    let ticking = false;
    const measure = () => {
      ticking = false;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.round((h.scrollTop / max) * 100) : 0);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return progress;
}
