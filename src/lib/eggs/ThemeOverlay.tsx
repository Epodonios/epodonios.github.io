"use client";

import React, { useMemo } from "react";
import { ACTIVE_MAP } from "./activeEggs";

/**
 * Generic ambient overlay engine used by the 10 generated themes.
 * Distinct behaviour is driven by `overlay.effect`.
 */
export function ThemeOverlay({ themeId, lang }: { themeId: string | null; lang: "fa" | "en" }) {
  const egg = themeId ? ACTIVE_MAP[themeId] : null;
  const cfg = egg?.overlay;

  const particles = useMemo(() => {
    if (!cfg) return [];
    return Array.from({ length: cfg.particleCount }).map((_, i) => ({
      id: i,
      char: cfg.particles[i % cfg.particles.length],
      left: (i * 8.7 + (i % 5) * 3.1) % 98,
      size: 10 + ((i * 7) % 16),
      duration: 6 + ((i * 5) % 12),
      delay: ((i * 11) % 90) / 10,
      drift: (((i % 7) - 3) * 34),
      opacity: 0.25 + ((i % 5) * 0.12),
    }));
  }, [cfg]);

  if (!egg || !cfg) return null;

  const eff = cfg.effect;
  const upward = eff === "embers";
  const anim =
    eff === "rain" ? "egg-rain"
    : eff === "embers" ? "egg-embers"
    : eff === "storm" ? "egg-storm"
    : eff === "void" ? "egg-void"
    : eff === "spore" ? "egg-spore"
    : eff === "snow" ? "egg-snowfall"
    : "egg-drift";

  return (
    <div className="fixed inset-0 z-[85] pointer-events-none overflow-hidden select-none">
      {/* base wash */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% ${upward ? "110%" : "-10%"}, ${cfg.accent}1A, transparent 65%)`,
        }}
      />

      {/* effect-specific backdrop */}
      {eff === "glitch" && (
        <>
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `linear-gradient(${cfg.accent}22 1px, transparent 1px), linear-gradient(90deg, ${cfg.accent2}1A 1px, transparent 1px)`,
              backgroundSize: "38px 38px",
            }}
          />
          <div className="absolute inset-0 egg-glitch-bars" style={{ ["--gl" as string]: cfg.accent2 }} />
        </>
      )}
      {eff === "scan" && (
        <div
          className="absolute left-0 w-full h-28"
          style={{
            background: `linear-gradient(to bottom, transparent, ${cfg.accent}26, transparent)`,
            animation: "ctosScan 4.5s linear infinite",
          }}
        />
      )}
      {eff === "fog" && (
        <>
          <div className="fog-layer" />
          <div className="fog-layer" style={{ animationDelay: "5s", opacity: 0.6 }} />
        </>
      )}
      {eff === "void" && (
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 50%, transparent 30%, ${egg.overlay!.accent}0D 55%, rgba(0,0,0,0.85) 100%)` }}
        />
      )}
      {eff === "storm" && (
        <div
          className="absolute inset-0 egg-storm-sweep"
          style={{ ["--st" as string]: `${cfg.accent}1F` }}
        />
      )}

      {/* centre glyph */}
      {cfg.centerGlyph && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="egg-center-glyph"
            style={{
              color: cfg.accent,
              fontSize: "min(46vmin, 420px)",
              opacity: 0.07,
              textShadow: `0 0 80px ${cfg.accent}`,
            }}
          >
            {cfg.centerGlyph}
          </span>
        </div>
      )}

      {/* particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute font-mono ${anim}`}
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            color: p.id % 3 === 0 ? cfg.accent2 : cfg.accent,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ["--drift" as string]: `${p.drift}px`,
            textShadow: `0 0 10px ${cfg.accent}80`,
          }}
        >
          {p.char}
        </span>
      ))}

      {/* corner brackets */}
      <span className="absolute top-20 start-6 w-12 h-12 border-t-2 border-s-2 rounded-tl-lg" style={{ borderColor: `${cfg.accent}59` }} />
      <span className="absolute top-20 end-6 w-12 h-12 border-t-2 border-e-2 rounded-tr-lg" style={{ borderColor: `${cfg.accent}59` }} />
      <span className="absolute bottom-24 start-6 w-12 h-12 border-b-2 border-s-2 rounded-bl-lg" style={{ borderColor: `${cfg.accent}59` }} />
      <span className="absolute bottom-24 end-6 w-12 h-12 border-b-2 border-e-2 rounded-br-lg" style={{ borderColor: `${cfg.accent}59` }} />

      {/* quote bar */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl backdrop-blur-xl flex items-center gap-3.5 max-w-[92vw]"
        style={{
          background: "rgba(0,0,0,0.78)",
          border: `1px solid ${cfg.accent}4D`,
          boxShadow: `0 0 34px ${cfg.accent}3D`,
        }}
      >
        <span className="text-2xl shrink-0">{egg.icon}</span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono uppercase tracking-[0.26em]" style={{ color: `${cfg.accent}B3` }}>
              {cfg.label}
            </span>
            <span className="w-1.5 h-1.5 rounded-full animate-ping shrink-0" style={{ background: cfg.accent }} />
          </div>
          <p className="text-sm font-medium mt-0.5 truncate" style={{ color: cfg.accent }}>
            {lang === "fa" ? cfg.quote.fa : cfg.quote.en}
          </p>
        </div>
      </div>
    </div>
  );
}
