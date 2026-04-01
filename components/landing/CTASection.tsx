"use client";

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
      className="relative overflow-hidden border-b border-navy/10 bg-gradient-to-b from-[#F8F9FF] to-white py-16 sm:py-24"
      aria-labelledby="cta-heading"
    >
      {/* Même largeur que le reste du site : sur mobile le bloc est centré, sur md+ aligné à gauche. */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-[600px] text-center md:mx-0 md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          {/* Sur-ligne : même style que la section Features (lisible sur fond clair). */}
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-navy">
            {t("eyebrow")}
          </p>

          {/* Accent éditorial : barre marine à gauche du titre (desktop seulement). */}
          <motion.h2
            id="cta-heading"
            className="mt-4 text-balance text-[28px] font-extrabold leading-tight text-navy sm:text-[40px] md:border-l-4 md:border-navy md:pl-5 md:rounded-l-sm"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: easeOut }}
          >
            {t("title")}
          </motion.h2>

          <p className="mt-4 text-balance text-[18px] text-navy/70">
            {t("subtitle")}
          </p>

          <motion.div
            className="mt-8 flex flex-col items-center md:items-start"
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

          <p className="mt-4 text-[12px] text-navy/50">{t("footnote")}</p>
        </motion.div>
      </div>
    </section>
  );
}
