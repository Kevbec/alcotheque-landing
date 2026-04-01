import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { FooterSection } from "@/components/landing/FooterSection";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const locales = ["fr", "en"] as const;
type AppLocale = (typeof locales)[number];

const copy = {
  fr: {
    metaTitle: "Politique de confidentialité | Alcothèque",
    metaDescription: "Collecte, usage et droits sur vos données pour Alcothèque.",
    back: "← Retour",
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : 1er janvier 2026",
    sections: [
      {
        title: "Collecte des données",
        body: "Alcothèque collecte uniquement les données nécessaires au fonctionnement de l’application : votre adresse email, les informations sur vos bouteilles et votre historique de collection. Ces données sont stockées de manière sécurisée sur Firebase (Google Cloud).",
      },
      {
        title: "Utilisation des données",
        body: "Vos données sont utilisées exclusivement pour le fonctionnement de l’application. Nous ne vendons ni ne partageons vos données personnelles avec des tiers à des fins commerciales.",
      },
      {
        title: "Vos droits",
        body: "Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à alcotheque.app@gmail.com",
      },
      {
        title: "Cookies",
        body: "Alcothèque n’utilise pas de cookies publicitaires. Des cookies techniques essentiels au fonctionnement de l’app peuvent être utilisés.",
      },
      {
        title: "Contact",
        body: "Pour toute question relative à notre politique de confidentialité : alcotheque.app@gmail.com",
      },
    ],
  },
  en: {
    metaTitle: "Privacy Policy | Alcotheque",
    metaDescription: "How Alcotheque collects, uses, and protects your data.",
    back: "← Back",
    title: "Privacy Policy",
    updated: "Last updated: January 1, 2026",
    sections: [
      {
        title: "Data Collection",
        body: "Alcotheque only collects data necessary for the app to function: your email address, bottle information and collection history. This data is securely stored on Firebase (Google Cloud).",
      },
      {
        title: "Data Usage",
        body: "Your data is used exclusively for the app's operation. We do not sell or share your personal data with third parties for commercial purposes.",
      },
      {
        title: "Your Rights",
        body: "In accordance with GDPR, you have the right to access, correct and delete your data. To exercise these rights, contact us at alcotheque.app@gmail.com",
      },
      {
        title: "Cookies",
        body: "Alcotheque does not use advertising cookies. Technical cookies essential to the app's operation may be used.",
      },
      {
        title: "Contact",
        body: "For any questions about our privacy policy: alcotheque.app@gmail.com",
      },
    ],
  },
} as const;

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const { locale } = params;
  if (!locales.includes(locale as AppLocale)) {
    return {};
  }
  const c = copy[locale as AppLocale];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/${locale}/privacy` },
  };
}

export default function PrivacyPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale: localeParam } = params;
  if (!locales.includes(localeParam as AppLocale)) {
    notFound();
  }
  const locale = localeParam as AppLocale;
  const c = copy[locale];

  return (
    <>
      <LandingNavbar />
      <main className="min-h-screen bg-white text-zinc-900">
        <div className="mx-auto max-w-[800px] px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}`}
            className="mb-8 inline-block text-base font-medium text-navy underline-offset-4 transition-opacity hover:opacity-80"
          >
            {c.back}
          </Link>

          <h1 className="text-[36px] font-bold leading-tight tracking-tight text-[#0D264D]">
            {c.title}
          </h1>
          <p className="mt-2 text-sm text-gray-500">{c.updated}</p>

          <div className="mt-12 space-y-12">
            {c.sections.map((section) => (
              <section key={section.title}>
                <h2 className="border-b-2 border-[#0D264D] pb-2 text-[22px] font-semibold text-[#0D264D]">
                  {section.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
