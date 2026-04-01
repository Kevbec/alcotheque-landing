"use client";

import type { ReactNode } from "react";

// gtag est injecté globalement par app/layout.tsx ; évite les erreurs TypeScript.
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- API gtag hétérogène
declare function gtag(...args: any[]): void;

type AppStoreBadgeProps = {
  href: string;
  /** Identifiant passé à GA4 (paramètre `source` de l’événement). */
  source: string;
  className?: string;
  /** Remplace l’image du badge (ex. liens texte du footer). */
  children?: ReactNode;
  /** Accessibilité : libellé du lien quand le contenu visible est ambigu. */
  ariaLabel?: string;
  /** Classes Tailwind sur l’image (dimensions, marges). */
  imgClassName?: string;
  width?: number;
  height?: number;
};

/**
 * Lien App Store avec envoi GA4 `app_store_click` au clic (source = contexte d’affichage).
 */
export function AppStoreBadge({
  href,
  source,
  className,
  children,
  ariaLabel,
  imgClassName = "",
  width = 180,
  height = 60,
}: AppStoreBadgeProps) {
  function handleClick() {
    gtag("event", "app_store_click", { source });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children ?? (
        <>
          {/* Badge SVG local : léger, pas besoin de `next/image`. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/badges/app-store-badge.svg"
            alt="Download on the App Store"
            width={width}
            height={height}
            className={imgClassName}
          />
        </>
      )}
    </a>
  );
}
