import type { ReactNode } from "react";
import localFont from "next/font/local";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";
import "./globals.css";

// Polices locales (voir dossier `app/fonts`).
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  // Le middleware next-intl expose la locale négociée pour l’attribut `lang` du document.
  const locale =
    headers().get("x-next-intl-locale") ?? routing.defaultLocale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
