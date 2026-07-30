"use client";

/* =================================================================
   این کامپوننت فقط "نمایش‌دهنده"‌ست: افکت‌ها/مودال/بنر را بر اساس
   وضعیت EggContext رندر می‌کند. منطق کشف (تایپ در ترمینال) در
   EggContext.tsx و کامپوننت ترمینال (projects.tsx) است.
   ================================================================= */

import { EggOverlayRenderer } from "./EggOverlays";
import { ThemeOverlay } from "./ThemeOverlay";
import { DialogueModal } from "./DialogueModal";
import { SnowOverlay, BreakingBadOverlay, HouseMdOverlay, RewardBanner } from "./EggRewards";
import { useEggs, GENERATED_THEMES, type EggLang } from "./EggContext";

export function EasterEggEngine({ lang }: { lang: EggLang }) {
  const { rewardTheme, activeDialogue, rewardBanner, matrixMode, closeDialogue } = useEggs();

  return (
    <>
      {matrixMode && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
          {Array.from({ length: 34 }).map((_, i) => (
            <div
              key={i}
              className="matrix-col"
              style={{
                left: `${(i * 2.95) % 100}%`,
                animationDuration: `${1.5 + ((i * 7) % 20) / 10}s`,
                animationDelay: `${((i * 13) % 20) / 10}s`,
              }}
            >
              {"01".repeat(15)}
            </div>
          ))}
        </div>
      )}

      {rewardTheme === "snow" && <SnowOverlay />}
      {rewardTheme === "breakingbad" && <BreakingBadOverlay lang={lang} />}
      {rewardTheme === "housemd" && <HouseMdOverlay lang={lang} />}
      <EggOverlayRenderer theme={rewardTheme} lang={lang} />
      {rewardTheme && GENERATED_THEMES.includes(rewardTheme) && <ThemeOverlay themeId={rewardTheme} lang={lang} />}

      <DialogueModal eggId={activeDialogue} onClose={closeDialogue} lang={lang} />

      <RewardBanner reward={rewardBanner} lang={lang} />
    </>
  );
}
