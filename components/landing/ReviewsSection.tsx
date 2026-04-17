"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

// Avis App Store réels : contenu fixe en anglais (pas de clés i18n pour le corps des cartes).
const reviews = [
  {
    title: "Excellent app for wine lovers!",
    body: "Very useful app to organise wine collection. The scanning feature makes it easy to add bottles and organising them by location is super convenient.",
    author: "Milad Br",
    country: "🇩🇪 Germany",
  },
  {
    title: "Perfect for Wine & Spirits Lovers",
    body: "Great app for organizing your wine and spirits collection. The bottle scanning and tracking features make it really easy to keep everything in one place. Clean, simple, and very useful!",
    author: "HighHopes74",
    country: "🇮🇹 Italy",
  },
  {
    title: "This is the app you want to use to track your collection",
    body: "This is the app you want to use to track your collection.",
    author: "Happy88766",
    country: "🇺🇸 United States",
  },
];

export function ReviewsSection() {
  const t = useTranslations("reviews");
  // Locale active (fr / en) : sert à afficher le libellé correct pour la ligne note App Store.
  const locale = useLocale();

  return (
    <section id="reviews" className="bg-[#F8F9FF] py-16 sm:py-24">
      {/* Bloc titre centré : étoiles, sur-ligne et titre depuis next-intl. */}
      <p className="mb-2 text-center text-xl text-yellow-400">★★★★★</p>
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-navy/50">
        {t("eyebrow")}
      </p>
      {/* Mise en avant crédible : note réelle + nombre d'avis (aligné App Store), texte bilingue selon la locale. */}
      <div className="mt-2 flex items-center justify-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-5 w-5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm font-semibold text-navy">
          {locale === "fr"
            ? "16 avis · 5 étoiles sur l'App Store"
            : "16 ratings · 5 stars on the App Store"}
        </span>
      </div>
      <h2 className="mb-12 text-center text-3xl font-extrabold text-navy">{t("title")}</h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        {reviews.map((review, index) => (
          <motion.div
            key={review.author + review.title}
            className="flex flex-col rounded-2xl border border-navy/5 bg-white p-6 shadow-sm"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="mb-3 text-sm text-yellow-400">★★★★★</p>
            <h3 className="mb-2 text-[15px] font-bold text-navy">{review.title}</h3>
            <p className="mb-4 text-sm leading-relaxed text-navy/70">{review.body}</p>
            <div className="mt-auto flex items-center justify-between border-t border-navy/5 pt-4">
              <span className="text-xs font-semibold text-navy/50">{review.author}</span>
              <span className="text-xs text-navy/40">{review.country}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
