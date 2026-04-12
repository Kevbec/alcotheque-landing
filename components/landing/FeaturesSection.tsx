"use client";

import { motion, useInView } from "framer-motion";
import {
  Camera,
  ChartNoAxesCombined,
  Gift,
  Languages,
  Navigation,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

// Grille : chaque carte apparaît avec 0,08 s d’écart (effet cascade).
const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Carte : ressort + léger pivot −1° → 0° + fondu et montée.
const cardVariants = {
  hidden: { opacity: 0, y: 28, rotate: -1 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

// Icône : zoom doux avec un petit décalage après le début de la carte.
const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      delay: 0.2,
    },
  },
};

type FeatureDef = {
  id:
    | "scan"
    | "wineSpirits"
    | "gifts"
    | "value"
    | "locations"
    | "languages";
  Icon: LucideIcon;
};

// 6 cartes : grille 2×3 (mobile 1 col, sm: 2 cols, lg: 3 cols).
const FEATURES: FeatureDef[] = [
  { id: "scan", Icon: Camera },
  { id: "wineSpirits", Icon: Wine },
  { id: "gifts", Icon: Gift },
  { id: "value", Icon: ChartNoAxesCombined },
  { id: "locations", Icon: Navigation },
  { id: "languages", Icon: Languages },
];

export function FeaturesSection() {
  const t = useTranslations("features");
  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, {
    once: true,
    amount: 0.12,
    margin: "-60px 0px",
  });

  return (
    <section
      className="bg-gradient-to-br from-[#F8F9FF] via-white to-[#F0F4FF] pb-16 pt-8 sm:pb-24 sm:pt-10"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* En-tête : sur-ligne, titre avec accent, sous-titre centré. */}
        <motion.div
          className="mx-auto mb-16 flex max-w-[500px] flex-col items-center text-center"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0, 0, 0.2, 1] }}
        >
          <p
            className="text-[12px] font-semibold uppercase tracking-[0.15em] text-navy"
          >
            {t("eyebrow")}
          </p>
          <h2
            id="features-heading"
            className="mt-3 text-[40px] font-bold leading-tight tracking-tight text-navy"
          >
            {t("title")}
          </h2>
          {/* Petit soulignement décoratif sous le titre (4 px × 40 px, arrondi). */}
          <span
            className="mt-3 block h-1 w-10 rounded-full bg-navy"
            aria-hidden
          />
          <p className="mt-4 max-w-[500px] text-balance text-[18px] text-gray-500">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Grille : 6 cartes en 2×3 (responsive). */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          variants={gridContainerVariants}
          initial="hidden"
          animate={isGridInView ? "visible" : "hidden"}
        >
          {FEATURES.map(({ id, Icon }, index) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <motion.article key={id} variants={cardVariants} className="h-full">
                <div className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#E5E5EA] bg-white shadow-[0_4px_24px_rgba(13,38,77,0.06)] transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:border-navy/20 group-hover:shadow-[0_12px_40px_rgba(13,38,77,0.12)]">
                  {/* Accent premium en haut de carte : dégradé navy, halo au survol. */}
                  <div
                    className="h-[3px] w-full shrink-0 rounded-t-[16px] bg-[linear-gradient(90deg,#0D264D_0%,#1a3a6b_100%)] transition-[box-shadow] duration-300 ease-in-out group-hover:shadow-[0_0_20px_rgba(13,38,77,0.3)]"
                    aria-hidden
                  />
                  <div className="flex flex-1 flex-col p-7">
                  {/* Rangée du haut : icône à gauche, grand numéro estompé à droite. */}
                  <div className="relative flex shrink-0 items-start justify-between">
                    <motion.div
                      variants={iconVariants}
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy shadow-[0_8px_20px_rgba(13,38,77,0.2)]"
                      aria-hidden
                    >
                      <Icon
                        className="h-6 w-6 text-white"
                        strokeWidth={1.75}
                      />
                    </motion.div>
                    <span
                      className="pointer-events-none absolute right-0 top-0 select-none text-[64px] font-extrabold leading-none text-navy/[0.07]"
                      aria-hidden
                    >
                      {num}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-navy sm:text-xl">
                    {t(`${id}.title`)}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-gray-500 sm:text-base">
                    {t(`${id}.text`)}
                  </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
