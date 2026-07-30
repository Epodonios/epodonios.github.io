"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Eye, Clock3, Flame, Star, CircleDotDashed } from "lucide-react";

const QUOTES = {
  en: [
    { text: "Time is a flat circle.", style: "orbit" },
    { text: "Human consciousness is a tragic misstep in evolution.", style: "type" },
    { text: "We are things that labor under the illusion of having a self.", style: "glitch" },
    { text: "Death created time to grow the things that it would kill.", style: "vertical" },
    { text: "This place is like somebody's memory of a town — and the memory is fading.", style: "fog" },
    { text: "Life's barely long enough to get good at one thing.", style: "pulse" },
    { text: "Once there was only dark. If you ask me, the light's winning.", style: "light" },
    { text: "The world needs bad men. We keep the other bad men from the door.", style: "ticker" },
    { text: "Someone once told me time is a flat circle.", style: "reverse" },
  ],
  fa: [
    { text: "زمان یک دایره‌ی مسطح است.", style: "orbit" },
    { text: "آگاهی انسان، یک گام اشتباه و غم‌انگیز در تکامل است.", style: "type" },
    { text: "ما موجوداتی هستیم گرفتار در توهمِ داشتن یک «خود».", style: "glitch" },
    { text: "مرگ، زمان را آفرید تا چیزهایی را رشد دهد که خواهد کشت.", style: "vertical" },
    { text: "این‌جا شبیه خاطره‌ی یک شهر است؛ و خاطره دارد محو می‌شود.", style: "fog" },
    { text: "زندگی به‌سختی آن‌قدر طولانی است که در یک چیز ماهر شوی.", style: "pulse" },
    { text: "روزی فقط تاریکی بود؛ اگر از من بپرسی، نور دارد پیروز می‌شود.", style: "light" },
    { text: "دنیا به مردان بد نیاز دارد؛ ما مردان بدتر را پشت در نگه می‌داریم.", style: "ticker" },
    { text: "یک‌بار کسی به من گفت زمان، یک دایره‌ی مسطح است.", style: "reverse" },
  ],
};

const QUOTE_POSITIONS = [
  { top: "12%", left: "8%" },
  { top: "26%", right: "5%" },
  { top: "42%", left: "4%" },
  { top: "8%", right: "17%" },
  { bottom: "22%", left: "7%" },
  { bottom: "10%", right: "7%" },
  { top: "62%", left: "28%" },
  { bottom: "5%", left: "12%" },
  { top: "35%", right: "24%" },
];

export function RustCohleOverlay({ lang }: { lang: "fa" | "en" }) {
  const quotes = QUOTES[lang];
  const [focusQuote, setFocusQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setFocusQuote((q) => (q + 1) % quotes.length), 5200);
    return () => clearInterval(timer);
  }, [quotes.length]);

  const stars = useMemo(
    () => Array.from({ length: 72 }).map((_, i) => ({
      id: i,
      x: (i * 37.7) % 99,
      y: (i * 61.3) % 88,
      size: 1 + (i % 3),
      delay: (i % 12) * 0.32,
      duration: 2.4 + (i % 7) * 0.55,
    })),
    []
  );

  return (
    <div className="fixed inset-0 z-[85] pointer-events-none overflow-hidden select-none rust-world">
      {/* Louisiana night gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_rgba(165,130,62,0.09),_transparent_48%),linear-gradient(to_bottom,_rgba(3,7,7,0.35),_rgba(2,5,4,0.92))]" />

      {/* Stars — each twinkles independently */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-amber-100 rust-star"
          style={{
            left: `${s.x}%`, top: `${s.y}%`, width: `${s.size}px`, height: `${s.size}px`,
            animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {/* Carcosa multi-ring spiral */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vmin] h-[80vmin] rust-spiral-wrap">
        <svg viewBox="0 0 400 400" className="w-full h-full opacity-[0.34] rust-spiral-main" fill="none">
          <path
            d="M200 200 C200 160 250 150 272 180 C304 224 255 276 202 258 C128 232 128 138 196 100 C286 50 372 136 348 236 C315 372 142 390 57 281 C-38 159 56 3 206 7 C373 11 470 186 397 334"
            stroke="#D6B56D" strokeWidth="3" strokeLinecap="round"
          />
          <path
            d="M200 200 C220 210 221 239 199 250 C165 267 132 237 135 198 C140 142 203 115 251 143 C314 180 311 269 250 311 C169 366 59 313 42 215"
            stroke="#7A9563" strokeWidth="1.2" strokeDasharray="5 9"
          />
        </svg>
        <div className="absolute inset-[22%] rounded-full border border-amber-400/15 rust-inner-ring" />
        <div className="absolute inset-[35%] rounded-full border border-lime-300/10 rust-inner-ring-reverse" />
        <Eye className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-amber-300/25 rust-eye" strokeWidth={1} />
      </div>

      {/* Rust Cohle silhouette — seated profile + cigarette */}
      <svg
        className="absolute bottom-[-3%] right-[3%] h-[78vh] w-[38vw] min-w-[300px] opacity-[0.2] rust-silhouette"
        viewBox="0 0 340 620" fill="none"
      >
        <path d="M198 45 C245 52 265 92 252 132 C244 157 229 170 220 183 L220 224 C271 249 300 295 311 365 L336 620 H55 L72 402 C79 315 109 260 160 228 L163 184 C140 160 128 130 133 99 C139 61 161 40 198 45Z" fill="#0B0E0B" />
        <path d="M155 101 Q190 82 246 105" stroke="#D6B56D" strokeWidth="2" opacity="0.45" />
        <path d="M160 133 L220 137" stroke="#D6B56D" strokeWidth="1.5" opacity="0.35" />
        {/* cigarette */}
        <path d="M133 151 L82 162" stroke="#E7D7AC" strokeWidth="3" opacity="0.65" />
        <circle cx="79" cy="163" r="3" fill="#EF8C3B" className="rust-cigarette" />
        {/* smoke */}
        <path d="M78 156 C57 141 89 121 67 101 C50 84 78 68 67 45" stroke="#D5D8CE" strokeWidth="2" opacity="0.25" className="rust-smoke" />
      </svg>

      {/* Louisiana marsh / tree line */}
      <svg className="absolute bottom-0 left-0 w-full h-[30vh] opacity-[0.18]" viewBox="0 0 1200 260" preserveAspectRatio="none">
        <path d="M0 195 Q45 160 89 187 T172 173 Q216 116 254 177 Q300 142 341 181 Q390 120 430 175 Q484 136 522 185 Q560 110 610 181 Q660 139 700 181 Q754 99 802 177 Q851 133 900 185 Q945 120 993 180 Q1050 142 1100 179 Q1154 132 1200 174 L1200 260 L0 260Z" fill="#233021" />
        {/* dead tree */}
        <path d="M155 220 L165 82 M165 110 L126 72 M164 126 L208 83 M166 147 L119 122" stroke="#506147" strokeWidth="8" strokeLinecap="round" />
      </svg>

      {/* Every famous quote — distinct movement language */}
      {quotes.map((q, i) => {
        const pos = QUOTE_POSITIONS[i];
        const focused = focusQuote === i;
        return (
          <div
            key={q.text}
            className={`absolute max-w-[38vw] rust-quote rust-quote-${q.style} ${focused ? "rust-quote-focused" : ""}`}
            style={{ ...pos, animationDelay: `${i * 0.7}s` }}
          >
            <span className="text-[9px] font-mono text-amber-300/40 tracking-[0.24em] block mb-1">
              CASE 1995 · {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-[11px] sm:text-sm font-serif text-stone-200/35 leading-relaxed">
              “{q.text}”
            </p>
          </div>
        );
      })}

      {/* cinematic letterbox */}
      <div className="absolute top-0 left-0 right-0 h-[5vh] bg-black/75" />
      <div className="absolute bottom-0 left-0 right-0 h-[5vh] bg-black/80" />

      {/* Live badge */}
      <div className="absolute bottom-[7vh] left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2.5 rounded-full border border-amber-400/25 bg-black/65 backdrop-blur-xl rust-badge">
        <CircleDotDashed className="w-4 h-4 text-amber-300 rust-mini-spiral" />
        <span className="text-[10px] font-mono text-amber-200/75 tracking-[0.28em] uppercase whitespace-nowrap">
          TRUE DETECTIVE · SEASON ONE · LOUISIANA 1995
        </span>
        <Clock3 className="w-3.5 h-3.5 text-lime-300/60 animate-pulse" />
      </div>
    </div>
  );
}
