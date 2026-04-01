import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { FooterSection } from "@/components/landing/FooterSection";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const locales = ["fr", "en"] as const;
type AppLocale = (typeof locales)[number];

const copy = {
  fr: {
    metaTitle: "Conditions d’utilisation | Alcothèque",
    metaDescription: "Conditions générales d’utilisation de l’app Alcothèque.",
    back: "← Retour",
    title: "Conditions d’utilisation",
    updated: "Dernière mise à jour : 1er janvier 2026",
    sections: [
      {
        title: "Acceptation des conditions",
        body: "En utilisant Alcothèque, vous acceptez les présentes conditions d’utilisation. Si vous n’acceptez pas ces conditions, veuillez ne pas utiliser l’application.",
      },
      {
        title: "Abonnement Premium",
        body: "L’abonnement Premium est proposé à 0,99€/mois. Il se renouvelle automatiquement sauf résiliation. Vous pouvez annuler à tout moment depuis les paramètres de votre compte Apple.",
      },
      {
        title: "Propriété intellectuelle",
        body: "L’application Alcothèque, son logo et son contenu sont la propriété exclusive de Kevin Beckers. Toute reproduction est interdite sans autorisation.",
      },
      {
        title: "Limitation de responsabilité",
        body: "Alcothèque est fournie « telle quelle ». Nous ne garantissons pas l’exactitude des valeurs estimées des bouteilles. L’utilisateur est responsable des données qu’il saisit.",
      },
      {
        title: "Contact",
        body: "Pour toute question : alcotheque.app@gmail.com",
      },
    ],
  },
  en: {
    metaTitle: "Terms of Service | Alcotheque",
    metaDescription: "Terms of use for the Alcotheque app.",
    back: "← Back",
    title: "Terms of Service",
    updated: "Last updated: January 1, 2026",
    sections: [
      {
        title: "Acceptance of Terms",
        body: "By using Alcotheque, you agree to these terms of service. If you do not agree to these terms, please do not use the app.",
      },
      {
        title: "Premium Subscription",
        body: "The Premium subscription is offered at $0.99/month. It renews automatically unless cancelled. You can cancel at any time from your Apple account settings.",
      },
      {
        title: "Intellectual Property",
        body: "The Alcotheque app, its logo and content are the exclusive property of Kevin Beckers. Any reproduction is prohibited without authorization.",
      },
      {
        title: "Limitation of Liability",
        body: "Alcotheque is provided 'as is'. We do not guarantee the accuracy of estimated bottle values. The user is responsible for the data they enter.",
      },
      {
        title: "Contact",
        body: "For any questions: alcotheque.app@gmail.com",
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
    alternates: { canonical: `/${locale}/terms` },
  };
}

export default function TermsPage({ params }: { params: { locale: string } }) {
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
