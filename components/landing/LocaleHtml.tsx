"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

// Synchronise la balise <html lang> avec la locale (le layout racine ne voit pas [locale]).
type Props = { locale: string; children: ReactNode };

export function LocaleHtml({ locale, children }: Props) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <>{children}</>;
}
