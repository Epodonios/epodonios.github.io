import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { CONTENT_FA, CONTENT_EN, CONTENT_TR } from "./content";
import type { Content } from "./content";

export const LANGS = ["fa", "en", "tr", "ru"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_META: Record<Lang, { label: string; short: string; dir: "rtl" | "ltr"; locale: string }> = {
  fa: { label: "فارسی", short: "FA", dir: "rtl", locale: "fa-IR" },
  en: { label: "English", short: "EN", dir: "ltr", locale: "en-US" },
  tr: { label: "Türkçe", short: "TR", dir: "ltr", locale: "tr-TR" },
  ru: { label: "ᚱᚢᚾᛁᚲ", short: "ᚱ", dir: "ltr", locale: "en-US" },
};

/* ============================================================
   Elder Futhark transliteration — turns the English copy into
   a rune cipher. Mirrors the same trick EPODONIOS already uses
   on the real GitHub profile README.
   ============================================================ */
const RUNE_MAP: Record<string, string> = {
  th: "ᚦ",
  a: "ᚨ", b: "ᛒ", c: "ᚲ", d: "ᛞ", e: "ᛖ", f: "ᚠ", g: "ᚷ", h: "ᚺ",
  i: "ᛁ", j: "ᛃ", k: "ᚲ", l: "ᛚ", m: "ᛗ", n: "ᚾ", o: "ᛟ", p: "ᛈ",
  q: "ᚲᚹ", r: "ᚱ", s: "ᛊ", t: "ᛏ", u: "ᚢ", v: "ᚹ", w: "ᚹ", x: "ᚲᛊ",
  y: "ᛃ", z: "ᛉ",
};
const RUNE_RE = /(th|[a-z])/gi;

export function runeify(input: string): string {
  return input.replace(RUNE_RE, (match) => RUNE_MAP[match.toLowerCase()] ?? match);
}

// Fields that must never be transliterated (code, handles, urls, numbers…)
const RAW_KEYS = new Set([
  "href", "repo", "demo", "email", "github", "handle", "version", "id",
  "icon", "accent", "num", "year", "stars", "tech", "en", "short", "code",
  "value", "suffix", "lang", "locale", "dir", "label_code", "productName",
]);

function transliterateDeep<T>(value: T, keyHint?: string): T {
  if (typeof value === "string") {
    if (keyHint && RAW_KEYS.has(keyHint)) return value as T;
    return runeify(value) as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((v) => transliterateDeep(v, keyHint)) as unknown as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = transliterateDeep(v, k);
    }
    return out as T;
  }
  return value;
}

const STORAGE_KEY = "epodonios-lang";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  dir: "rtl" | "ltr";
  t: Content;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "fa";
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    return saved && LANGS.includes(saved) ? saved : "fa";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    const meta = LANG_META[lang];
    document.documentElement.lang = lang === "ru" ? "en" : lang;
    document.documentElement.dir = meta.dir;
    document.title = lang === "ru" ? CONTENT_EN.meta.title : CONTENT_MAP[lang].meta.title;
  }, [lang]);

  const t = useMemo<Content>(() => {
    if (lang === "ru") return transliterateDeep(CONTENT_EN);
    return CONTENT_MAP[lang as Exclude<Lang, "ru">];
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, dir: LANG_META[lang].dir, t }),
    [lang, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

const CONTENT_MAP: Record<Exclude<Lang, "ru">, Content> = {
  fa: CONTENT_FA,
  en: CONTENT_EN,
  tr: CONTENT_TR,
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

/** Digit localisation — only Persian gets Persian-Arabic numerals */
export function digits(v: string | number, lang: Lang) {
  const s = String(v);
  if (lang !== "fa") return s;
  return s.replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}
