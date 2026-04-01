"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

// Texture subtile « grain » (SVG en data URL) — on la répète en tuile pour couvrir toute la section.
const NOISE_DATA_URI =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="0.5"/></svg>`,
  );

// Courbe ease-out : départ rapide, fin amortie (approximation cubique).
function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

type StatDef = {
  id:
    | "bottlesCollected"
    | "activeUsers"
    | "scansPerformed"
    | "bottlesOpened";
  value: number;
  suffix: string;
};

const STATS: StatDef[] = [
  { id: "bottlesCollected", value: 5000, suffix: "+" },
  { id: "activeUsers", value: 500, suffix: "+" },
  { id: "scansPerformed", value: 2000, suffix: "+" },
  { id: "bottlesOpened", value: 150, suffix: "+" },
];

// Compteur : de 0 à `target` en ~2 s quand `active` passe à true (déclenché par la visibilité).
function AnimatedCounter({
  target,
  active,
}: {
  target: number;
  active: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;

    let startTime: number | null = null;
    const durationMs = 2000;
    let frameId = 0;

    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const rawT = Math.min((now - startTime) / durationMs, 1);
      const eased = easeOutCubic(rawT);
      setDisplay(Math.round(eased * target));
      if (rawT < 1) frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [active, target]);

  return <>{display.toLocaleString()}</>;
}

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      // Courbe Bézier (= ease-out prononcé), typée en tuple pour Framer Motion.
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function StatsSection() {
  const t = useTranslations("stats");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  return (
    <motion.section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden bg-[#0D264D] py-16 sm:py-24"
      aria-label={t("ariaLabel")}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
    >
      {/* Calque grain : même rôle qu’un ::before en CSS, en overlay plein écran. */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.12] mix-blend-overlay [background-size:128px_128px] [background-repeat:repeat]"
        style={{ backgroundImage: `url("${NOISE_DATA_URI}")` }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0"
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.id}
              variants={statItemVariants}
              className="relative flex flex-col items-center text-center md:border-r md:border-white/10 md:py-2 md:last:border-r-0"
            >
              <p className="flex items-baseline justify-center gap-0 tabular-nums">
                {/* Chiffre principal : 64 px, blanc, très gras. */}
                <span className="text-[64px] font-extrabold leading-none tracking-tight text-white">
                  <AnimatedCounter target={stat.value} active={isInView} />
                </span>
                {/* Suffixe en accent bleu clair, même taille visuelle. */}
                <span className="text-[64px] font-extrabold leading-none text-[#93C5FD]">
                  {stat.suffix}
                </span>
              </p>
              <p className="mt-2 max-w-[200px] text-pretty text-[14px] font-medium uppercase tracking-[0.05em] text-white/70">
                {t(`${stat.id}.label`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
