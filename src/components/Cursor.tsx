import { useEffect, useRef, useState } from "react";
import { useReducedMotion, usePointerRef } from "../lib/hooks";
import { useLanguage } from "../lib/i18n";
import { useEggs } from "../lib/eggs/EggContext";

/* ============================================================
   نشانگر موس پیشرفته‌ی چند حالته
   حالت‌ها: default | link | media | text | wait
   هر حالت شکل و کلمه‌ی متفاوتی داره
   + کلیک ripple + کشیدگی بر اساس velocity
   ============================================================ */

type CursorVariant = "default" | "link" | "media" | "text" | "wait";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function SmartCursor() {
  const reduced = useReducedMotion();
  const { t, dir } = useLanguage();
  const LABELS: Record<CursorVariant, string> = {
    default: "",
    link: t.cursor.link,
    media: t.cursor.media,
    text: t.cursor.text,
    wait: "…",
  };
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const { rewardTheme, matrixMode, activeDialogue } = useEggs();
  // وقتی یه ایستر اگ فعاله (ده‌ها المان انیمیشنی زیر نشانگر در حال تغییرن)،
  // mix-blend-mode:difference باعث می‌شه مرورگر هر فریم کل صفحه رو دوباره
  // ترکیب کنه — همین لگ نشانگر رو ایجاد می‌کرد. موقع فعال بودن افکت، خاموشش می‌کنیم.
  const heavyEffectsActive = !!rewardTheme || matrixMode || !!activeDialogue;

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const target = usePointerRef();
  const vel = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const variantRef = useRef<CursorVariant>("default");
  const rippleId = useRef(0);

  // فعال‌سازی فقط در دسکتاپ
  useEffect(() => {
    if (reduced) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;
    setEnabled(true);
    document.body.style.cursor = "none";
    const restore = () => {
      document.body.style.cursor = "";
    };
    const anchors = document.querySelectorAll("a, button, [data-cursor]");
    return () => {
      restore();
      anchors.forEach((a) => a.removeAttribute("data-cursor-attached"));
    };
  }, [reduced]);

  // ردیابی variant بر اساس عنصر زیر موس
  useEffect(() => {
    if (!enabled) return;

    const readVariant = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const el = t.closest<HTMLElement>(
        "a, button, [data-cursor-link], [data-cursor-media], [data-cursor-text], input, textarea",
      );
      if (!el) {
        if (variantRef.current !== "default") {
          variantRef.current = "default";
          setVariant("default");
        }
        return;
      }
      let next: CursorVariant = "link";
      if (el.dataset.cursorMedia) next = "media";
      else if (el.dataset.cursorText) next = "text";
      else if (el.dataset.cursorLink) next = "link";
      else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") next = "text";
      else if (el.closest("[data-cursor-media]")) next = "media";

      if (next !== variantRef.current) {
        variantRef.current = next;
        setVariant(next);
      }
    };

    window.addEventListener("mousemove", readVariant, { passive: true });
    return () => window.removeEventListener("mousemove", readVariant);
  }, [enabled]);

  // انیمیشن smooth + velocity stretch
  useEffect(() => {
    if (!enabled) return;

    const onDown = (e: MouseEvent) => {
      setPressed(true);
      const id = rippleId.current++;
      setRipples((rs) => [...rs, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setRipples((rs) => rs.filter((r) => r.id !== id));
      }, 700);
    };
    const onUp = () => setPressed(false);

    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    let raf = 0;
    const loop = () => {
      const ease = variantRef.current === "default" ? 0.18 : 0.28;
      pos.current.x += (target.current.x - pos.current.x) * ease;
      pos.current.y += (target.current.y - pos.current.y) * ease;

      vel.current.x = pos.current.x - lastPos.current.x;
      vel.current.y = pos.current.y - lastPos.current.y;
      lastPos.current.x = pos.current.x;
      lastPos.current.y = pos.current.y;

      const speed = Math.min(Math.hypot(vel.current.x, vel.current.y), 40);
      const angle = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI);
      const stretch = 1 + speed * 0.012;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${stretch}, ${1 / stretch})`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const isLink = variant === "link";
  const isMedia = variant === "media";
  const isText = variant === "text";
  const isWait = variant === "wait";
  const expanded = isLink || isMedia || isText || isWait;

  // اندازه‌ی حلقه‌ی بیرونی بر اساس حالت
  const outerSize = expanded ? (isMedia ? 110 : 88) : pressed ? 26 : 38;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[500] select-none"
        style={heavyEffectsActive ? undefined : { mixBlendMode: "difference" }}
      >
        {/* حلقه‌ی بیرونی */}
        <div
          ref={outerRef}
          className="absolute left-0 top-0 flex items-center justify-center rounded-full border transition-[width,height,background-color,border-width] duration-300 ease-out"
          style={{
            width: outerSize,
            height: outerSize,
            background: expanded
              ? heavyEffectsActive
                ? "rgba(53,224,200,0.92)"
                : "rgba(255,255,255,0.92)"
              : "transparent",
            borderColor: heavyEffectsActive ? "#35e0c8" : "#fff",
            borderWidth: expanded ? 0 : 1.5,
            boxShadow: heavyEffectsActive ? "0 0 10px rgba(53,224,200,0.7)" : undefined,
            willChange: "transform",
          }}
        >
          {(isLink || isMedia || isText || isWait) && (
            <span
              ref={labelRef}
              className="pointer-events-none whitespace-nowrap text-[10px] font-bold tracking-[0.15em] text-ink"
              dir={dir}
            >
              {LABELS[variant]}
            </span>
          )}
        </div>

        {/* نقطه‌ی مرکزی */}
        <div
          ref={innerRef}
          className="absolute left-0 top-0 rounded-full transition-[width,height,opacity] duration-200"
          style={{
            width: expanded ? 4 : 6,
            height: expanded ? 4 : 6,
            opacity: isMedia ? 0 : 1,
            background: heavyEffectsActive ? "#35e0c8" : "#fff",
            willChange: "transform",
          }}
        />
      </div>

      {/* موج‌های کلیک */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[499]">
        {ripples.map((r) => (
          <span
            key={r.id}
            className="cursor-ripple absolute h-4 w-4 rounded-full border border-turq"
            style={{ left: r.x, top: r.y, transform: "translate(-50%, -50%)" }}
          />
        ))}
      </div>
    </>
  );
}
