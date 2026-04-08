"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";

/** Même URL App Store que la section CTA (campagne analytics). */
const APP_STORE_URL =
  "https://apps.apple.com/app/apple-store/id6755549562?pt=128302951&ct=LandingPage&mt=8";

const FREE_FEATURE_KEYS = ["f1", "f2", "f3", "f4"] as const;
const PREMIUM_FEATURE_KEYS = ["f1", "f2", "f3", "f4", "f5"] as const;

export function PricingSection() {
  const t = useTranslations("pricing");
  const tCta = useTranslations("cta");

  const cards = [
    {
      kind: "free" as const,
      content: (
        <div className="flex h-full flex-col rounded-2xl border border-navy/10 bg-[#F8F9FF] p-8">
          {/* w-fit : largeur du badge = texte uniquement, comme PREMIUM */}
          <span className="inline-block w-fit text-xs font-bold px-3 py-1 rounded-full mb-4 bg-navy/10 text-navy">
            FREE
          </span>
          <p className="text-5xl font-extrabold text-navy">€0</p>
          <p className="mb-6 mt-1 text-sm text-navy/50">{t("free.period")}</p>
          <ul className="space-y-2">
            {FREE_FEATURE_KEYS.map((key) => (
              <li key={key} className="flex items-center gap-2 text-sm text-navy/70">
                <span className="text-green-500" aria-hidden>
                  ✓
                </span>
                {t(`free.${key}`)}
              </li>
            ))}
          </ul>
          {/* mt-auto : badge aligné en bas comme la carte Premium (grille même hauteur). */}
          <div className="mt-auto pt-6 flex justify-center">
            <AppStoreBadge
              href={APP_STORE_URL}
              source="pricing-free"
              ariaLabel={tCta("ctaAria")}
              className="inline-block"
              imgClassName="h-14 w-auto"
            />
          </div>
        </div>
      ),
    },
    {
      kind: "premium" as const,
      content: (
        <div className="flex h-full flex-col rounded-2xl border border-navy bg-[#0D264D] p-8">
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 bg-white/20 text-white">
            PREMIUM
          </span>
          <p className="text-5xl font-extrabold text-white">€0.99</p>
          <p className="mb-6 mt-1 text-sm text-white/60">{t("premium.period")}</p>
          <ul className="space-y-2">
            {PREMIUM_FEATURE_KEYS.map((key) => (
              <li key={key} className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-green-400" aria-hidden>
                  ✓
                </span>
                {t(`premium.${key}`)}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-white/40">{t("premium.cancel")}</p>
          <div className="mt-auto pt-6 flex justify-center">
            <AppStoreBadge
              href={APP_STORE_URL}
              source="pricing"
              ariaLabel={tCta("ctaAria")}
              className="inline-block"
              imgClassName="h-14 w-auto"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="pricing" className="bg-white pt-20 pb-6">
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-navy/50">
        {t("eyebrow")}
      </p>
      <h2 className="mb-4 text-center text-3xl font-extrabold text-navy">{t("title")}</h2>
      <p className="mx-auto mb-12 max-w-xl text-center text-lg text-navy/60">{t("subtitle")}</p>

      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 px-4 md:grid-cols-2">
        {cards.map((card, index) => (
          <motion.div
            key={card.kind}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            {card.content}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
