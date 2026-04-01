"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

/**
 * Barre de navigation du hero : même apparence sur la landing et les pages légales / support.
 * Détection du scroll pour le fond flouté (collante en haut).
 */
export function LandingNavbar() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const tLang = useTranslations("lang");
  const tHero = useTranslations("hero");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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
        <div className="flex items-center gap-6">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-navy transition-opacity hover:opacity-80"
          >
            <Image
              src="/logo.png"
              alt={tHero("logoAlt")}
              width={40}
              height={40}
              className="h-9 w-auto sm:h-10"
              priority
            />
            <span className="font-semibold tracking-tight text-navy sm:text-lg">
              {tNav("appName")}
            </span>
          </Link>
          <Link
            href={`/${locale}/blog`}
            className="hidden text-sm font-medium text-navy/70 transition hover:text-navy sm:block"
          >
            {tFooter("links.blog")}
          </Link>
        </div>

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
            EN
            <span className="sr-only"> — {tLang("switchToEn")}</span>
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
