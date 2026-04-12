"use client";

import { useTranslations } from "next-intl";

// Bloc "Pain" : affiche le problème qu'Alcotheque résout
// Fond #F8F9FF pour créer une transition douce entre
// le bloc marine (screenshots) et le dégradé Features
export function PainSection() {
  const t = useTranslations("pain");

  return (
    <section className="bg-[#F8F9FF] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        {/* Guillemet décoratif en arrière-plan */}
        <div className="relative">
          <span
            className="absolute -top-8 left-1/2 -translate-x-1/2 select-none text-[120px] font-serif leading-none text-navy/8"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="relative text-xl font-medium leading-relaxed text-navy sm:text-2xl">
            {t("text")}
          </p>
        </div>
      </div>
    </section>
  );
}
