"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { useLocale } from "next-intl";

/** Légendes affichées sous chaque capture (anglais). */
const CAPTIONS_EN = [
  "Wine & Spirits, Your Story",
  "AI Label Scan in Seconds",
  "Find Bottles Right Away",
  "Always Know Bottle Location",
  "Everything in One Place",
  "Track Value, Watch Growth",
  "Your Collection at a Glance",
  "Never Forget Any Gift",
] as const;

/** Même contenu en français pour la locale `fr`. */
const CAPTIONS_FR = [
  "Vins & Spiritueux, Votre Histoire",
  "Scan IA en Quelques Secondes",
  "Trouvez vos Bouteilles",
  "Connaissez Leur Emplacement",
  "Tout en Un Seul Endroit",
  "Suivez la Valeur",
  "Votre Collection d'un Coup d'Œil",
  "N'oubliez Aucun Cadeau",
] as const;

export function ScreenshotsSection() {
  const locale = useLocale();
  const isFr = locale === "fr";
  const captions = isFr ? CAPTIONS_FR : CAPTIONS_EN;

  // Chemins publics : un dossier par langue (FR1…FR8 / EN1…EN8).
  const screenshots = Array.from({ length: 8 }, (_, i) => {
    const n = i + 1;
    return isFr
      ? `/screenshots/fr/FR${n}.png`
      : `/screenshots/en/EN${n}.png`;
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector('.snap-center') as HTMLElement | null;
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = 24; // matches gap-6 in Tailwind (6 * 4px = 24px)
    const step = cardWidth + gap;
    const index = Math.round(el.scrollLeft / step);
    setActiveIndex(Math.min(Math.max(index, 0), screenshots.length - 1));
  }, [screenshots.length]);

  return (
    <section id="screenshots" className="bg-[#0D264D]">
      <div className="px-6 pt-10 text-center md:pt-14">
        <p className="text-xs uppercase tracking-widest text-[#EEF1F7]/60">
          {isFr ? "APERÇU DE L'APP" : "APP PREVIEW"}
        </p>
        <h2 className="mb-8 mt-2 text-2xl font-bold text-white md:text-3xl">
          {isFr ? "Découvrez l'application" : "See the app in action"}
        </h2>
      </div>

      <div>
        <div className="relative">
          <motion.div
            ref={scrollRef}
            className="relative scrollbar-hide flex snap-x snap-mandatory flex-row gap-6 overflow-x-auto scroll-smooth px-6 py-8 md:px-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            aria-label="App screenshots carousel"
            onScroll={handleScroll}
          >
            {screenshots.map((src, index) => (
              <motion.div
                key={src}
                className="flex w-[220px] flex-shrink-0 snap-center flex-col items-center md:w-[260px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={src}
                    alt={captions[index]}
                    width={260}
                    height={540}
                    className="h-auto w-full object-contain"
                  />
                </div>
              </motion.div>
            ))}
            {/* Indication « glisser » : une fois au chargement, puis disparition. */}
            <motion.div
              className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 1, 0], x: [0, 6, -6, 0] }}
              transition={{ duration: 2.5, delay: 0.8, ease: "easeInOut" }}
              aria-hidden
            >
              <span aria-hidden>←→</span>
              {isFr ? "Glissez" : "Swipe"}
            </motion.div>
          </motion.div>
          {/* Indication visuelle : fondu à droite pour suggérer le défilement. */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#0D264D] to-transparent"
            aria-hidden
          />
        </div>
        <div className="pb-6">
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "h-2 w-4 bg-white"
                    : "h-2 w-2 bg-white/30"
                }`}
                aria-hidden
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
