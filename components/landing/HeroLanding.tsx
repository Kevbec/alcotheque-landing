"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

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

function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

export function HeroLanding() {
  const t = useTranslations("hero");
  const tNav = useTranslations("nav");
  const tLang = useTranslations("lang");
  const locale = useLocale();

  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 120]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const badgeSrc =
    locale === "fr"
      ? "https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/black/fr-fr?size=250x83&releaseDate=1280544000"
      : "https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&releaseDate=1280544000";

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Barre de navigation collante : flou au scroll pour un rendu premium. */}
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled
            ? "border-b border-navy/10 bg-white/75 shadow-sm backdrop-blur-md"
            : "bg-transparent"
        }`}
        initial={false}
        animate={{ opacity: 1 }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-navy transition-opacity hover:opacity-80"
          >
            {/* Remplacez public/logo.png par votre logo final exporté depuis Figma / Sketch. */}
            <Image
              src="/logo.png"
              alt={t("logoAlt")}
              width={40}
              height={40}
              className="h-9 w-auto sm:h-10"
              priority
            />
            <span className="font-semibold tracking-tight text-navy sm:text-lg">
              {tNav("appName")}
            </span>
          </Link>

          <nav
            className="flex items-center gap-1 text-sm font-medium text-navy/80"
            aria-label="Language"
          >
            <Link
              href="/fr"
              className={`rounded-full px-3 py-1 transition-colors hover:bg-navy/5 ${
                locale === "fr" ? "bg-navy/10 text-navy" : ""
              }`}
              aria-current={locale === "fr" ? "true" : undefined}
            >
              FR
              <span className="sr-only"> — {tLang("switchToFr")}</span>
            </Link>
            <span className="text-navy/30" aria-hidden>
              |
            </span>
            <Link
              href="/en"
              className={`rounded-full px-3 py-1 transition-colors hover:bg-navy/5 ${
                locale === "en" ? "bg-navy/10 text-navy" : ""
              }`}
              aria-current={locale === "en" ? "true" : undefined}
            >
              EN<span className="sr-only"> — {tLang("switchToEn")}</span>
            </Link>
          </nav>
        </div>
      </motion.header>

      <section className="relative flex min-h-screen flex-col overflow-hidden pt-16">
        {/* Fond : léger dégradé marine en bas + parallax très subtil (Framer Motion). */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white to-navy/[0.07]"
          style={{ y: parallaxY }}
        />

        {/* Formes décoratives « bouteille » et « verre » — animation CSS float. */}
        <div
          className="animate-hero-float absolute -left-16 top-28 h-48 w-24 rounded-full bg-gradient-to-b from-navy/15 to-navy/5 shadow-inner sm:left-4 sm:top-32"
          aria-hidden
        />
        <div
          className="animate-hero-float-reverse absolute -right-10 top-40 h-36 w-28 rounded-t-full border-4 border-navy/10 border-b-transparent bg-white/40 shadow-sm sm:right-6"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-1 flex-col items-center px-4 pb-16 pt-10 text-center sm:px-6 sm:pb-24 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeUp} className="mb-6">
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
              className="font-sans text-5xl font-bold tracking-tight text-navy sm:text-7xl sm:leading-[1.05]"
            >
              {t("appName")}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-2xl text-balance text-xl font-medium text-navy/90 sm:text-2xl"
            >
              {t("tagline")}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-balance text-base leading-relaxed text-zinc-600 sm:text-lg"
            >
              {t("subtext")}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-5">
              <motion.a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("ctaAria")}
                className="inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-navy/25 transition-shadow hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <AppleGlyph className="h-6 w-6 shrink-0" />
                {t("cta")}
              </motion.a>

              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
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
