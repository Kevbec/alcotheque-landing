import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { FooterSection } from "@/components/landing/FooterSection";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const locales = ["fr", "en"] as const;
type AppLocale = (typeof locales)[number];

// Contenu légal validé App Store — ne pas modifier sans revalidation.
const copy = {
  fr: {
    metaTitle: "Politique de confidentialité – Alcothèque",
    metaDescription:
      "Données collectées, utilisation, conservation et vos droits pour l’app Alcothèque.",
    back: "← Retour",
    title: "Politique de confidentialité – Alcothèque",
    updated: "Dernière mise à jour : décembre 2025",
    sections: [
      {
        title: "Données collectées",
        subsections: [
          {
            subtitle: "Données personnelles",
            body: "Lors de la création d'un compte, nous pouvons collecter : adresse e-mail (via Firebase Authentication), identifiant utilisateur unique (UID). Ces données sont utilisées uniquement pour vous authentifier et associer vos informations à votre compte.",
          },
          {
            subtitle: "Données utilisateur",
            body: "Alcothèque vous permet de stocker des informations personnelles liées à votre collection d'alcool, notamment : bouteilles ajoutées à votre collection, détails des bouteilles (nom, type, valeur, statut), emplacements que vous créez (ex. cave, étagère), statistiques et données d'usage. Toutes ces données sont créées par vous et restent strictement privées.",
          },
          {
            subtitle: "Achats et abonnements",
            body: "Si vous souscrivez à Alcothèque Premium : les paiements sont traités de manière sécurisée par Apple App Store (StoreKit). Nous ne collectons ni ne stockons aucune donnée bancaire. Apple peut nous transmettre des informations anonymisées concernant le statut de votre abonnement.",
          },
        ],
        body: null,
      },
      {
        title: "Utilisation des données",
        subsections: null,
        body: "Vos données sont utilisées uniquement pour : fournir et faire fonctionner l'application, synchroniser vos données entre vos appareils, activer les fonctionnalités premium, améliorer la stabilité et l'expérience utilisateur, fournir un support utilisateur. Nous ne vendons, ne louons et ne partageons jamais vos données personnelles à des fins publicitaires.",
      },
      {
        title: "Stockage et sécurité",
        subsections: null,
        body: "Les données utilisateur sont stockées de manière sécurisée via Google Firebase (Firestore). Des mesures de sécurité conformes aux standards de l'industrie sont appliquées. L'accès aux données est limité à l'utilisateur authentifié.",
      },
      {
        title: "Durée de conservation",
        subsections: null,
        body: "Vos données sont conservées tant que votre compte est actif. Vous pouvez demander la suppression de votre compte et de toutes les données associées à tout moment en nous contactant.",
      },
      {
        title: "Vos droits",
        subsections: null,
        body: "Selon votre lieu de résidence, vous disposez des droits suivants : accéder à vos données personnelles, corriger ou mettre à jour vos informations, demander la suppression de vos données, retirer votre consentement. Pour exercer ces droits, contactez-nous à alcotheque.app@gmail.com",
      },
      {
        title: "Protection des mineurs",
        subsections: null,
        body: "Alcothèque est destinée aux utilisateurs âgés de 18 ans ou plus. Nous ne collectons pas volontairement de données concernant des mineurs.",
      },
      {
        title: "Modifications de la politique",
        subsections: null,
        body: "Cette politique de confidentialité peut être mise à jour à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour révisée.",
      },
      {
        title: "Contact",
        subsections: null,
        body: "Pour toute question : alcotheque.app@gmail.com",
      },
    ],
  },
  en: {
    metaTitle: "Privacy Policy – Alcotheque",
    metaDescription:
      "What we collect, how we use it, retention, and your rights for the Alcotheque app.",
    back: "← Back",
    title: "Privacy Policy – Alcotheque",
    updated: "Last updated: December 2025",
    sections: [
      {
        title: "Information We Collect",
        subsections: [
          {
            subtitle: "Personal Information",
            body: "When you create an account, we may collect: email address (via Firebase Authentication), user identifier (UID). This information is used solely to authenticate you and associate your data with your account.",
          },
          {
            subtitle: "User Content",
            body: "Alcotheque allows you to store personal information related to your alcohol collection, such as: bottles added to your collection, bottle details (name, type, value, status), locations you create (e.g. cellar, shelf), statistics and usage data. All this data is created by you and remains private.",
          },
          {
            subtitle: "Purchases",
            body: "If you subscribe to Alcotheque Premium: purchases are processed securely by Apple App Store (StoreKit). We do not collect or store your payment details. Apple may provide us with anonymized subscription status information.",
          },
        ],
        body: null,
      },
      {
        title: "How We Use Your Information",
        subsections: null,
        body: "We use your data only to: provide and operate the app, sync your data across devices, enable premium features, improve app stability and user experience, provide customer support. We do not sell, rent, or share your personal data with third parties for advertising purposes.",
      },
      {
        title: "Data Storage and Security",
        subsections: null,
        body: "User data is stored securely using Google Firebase (Firestore). Industry-standard security measures are applied. Access to your data is restricted to your authenticated account only.",
      },
      {
        title: "Data Retention",
        subsections: null,
        body: "Your data is kept as long as your account is active. You may request deletion of your account and associated data at any time by contacting us.",
      },
      {
        title: "Your Rights",
        subsections: null,
        body: "Depending on your location, you may have the right to: access your personal data, correct or update your data, request deletion of your data, withdraw consent. To exercise these rights, please contact us at alcotheque.app@gmail.com",
      },
      {
        title: "Children's Privacy",
        subsections: null,
        body: "Alcotheque is intended for users 18 years of age or older. We do not knowingly collect data from children.",
      },
      {
        title: "Changes to This Policy",
        subsections: null,
        body: "We may update this Privacy Policy from time to time. Any changes will be published on this page with an updated revision date.",
      },
      {
        title: "Contact Us",
        subsections: null,
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
    alternates: { canonical: `/${locale}/privacy` },
  };
}

function SectionDivider() {
  return <div className="my-8 border-t border-gray-100" aria-hidden />;
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
                  {section.subsections ? (
                    <div className="space-y-6">
                      {section.subsections.map((sub) => (
                        <div key={sub.subtitle}>
                          <h3 className="mb-2 text-[16px] font-medium text-navy/80">
                            {sub.subtitle}
                          </h3>
                          <p className="text-[16px] leading-relaxed text-gray-600">
                            {sub.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[16px] leading-relaxed text-gray-600">
                      {section.body}
                    </p>
                  )}
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
