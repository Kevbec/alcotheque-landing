"use client";

import Image from "next/image";
import Link from "next/link";
import { Apple, ExternalLink } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

// Lien App Store avec suivi marketing (identique au hero).
const APP_STORE_URL =
  "https://apps.apple.com/app/apple-store/id6755549562?pt=128302951&ct=LandingPage&mt=8";

export function FooterSection() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const supportHref = `/${locale}/support`;
  const privacyHref = `/${locale}/privacy`;
  const termsHref = `/${locale}/terms`;

  return (
    <footer className="border-t border-white/10 bg-[#0D264D]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Grille 1 col → 3 colonnes au desktop, propre et aérée. */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {/* Colonne marque : logo, nom, accroche, badge Product Hunt. */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt={t("logoAlt")}
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-lg font-semibold tracking-tight text-white">
                {t("appName")}
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
              {t("tagline")}
            </p>
            <a
              href="https://www.producthunt.com/posts/alcotheque"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block opacity-90 transition-opacity hover:opacity-100"
              aria-label={t("productHuntAria")}
            >
              {/* Image externe Product Hunt : pas de domaine next/image requis. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=alcotheque&theme=dark"
                alt={t("productHuntAlt")}
                height={40}
                className="h-10 w-auto"
              />
            </a>
          </div>

          {/* Colonne liens internes et téléchargement. */}
          <nav aria-labelledby="footer-app-heading">
            <h2
              id="footer-app-heading"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-white"
            >
              {t("columns.app")}
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/80">
              <li>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-white"
                >
                  {t("links.download")}
                </a>
              </li>
              <li>
                <Link
                  href={supportHref}
                  className="transition-colors duration-200 hover:text-white"
                >
                  {t("links.support")}
                </Link>
              </li>
              <li>
                <Link
                  href={privacyHref}
                  className="transition-colors duration-200 hover:text-white"
                >
                  {t("links.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href={termsHref}
                  className="transition-colors duration-200 hover:text-white"
                >
                  {t("links.terms")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Réseaux : icône ExternalLink + libellé (demande produit). */}
          <nav aria-labelledby="footer-social-heading">
            <h2
              id="footer-social-heading"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-white"
            >
              {t("columns.social")}
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href="https://www.facebook.com/alcothequeapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 transition-colors duration-200 hover:text-white"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                  {t("social.facebook")}
                </a>
              </li>
              <li>
                <a
                  href="https://www.reddit.com/r/Alcotheque"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 transition-colors duration-200 hover:text-white"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                  {t("social.reddit")}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Barre bas de page : copyright + rappel App Store. */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-white/50">{t("copyright")}</p>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] text-white/50 transition-colors duration-200 hover:text-white/80"
            aria-label={t("storeLinkAria")}
          >
            <Apple className="h-4 w-4 shrink-0" aria-hidden />
            {t("storeLink")}
          </a>
        </div>
      </div>
    </footer>
  );
}
