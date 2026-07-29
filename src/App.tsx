import { useCallback, useEffect, useState } from "react";
import { About } from "./components/about";
import { NavBar, Preloader, StatusBar } from "./components/chrome";
import { Contact, Footer } from "./components/contact";
import { SmartCursor } from "./components/Cursor";
import { Hero, Marquee } from "./components/hero";
import { Projects, TerminalSection } from "./components/projects";
import { ScrollOrb } from "./components/chrome";
import { Skills } from "./components/skills";
import { LanguageProvider, useLanguage } from "./lib/i18n";
import { EasterEggEngine } from "./lib/eggs/EasterEggEngine";
import { EggProvider } from "./lib/eggs/EggContext";
import { EasterEggsSection } from "./components/EasterEggsSection";

function AppShell() {
  const { lang } = useLanguage();
  const [booting, setBooting] = useState(true);
  const finishBoot = useCallback(() => setBooting(false), []);

  // وقتی نشانگر هوشمند فعاله، کلاس روی body می‌ذاریم
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!coarse && !reduced) document.body.classList.add("cursor-enabled");
    return () => document.body.classList.remove("cursor-enabled");
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* ---------- fixed ambient layers ---------- */}
      <div className="grid-bg pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(900px 520px at 88% -6%, rgba(53,224,200,0.075), transparent 62%), radial-gradient(820px 520px at 6% 106%, rgba(242,180,65,0.055), transparent 62%)",
        }}
      />
      <div className="noise-layer pointer-events-none fixed inset-0 z-[80]" aria-hidden="true" />

      {booting && <Preloader onDone={finishBoot} />}
      <SmartCursor />
      <NavBar />

      <main className="relative z-10">
        <Hero play={!booting} />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <TerminalSection />
        <EasterEggsSection />
        <Contact />
        <Footer />
      </main>

        <StatusBar />
        <ScrollOrb />
        <EasterEggEngine lang={lang === "fa" ? "fa" : "en"} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <EggProvider>
        <AppShell />
      </EggProvider>
    </LanguageProvider>
  );
}
