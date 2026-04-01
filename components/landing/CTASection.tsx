"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

/** URL App Store avec paramètres de campagne (alignée sur le hero). */
const APP_STORE_URL =
  "https://apps.apple.com/app/apple-store/id6755549562?pt=128302951&ct=LandingPage&mt=8";

const easeOut = [0, 0, 0.2, 1] as const;

export function CTASection() {
  const t = useTranslations("cta");
  const locale = useLocale();

  // Badge noir officiel : URL Apple selon la langue (comme dans HeroLanding).
  const badgeSrc =
    locale === "fr"
      ? "https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/black/fr-fr?size=250x83&releaseDate=1280544000"
      : "https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&releaseDate=1280544000";

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24"
      aria-labelledby="cta-heading"
    >
      {/* Dégradé diagonal marine → marine un peu plus clair. */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0D264D] to-[#1a3a6b]"
        aria-hidden
      />

      {/* Logo décoratif très discret au centre (pas cliquable). */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
        aria-hidden
      >
        <Image
          src="/logo.png"
          alt=""
          width={400}
          height={400}
          className="h-full w-full object-contain"
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-[600px] px-4 text-center sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: easeOut }}
      >
        <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#93C5FD]">
          {t("eyebrow")}
        </p>

        <motion.h2
          id="cta-heading"
          className="mt-4 text-balance text-[28px] font-extrabold leading-tight text-white sm:text-[40px]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.08, ease: easeOut }}
        >
          {t("title")}
        </motion.h2>

        <p className="mt-4 text-balance text-[18px] text-white/70">
          {t("subtitle")}
        </p>

        <motion.div
          className="mt-8 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: easeOut }}
        >
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("ctaAria")}
            className="inline-block opacity-95 transition-opacity hover:opacity-100"
          >
            {/* Badge Apple hébergé en externe : `img` comme dans le hero. */}
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

        <p className="mt-4 text-[12px] text-white/50">{t("footnote")}</p>
      </motion.div>
    </section>
  );
}
