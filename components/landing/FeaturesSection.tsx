"use client";

import { motion, useInView } from "framer-motion";
import {
  Camera,
  ChartNoAxesCombined,
  Gift,
  Languages,
  MapPin,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

// Même courbe d’animation qu’au hero pour un ressenti cohérent sur toute la page.
const easeOut = [0, 0, 0.2, 1] as const;

// Conteneur grille : enfant après enfant avec 0,1 s d’écart (stagger).
const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Chaque carte : fondu + léger mouvement vers le haut.
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const iconClass = "h-7 w-7 text-navy"; // h-7 / w-7 = 28px (Tailwind)

type FeatureDef = {
  id: "scan" | "wineSpirits" | "gifts" | "value" | "locations" | "languages";
  Icon: LucideIcon;
};

const FEATURES: FeatureDef[] = [
  { id: "scan", Icon: Camera },
  { id: "wineSpirits", Icon: Wine },
  { id: "gifts", Icon: Gift },
  { id: "value", Icon: ChartNoAxesCombined },
  { id: "locations", Icon: MapPin },
  { id: "languages", Icon: Languages },
];

export function FeaturesSection() {
  const t = useTranslations("features");
  // useInView : on déclenche l’animation de la grille une fois la section visible (scroll).
  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, {
    once: true,
    amount: 0.12,
    margin: "-60px 0px",
  });

  return (
    <section
      className="bg-white py-16 sm:py-24"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Titre de section : animation au scroll, sans stagger (une seule entrée). */}
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <h2
            id="features-heading"
            className="text-3xl font-bold tracking-tight text-navy sm:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 text-balance text-base text-zinc-600 sm:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Grille : 1 col → 2 (tablette) → 3 (desktop). Animations en cascade au scroll. */}
        <motion.div
          ref={gridRef}
          className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
          variants={gridContainerVariants}
          initial="hidden"
          animate={isGridInView ? "visible" : "hidden"}
        >
          {FEATURES.map(({ id, Icon }) => (
            <motion.article
              key={id}
              variants={cardVariants}
              className="rounded-[12px] bg-[#EEF1F7] p-6 sm:p-7"
            >
              {/* Cercle d’icône : fond #EEF1F7 (identique à la carte) + cadre léger pour le relief. */}
              <div
                className="inline-flex rounded-[12px] bg-[#EEF1F7] p-3"
                aria-hidden
              >
                <Icon className={iconClass} strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-navy sm:text-xl">
                {t(`${id}.title`)}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
                {t(`${id}.text`)}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
