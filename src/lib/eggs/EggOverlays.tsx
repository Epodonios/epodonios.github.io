"use client";

import React, { useMemo, useEffect, useState } from "react";
import { RustCohleOverlay } from "./RustCohleOverlay";
import {
  Smartphone, Wifi, Terminal, Shield, Lock, Eye, Skull, Flame, Biohazard, Heart,
  Zap, Radio, Activity, Disc, BookOpen, Moon, Scissors, Snowflake, Droplet
} from "lucide-react";

// 1. WATCH DOGS 1 Theme (Restored & Ultra-Dynamic)
export function WatchDogsOverlay({ lang }: { lang: string }) {
  const dialogues = lang === "fa"
    ? [
        "سیستم ctOS 2.0 تحت کنترل است...",
        "همه چیز به هم متصل است، پس همه چیز هک‌شدنی است.",
        "هک کردن سلاح من است. شهر شیکاگو زمین بازی من.",
        "در حال پروفایل سیستم ترافیک و شبکه...",
        "دسترسی ریشه (Root Access) به تمام پروتکل‌ها اعطا شد."
      ]
    : [
        "ctOS 2.0 Surveillance Online...",
        "Everything is connected. Everything is vulnerable.",
        "Hacking is my weapon. Chicago is my playground.",
        "Profiling node routing & traffic parameters...",
        "Root Access granted across all V2Ray endpoints."
      ];
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((c) => (c + 1) % dialogues.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [dialogues.length]);

  const streams = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    top: 8 + i * 8,
    duration: 8 + Math.random() * 8,
    delay: Math.random() * 5,
    text: `[ctOS_PACKET_${i}] 0x${Math.random().toString(16).slice(2, 8).toUpperCase()} :: OVERRIDE_ROUTING_SUCCESS :: SPEED_${Math.floor(80 + Math.random() * 20)}%`
  })), []);

  return (
    <div className="fixed inset-0 z-[85] pointer-events-none overflow-hidden select-none">
      {/* Dynamic scanlines & hex mesh */}
      <div className="absolute inset-0 ctos-grid-live opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030608]/90 via-transparent to-[#030608]/70" />
      
      {/* Cyber Scan beam */}
      <div
        className="absolute left-0 w-full h-32 bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent"
        style={{ animation: "ctosScan 4.5s linear infinite" }}
      />

      {/* Floating data stream terminal lines */}
      {streams.map((s) => (
        <div
          key={s.id}
          className="absolute font-mono text-[11px] text-cyan-400/60 whitespace-nowrap tracking-wider"
          style={{
            top: `${s.top}%`,
            animation: `dataStream ${s.duration}s linear infinite`,
            animationDelay: `${s.delay}s`,
            textShadow: "0 0 8px rgba(34,211,238,0.8)"
          }}
        >
          {s.text}
        </div>
      ))}

      {/* Corner HUD framing brackets */}
      <div className="absolute top-20 start-6 w-14 h-14 border-t-2 border-s-2 border-cyan-400/60 drop-shadow-[0_0_8px_#22D3EE]" />
      <div className="absolute top-20 end-6 w-14 h-14 border-t-2 border-e-2 border-cyan-400/60 drop-shadow-[0_0_8px_#22D3EE]" />
      <div className="absolute bottom-24 start-6 w-14 h-14 border-b-2 border-s-2 border-cyan-400/60 drop-shadow-[0_0_8px_#22D3EE]" />
      <div className="absolute bottom-24 end-6 w-14 h-14 border-b-2 border-e-2 border-cyan-400/60 drop-shadow-[0_0_8px_#22D3EE]" />

      {/* Futuristic Cyber Badge & Live Aiden Pearce Quote */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3.5 rounded-2xl border border-cyan-400/40 bg-[#071216]/90 backdrop-blur-xl shadow-[0_0_25px_rgba(34,211,238,0.35)] flex items-center gap-3.5">
        <div className="w-8 h-8 rounded-lg bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
          <Terminal className="w-4 h-4 animate-pulse" />
        </div>
        <div className="text-start">
          <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.25em] text-cyan-400/70">
            <span>Watch_Dogs · DedSec</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <p key={currentQuote} className="text-sm font-mono text-cyan-200 animate-fade-in tracking-wide mt-0.5 font-medium">
            {dialogues[currentQuote]}
          </p>
        </div>
        <Wifi className="w-5 h-5 text-cyan-400/70 animate-pulse hidden sm:block ml-2" />
      </div>
    </div>
  );
}

// 2. YOU (TV Series) Theme
export function YouOverlay({ lang }: { lang: string }) {
  const petals = useMemo(() => Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    left: Math.random() * 95,
    size: 14 + Math.random() * 14,
    duration: 8 + Math.random() * 8,
    delay: Math.random() * 6,
    char: i % 3 === 0 ? "🌹" : i % 3 === 1 ? "🩸" : "❤️"
  })), []);

  return (
    <div className="fixed inset-0 z-[85] pointer-events-none overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(225,29,72,0.12),_transparent_70%)]" />
      
      {/* Blood dripping lines */}
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className="blood-drip shadow-[0_0_8px_#E11D48]" style={{ left: `${4 + i * 7}%`, animationDelay: `${Math.random() * 5}s`, height: `${15 + Math.random() * 35}vh` }} />
      ))}

      {/* Floating Rose petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="rose-petal text-xl"
          style={{ left: `${p.left}%`, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s`, opacity: 0.75 }}
        >
          {p.char}
        </div>
      ))}

      {/* Iconic Glass Book/Cage watermark in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[450px] border-2 border-rose-500/15 rounded-3xl opacity-20 flex items-center justify-center p-8 bg-rose-950/5 backdrop-blur-[1px] pointer-events-none">
        <div className="w-full h-full border border-rose-500/20 rounded-2xl flex items-center justify-center">
          <Lock className="w-44 h-44 text-rose-500/25 animate-pulse" strokeWidth={1} />
        </div>
      </div>

      {/* Sleek Quote Box */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-7 py-3 rounded-2xl border border-rose-500/30 bg-[#140505]/90 backdrop-blur-xl shadow-[0_0_30px_rgba(225,29,72,0.35)] flex items-center gap-3">
        <Heart className="w-5 h-5 text-rose-500 animate-pulse fill-rose-500" />
        <div className="text-center sm:text-start">
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-rose-400/70 block">YOU · Joe Goldberg</span>
          <span className="text-base sm:text-lg font-serif tracking-widest uppercase text-rose-200 font-bold block mt-0.5">
            {lang === "fa" ? "«من گرگ تو هستم، بک... هر کاری برای مراقبت از تو می‌کنم.»" : "«I WOLF YOU. I will do anything to protect you.»"}
          </span>
        </div>
      </div>
    </div>
  );
}

// 3. Mentalist Theme
export function MentalistOverlay({ lang }: { lang: string }) {
  return (
    <div className="fixed inset-0 z-[85] pointer-events-none overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(239,68,68,0.08),_transparent_65%)]" />
      
      {/* Red John Smiley silhouette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vmin] h-[70vmin] flex items-center justify-center">
        <svg className="w-full h-full opacity-25 red-john-svg drop-shadow-[0_0_20px_#EF4444]" viewBox="0 0 200 200" fill="none" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="100" cy="100" r="85" strokeWidth="5" />
          <ellipse cx="65" cy="70" rx="10" ry="18" fill="#EF4444" />
          <ellipse cx="135" cy="70" rx="10" ry="18" fill="#EF4444" />
          <path d="M 45 130 Q 100 175 155 130" strokeWidth="7" />
          <path d="M 45 130 Q 45 150 55 160 M 155 130 Q 155 150 145 160" strokeWidth="5" />
        </svg>
      </div>

      {/* Patrick Jane Shadow aura */}
      <div className="absolute bottom-0 right-10 w-[350px] h-[450px] bg-gradient-to-t from-[#240F0F] via-red-950/20 to-transparent rounded-t-full blur-xl opacity-40" />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-7 py-3 rounded-2xl border border-red-500/30 bg-[#120707]/95 backdrop-blur-xl shadow-[0_0_25px_rgba(239,68,68,0.3)] flex items-center gap-3.5">
        <Eye className="w-5 h-5 text-red-500 animate-pulse" />
        <div>
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-red-400/70 block">The Mentalist · Patrick Jane</span>
          <span className="text-sm font-mono tracking-wide text-red-100 block mt-0.5 font-medium">
            {lang === "fa" ? "«هیچ جادویی در کار نیست؛ فقط مشاهده‌ی دقیق رفتار آدم‌هاست.»" : "«There is no such thing as psychics. Only human observation.»"}
          </span>
        </div>
      </div>
    </div>
  );
}

// 4. Resident Evil Theme
export function ResidentEvilOverlay({ lang }: { lang: string }) {
  const virus = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: Math.random() * 96,
    duration: 8 + Math.random() * 8,
    delay: Math.random() * 6,
    size: 16 + Math.random() * 12,
    char: i % 2 === 0 ? "🦠" : "🌿"
  })), []);

  return (
    <div className="fixed inset-0 z-[85] pointer-events-none overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.08),_transparent_75%)]" />

      {virus.map((v) => (
        <div key={v.id} className="virus-particle" style={{ left: `${v.left}%`, fontSize: `${v.size}px`, animationDuration: `${v.duration}s`, animationDelay: `${v.delay}s` }}>
          {v.char}
        </div>
      ))}

      {/* Wesker Glowing Eyes in dark shadow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 flex gap-16 opacity-50 mix-blend-screen">
        <div className="w-8 h-1.5 bg-red-500 shadow-[0_0_20px_8px_#EF4444] rounded-full rotate-[-8deg] animate-pulse" />
        <div className="w-8 h-1.5 bg-red-500 shadow-[0_0_20px_8px_#EF4444] rounded-full rotate-[8deg] animate-pulse" style={{ animationDelay: "0.4s" }} />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-7 py-3 rounded-2xl border border-emerald-500/35 bg-[#05100A]/95 backdrop-blur-xl shadow-[0_0_25px_rgba(34,197,94,0.3)] flex items-center gap-3">
        <Biohazard className="w-5 h-5 text-emerald-400 animate-spin" style={{ animationDuration: "12s" }} />
        <div>
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-emerald-400/70 block">Resident Evil · Umbrella Corp</span>
          <span className="text-sm font-mono tracking-wide text-emerald-100 block mt-0.5 font-bold">
            {lang === "fa" ? "«آلبرت وسکر: پایداری بشریت منوط به تحول ویروس T است!»" : "«Albert Wesker: Global saturation is imminent...»"}
          </span>
        </div>
      </div>
    </div>
  );
}

// 5. Radiohead Theme
export function RadioheadOverlay({ lang }: { lang: string }) {
  const songs = [
    "PARANOID ANDROID", "KARMA POLICE", "NO SURPRISES", "FAKE PLASTIC TREES",
    "CREEP", "OK COMPUTER", "EVERYTHING IN ITS RIGHT PLACE", "EXIT MUSIC (FOR A FILM)"
  ];
  return (
    <div className="fixed inset-0 z-[85] pointer-events-none overflow-hidden select-none bg-slate-950/35">
      {songs.map((s, i) => (
        <div
          key={i}
          className="rh-lyric font-mono font-bold tracking-[0.25em] text-slate-300/20"
          style={{ top: `${12 + (i * 11) % 75}%`, left: `${8 + (i * 19) % 70}%`, animationDelay: `${i * 1.8}s` }}
        >
          {s}
        </div>
      ))}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-7 py-3 rounded-2xl border border-slate-700/50 bg-[#1E293B]/95 backdrop-blur-xl shadow-xl flex items-center gap-3">
        <Disc className="w-5 h-5 text-slate-300 animate-spin" style={{ animationDuration: "6s" }} />
        <div>
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-400 block">Radiohead · OK Computer</span>
          <span className="text-sm font-mono tracking-wider text-slate-100 block mt-0.5 italic">
            {lang === "fa" ? "«خدایا، من برای چی اینجام؟ من که به اینجا تعلق ندارم...»" : "«What the hell am I doing here? I don't belong here...»"}
          </span>
        </div>
      </div>
    </div>
  );
}

// 6. Alan Wake Theme
export function AlanWakeOverlay({ lang }: { lang: string }) {
  return (
    <div className="fixed inset-0 z-[85] pointer-events-none overflow-hidden select-none">
      <div className="fog-layer" />
      <div className="flashlight-beam opacity-80" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center w-full max-w-2xl px-6 opacity-30 pointer-events-none">
        <h2 className="font-serif text-3xl sm:text-4xl italic tracking-wide text-white drop-shadow-[0_0_12px_#FFFFFF]">
          {lang === "fa" ? "«این یک دریاچه نیست... این یک اقیانوس است.»" : "«It's not a lake... it's an ocean.»"}
        </h2>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-7 py-3 rounded-2xl border border-neutral-600/40 bg-black/95 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-3">
        <Moon className="w-5 h-5 text-white animate-pulse" />
        <div>
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-400 block">Alan Wake · Bright Falls</span>
          <span className="text-sm font-serif tracking-wide text-white block mt-0.5">
            {lang === "fa" ? "«هیولاها در تاریکی زاده می‌شوند؛ فقط نور چراغ‌قوه آن‌ها را عقب می‌راند.»" : "«Monsters wear many faces in the Dark Presence...»"}
          </span>
        </div>
      </div>
    </div>
  );
}

// 7. Negan (The Walking Dead) Theme
export function NeganOverlay({ lang }: { lang: string }) {
  return (
    <div className="fixed inset-0 z-[85] pointer-events-none overflow-hidden select-none">
      <div className="negan-text">
        {lang === "fa" ? "«خوک کوچولو... خوک کوچولو... بذار بیام تو!»" : "«LITTLE PIG... LITTLE PIG... LET ME IN!»"}
      </div>
      
      {/* Lucille Bat vector silhouette swinging smoothly */}
      <svg className="lucille-bat drop-shadow-[0_0_20px_#B91C1C]" viewBox="0 0 120 550" fill="none">
        <path d="M48 0 C70 0 85 25 78 110 L65 520 C64 540 54 540 53 520 L40 110 C33 25 48 0 48 0 Z" fill="#241B1B" stroke="#704545" strokeWidth="2" />
        {/* Barbed wire wrapping */}
        <path d="M40 50 Q 65 65 80 40 M38 85 Q 65 100 82 75 M36 120 Q 62 135 80 110 M38 155 Q 64 170 78 145" stroke="#991B1B" strokeWidth="4.5" strokeLinecap="round" />
      </svg>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-7 py-3.5 rounded-2xl border border-red-600/40 bg-[#1A1616]/95 backdrop-blur-xl shadow-[0_0_25px_rgba(220,38,38,0.35)] flex items-center gap-3">
        <Skull className="w-5 h-5 text-red-500 animate-bounce" />
        <div>
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-red-400 block">The Walking Dead · Negan & Lucille</span>
          <span className="text-sm font-mono font-bold tracking-wide text-red-100 block mt-0.5">
            {lang === "fa" ? "«لوسیل تشنه است! قانون اول ناجیان: شما همه متعلق به من هستید.»" : "«Lucille is thirsty! You work for me now.»"}
          </span>
        </div>
      </div>
    </div>
  );
}

// 8. Edward Scissorhands Theme
export function EdwardOverlay({ lang }: { lang: string }) {
  const snow = useMemo(() => Array.from({ length: 45 }).map((_, i) => ({
    id: i,
    left: Math.random() * 98,
    size: 4 + Math.random() * 8,
    duration: 5 + Math.random() * 7,
    delay: Math.random() * 5
  })), []);

  return (
    <div className="fixed inset-0 z-[85] pointer-events-none overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,250,252,0.06),_transparent_65%)]" />

      {snow.map((s) => (
        <div key={s.id} className="edward-snow" style={{ left: `${s.left}%`, width: `${s.size}px`, height: `${s.size}px`, animationDuration: `${s.duration}s`, animationDelay: `${s.delay}s` }} />
      ))}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-7 py-3 rounded-2xl border border-slate-500/40 bg-[#171A21]/95 backdrop-blur-xl shadow-[0_0_25px_rgba(248,250,252,0.2)] flex items-center gap-3">
        <Scissors className="w-5 h-5 text-slate-200 animate-pulse" />
        <div>
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-400 block">Tim Burton · Edward Scissorhands</span>
          <span className="text-sm font-serif tracking-wide text-slate-100 block mt-0.5 font-medium">
            {lang === "fa" ? "«من نمی‌تونم در آغوشت بگیرم؛ دستانم قیچی است، اما قلبم گرم‌تر از برف.»" : "«I am not complete... but my love is warmer than the arctic snow.»"}
          </span>
        </div>
      </div>
    </div>
  );
}

// Master Renderer for ambient themes
export function EggOverlayRenderer({ theme, lang, frankOpen }: { theme: string | null; lang: "fa" | "en"; frankOpen?: boolean }) {
  if (!theme) return null;
  return (
    <>
      {theme === "watchdogs" && <WatchDogsOverlay lang={lang} />}
      {theme === "you" && <YouOverlay lang={lang} />}
      {theme === "mentalist" && <MentalistOverlay lang={lang} />}
      {theme === "residentevil" && <ResidentEvilOverlay lang={lang} />}
      {theme === "radiohead" && <RadioheadOverlay lang={lang} />}
      {theme === "alanwake" && <AlanWakeOverlay lang={lang} />}
      {theme === "negan" && <NeganOverlay lang={lang} />}
      {theme === "edward" && <EdwardOverlay lang={lang} />}
      {theme === "rustcohle" && <RustCohleOverlay lang={lang} />}
    </>
  );
}
