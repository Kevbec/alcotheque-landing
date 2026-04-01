import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
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

// Icônes du site (favicons générés depuis public/logo.png via scripts/generate-favicon.mjs).
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        {/* Google Analytics 4 : envoie les visites (page vues, etc.) vers GA avec l'ID de mesure. */}
        {/* TODO: Add NEXT_PUBLIC_SITE_URL=https://alcotheque.app */}
        {/* and NEXT_PUBLIC_GA_ID=G-0XL9CX6QK7 */}
        {/* in Vercel Dashboard → Settings → Environment Variables */}
        <GoogleAnalytics gaId="G-0XL9CX6QK7" />
      </body>
    </html>
  );
}
