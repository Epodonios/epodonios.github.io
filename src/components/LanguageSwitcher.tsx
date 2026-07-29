import { useEffect, useRef, useState } from "react";
import { LANGS, LANG_META, useLanguage } from "../lib/i18n";

function GlobeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
    </svg>
  );
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t.chrome.langLabel}
        aria-expanded={open}
        data-cursor-link=""
        className={`group flex items-center gap-2 rounded-full border border-line/80 bg-card/60 text-mut transition-colors hover:border-turq/50 hover:text-turq ${
          compact ? "h-10 w-10 justify-center" : "px-3.5 py-1.5"
        }`}
      >
        <GlobeIcon className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:rotate-180" />
        {!compact && (
          <span className="font-mono text-xs tracking-[0.1em]" dir="ltr">
            {LANG_META[lang].short}
          </span>
        )}
      </button>

      {open && (
        <div
          dir="ltr"
          className="absolute end-0 top-[calc(100%+10px)] z-[70] w-44 overflow-hidden rounded-xl border border-line bg-deep/95 py-1.5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.75)] backdrop-blur-md"
        >
          <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-turq/50 to-transparent" />
          {LANGS.map((l) => {
            const meta = LANG_META[l];
            const active = l === lang;
            return (
              <button
                key={l}
                onClick={() => {
                  setLang(l);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                  active ? "bg-turq/[0.08] text-turq" : "text-mist hover:bg-line/40"
                }`}
              >
                <span className={l === "fa" ? "font-body" : l === "ru" ? "font-mono" : "font-body"}>{meta.label}</span>
                <span className="font-mono text-[11px] text-mut">{meta.short}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
