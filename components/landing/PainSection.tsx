"use client";

import { useTranslations } from "next-intl";

// Bloc "Pain" : affiche le problème qu'Alcotheque résout
// Padding réduit pour éviter trop d'espace avec Features
export function PainSection() {
  const t = useTranslations("pain");

  return (
    <section className="bg-[#F8F9FF] py-10 sm:py-14">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-xl font-medium leading-relaxed text-navy sm:text-2xl">
          {t("text")}
        </p>
      </div>
    </section>
  );
}
