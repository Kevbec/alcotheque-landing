"use client";

import { useTranslations } from "next-intl";

// Bloc "Pain" : affiche le problème qu'Alcotheque résout
// Positionné entre les screenshots et les features
export function PainSection() {
  const t = useTranslations("pain");

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-xl font-medium leading-relaxed text-navy sm:text-2xl">
          {t("text")}
        </p>
      </div>
    </section>
  );
}
