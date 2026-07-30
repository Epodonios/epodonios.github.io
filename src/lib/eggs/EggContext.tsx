"use client";

/* =================================================================
   EggContext — بر خلاف نسخه‌ی اصلی (که با تایپ در هر جای صفحه فعال
   می‌شد)، اینجا طبق درخواست، کشف ایستر اگ‌ها فقط از طریق تایپ در
   ترمینال ممکن است. متن معماها، شناسه‌ها و کلیدواژه‌ها همان داده‌ی
   اصلی و بدون تغییرند؛ فقط سطح تشخیص محدود به ترمینال شده.
   ================================================================= */

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { DIALOGUE_EGGS, DIALOGUE_MAP } from "./dialogueEggs";
import { ACTIVE_EGGS, ACTIVE_MAP, GENERATED_THEMES } from "./activeEggs";

export type EggLang = "fa" | "en";
const STORAGE_KEY = "epodonios_eggs_unlocked";

export interface EggListEntry {
  id: string;
  category: "theme" | "quote";
  icon: string;
  riddle: { fa: string; en: string };
  title: { fa: string; en: string };
}

interface EggContextValue {
  unlockedEggs: Record<string, boolean>;
  totalCount: number;
  foundCount: number;
  allEggs: EggListEntry[];
  checkTerminalInput: (value: string) => boolean;
  unlockEggById: (id: string) => void;
  rewardTheme: string | null;
  activeDialogue: string | null;
  rewardBanner: { icon: string; title: string; subtitle: string } | null;
  matrixMode: boolean;
  closeDialogue: () => void;
}

const EggCtx = createContext<EggContextValue | null>(null);

const ALL_EGGS: EggListEntry[] = [
  ...ACTIVE_EGGS.map((e) => ({
    id: e.id,
    category: "theme" as const,
    icon: e.icon,
    riddle: e.riddle,
    title: e.title,
  })),
  ...DIALOGUE_EGGS.map((e) => ({
    id: e.id,
    category: "quote" as const,
    icon: e.icon,
    riddle: e.riddle,
    title: { fa: e.source.fa, en: e.source.en },
  })),
];

export function EggProvider({ children }: { children: ReactNode }) {
  const [rewardTheme, setRewardTheme] = useState<string | null>(null);
  const [activeDialogue, setActiveDialogue] = useState<string | null>(null);
  const [rewardBanner, setRewardBanner] = useState<{ icon: string; title: string; subtitle: string } | null>(null);
  const [matrixMode, setMatrixMode] = useState(false);
  const [unlockedEggs, setUnlockedEggs] = useState<Record<string, boolean>>({});
  const bannerTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    try {
      const u = localStorage.getItem(STORAGE_KEY);
      if (u) setUnlockedEggs(JSON.parse(u));
    } catch {
      /* noop */
    }
  }, []);

  const eggRewardMeta = (id: string, lang: EggLang) => {
    const fa = lang === "fa";
    const d = DIALOGUE_MAP[id];
    if (d) return { icon: d.icon, title: (fa ? d.source.fa : d.source.en).split(" · ")[0], subtitle: fa ? d.footer.fa : d.footer.en };
    const a = ACTIVE_MAP[id];
    if (a) return { icon: a.icon, title: fa ? a.title.fa : a.title.en, subtitle: fa ? a.subtitle.fa : a.subtitle.en };
    return { icon: "🥚", title: "Secret", subtitle: "Easter Egg" };
  };

  const unlockEggById = (id: string, lang: EggLang = "en") => {
    if (!DIALOGUE_MAP[id] && !ACTIVE_MAP[id]) return;
    setUnlockedEggs((prev) => {
      if (prev[id]) return prev;
      const next = { ...prev, [id]: true };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* noop */
      }
      return next;
    });

    const meta = eggRewardMeta(id, lang);
    setRewardBanner(meta);
    window.clearTimeout(bannerTimerRef.current);
    bannerTimerRef.current = window.setTimeout(() => setRewardBanner(null), 4200);

    if (DIALOGUE_MAP[id]) {
      setActiveDialogue(id);
    } else if (id === "matrix") {
      setMatrixMode(true);
    } else if (ACTIVE_MAP[id]) {
      setRewardTheme((cur) => (cur === id ? null : id));
    }
  };

  // نگاشت کلیدواژه → id — دقیقاً همان داده‌ی اصلی، فقط منبع تشخیصش عوض شده
  const keywordMap = useMemo(() => {
    const m: Record<string, string> = {};
    DIALOGUE_EGGS.forEach((e) => {
      m[e.id.toLowerCase()] = e.id;
      e.keywords.forEach((k) => (m[k.toLowerCase()] = e.id));
    });
    ACTIVE_EGGS.forEach((e) => {
      m[e.id.toLowerCase()] = e.id;
      e.keywords.forEach((k) => (m[k.toLowerCase()] = e.id));
    });
    return m;
  }, []);

  const sortedAnswers = useMemo(() => Object.entries(keywordMap).sort((a, b) => b[0].length - a[0].length), [keywordMap]);

  // فقط ترمینال این تابع را صدا می‌زند — نه هیچ جای دیگری از صفحه
  const checkTerminalInput = (value: string) => {
    const normalized = value.normalize("NFKC").toLowerCase();
    const matched = sortedAnswers.find(([answer]) => normalized.endsWith(answer));
    if (matched) {
      unlockEggById(matched[1]);
      return true;
    }
    return false;
  };

  // کلاس تم روی body
  useEffect(() => {
    const all = ACTIVE_EGGS.filter((e) => e.kind === "theme").map((e) => `theme-${e.id}`);
    all.forEach((c) => document.body.classList.remove(c));
    if (rewardTheme) document.body.classList.add(`theme-${rewardTheme}`);
    return () => {
      all.forEach((c) => document.body.classList.remove(c));
    };
  }, [rewardTheme]);

  useEffect(() => {
    if (!matrixMode) return;
    const timer = window.setTimeout(() => setMatrixMode(false), 9000);
    return () => window.clearTimeout(timer);
  }, [matrixMode]);

  const value: EggContextValue = {
    unlockedEggs,
    totalCount: ALL_EGGS.length,
    foundCount: Object.keys(unlockedEggs).length,
    allEggs: ALL_EGGS,
    checkTerminalInput,
    unlockEggById: (id: string) => unlockEggById(id),
    rewardTheme,
    activeDialogue,
    rewardBanner,
    matrixMode,
    closeDialogue: () => setActiveDialogue(null),
  };

  return <EggCtx.Provider value={value}>{children}</EggCtx.Provider>;
}

export function useEggs() {
  const ctx = useContext(EggCtx);
  if (!ctx) throw new Error("useEggs must be used within EggProvider");
  return ctx;
}

export { GENERATED_THEMES };
