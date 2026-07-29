"use client";

/* =================================================================
   این‌ها همان کامپوننت‌هایی هستند که در پروژه‌ی اصلی (پنل مدیریت
   V2Ray) واقعاً استفاده می‌شدند — بدون تغییر در منطق یا محتوا.
   (SupportPopup و FrankensteinPopup در پروژه‌ی اصلی import می‌شدند
   ولی هرگز رندر نمی‌شدند — کد مرده بودند؛ اینجا هم حذف شده‌اند تا
   دقیقاً همان رفتار واقعی حفظ شود.)
   ================================================================= */

import React, { useEffect, useMemo, useState } from "react";
import { Stethoscope, Activity, Sparkles } from "lucide-react";

const BB_ELEMENTS = [
  { sym: "Br", num: 35, name: "Bromine" },
  { sym: "Ba", num: 56, name: "Barium" },
  { sym: "C", num: 6, name: "Carbon" },
  { sym: "H", num: 1, name: "Hydrogen" },
  { sym: "N", num: 7, name: "Nitrogen" },
  { sym: "O", num: 8, name: "Oxygen" },
  { sym: "P", num: 15, name: "Phosphorus" },
  { sym: "Cl", num: 17, name: "Chlorine" },
  { sym: "Li", num: 3, name: "Lithium" },
  { sym: "Na", num: 11, name: "Sodium" },
];

const MD_DIALOGUES_EN = [
  "Everybody lies.",
  "It's not lupus.",
  "It's never lupus.",
  "Differential diagnosis, people.",
  "Patients always lie.",
];
const MD_DIALOGUES_FA = [
  "همه دروغ می‌گویند.",
  "لوپوس نیست.",
  "هیچ‌وقت لوپوس نیست.",
  "تشخیص افتراقی، لطفاً.",
  "بیمارها همیشه دروغ می‌گویند.",
];

export function SnowOverlay() {
  const flakes = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 16,
        duration: 6 + Math.random() * 10,
        delay: Math.random() * 8,
        drift: (Math.random() - 0.5) * 160,
        char: ["❄", "❅", "❆", "•"][Math.floor(Math.random() * 4)],
        opacity: 0.35 + Math.random() * 0.6,
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-[90] pointer-events-none overflow-hidden">
      {flakes.map((f) => (
        <span
          key={f.id}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            fontSize: `${f.size}px`,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            opacity: f.opacity,
            ["--drift" as string]: `${f.drift}px`,
          }}
        >
          {f.char}
        </span>
      ))}
      {/* Frost vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(186,230,253,0.07),_transparent_55%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sky-200/[0.06] to-transparent" />
    </div>
  );
}


export function BreakingBadOverlay({ lang }: { lang: "fa" | "en" }) {
  const tiles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => {
        const el = BB_ELEMENTS[i % BB_ELEMENTS.length];
        return {
          id: i,
          ...el,
          left: Math.random() * 92,
          duration: 14 + Math.random() * 14,
          delay: Math.random() * 12,
          scale: 0.75 + Math.random() * 0.6,
        };
      }),
    []
  );

  const bubbles = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 6 + Math.random() * 22,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 7,
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-[85] pointer-events-none overflow-hidden">
      {/* Floating element tiles */}
      {tiles.map((t) => (
        <div
          key={t.id}
          className="element-tile"
          style={{
            left: `${t.left}%`,
            animationDuration: `${t.duration}s`,
            animationDelay: `${t.delay}s`,
            transform: `scale(${t.scale})`,
          }}
        >
          <div className="text-[9px] opacity-70 leading-none">{t.num}</div>
          <div className="text-xl font-bold leading-tight">{t.sym}</div>
          <div className="text-[7px] opacity-60 uppercase tracking-wider">{t.name}</div>
        </div>
      ))}

      {/* Chemistry bubbles */}
      {bubbles.map((b) => (
        <span
          key={`b-${b.id}`}
          className="chem-bubble"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {/* Toxic haze */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(132,204,22,0.09),_transparent_60%)]" />

      {/* Signature line */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <div className="text-[11px] font-mono uppercase tracking-[0.4em] text-lime-400/60">
          {lang === "fa" ? "من همان کسی هستم که در می‌زند" : "I am the one who knocks"}
        </div>
      </div>
    </div>
  );
}


export function HouseMdOverlay({ lang }: { lang: "fa" | "en" }) {
  const dialogues = lang === "fa" ? MD_DIALOGUES_FA : MD_DIALOGUES_EN;

  const pills = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        left: Math.random() * 95,
        duration: 11 + Math.random() * 12,
        delay: Math.random() * 10,
        size: 14 + Math.random() * 12,
        kind: i % 3,
      })),
    []
  );

  const quotes = useMemo(
    () =>
      dialogues.map((text, i) => ({
        id: i,
        text,
        top: 12 + ((i * 17) % 70),
        left: 5 + ((i * 23) % 65),
        duration: 9 + i * 1.5,
        delay: i * 2.4,
        size: 13 + (i % 3) * 3,
      })),
    [dialogues]
  );

  return (
    <div className="fixed inset-0 z-[85] pointer-events-none overflow-hidden">
      {/* ECG heartbeat line */}
      <svg className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 opacity-25" viewBox="0 0 1200 100" preserveAspectRatio="none">
        <path
          d="M0 50 L200 50 L220 50 L232 20 L244 80 L256 35 L268 50 L400 50 L600 50 L620 50 L632 18 L644 82 L656 32 L668 50 L800 50 L1000 50 L1020 50 L1032 22 L1044 78 L1056 38 L1068 50 L1200 50"
          stroke="#38BDF8"
          strokeWidth="2"
          fill="none"
          strokeDasharray="1200"
          style={{ animation: "ecgSweep 4s linear infinite" }}
        />
      </svg>

      {/* Falling pills & medical icons */}
      {pills.map((p) => (
        <div
          key={p.id}
          className="pill-icon"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.kind === 0 ? (
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none">
              <rect x="2" y="8" width="20" height="8" rx="4" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 8v8" stroke="currentColor" strokeWidth="1.8" />
              <rect x="2" y="8" width="10" height="8" rx="4" fill="currentColor" fillOpacity="0.3" />
            </svg>
          ) : p.kind === 1 ? (
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none">
              <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.15" />
            </svg>
          ) : (
            <Stethoscope width={p.size} height={p.size} strokeWidth={1.6} />
          )}
        </div>
      ))}

      {/* Floating dialogues */}
      {quotes.map((q) => (
        <div
          key={q.id}
          className="md-dialogue"
          style={{
            top: `${q.top}%`,
            left: `${q.left}%`,
            fontSize: `${q.size}px`,
            animationDuration: `${q.duration}s`,
            animationDelay: `${q.delay}s`,
          }}
        >
          {q.text}
        </div>
      ))}

      {/* Clinical vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_45%,_rgba(4,8,13,0.75)_100%)]" />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <Activity className="w-3.5 h-3.5 text-sky-400/70" />
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-sky-400/60">
          Princeton–Plainsboro
        </span>
      </div>
    </div>
  );
}


export function RewardBanner({
  reward,
  lang,
}: {
  reward: { icon: string; title: string; subtitle: string } | null;
  lang: "fa" | "en";
}) {
  if (!reward) return null;

  return (
    <div className="fixed top-6 left-1/2 z-[280] animate-reward-pop pointer-events-none">
      <div className="flex items-center gap-3.5 px-6 py-4 rounded-2xl border border-amber-400/30 bg-black/90 backdrop-blur-xl shadow-2xl">
        <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-2xl shrink-0">
          {reward.icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-amber-400">
              {lang === "fa" ? "جایزه باز شد" : "Reward Unlocked"}
            </span>
          </div>
          <div className="text-white text-sm font-bold mt-1">{reward.title}</div>
          <div className="text-white/50 text-[10px] font-mono mt-0.5">{reward.subtitle}</div>
        </div>
      </div>
    </div>
  );
}
