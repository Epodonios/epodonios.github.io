import { useMemo, useState } from "react";
import { useLanguage, digits } from "../lib/i18n";
import { useEggs } from "../lib/eggs/EggContext";
import { Reveal, SectionHeader, IconCheck } from "../lib/ui";

type Filter = "all" | "found" | "locked";

export function EasterEggsSection() {
  const { t, lang } = useLanguage();
  const eggLang = lang === "fa" ? "fa" : "en";
  const e = t.eggs;
  const { allEggs, unlockedEggs, foundCount, totalCount } = useEggs();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allEggs.filter((egg) => {
      const found = !!unlockedEggs[egg.id];
      if (filter === "found" && !found) return false;
      if (filter === "locked" && found) return false;
      if (!q) return true;
      const haystack = `${egg.riddle.fa} ${egg.riddle.en} ${found ? egg.title.fa + " " + egg.title.en : ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [allEggs, unlockedEggs, filter, query]);

  const pct = totalCount > 0 ? Math.round((foundCount / totalCount) * 100) : 0;

  const filterBtn = (key: Filter, label: string) => (
    <button
      onClick={() => setFilter(key)}
      className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
        filter === key ? "border-turq bg-turq/10 text-turq" : "border-line text-mut hover:border-turq/40 hover:text-mist"
      }`}
    >
      {label}
    </button>
  );

  return (
    <section id="eggs" className="relative border-t border-line bg-deep/40">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeader num={e.num} title={e.title} en={e.en} />

        <Reveal>
          <p className="-mt-8 max-w-2xl leading-8 text-mut">{e.intro}</p>
          <div className="mt-5 flex items-start gap-3 rounded-lg border border-gold/25 bg-gold/[0.05] px-5 py-4 text-sm leading-7 text-mist">
            <span aria-hidden="true">⚠️</span>
            <span>{e.terminalOnlyNote}</span>
          </div>
        </Reveal>

        {/* پیشرفت */}
        <Reveal delay={80}>
          <div className="mt-8 rounded-xl border border-line bg-card p-6">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-medium text-mist">{e.progressLabel}</span>
              <span className="font-mono text-turq" dir="ltr">
                {digits(foundCount, lang)} / {digits(totalCount, lang)}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-gradient-to-r from-turq to-gold transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </Reveal>

        {/* جستجو و فیلتر */}
        <Reveal delay={120}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              value={query}
              onChange={(ev) => setQuery(ev.target.value)}
              placeholder={e.searchPlaceholder}
              className="w-full max-w-xs rounded-lg border border-line bg-deep px-4 py-2.5 text-sm text-mist outline-none placeholder:text-mut/50 focus:border-turq"
            />
            <div className="flex gap-2">
              {filterBtn("all", e.filterAll)}
              {filterBtn("found", e.filterFound)}
              {filterBtn("locked", e.filterLocked)}
            </div>
          </div>
        </Reveal>

        {/* شبکه‌ی معماها */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((egg) => {
            const found = !!unlockedEggs[egg.id];
            return (
              <div
                key={egg.id}
                className={`relative overflow-hidden rounded-lg border p-4 transition-colors ${
                  found ? "border-turq/30 bg-turq/[0.04]" : "border-line bg-card"
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xl leading-none">{found ? egg.icon : "❔"}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      egg.category === "theme" ? "bg-gold/10 text-gold" : "bg-turq/10 text-turq"
                    }`}
                  >
                    {egg.category === "theme" ? e.categoryTheme : e.categoryQuote}
                  </span>
                </div>

                {found ? (
                  <>
                    <p className="text-sm font-medium text-mist">{egg.title[eggLang]}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-turq">
                      <IconCheck className="h-3 w-3" />
                      {e.foundLabel}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm leading-6 text-mut">{egg.riddle[eggLang]}</p>
                    <p className="mt-2 text-[11px] text-mut/50">{e.lockedLabel}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-mut">{e.noResults}</p>
        )}
      </div>
    </section>
  );
}
