import { useEffect, useRef, useState } from "react";
import { useClock } from "../lib/hooks";
import { useLanguage } from "../lib/i18n";
import { useEggs } from "../lib/eggs/EggContext";
import { IconExternal, IconGithub, IconStar, Reveal, SectionHeader } from "../lib/ui";
import { Magnetic, Tilt } from "./effects";

/* =================================================================
   Projects — plain reveal-in list (no position:sticky).

   NOTE ON THE SCROLL BUG: the previous version stacked cards with
   `position: sticky` while a *descendant* got a live 3D transform
   (perspective + rotateX/rotateY) every animation frame. Chromium
   and Firefox both have long-standing rendering bugs where a sticky
   ancestor loses track of its offset once a descendant introduces a
   3D transform / new stacking context — the element appears to
   "jump" or detach mid-scroll. Dropping the sticky-stack pattern
   (kept the tilt/hover effect, just not combined with `sticky`)
   removes the combination that triggers it.
   ================================================================= */
export function Projects() {
  const { t } = useLanguage();
  const p = t.projects;
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeader num={p.num} title={p.title} en={p.en} />
      <Reveal>
        <p className="-mt-8 mb-14 max-w-2xl leading-8 text-mut">{p.intro}</p>
      </Reveal>

      <div className="space-y-8">
        {p.items.map((item, i) => {
          const isGold = item.accent === "gold";
          return (
            <Reveal key={item.num} delay={i * 60}>
              <Tilt max={4}>
                <article
                  className={`proj-card relative overflow-hidden rounded-xl border border-line bg-card p-7 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.65)] md:p-10 ${
                    isGold ? "hover:border-gold/50" : "hover:border-turq/50"
                  }`}
                  data-cursor-media=""
                >
                  <span className={`absolute inset-x-10 top-0 h-[2px] ${isGold ? "bg-gold" : "bg-turq"}`} />
                  <div className="grid gap-8 md:grid-cols-12 md:items-center">
                    <div className="md:col-span-7">
                      <div className="mb-3 flex items-center gap-4">
                        <span className={`font-mono text-sm ${isGold ? "text-gold" : "text-turq"}`} dir="ltr">
                          #{item.num}
                        </span>
                        <span className="font-mono text-[11px] tracking-[0.25em] text-mut uppercase" dir="ltr">
                          {item.en}
                        </span>
                        <span className="text-xs text-mut">{item.year}</span>
                      </div>
                      <h3 className="font-display text-3xl text-mist md:text-4xl" dir="ltr">
                        {item.productName}
                      </h3>
                      <p className="mt-4 max-w-xl leading-8 text-mut">{item.desc}</p>
                      <div className="mt-6 flex flex-wrap gap-2.5">
                        {item.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-line bg-deep px-3.5 py-1.5 font-mono text-xs text-mut transition-colors hover:border-turq/40 hover:text-turq"
                            dir="ltr"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-5">
                      <div className="rounded-lg border border-line bg-deep p-6">
                        <div className="flex items-center justify-between border-b border-line pb-4">
                          <span className="flex items-center gap-2 text-sm text-mut">
                            <IconStar className={`h-4 w-4 ${isGold ? "text-gold" : "text-turq"}`} />
                            {p.starsLabel}
                          </span>
                          <span className="font-mono text-lg text-mist" dir="ltr">
                            ★ {item.stars}
                          </span>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <Magnetic strength={0.3}>
                            <a
                              href={item.repo}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm text-mist transition-colors hover:border-turq hover:text-turq"
                            >
                              <IconGithub className="h-4 w-4" />
                              {p.repoLabel}
                            </a>
                          </Magnetic>
                          <Magnetic strength={0.3}>
                            <a
                              href={item.demo}
                              target="_blank"
                              rel="noreferrer"
                              className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${
                                isGold ? "bg-gold text-ink hover:bg-[#ffc95e]" : "bg-turq text-ink hover:bg-[#52ecd6]"
                              }`}
                            >
                              <IconExternal className="h-4 w-4" />
                              {item.demoLabel}
                            </a>
                          </Magnetic>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Tilt>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ================= Interactive terminal ================= */
type TermLine = { kind: "in" | "out" | "sys" | "ok" | "err"; text: string };

export function TerminalSection() {
  const { t, lang } = useLanguage();
  const locale = lang === "fa" ? "fa-IR" : lang === "tr" ? "tr-TR" : "en-US";
  const { time, date } = useClock(locale);
  const { checkTerminalInput, unlockEggById } = useEggs();
  const tt = t.terminal;
  const [lines, setLines] = useState<TermLine[]>(tt.welcome);
  const [value, setValue] = useState("");
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<string[]>([]);
  const clockRef = useRef({ time, date });
  clockRef.current = { time, date };

  // کد کونامی — فقط وقتی این اینپوت فوکوس دارد کار می‌کند (پایین‌تر در onKey بررسی می‌شود)
  const konamiSeq = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
  const konamiIdxRef = useRef(0);

  useEffect(() => {
    setLines(tt.welcome);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const push: TermLine[] = [{ kind: "in", text: `$ ${raw}` }];
    if (cmd === "clear") {
      setLines([]);
      setValue("");
      return;
    }
    if (cmd) {
      historyRef.current = [raw, ...historyRef.current].slice(0, 30);
    }
    setHistIdx(-1);

    const commands: Record<string, () => TermLine[]> = {
      help: () => [
        { kind: "sys", text: tt.helpTitle },
        ...tt.help.map((line) => ({ kind: "out" as const, text: line })),
      ],
      whoami: () => tt.whoami,
      skills: () => tt.skillsOut.map((line) => ({ kind: "out" as const, text: line })),
      projects: () => [
        ...t.projects.items.map((item) => ({ kind: "ok" as const, text: `${item.num}. ${item.productName} — ★ ${item.stars}` })),
        { kind: "out", text: tt.projectsFooter },
      ],
      contact: () => tt.contactOut.map((line) => ({ kind: "out" as const, text: line })),
      date: () => [{ kind: "ok", text: `${clockRef.current.date} — ${clockRef.current.time}` }],
      coffee: () => [{ kind: "ok", text: tt.coffee }],
      ls: () => [{ kind: "out", text: "about.md  skills.json  projects/  contact.txt  .secrets" }],
      "cat .secrets": () => [{ kind: "err", text: tt.secrets }],
      sudo: () => [{ kind: "err", text: tt.sudo }],
    };

    const handler = commands[cmd];
    if (handler) {
      push.push(...handler());
    } else if (cmd) {
      push.push({ kind: "err", text: `${tt.notFound}: ${raw}` });
    }
    setLines((ls) => [...ls, ...push]);
    setValue("");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key.toLowerCase();
    if (k === konamiSeq[konamiIdxRef.current]) {
      konamiIdxRef.current += 1;
      if (konamiIdxRef.current === konamiSeq.length) {
        konamiIdxRef.current = 0;
        unlockEggById("frankenstein");
      }
    } else {
      konamiIdxRef.current = k === konamiSeq[0] ? 1 : 0;
    }

    if (e.key === "Enter") {
      run(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const h = historyRef.current;
      if (h.length) {
        const next = Math.min(histIdx + 1, h.length - 1);
        setHistIdx(next);
        setValue(h[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      setHistIdx(Math.max(next, -1));
      setValue(next >= 0 ? historyRef.current[next] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const all = ["help", "whoami", "skills", "projects", "contact", "date", "coffee", "clear", "ls"];
      const hit = all.find((c) => c.startsWith(value.trim().toLowerCase()));
      if (hit) setValue(hit);
    }
  };

  const kindClass: Record<TermLine["kind"], string> = {
    in: "text-mist",
    out: "text-mut",
    sys: "text-mist/70",
    ok: "text-turq",
    err: "text-ember",
  };

  return (
    <section id="terminal" className="relative border-t border-line bg-deep/40">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeader num={tt.num} title={tt.title} en={tt.en} />

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="leading-8 text-mut">{tt.desc}</p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {tt.quickButtons.map((c) => (
                  <button
                    key={c}
                    onClick={() => run(c)}
                    className="rounded-full border border-line px-4 py-1.5 font-mono text-xs text-mut transition-colors hover:border-turq hover:text-turq"
                    dir="ltr"
                  >
                    $ {c}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={120}>
              <div
                className="overflow-hidden rounded-xl border border-line bg-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
                onClick={() => inputRef.current?.focus()}
              >
                <div className="flex items-center gap-2 border-b border-line bg-deep px-4 py-3" dir="ltr">
                  <span className="h-3 w-3 rounded-full bg-ember/80" />
                  <span className="h-3 w-3 rounded-full bg-gold/80" />
                  <span className="h-3 w-3 rounded-full bg-turq/80" />
                  <span className="ms-3 font-mono text-xs text-mut">{tt.windowTitle}</span>
                </div>
                <div ref={bodyRef} className="term-scroll h-80 overflow-y-auto p-5 font-mono text-[13px] leading-7" dir="ltr">
                  {lines.map((l, i) => (
                    <div key={i} className={kindClass[l.kind]}>
                      {l.kind === "in" ? (
                        <span>
                          <span className="text-turq">$ </span>
                          <span className="text-mist">{l.text.slice(2)}</span>
                        </span>
                      ) : (
                        l.text
                      )}
                    </div>
                  ))}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-turq">$</span>
                    <input
                      ref={inputRef}
                      value={value}
                      onChange={(e) => {
                        const next = e.target.value;
                        if (checkTerminalInput(next)) {
                          setValue("");
                        } else {
                          setValue(next);
                        }
                      }}
                      onKeyDown={onKey}
                      className="flex-1 bg-transparent text-mist caret-turq outline-none placeholder:text-mut/40"
                      placeholder={tt.placeholder}
                      spellCheck={false}
                      autoComplete="off"
                      aria-label={tt.ariaLabel}
                    />
                    <span className="term-caret" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
