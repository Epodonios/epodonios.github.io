import { useEffect, useState } from "react";
import { useClock, useReducedMotion, useScramble, useTypewriter } from "../lib/hooks";
import { digits, useLanguage } from "../lib/i18n";
import { IconArrow, IconGithub, IconPin } from "../lib/ui";
import { Constellation, Magnetic } from "./effects";

function HeroTerminal() {
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const SCRIPT = t.hero.terminalLines;
  const total = SCRIPT.reduce((a, l) => a + l.length + 1, 0);
  const [chars, setChars] = useState(reduced ? total : 0);

  useEffect(() => {
    if (reduced) {
      setChars(total);
      return;
    }
    setChars(0);
    const id = window.setInterval(() => {
      setChars((c) => {
        if (c >= total) {
          window.clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 32);
    return () => window.clearInterval(id);
  }, [reduced, total, SCRIPT]);

  let remaining = chars;
  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-deep shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]" data-cursor-text="">
      <div className="scanline pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-turq/[0.05] to-transparent" />
      <div className="flex items-center gap-2 border-b border-line px-4 py-3" dir="ltr">
        <span className="h-3 w-3 rounded-full bg-ember/80" />
        <span className="h-3 w-3 rounded-full bg-gold/80" />
        <span className="h-3 w-3 rounded-full bg-turq/80" />
        <span className="ms-3 font-mono text-xs text-mut">{t.hero.terminalTitle}</span>
      </div>
      <div className="min-h-[220px] p-5 font-mono text-[13px] leading-7" dir="ltr">
        {SCRIPT.map((line, i) => {
          const take = Math.max(0, Math.min(line.length, remaining));
          remaining -= line.length + 1;
          if (take === 0 && remaining < 0 && chars < total) return null;
          const isActive = take > 0 && take < line.length;
          const isDone = take >= line.length;
          return (
            <div
              key={i}
              className={
                line.startsWith("$") ? "text-turq" : line.startsWith("remote") ? "text-gold" : "text-mist/80"
              }
            >
              {line.slice(0, take)}
              {isActive && <span className="term-caret" />}
              {isDone && i === SCRIPT.length - 1 && chars >= total && <span className="term-caret" />}
            </div>
          );
        })}
      </div>
      <div className="border-t border-line/60 px-4 py-2.5 font-mono text-[11px] text-mut" dir="ltr">
        bash · node v20.11 · <span className="text-turq">{t.hero.terminalReady}</span>
      </div>
    </div>
  );
}

/* ---------- Floating glyphs ---------- */
const GLYPHS = [
  { t: "</>", top: "16%", start: "4%", delay: "0s", size: "text-2xl", rot: "-8deg" },
  { t: "{ }", top: "26%", start: "88%", delay: "1.2s", size: "text-3xl", rot: "10deg" },
  { t: "//", top: "68%", start: "6%", delay: "2s", size: "text-4xl", rot: "0deg" },
  { t: "#", top: "78%", start: "92%", delay: "0.6s", size: "text-2xl", rot: "14deg" },
  { t: "( )", top: "12%", start: "70%", delay: "1.7s", size: "text-xl", rot: "-12deg" },
  { t: "01", top: "84%", start: "40%", delay: "2.4s", size: "text-2xl", rot: "6deg" },
];

export function Hero({ play }: { play: boolean }) {
  const { t, lang } = useLanguage();
  const name = useScramble(t.person.name, play);
  const typed = useTypewriter(t.person.phrases, play);
  const locale = lang === "fa" ? "fa-IR" : lang === "tr" ? "tr-TR" : "en-US";
  const { time, date } = useClock(locale);

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-32 md:pt-40">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Constellation />
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 start-[-3rem] select-none font-display text-[24rem] leading-none text-turq/[0.035] md:text-[36rem]"
      >
        {t.person.bigLetter}
      </span>
      {GLYPHS.map((g) => (
        <span
          key={g.t}
          aria-hidden="true"
          className={`floaty pointer-events-none absolute hidden select-none font-mono text-line ${g.size} md:block`}
          style={{ top: g.top, insetInlineStart: g.start, animationDelay: g.delay, ["--rot" as never]: g.rot }}
          dir="ltr"
        >
          {g.t}
        </span>
      ))}

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="mb-7 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2.5 rounded-full border border-turq/30 bg-turq/[0.06] px-4 py-1.5 text-sm text-turq">
              <span className="relative flex h-2 w-2">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-turq" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-turq" />
              </span>
              {t.person.statusNote}
            </span>
            <span className="flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-sm text-mut">
              <IconPin className="h-4 w-4 text-gold" />
              {t.person.location}
            </span>
          </div>

          <h1 className="font-display text-6xl leading-[1.1] text-mist md:text-8xl" aria-label={t.person.name} dir="ltr">
            {name}
          </h1>

          <p className="mt-5 h-8 font-mono text-lg text-mut md:text-xl" dir="ltr">
            <span className="text-gold">&gt;_ </span>
            <span className="text-turq">{typed}</span>
            <span className="term-caret ms-1" />
          </p>

          <p className="mt-7 max-w-xl text-[15px] leading-8 text-mut md:text-base">{t.person.heroBio}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.4}>
              <a
                href="#projects"
                className="group flex items-center gap-2.5 rounded-lg bg-turq px-7 py-3.5 font-bold text-ink transition-all hover:bg-[#52ecd6] hover:shadow-[0_10px_40px_-10px_rgba(53,224,200,0.5)]"
              >
                {t.hero.viewProjects}
                <IconArrow className="h-4 w-4 arrow-nudge" />
              </a>
            </Magnetic>
            <Magnetic strength={0.35}>
              <a
                href={t.person.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-lg border border-line px-7 py-3.5 font-medium text-mist transition-colors hover:border-gold hover:text-gold"
              >
                <IconGithub className="h-4 w-4" />
                {t.hero.githubProfile}
              </a>
            </Magnetic>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-9 gap-y-3 border-t border-line pt-6 text-sm text-mut">
            <span className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {date}
            </span>
            <span className="flex items-center gap-2.5 font-mono" dir="ltr">
              <span className="h-1.5 w-1.5 rounded-full bg-turq" />
              {t.hero.tzLabel} {time}
            </span>
            <span className="font-mono text-xs" dir="ltr">
              {t.person.version} — github pages
            </span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <HeroTerminal />
          <div className="mt-5 flex items-center justify-between rounded-lg border border-line bg-card px-5 py-3.5">
            <span className="text-sm text-mut">{t.person.buildingLabel}</span>
            <span className="font-mono text-sm text-gold" dir="ltr">
              {t.person.building} <span className="text-turq">{digits(t.person.version, lang)}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Marquee ---------- */
export function Marquee() {
  const { t } = useLanguage();
  const items = [...t.marquee, ...t.marquee];
  return (
    <div className="marquee relative overflow-hidden border-y border-line bg-deep/70 py-4" dir="ltr">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="marquee-track flex items-center gap-8">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className={`font-display text-xl ${i % 2 ? "text-mut" : "text-mist"}`}>{m}</span>
            <span className={i % 2 ? "text-gold" : "text-turq"}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
