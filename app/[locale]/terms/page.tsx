import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { FooterSection } from "@/components/landing/FooterSection";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const locales = ["fr", "en"] as const;
type AppLocale = (typeof locales)[number];

// Conditions d’utilisation — alignées sur la version communiquée au store.
const copy = {
  fr: {
    metaTitle: "Conditions d'utilisation | Alcothèque",
    metaDescription: "Conditions générales d’utilisation de l’app Alcothèque.",
    back: "← Retour",
    title: "Conditions d'utilisation",
    updated: "Dernière mise à jour : décembre 2025",
    sections: [
      {
        title: "Acceptation des conditions",
        body: "En utilisant Alcothèque, vous acceptez les présentes conditions. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.",
      },
      {
        title: "Abonnement Premium",
        body: "L'abonnement Premium est proposé à 0,99€/mois avec renouvellement automatique. Vous pouvez annuler à tout moment depuis les paramètres de votre compte Apple. Aucun remboursement n'est effectué pour les périodes partielles.",
      },
      {
        title: "Propriété intellectuelle",
        body: "L'application Alcothèque, son logo et son contenu sont la propriété exclusive de Kevin Beckers. Toute reproduction sans autorisation est interdite.",
      },
      {
        title: "Limitation de responsabilité",
        body: "Alcothèque est fournie sans garantie. Nous ne garantissons pas l'exactitude des valeurs estimées des bouteilles. L'utilisateur est responsable des données qu'il saisit dans l'application.",
      },
      {
        title: "Résiliation",
        body: "Vous pouvez cesser d'utiliser l'application à tout moment. Nous nous réservons le droit de suspendre un compte en cas d'utilisation abusive.",
      },
      {
        title: "Contact",
        body: "Pour toute question : ",
        emailInline: { suffix: "" },
      },
    ],
  },
  en: {
    metaTitle: "Terms of Service | Alcotheque",
    metaDescription: "Terms of use for the Alcotheque app.",
    back: "← Back",
    title: "Terms of Service",
    updated: "Last updated: December 2025",
    sections: [
      {
        title: "Acceptance of Terms",
        body: "By using Alcotheque, you accept these terms. If you do not accept these terms, please do not use the application.",
      },
      {
        title: "Premium Subscription",
        body: "The Premium subscription is offered at €0.99/month with automatic renewal. You can cancel at any time from your Apple account settings. No refunds are made for partial periods.",
      },
      {
        title: "Intellectual Property",
        body: "The Alcotheque application, its logo and its content are the exclusive property of Kevin Beckers. Any reproduction without authorization is prohibited.",
      },
      {
        title: "Limitation of Liability",
        body: "Alcotheque is provided without warranty. We do not guarantee the accuracy of estimated bottle values. The user is responsible for the data they enter in the application.",
      },
      {
        title: "Termination",
        body: "You may stop using the application at any time. We reserve the right to suspend an account in case of abusive use.",
      },
      {
        title: "Contact",
        body: "For any questions: ",
        emailInline: { suffix: "" },
      },
    ],
  },
} as const;

/** Lien email cliquable (cohérent avec la page confidentialité). */
function LegalEmailLink() {
  return (
    <a
      href="mailto:alcotheque.app@gmail.com"
      className="text-navy underline hover:opacity-70 transition"
    >
      alcotheque.app@gmail.com
    </a>
  );
}

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

function SectionDivider() {
  return <div className="my-8 border-t border-gray-100" aria-hidden />;
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
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-24">
          <Link
            href={`/${locale}`}
            className="mb-8 flex items-center gap-1 text-sm text-navy/60 transition-colors hover:text-navy"
          >
            {c.back}
          </Link>

          <h1 className="text-[36px] font-bold leading-tight text-navy">
            {c.title}
          </h1>
          <p className="mt-1 text-sm text-gray-400">{c.updated}</p>

          <div className="mt-8">
            {c.sections.map((section, index) => (
              <div key={section.title}>
                {index > 0 ? <SectionDivider /> : null}
                <section>
                  <h2 className="mb-3 border-l-4 border-navy pl-3 text-[20px] font-semibold text-navy">
                    {section.title}
                  </h2>
                  <p className="text-[16px] leading-relaxed text-gray-600">
                    {section.body}
                    {"emailInline" in section && section.emailInline ? (
                      <>
                        <LegalEmailLink />
                        {section.emailInline.suffix}
                      </>
                    ) : null}
                  </p>
                </section>
              </div>
            ))}
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
