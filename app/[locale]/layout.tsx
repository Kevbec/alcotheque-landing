import { LocaleHtml } from "@/components/landing/LocaleHtml";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

const locales = ["fr", "en"] as const;

const APP_STORE_URL =
  "https://apps.apple.com/app/apple-store/id6755549562?pt=128302951&ct=LandingPage&mt=8";

function baseUrl() {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (env) return env;
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  return "http://localhost:3000";
}

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "metadata" });
  const site = baseUrl();
  const ogTitle = t("ogTitle");
  const ogDescription = t("ogDescription");

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(site),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
        "x-default": "/fr",
      },
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `/${locale}`,
      siteName: locale === "fr" ? "Alcothèque" : "Alcotheque",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      type: "website",
      images: [
        {
          url: "/logo.png",
          width: 512,
          height: 512,
          alt: locale === "fr" ? "Alcothèque" : "Alcotheque",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const tSchema = await getTranslations({ locale, namespace: "schema" });
  const site = baseUrl();
  const appName = locale === "fr" ? "Alcothèque" : "Alcotheque";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: appName,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    description: tSchema("description"),
    url: `${site}/${locale}`,
    downloadUrl: APP_STORE_URL,
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    image: `${site}/logo.png`,
    publisher: {
      "@type": "Organization",
      name: appName,
    },
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleHtml locale={locale}>
        {/* Schema.org SoftwareApplication — utile pour le SEO classique et les réponses structurées (AEO). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </LocaleHtml>
    </NextIntlClientProvider>
  );
}
