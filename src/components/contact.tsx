import { useState } from "react";
import { digits, useLanguage } from "../lib/i18n";
import { IconArrow, IconCheck, Reveal, SectionHeader, SOCIAL_ICONS } from "../lib/ui";
import { Magnetic } from "./effects";

export function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSent(true);
  };

  const field =
    "w-full rounded-lg border border-line bg-deep px-4 py-3 text-sm text-mist outline-none transition-colors placeholder:text-mut/50 focus:border-turq";

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeader num={c.num} title={c.title} en={c.en} />

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="leading-8 text-mut">{c.intro}</p>
          </Reveal>
          <div className="mt-9 space-y-3">
            {c.socials.map((s, i) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <Reveal key={s.name} delay={i * 80}>
                  <Magnetic strength={0.2}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="group flex items-center justify-between rounded-lg border border-line bg-card px-5 py-4 transition-colors hover:border-turq/50 hover:bg-deep"
                    >
                      <span className="flex items-center gap-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-mut transition-colors group-hover:border-turq/40 group-hover:text-turq">
                          <Icon className="h-4.5 w-4.5" />
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-mist">{s.name}</span>
                          <span className="block font-mono text-xs text-mut" dir="ltr">
                            {s.handle}
                          </span>
                        </span>
                      </span>
                      <IconArrow className="h-4 w-4 text-mut arrow-nudge group-hover:text-turq" />
                    </a>
                  </Magnetic>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={c.socials.length * 80}>
            <div className="mt-6 rounded-lg border border-dashed border-gold/30 bg-gold/[0.04] p-5">
              <h4 className="font-display text-lg text-mist">{c.supportTitle}</h4>
              <p className="mt-2 text-sm leading-7 text-mut">{c.supportBody}</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <a
                  href="https://reymit.ir/epodonios"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-line bg-deep px-4 py-1.5 font-mono text-xs text-mist transition-colors hover:border-gold hover:text-gold"
                >
                  {c.supportReymit}
                </a>
                <span
                  className="cursor-help rounded-full border border-line bg-deep px-4 py-1.5 font-mono text-xs text-mut"
                  dir="ltr"
                  title="TWdqYu5H6emRHd6jFfkHjfG8Yg2285DFmT"
                >
                  {c.supportUsdt}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-xl border border-line bg-card p-7 md:p-9">
              <span className="absolute inset-x-12 top-0 h-[2px] bg-gold" />
              {sent ? (
                <div className="flex flex-col items-center py-16 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-turq/40 bg-turq/10 text-turq">
                    <IconCheck className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 font-display text-3xl text-mist">{c.sentTitle}</h3>
                  <p className="mt-3 max-w-sm leading-7 text-mut">{c.sentBody(form.name)}</p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({ name: "", email: "", message: "" });
                    }}
                    className="mt-7 rounded-lg border border-line px-6 py-2.5 text-sm text-mist transition-colors hover:border-turq hover:text-turq"
                  >
                    {c.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl text-mist">{c.formTitle}</h3>
                    <span className="font-mono text-xs text-mut" dir="ltr">
                      new-message.sh
                    </span>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className="mb-2 block text-sm text-mut">
                        {c.nameLabel}
                      </label>
                      <input
                        id="c-name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={field}
                        placeholder={c.namePlaceholder}
                      />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="mb-2 block text-sm text-mut">
                        {c.emailLabel}
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={field}
                        placeholder="you@example.com"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-msg" className="mb-2 block text-sm text-mut">
                      {c.messageLabel}
                    </label>
                    <textarea
                      id="c-msg"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${field} resize-none`}
                      placeholder={c.messagePlaceholder}
                    />
                  </div>
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-lg bg-gold px-7 py-4 font-bold text-ink transition-all hover:bg-[#ffc95e] hover:shadow-[0_10px_40px_-10px_rgba(242,180,65,0.5)]"
                  >
                    {c.send}
                    <IconArrow className="h-4 w-4 arrow-nudge" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t, lang } = useLanguage();
  const year = lang === "fa" ? digits("1404", lang) : "2026";
  return (
    <footer className="relative overflow-hidden border-t border-line bg-deep/60 pb-16 pt-12">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden whitespace-nowrap text-center font-display text-[6rem] leading-none text-mist/[0.03] sm:text-[8rem]"
      >
        {t.footer.goodbye}
      </span>
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 md:px-8">
        <span className="font-mono text-sm text-turq" dir="ltr">
          ~/{t.person.handle} <span className="blink text-gold">▌</span>
        </span>
        <p className="text-center text-sm leading-7 text-mut">
          {t.footer.tagline} — {t.person.name}
          <span className="mx-2 text-line">|</span>
          {t.footer.hosted} <span className="font-mono text-turq" dir="ltr">GitHub Pages</span>
        </p>
        <div className="flex items-center gap-3">
          {t.contact.socials.map((s) => {
            const Icon = SOCIAL_ICONS[s.icon];
            return (
              <a
                key={s.name}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={s.name}
                className="rounded-full border border-line p-2.5 text-mut transition-colors hover:border-turq hover:text-turq"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
        <p className="font-mono text-[11px] text-mut/60" dir="ltr">
          © {year} — {t.footer.copyright} · {t.person.version}
        </p>
      </div>
    </footer>
  );
}
