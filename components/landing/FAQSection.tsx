"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

// Clés des entrées FAQ — alignées avec messages/fr.json et messages/en.json (dernier : historique).
const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "history"] as const;

// Variantes Framer Motion : hauteur 0 → auto pour l’ouverture / fermeture fluide.
const accordionContentVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.32, ease: [0.33, 1, 0.68, 1] as const },
      opacity: { duration: 0.2 },
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.36, ease: [0.33, 1, 0.68, 1] as const },
      opacity: { duration: 0.22, delay: 0.06 },
    },
  },
};

export function FAQSection() {
  const t = useTranslations("faq");
  const locale = useLocale();
  // Un seul panneau ouvert à la fois : index ou null si tout est fermé.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqJsonLd = useMemo(() => {
    const mainEntity = FAQ_KEYS.map((key) => ({
      "@type": "Question",
      name: t(`${key}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`${key}.answer`),
      },
    }));

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale === "fr" ? "fr-FR" : "en-US",
      mainEntity,
    };
  }, [locale, t]);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="bg-white py-16 sm:py-24"
      aria-labelledby="faq-heading"
    >
      {/* Données structurées FAQ pour Google (extraits enrichis) et contexte LLM. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* En-tête centré : même grille que Features (eyebrow, titre, trait, sous-titre). */}
        <motion.div
          className="mx-auto mb-12 flex max-w-[500px] flex-col items-center text-center sm:mb-16"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0, 0, 0.2, 1] }}
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-navy">
            {t("eyebrow")}
          </p>
          <h2
            id="faq-heading"
            className="mt-3 text-[40px] font-bold leading-tight tracking-tight text-navy"
          >
            {t("title")}
          </h2>
          <span
            className="mt-3 block h-1 w-10 rounded-full bg-navy"
            aria-hidden
          />
          <p className="mt-4 max-w-[500px] text-balance text-[18px] text-gray-500">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="mx-auto w-full max-w-[720px]">
          {FAQ_KEYS.map((key, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div
                key={key}
                className="mb-3 rounded-[12px] border border-[#E5E5EA] bg-white"
              >
                <button
                  id={buttonId}
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-[#EEF1F7]"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                >
                  <span className="text-base font-bold text-navy">
                    {t(`${key}.question`)}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-navy transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      key={`panel-${key}`}
                      variants={accordionContentVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 text-[15px] leading-relaxed text-gray-600">
                        {t(`${key}.answer`)}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
