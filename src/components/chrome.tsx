import { useEffect, useState } from "react";
import { digits, useLanguage } from "../lib/i18n";
import { useClock, useReducedMotion, useScrollProgress } from "../lib/hooks";
import { IconBranch, IconCheck, IconGithub } from "../lib/ui";
import { LanguageSwitcher } from "./LanguageSwitcher";

/* ================= Preloader ================= */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const { t, lang } = useLanguage();
  const BOOT_LINES = t.preloader.lines;
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (reduced) {
      const t = window.setTimeout(onDone, 250);
      return () => window.clearTimeout(t);
    }
    const lineTimer = window.setInterval(() => setVisibleLines((i) => Math.min(i + 1, BOOT_LINES.length)), 240);
    const progTimer = window.setInterval(() => setProgress((p) => Math.min(100, p + 4)), 62);
    const finish = window.setTimeout(() => {
      window.clearInterval(lineTimer);
      window.clearInterval(progTimer);
      setFading(true);
      window.setTimeout(onDone, 550);
    }, 1900);
    return () => {
      window.clearInterval(lineTimer);
      window.clearInterval(progTimer);
      window.clearTimeout(finish);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, onDone, lang]);

  const skip = () => {
    if (fading) return;
    setFading(true);
    window.setTimeout(onDone, 350);
  };

  return (
    <div
      onClick={skip}
      className={`fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-ink transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-[min(90vw,420px)]">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-mono text-sm text-turq" dir="ltr">
            ~/epodonios <span className="blink">▌</span>
          </span>
          <span className="font-mono text-xs text-mut" dir="ltr">
            {digits(progress, lang)}
            {lang === "fa" ? "٪" : "%"}
          </span>
        </div>
        <div className="h-36 space-y-1.5 font-mono text-xs leading-6 text-mut sm:text-[13px]" dir="ltr">
          {BOOT_LINES.slice(0, visibleLines).map((l, i) => (
            <div key={i} className={l.startsWith("$") ? "text-turq" : l.startsWith("✓") ? "text-gold" : "text-mut"}>
              {l}
            </div>
          ))}
        </div>
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-line">
          <div className="h-full bg-turq transition-all duration-150" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-4 text-center text-[11px] text-mut">{t.preloader.skip}</p>
      </div>
    </div>
  );
}

// SmartCursor در فایل جداگانه تعریف شده و در App.tsx import می‌شود

/* ================= NavBar ================= */
export function NavBar() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const NAV = [
    { id: "about", label: t.nav.about },
    { id: "skills", label: t.nav.skills },
    { id: "projects", label: t.nav.projects },
    { id: "terminal", label: t.nav.terminal },
    { id: "eggs", label: t.nav.eggs },
    { id: "contact", label: t.nav.contact },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-ink/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="font-mono text-sm text-turq" dir="ltr">
            ~/{t.person.handle}
            <span className="blink text-gold">▌</span>
          </span>
          <span className="hidden font-display text-xl text-mist sm:block">{t.person.name}</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="link-underline text-sm text-mut transition-colors hover:text-mist">
              {n.label}
            </a>
          ))}
          <LanguageSwitcher />
          <a
            href={t.person.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-full border border-line p-2 text-mut transition-colors hover:border-turq hover:text-turq"
          >
            <IconGithub className="h-4 w-4" />
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher compact />
          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-line"
            onClick={() => setOpen((o) => !o)}
            aria-label={t.chrome.menuLabel}
          >
            <span className={`h-px w-5 bg-mist transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-mist transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-deep px-5 py-4 md:hidden">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setOpen(false)}
              className="block border-b border-line/50 py-3 text-mut transition-colors last:border-0 hover:text-turq"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ================= StatusBar (VS Code style) ================= */
export function StatusBar() {
  const { t, lang } = useLanguage();
  const { time, date } = useClock(lang === "fa" ? "fa-IR" : lang === "tr" ? "tr-TR" : "en-US");
  const progress = useScrollProgress();
  const percentSign = lang === "fa" ? "٪" : "%";

  return (
    <>
      {/* نوار پیشرفت بالا */}
      <div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-l from-turq via-turq to-gold"
        style={{ transform: `scaleX(${progress / 100})`, transformOrigin: "right" }}
        aria-hidden="true"
      />
      <footer className="fixed inset-x-0 bottom-0 z-50 hidden border-t border-line bg-deep font-mono text-[11px] text-mut sm:block">
      <div className="mx-auto flex h-8 max-w-none items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-turq">
            <IconBranch className="h-3.5 w-3.5" />
            <span dir="ltr">{t.statusbar.branch}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <IconCheck className="h-3 w-3 text-turq" />
            {t.statusbar.build}
          </span>
          <span className="hidden lg:inline" dir="ltr">
            {t.statusbar.encodingLine}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline">{date}</span>
          <span className="text-gold" dir="ltr">
            {time}
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0 })}
            className="rounded px-1.5 py-0.5 transition-colors hover:bg-line hover:text-mist"
            data-hover
            aria-label={t.statusbar.backToTop}
          >
            ↑ {digits(progress, lang)}{percentSign}
          </button>
        </div>
      </div>
    </footer>
    </>
  );
}

/* دایره‌ی پیشرفت اسکرول گوشه‌ی صفحه */
export function ScrollOrb() {
  const { t, lang } = useLanguage();
  const progress = useScrollProgress();
  const percentSign = lang === "fa" ? "٪" : "%";
  const radius = 22;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - progress / 100);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-14 left-5 z-[65] hidden h-14 w-14 items-center justify-center rounded-full border border-line bg-deep/90 backdrop-blur transition-colors hover:border-turq hover:text-turq md:flex"
      aria-label={t.statusbar.backToTop}
    >
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
        <circle cx="28" cy="28" r={radius} fill="none" stroke="rgba(30,42,56,0.8)" strokeWidth="2" />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#35e0c8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.25s" }}
        />
      </svg>
      <span className="font-mono text-[11px] font-bold text-mist">{`${digits(progress, lang)}${percentSign}`}</span>
    </button>
  );
}
