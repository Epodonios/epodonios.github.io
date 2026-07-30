"use client";

import React from "react";
import { ACTIVE_MAP } from "./activeEggs";

const FONT_CLASS: Record<string, string> = {
  edsel: "font-edsel",
  mono: "font-mono font-extrabold tracking-tight",
  serif: "font-serif font-bold tracking-wide italic",
  brand: "font-brand font-extrabold tracking-tight",
};

/**
 * Wordmark that mutates with the active Easter-egg theme:
 * different glyphs, colour, typeface and animation per theme.
 */
export function ThemedLogo({
  theme,
  size = "md",
  onClick,
  className = "",
}: {
  theme: string | null;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}) {
  const egg = theme ? ACTIVE_MAP[theme] : null;
  const cfg = egg?.logo;

  const sizeClass = size === "lg" ? "text-4xl md:text-5xl" : size === "sm" ? "text-lg" : "text-xl";
  const glyphSize = size === "lg" ? "text-2xl" : size === "sm" ? "text-[11px]" : "text-sm";

  if (!cfg) {
    return (
      <div
        dir="ltr"
        onClick={onClick}
        className={`font-edsel ${sizeClass} text-white tracking-wide ${onClick ? "cursor-pointer" : ""} ${className}`}
        style={{ direction: "ltr" }}
      >
        Edsel&apos;s
      </div>
    );
  }

  return (
    <div
      dir="ltr"
      onClick={onClick}
      className={`inline-flex items-baseline gap-1.5 ${onClick ? "cursor-pointer" : ""} ${className} ${cfg.anim || ""}`}
      style={{ direction: "ltr", color: cfg.color }}
      title={egg?.title.en}
    >
      {cfg.prefix && (
        <span className={`${glyphSize} opacity-90 leading-none`} style={{ color: cfg.color }}>
          {cfg.prefix}
        </span>
      )}
      <span
        className={`${FONT_CLASS[cfg.font] || "font-edsel"} ${sizeClass} leading-none`}
        style={{ color: cfg.color, textShadow: `0 0 18px ${cfg.color}66` }}
      >
        {cfg.text}
      </span>
      {cfg.suffix && (
        <span className={`${glyphSize} font-mono opacity-90 leading-none`} style={{ color: cfg.color }}>
          {cfg.suffix}
        </span>
      )}
    </div>
  );
}
