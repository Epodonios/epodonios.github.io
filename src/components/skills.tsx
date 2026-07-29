import { useMemo, useRef, useState } from "react";
import { useReveal } from "../lib/hooks";
import { digits, useLanguage } from "../lib/i18n";
import { Reveal, SectionHeader } from "../lib/ui";

/* ---------------- group icons ---------------- */
function GroupIcon({ icon }: { icon: "frontend" | "backend" | "tools" }) {
  const cls = "h-5 w-5";
  if (icon === "frontend")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
        <path d="m8 7-5 5 5 5M16 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (icon === "backend")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
        <ellipse cx="12" cy="5.5" rx="7" ry="3" />
        <path d="M5 5.5v13c0 1.66 3.13 3 7 3s7-1.34 7-3v-13M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
      <circle cx="12" cy="12" r="3.2" />
      <path
        d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------------- contribution graph ---------------- */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Day = { count: number; label: string };

function buildWeeks(locale: string) {
  const rnd = mulberry32(1403);
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - (52 * 7 - 1) - start.getDay());
  const fmtDay = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long" });
  const fmtMonth = new Intl.DateTimeFormat(locale, { month: "short" });
  const weeks: Day[][] = [];
  const months: { label: string; col: number }[] = [];
  let total = 0;
  let lastMonth = -1;
  for (let w = 0; w < 52; w += 1) {
    const col: Day[] = [];
    for (let d = 0; d < 7; d += 1) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      if (date.getTime() > today.getTime()) {
        col.push({ count: -1, label: "" });
        continue;
      }
      const r = rnd();
      const boost = date.getDay() === 5 ? 0.4 : 1;
      const count = r > 0.3 ? Math.floor(Math.pow(r, 2.1) * 13 * boost) : 0;
      total += count;
      col.push({ count, label: fmtDay.format(date) });
      if (d === 0 && date.getMonth() !== lastMonth) {
        months.push({ label: fmtMonth.format(date), col: w });
        lastMonth = date.getMonth();
      }
    }
    weeks.push(col);
  }
  return { weeks, months, total };
}

function cellColor(count: number) {
  if (count < 0) return "transparent";
  if (count === 0) return "#111a24";
  if (count <= 2) return "rgba(53,224,200,0.28)";
  if (count <= 5) return "rgba(53,224,200,0.5)";
  if (count <= 9) return "rgba(53,224,200,0.75)";
  return "#35e0c8";
}

function ContributionGraph() {
  const { t, lang } = useLanguage();
  const locale = lang === "fa" ? "fa-IR" : lang === "tr" ? "tr-TR" : "en-US";
  const { weeks, months, total } = useMemo(() => buildWeeks(locale), [locale]);
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const s = t.skills;

  return (
    <Reveal delay={150}>
      <div className="overflow-hidden rounded-xl border border-line bg-card p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h3 className="flex items-center gap-3 font-display text-2xl text-mist">
            {s.contribHeading}
            <span className="font-mono text-xs text-mut" dir="ltr">
              {s.contribSub}
            </span>
          </h3>
          <div className="flex items-center gap-2 text-xs text-mut">
            {s.less}
            {[0, 2, 5, 9, 13].map((c) => (
              <span key={c} className="h-3 w-3 rounded-[3px]" style={{ background: cellColor(c) }} />
            ))}
            {s.more}
          </div>
        </div>

        <div dir="ltr" className="overflow-x-auto pb-2">
          <div className="relative inline-block" ref={gridRef}>
            <div className="relative mb-2 h-4 text-[10px] text-mut" style={{ width: 52 * 14 }}>
              {months.map((m) => (
                <span key={`${m.label}-${m.col}`} className="absolute" style={{ left: m.col * 14 }}>
                  {m.label}
                </span>
              ))}
            </div>
            <div className="flex gap-[3px]">
              {weeks.map((col, w) => (
                <div key={w} className="flex flex-col gap-[3px]">
                  {col.map((day, d) => (
                    <div
                      key={d}
                      onMouseEnter={(e) => {
                        if (day.count < 0) return;
                        const r = e.currentTarget.getBoundingClientRect();
                        setTip({
                          x: r.left + r.width / 2,
                          y: r.top - 8,
                          text: `${digits(day.count, lang)} ${s.contribUnit} — ${day.label}`,
                        });
                      }}
                      onMouseLeave={() => setTip(null)}
                      className="h-[11px] w-[11px] cursor-pointer rounded-[2px] transition-transform hover:scale-125"
                      style={{ background: cellColor(day.count) }}
                    />
                  ))}
                </div>
              ))}
            </div>
            {tip && (
              <div
                className="pointer-events-none fixed z-[60] -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-line bg-deep px-2.5 py-1.5 font-mono text-[11px] text-mist shadow-xl"
                style={{ left: tip.x, top: tip.y }}
              >
                {tip.text}
              </div>
            )}
          </div>
        </div>

        <p className="mt-4 border-t border-line pt-4 text-sm text-mut">
          {s.contribFooterPrefix}{" "}
          <span className="font-mono text-turq" dir="ltr">
            {digits(total.toLocaleString("en-US").replace(/,/g, lang === "fa" ? "٬" : ","), lang)}
          </span>{" "}
          — {s.contribFooterSuffix}
        </p>
      </div>
    </Reveal>
  );
}

/* ---------------- skills section ---------------- */
export function Skills() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.1);
  const { t, lang } = useLanguage();
  const s = t.skills;
  const pctSign = lang === "fa" ? "٪" : "%";

  return (
    <section id="skills" className="relative border-t border-line bg-deep/40">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeader num={s.num} title={s.title} en={s.en} />

        <div ref={ref} className={`reveal ${shown ? "is-in" : ""}`}>
          <div className="grid gap-6 lg:grid-cols-3">
            {s.groups.map((group, gi) => (
              <div
                key={group.title}
                className="group rounded-xl border border-line bg-card p-7 transition-colors hover:border-turq/40"
              >
                <div className="mb-7 flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-lg border ${
                      group.accent === "gold" ? "border-gold/30 bg-gold/[0.07] text-gold" : "border-turq/30 bg-turq/[0.07] text-turq"
                    }`}
                  >
                    <GroupIcon icon={group.icon} />
                  </span>
                  <h3 className="font-display text-2xl text-mist">{group.title}</h3>
                </div>
                <div className="space-y-5">
                  {group.items.map((item, i) => (
                    <div key={item.name}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-mono text-mist/90" dir="ltr">
                          {item.name}
                        </span>
                        <span className="font-mono text-xs text-mut">{item.pct}{pctSign}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-line">
                        <div
                          className={`skill-fill h-full rounded-full ${group.accent === "gold" ? "bg-gold" : "bg-turq"}`}
                          style={{ width: `${item.pct}%`, transitionDelay: `${gi * 120 + i * 90}ms` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Reveal delay={100}>
          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-xl border border-line bg-card px-7 py-5">
            <span className="text-sm font-medium text-mist">{s.learningLabel}</span>
            {s.learningItems.map((l) => (
              <span
                key={l}
                className="rounded-full border border-dashed border-turq/40 px-4 py-1.5 font-mono text-sm text-turq"
                dir="ltr"
              >
                {l}
              </span>
            ))}
            <span className="ms-auto hidden text-xs text-mut sm:block">{s.learningFooter}</span>
          </div>
        </Reveal>

        <div className="mt-8">
          <ContributionGraph />
        </div>
      </div>
    </section>
  );
}
