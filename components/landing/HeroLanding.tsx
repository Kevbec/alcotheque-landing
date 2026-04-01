"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { LandingNavbar } from "@/components/landing/LandingNavbar";

const APP_STORE_URL =
  "https://apps.apple.com/app/apple-store/id6755549562?pt=128302951&ct=LandingPage&mt=8";

const easeOut = [0, 0, 0.2, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export function HeroLanding() {
  const t = useTranslations("hero");
  const locale = useLocale();

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 120]);

  const badgeSrc =
    locale === "fr"
      ? "https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/black/fr-fr?size=250x83&releaseDate=1280544000"
      : "https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&releaseDate=1280544000";

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <LandingNavbar />

      <section className="relative flex min-h-screen flex-col overflow-hidden pt-16">
        {/* Fond : léger dégradé marine en bas + parallax très subtil (Framer Motion). */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white to-navy/[0.07]"
          style={{ y: parallaxY }}
        />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-1 flex-col items-center px-4 pb-16 pt-10 text-center sm:px-6 sm:pb-24 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeUp}>
              {/* Visuel central 80px de haut : placez votre logo final dans public/logo.png (remplace le placeholder actuel). */}
              <Image
                src="/logo.png"
                alt={t("logoAlt")}
                width={320}
                height={320}
                className="mx-auto h-20 w-auto"
                priority
              />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-8 font-sans text-5xl font-bold tracking-tight text-navy sm:text-7xl sm:leading-[1.05]"
            >
              {t("appName")}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-2xl text-balance text-xl font-medium text-navy/90 sm:text-2xl"
            >
              {t("tagline")}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-3 max-w-xl text-balance text-base leading-relaxed text-zinc-600 sm:text-lg"
            >
              {t("subtext")}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("ctaAria")}
                className="opacity-90 transition-opacity hover:opacity-100"
              >
                {/* Badge marketing officiel Apple (URL externe) : `next/image` nécessiterait un domaine en allowlist. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={badgeSrc}
                  alt={t("badgeAlt")}
                  width={180}
                  height={60}
                  className="h-14 w-auto"
                />
              </a>
            </motion.div>
          </motion.div>

          <div className="mt-auto flex flex-1 flex-col justify-end pt-16">
            <span className="sr-only">{t("scrollHint")}</span>
            <div
              className="animate-chevron-bob flex flex-col items-center text-navy/40"
              aria-hidden
            >
              <ChevronDown className="h-8 w-8" strokeWidth={1.75} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
