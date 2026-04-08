"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

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

  return (
    <section id="reviews" className="bg-[#F8F9FF] py-16 sm:py-24">
      {/* Bloc titre centré : étoiles, sur-ligne et titre depuis next-intl. */}
      <p className="mb-2 text-center text-xl text-yellow-400">★★★★★</p>
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-navy/50">
        {t("eyebrow")}
      </p>
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
