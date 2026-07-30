"use client";

import React from "react";
import { X, Quote } from "lucide-react";
import { DIALOGUE_MAP } from "./dialogueEggs";
import { DialogueAtmosphere, getDialogueMotif } from "./DialogueAtmosphere";

export function DialogueModal({
  eggId,
  onClose,
  lang,
}: {
  eggId: string | null;
  onClose: () => void;
  lang: "fa" | "en";
}) {
  if (!eggId) return null;
  const egg = DIALOGUE_MAP[eggId];
  if (!egg) return null;

  const isFa = lang === "fa";
  const lines = isFa ? egg.quote.fa : egg.quote.en;
  const head = lines.slice(0, -1);
  const punch = lines[lines.length - 1];
  const motif = getDialogueMotif(eggId);

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/92 backdrop-blur-md select-none"
      onClick={onClose}
    >
      <DialogueAtmosphere eggId={eggId} accent={egg.accent} accent2={egg.accent2} />

      {/* ambient aura */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 45%, ${egg.accent}22, transparent 70%)` }}
      />
      {/* drifting sparks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full floating-ember"
            style={{
              left: `${(i * 7.3 + 5) % 96}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              color: i % 2 ? egg.accent : egg.accent2,
              background: i % 2 ? egg.accent : egg.accent2,
              animationDuration: `${9 + (i % 6) * 1.6}s`,
              animationDelay: `${(i % 7) * 0.9}s`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      <div
        dir={isFa ? "rtl" : "ltr"}
        onClick={(e) => e.stopPropagation()}
        className={`relative z-10 max-w-2xl w-full rounded-[28px] p-8 sm:p-10 animate-monster-rise animate-egg-aura overflow-hidden shadow-2xl dialogue-card dialogue-card-${motif}`}
        style={{
          background: egg.bg,
          border: `1px solid ${egg.accent}59`,
          ["--aura-1" as string]: `${egg.accent}66`,
          ["--aura-2" as string]: `${egg.accent2}88`,
        }}
      >
        {/* top hairline */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${egg.accent}, transparent)` }}
        />

        <button
          onClick={onClose}
          className="absolute top-4 end-4 w-9 h-9 rounded-xl flex items-center justify-center transition-all z-10 hover:scale-105"
          style={{ border: `1px solid ${egg.accent}40`, background: `${egg.accent}14`, color: egg.accent }}
        >
          <X className="w-4 h-4" />
        </button>

        {/* medallion */}
        <div className="flex justify-center mb-6 mt-1">
          <div className="relative">
            <div
              className="absolute inset-0 blur-2xl rounded-full scale-150 animate-pulse"
              style={{ background: `${egg.accent}4D` }}
            />
            <div
              className={`relative w-20 h-20 rounded-2xl flex items-center justify-center text-4xl dialogue-medallion dialogue-medallion-${motif}`}
              style={{
                border: `2px solid ${egg.accent}66`,
                background: `linear-gradient(180deg, ${egg.accent}1F, transparent)`,
              }}
            >
              {egg.icon}
            </div>
          </div>
        </div>

        {/* source chip */}
        <div className="text-center mb-6">
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.24em] font-bold"
            style={{ border: `1px solid ${egg.accent}40`, background: `${egg.accent}14`, color: egg.accent }}
          >
            {isFa ? egg.source.fa : egg.source.en}
          </span>
        </div>

        {/* quote */}
        <blockquote className={`relative text-center px-2 ${isFa ? "leading-[2.2]" : "leading-[1.85]"}`}>
          <Quote
            className="absolute -top-3 start-0 w-7 h-7 opacity-20"
            style={{ color: egg.accent }}
          />
          <p
            className={`text-[15px] sm:text-[17px] font-medium ${isFa ? "" : "italic"}`}
            style={{ color: `${egg.accent}E6` }}
          >
            {head.map((l, i) => (
              <React.Fragment key={i}>
                <span style={{ color: "#F5F5F4", opacity: 0.92 }}>{l}</span>
                <br />
              </React.Fragment>
            ))}
            <span
              className={`font-extrabold ${isFa ? "" : "not-italic"}`}
              style={{ color: egg.accent, textShadow: `0 0 22px ${egg.accent}66` }}
            >
              {punch}
            </span>
          </p>
        </blockquote>

        {/* footer */}
        <div
          className="mt-9 pt-5 flex items-center justify-between gap-3 flex-wrap"
          style={{ borderTop: `1px solid ${egg.accent}26` }}
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color: `${egg.accent}99` }}>
            {isFa ? egg.footer.fa : egg.footer.en}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-mono uppercase tracking-widest transition-all hover:scale-105"
            style={{ border: `1px solid ${egg.accent}59`, background: `${egg.accent}26`, color: "#fff" }}
          >
            {isFa ? "بستن" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
