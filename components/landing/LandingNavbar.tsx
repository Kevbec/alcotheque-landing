"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";

type LandingNavbarProps = {
  /**
   * Quand la barre est encore transparente, couleur dominante sous le header :
   * `dark` = texte clair (ex. hero blog marine) ; `light` = fond clair (landing, articles).
   */
  transparentOver?: "light" | "dark";
};

/**
 * Barre de navigation du hero : même apparence sur la landing et les pages légales / support.
 * Détection du scroll pour le fond flouté (collante en haut).
 */
export function LandingNavbar({
  transparentOver = "light",
}: LandingNavbarProps) {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const tLang = useTranslations("lang");
  const tHero = useTranslations("hero");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fond sombre visible sous la nav uniquement si pas encore scrollé et page en "dark hero".
  const useLightText = !scrolled && transparentOver === "dark";

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 h-16 transition-all duration-300 ease-in-out ${
        scrolled
          ? "border-b border-[rgba(13,38,77,0.06)] bg-white/95 shadow-[0_1px_20px_rgba(13,38,77,0.08)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent shadow-none"
      }`}
      initial={false}
      animate={{ opacity: 1 }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-navy transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo.png"
            alt={tHero("logoAlt")}
            width={40}
            height={40}
            className="h-9 w-auto rounded-xl sm:h-10"
            priority
          />
          <span className="font-semibold tracking-tight text-navy sm:text-lg">
            {tNav("appName")}
          </span>
        </Link>

        <button
          type="button"
          className="rounded-md px-2 py-1 text-2xl leading-none text-navy transition-colors hover:bg-navy/5 md:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#screenshots"
            className={`text-sm font-medium transition-colors hover:opacity-80 ${
              useLightText
                ? "text-white/80 hover:text-white"
                : "text-navy/70 hover:text-navy"
            }`}
          >
            {tNav("features")}
          </a>
          <span
            className={`select-none text-sm ${
              useLightText ? "text-white/25" : "text-navy/25"
            }`}
            aria-hidden
          >
            |
          </span>
          <a
            href="#pricing"
            className={`text-sm font-medium transition-colors hover:opacity-80 ${
              useLightText
                ? "text-white/80 hover:text-white"
                : "text-navy/70 hover:text-navy"
            }`}
          >
            {tNav("pricing")}
          </a>
          <span
            className={`select-none text-sm ${
              useLightText ? "text-white/25" : "text-navy/25"
            }`}
            aria-hidden
          >
            |
          </span>
          <a
            href="#faq"
            className={`text-sm font-medium transition-colors hover:opacity-80 ${
              useLightText
                ? "text-white/80 hover:text-white"
                : "text-navy/70 hover:text-navy"
            }`}
          >
            {tNav("faq")}
          </a>
          <span
            className={`select-none text-sm ${
              useLightText ? "text-white/25" : "text-navy/25"
            }`}
            aria-hidden
          >
            |
          </span>
          <Link
            href={`/${locale}/blog`}
            className={`text-sm font-medium transition-colors ${
              useLightText
                ? "text-white/70 hover:text-white"
                : "text-navy/70 hover:text-navy"
            }`}
          >
            {tFooter("links.blog")}
          </Link>
          <span
            className={`select-none text-sm ${
              useLightText ? "text-white/25" : "text-navy/25"
            }`}
            aria-hidden
          >
            |
          </span>
          <nav
            className={`flex items-center gap-1 text-sm font-medium ${
              useLightText ? "text-white/80" : "text-navy/80"
            }`}
            aria-label="Language"
          >
            <Link
              href="/fr"
              className={`rounded-full px-3 py-1 transition-colors ${
                useLightText
                  ? `hover:bg-white/10 ${locale === "fr" ? "bg-white/15 text-white" : "text-white/90"}`
                  : `hover:bg-navy/5 ${locale === "fr" ? "bg-navy/10 text-navy" : ""}`
              }`}
              aria-current={locale === "fr" ? "true" : undefined}
            >
              FR
              <span className="sr-only"> — {tLang("switchToFr")}</span>
            </Link>
            <span
              className={useLightText ? "text-white/30" : "text-navy/30"}
              aria-hidden
            >
              |
            </span>
            <Link
              href="/en"
              className={`rounded-full px-3 py-1 transition-colors ${
                useLightText
                  ? `hover:bg-white/10 ${locale === "en" ? "bg-white/15 text-white" : "text-white/90"}`
                  : `hover:bg-navy/5 ${locale === "en" ? "bg-navy/10 text-navy" : ""}`
              }`}
              aria-current={locale === "en" ? "true" : undefined}
            >
              EN
              <span className="sr-only"> — {tLang("switchToEn")}</span>
            </Link>
          </nav>
        </div>
      </div>
      {mobileMenuOpen ? (
        <div className="absolute inset-x-0 top-16 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(13,38,77,0.12)] md:hidden">
          {/* Menu mobile : liens même taille, langue en pastilles, badge App Store en bas */}
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-3">
            <a
              href="#screenshots"
              className="block py-3 text-base font-medium text-navy/80 hover:text-navy border-b border-navy/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              {tNav("features")}
            </a>
            <a
              href="#pricing"
              className="block py-3 text-base font-medium text-navy/80 hover:text-navy border-b border-navy/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              {tNav("pricing")}
            </a>
            <a
              href="#faq"
              className="block py-3 text-base font-medium text-navy/80 hover:text-navy border-b border-navy/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              {tNav("faq")}
            </a>
            <Link
              href={`/${locale}/blog`}
              className="block py-3 text-base font-medium text-navy/80 hover:text-navy border-b border-navy/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              {tFooter("links.blog")}
            </Link>
            <div className="flex items-center gap-3 pt-4 pb-2">
              <span className="text-sm text-navy/40 font-medium">Language</span>
              <Link
                href="/fr"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold px-3 py-1 rounded-full transition-colors ${
                  locale === "fr"
                    ? "bg-navy text-white"
                    : "text-navy/60 hover:text-navy"
                }`}
              >
                FR
              </Link>
              <Link
                href="/en"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold px-3 py-1 rounded-full transition-colors ${
                  locale === "en"
                    ? "bg-navy text-white"
                    : "text-navy/60 hover:text-navy"
                }`}
              >
                EN
              </Link>
            </div>
            <div className="pt-2 pb-4">
              <AppStoreBadge
                href="https://apps.apple.com/app/apple-store/id6755549562?pt=128302951&ct=MobileNav&mt=8"
                source="mobile_nav"
                className="flex justify-center"
                imgClassName="h-12 w-auto"
                ariaLabel="Download Alcotheque on the App Store"
              />
            </div>
          </div>
        </div>
      ) : null}
    </motion.header>
  );
}
