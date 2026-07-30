"use client";

import React from "react";
import { Zap, Feather, Film, Gamepad2, Sparkles, CloudRain, Landmark, Eye, Radio } from "lucide-react";
import { DIALOGUE_MAP, type DialogueMotif } from "./dialogueEggs";

export type { DialogueMotif };

const SETS: Record<DialogueMotif, Set<string>> = {
  lightning: new Set(["frankenstein"]),
  abyss: new Set(["nietzsche", "camus", "sartre", "kierkegaard", "kafka", "dostoevsky", "rustcohlequote"]),
  classical: new Set(["socrates", "plato", "aristotle", "descartes", "marcusaurelius", "seneca", "epictetus", "confucius", "laozi"]),
  manuscript: new Set(["rumi", "khayyam", "hafez", "saadi", "ferdowsi"]),
  western: new Set(["reddead", "godfather", "gladiator", "braveheart", "shawshank"]),
  rain: new Set(["roybatty", "dylanthomas", "truman"]),
  game: new Set(["kratos", "solidsnake", "geralt", "masterchief", "gman", "andrewryan", "arthas", "illidan", "vaashikari", "joel"]),
  anime: new Set(["itachi", "lelouch", "spikespiegel", "guts", "levi", "madara"]),
  broadcast: new Set(["tyrion", "nedstark", "sherlock", "walterwhite", "gusfring", "sauljimmy", "eleven", "michaelscott"]),
  cinema: new Set(["vendetta", "fightclub", "forrestgump", "darkknight", "matrixmorpheus", "terminator", "joker2008", "vito"]),
};

export function getDialogueMotif(id: string): DialogueMotif {
  // Prefer the motif declared on the egg itself.
  const declared = DIALOGUE_MAP[id]?.motif;
  if (declared) return declared;
  const found = (Object.keys(SETS) as DialogueMotif[]).find((key) => SETS[key].has(id));
  return found || "cinema";
}

const ICONS: Record<DialogueMotif, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  lightning: Zap,
  abyss: Eye,
  classical: Landmark,
  manuscript: Feather,
  cinema: Film,
  western: Sparkles,
  rain: CloudRain,
  game: Gamepad2,
  anime: Zap,
  broadcast: Radio,
};

export function DialogueAtmosphere({ eggId, accent, accent2 }: { eggId: string; accent: string; accent2: string }) {
  const motif = getDialogueMotif(eggId);
  const Icon = ICONS[motif];

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden dialogue-atmo dialogue-atmo-${motif}`}>
      {/* subject-sensitive light field */}
      <div
        className="absolute inset-0 dialogue-atmo-wash"
        style={{
          background: `radial-gradient(circle at 50% 34%, ${accent}20, transparent 58%), linear-gradient(135deg, ${accent2}0D, transparent 55%)`,
        }}
      />

      {/* orbiting subject icons */}
      {Array.from({ length: 7 }).map((_, i) => (
        <Icon
          key={i}
          className="absolute dialogue-topic-icon"
          style={{
            left: `${8 + ((i * 17) % 83)}%`,
            top: `${8 + ((i * 23) % 78)}%`,
            width: `${12 + (i % 3) * 6}px`,
            height: `${12 + (i % 3) * 6}px`,
            color: i % 2 ? accent : accent2,
            animationDelay: `${i * 0.55}s`,
            animationDuration: `${6 + i * 0.7}s`,
          }}
        />
      ))}

      {/* motif-specific art */}
      {motif === "lightning" && (
        <>
          <svg className="absolute inset-0 w-full h-full dialogue-lightning-bolt" viewBox="0 0 1000 700" preserveAspectRatio="none">
            <path d="M120 -20 L280 185 L212 199 L405 430 L334 437 L522 720" fill="none" stroke={accent} strokeWidth="3" />
            <path d="M850 -20 L710 160 L772 175 L610 354 L676 370 L520 720" fill="none" stroke={accent2} strokeWidth="2" />
          </svg>
          <div className="absolute inset-0 dialogue-lightning-flash" style={{ background: `${accent}1A` }} />
        </>
      )}

      {motif === "abyss" && (
        <div className="absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2 w-[55vmin] h-[55vmin] rounded-full border dialogue-abyss-ring" style={{ borderColor: `${accent}40`, boxShadow: `inset 0 0 60px ${accent}20, 0 0 60px ${accent}15` }}>
          <div className="absolute inset-[18%] rounded-full border border-dashed dialogue-abyss-ring-reverse" style={{ borderColor: `${accent2}35` }} />
        </div>
      )}

      {motif === "classical" && (
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[45%] opacity-[0.1] dialogue-pillars" viewBox="0 0 600 250">
          {[40, 150, 260, 370, 480].map((x) => (
            <g key={x} fill={accent}>
              <rect x={x} y="55" width="52" height="165" rx="2" />
              <rect x={x - 9} y="42" width="70" height="18" rx="4" />
              <rect x={x - 7} y="218" width="66" height="16" rx="3" />
            </g>
          ))}
          <path d="M20 42 L300 0 L580 42Z" fill={accent2} />
        </svg>
      )}

      {motif === "manuscript" && (
        <>
          {["م", "ن", "ع", "ش", "ر", "ی"].map((char, i) => (
            <span
              key={char + i}
              className="absolute dialogue-calligraphy"
              style={{ left: `${10 + i * 15}%`, top: `${10 + (i % 3) * 28}%`, color: i % 2 ? accent : accent2, animationDelay: `${i}s` }}
            >
              {char}
            </span>
          ))}
        </>
      )}

      {motif === "cinema" && (
        <>
          <div className="absolute inset-x-0 top-3 h-6 dialogue-filmstrip" style={{ color: accent }} />
          <div className="absolute inset-x-0 bottom-3 h-6 dialogue-filmstrip" style={{ color: accent2 }} />
          <div className="absolute inset-0 dialogue-projector-flicker" />
        </>
      )}

      {motif === "western" && (
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full dialogue-ember"
              style={{ left: `${(i * 13) % 98}%`, background: i % 2 ? accent : accent2, animationDelay: `${i * 0.3}s`, animationDuration: `${6 + (i % 5)}s` }}
            />
          ))}
        </div>
      )}

      {motif === "rain" && (
        <div className="absolute inset-0 dialogue-rain-field">
          {Array.from({ length: 34 }).map((_, i) => (
            <span key={i} className="absolute dialogue-rain-line" style={{ left: `${(i * 3) % 100}%`, background: accent, animationDelay: `${(i % 10) * 0.2}s`, animationDuration: `${1.2 + (i % 4) * 0.25}s` }} />
          ))}
        </div>
      )}

      {motif === "game" && (
        <div className="absolute inset-0 dialogue-game-grid" style={{ ["--game-accent" as string]: `${accent}1A` }}>
          <div className="absolute inset-y-0 w-28 dialogue-game-scan" style={{ background: `linear-gradient(90deg, transparent, ${accent}18, transparent)` }} />
        </div>
      )}

      {motif === "anime" && (
        <div className="absolute inset-0 dialogue-anime-speed">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="absolute left-1/2 top-1/2 h-px origin-left dialogue-anime-line" style={{ width: `${28 + (i % 5) * 8}%`, background: i % 2 ? accent : accent2, transform: `rotate(${i * 20}deg)`, animationDelay: `${i * 0.06}s` }} />
          ))}
        </div>
      )}

      {motif === "broadcast" && (
        <div className="absolute inset-0 dialogue-tv-lines" style={{ ["--tv-accent" as string]: `${accent}16` }} />
      )}
    </div>
  );
}
