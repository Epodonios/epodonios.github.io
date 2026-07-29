import { useCountUp, useReveal } from "../lib/hooks";
import { digits, useLanguage } from "../lib/i18n";
import { IconCoffee, IconCommit, Reveal, SectionHeader } from "../lib/ui";
import { Parallax } from "./effects";

function StatCard({ label, value, suffix, delay, lang }: { label: string; value: number; suffix: string; delay: number; lang: string }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const n = useCountUp(value, shown);
  const grouped = n.toLocaleString("en-US").replace(/,/g, lang === "fa" ? "٬" : ",");
  const display = value === 0 ? "∞" : `${digits(grouped, lang as "fa")}${suffix}`;
  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} group rounded-xl border border-line bg-card p-6 transition-colors hover:border-turq/40`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-display text-4xl text-mist transition-colors group-hover:text-turq md:text-5xl" dir="ltr">
        {display}
      </div>
      <div className="mt-2 text-sm text-mut">{label}</div>
    </div>
  );
}

export function About() {
  const { t, lang } = useLanguage();
  const a = t.about;
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeader num={a.num} title={a.title} en={a.en} />

      <div className="grid gap-14 lg:grid-cols-12">
        {/* sticky column */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div className="relative">
                <span className="absolute -top-2 -start-2 h-8 w-8 border-t-2 border-s-2 border-turq" />
                <span className="absolute -top-2 -end-2 h-8 w-8 border-t-2 border-e-2 border-turq" />
                <span className="absolute -bottom-2 -start-2 h-8 w-8 border-b-2 border-s-2 border-gold" />
                <span className="absolute -bottom-2 -end-2 h-8 w-8 border-b-2 border-e-2 border-gold" />
                <Parallax speed={-0.06} className="overflow-hidden rounded-lg border border-line">
                  <img
                    src="/images/avatar.jpg"
                    alt={t.person.name}
                    width={1408}
                    height={768}
                    className="kenburns aspect-[4/5] w-full object-cover"
                    data-cursor-media=""
                  />
                </Parallax>
                <div className="absolute -bottom-5 start-6 flex items-center gap-2.5 rounded-lg border border-line bg-deep px-4 py-2.5 shadow-xl">
                  <IconCommit className="h-4 w-4 text-turq" />
                  <span className="font-mono text-xs text-mut" dir="ltr">
                    {a.commitLabel} <span className="text-turq">{a.commitValue}</span>
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-12 grid grid-cols-2 gap-3">
                {a.quickFacts.map((f) => (
                  <div key={f.label} className="rounded-lg border border-line bg-card px-4 py-3">
                    <div className="text-[11px] text-mut">{f.label}</div>
                    <div className="mt-1 text-sm font-medium text-mist">{f.value}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* scrolling column */}
        <div className="lg:col-span-7">
          {a.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 100}>
              <p className={`mb-7 leading-9 ${i === 0 ? "text-lg text-mist" : "text-mut"}`}>
                {i === 0 && (
                  <span className="float-start me-3 font-display text-6xl leading-[0.9] text-turq">{p[0]}</span>
                )}
                {i === 0 ? p.slice(1) : p}
              </p>
            </Reveal>
          ))}

          <Reveal delay={100}>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {a.stats.map((s, i) => (
                <StatCard key={s.label} {...s} delay={i * 90} lang={lang} />
              ))}
            </div>
          </Reveal>

          {/* timeline */}
          <div className="mt-16">
            <Reveal>
              <h3 className="mb-8 flex items-center gap-3 font-display text-2xl text-mist">
                {a.timelineHeading}
                <span className="h-px flex-1 bg-line" />
              </h3>
            </Reveal>
            <div className="relative ms-3 space-y-9 border-s border-line ps-8">
              {a.timeline.map((tl, i) => (
                <Reveal key={tl.year + i} delay={i * 100}>
                  <div className="relative">
                    <span
                      className={`absolute -start-[37px] top-1.5 h-3.5 w-3.5 rounded-full border-2 ${
                        i === a.timeline.length - 1 ? "border-gold bg-gold/20" : "border-turq bg-ink"
                      }`}
                    />
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="font-mono text-sm text-gold">{tl.year}</span>
                      <span className="font-display text-xl text-mist">{tl.title}</span>
                      <span className="text-sm text-mut">{tl.place}</span>
                    </div>
                    <p className="mt-2 max-w-xl text-sm leading-7 text-mut">{tl.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <div className="mt-14 flex items-center gap-4 rounded-xl border border-gold/25 bg-gold/[0.05] p-5">
              <IconCoffee className="h-8 w-8 shrink-0 text-gold" />
              <p className="text-sm leading-7 text-mut">
                <span className="font-medium text-mist">{a.fuelLabel}</span> {a.fuelNote}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
