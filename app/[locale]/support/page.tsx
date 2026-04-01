import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { SupportFaqAccordion } from "@/components/landing/SupportFaqAccordion";
import { FooterSection } from "@/components/landing/FooterSection";
import { Mail, RefreshCw, Smartphone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const locales = ["fr", "en"] as const;
type AppLocale = (typeof locales)[number];

const SUPPORT_EMAIL = "alcotheque.app@gmail.com";
const MAILTO = `mailto:${SUPPORT_EMAIL}`;

const copy = {
  fr: {
    metaTitle: "Support | Alcothèque",
    metaDescription:
      "Contact, restauration des achats et aide pour l’app Alcothèque.",
    back: "← Retour",
    title: "Support",
    subtitle: "Nous sommes là pour vous aider.",
    helpHeading: "Comment pouvons-nous vous aider ?",
    cards: [
      {
        title: "Nous contacter",
        text: `Pour toute question, écrivez-nous à ${SUPPORT_EMAIL}. Nous répondons sous 48h.`,
        cta: "Envoyer un email",
      },
      {
        title: "Restaurer les achats",
        text: "Si votre abonnement Premium n’est pas actif après un achat, ouvrez l’app et appuyez sur « Restaurer les achats » dans les paramètres.",
        cta: undefined,
      },
      {
        title: "Compatibilité",
        text: "Alcothèque fonctionne sur iPhone et iPad avec iOS 17 ou version ultérieure. Assurez-vous que votre système est à jour.",
        cta: undefined,
      },
    ],
    faqHeading: "Questions fréquentes",
    faq: [
      {
        question: "Comment sauvegarder ma collection ?",
        answer:
          "Votre collection est automatiquement synchronisée avec votre compte Firebase. Connectez-vous avec le même compte sur n’importe quel appareil pour retrouver vos données.",
      },
      {
        question: "J’ai perdu mon accès Premium, que faire ?",
        answer: `Allez dans les paramètres de l’app et appuyez sur « Restaurer les achats ». Si le problème persiste, contactez-nous à ${SUPPORT_EMAIL}.`,
      },
      {
        question: "Comment supprimer mon compte ?",
        answer: `Pour supprimer votre compte et toutes vos données, contactez-nous à ${SUPPORT_EMAIL} avec votre email de connexion. Nous traiterons votre demande sous 48h.`,
      },
      {
        question: "Le scan IA ne fonctionne pas, que faire ?",
        answer:
          "Assurez-vous d’avoir une bonne connexion internet et un éclairage suffisant. Si le problème persiste après avoir redémarré l’app, contactez notre support.",
      },
    ],
  },
  en: {
    metaTitle: "Support | Alcotheque",
    metaDescription: "Contact, restore purchases, and help for the Alcotheque app.",
    back: "← Back",
    title: "Support",
    subtitle: "We’re here to help.",
    helpHeading: "How can we help you?",
    cards: [
      {
        title: "Contact us",
        text: `For any questions, email us at ${SUPPORT_EMAIL}. We respond within 48 hours.`,
        cta: "Send an email",
      },
      {
        title: "Restore purchases",
        text: 'If your Premium subscription isn’t active after a purchase, open the app and tap "Restore Purchases" in Settings.',
        cta: undefined,
      },
      {
        title: "Compatibility",
        text: "Alcotheque runs on iPhone and iPad with iOS 17 or later. Make sure your system is up to date.",
        cta: undefined,
      },
    ],
    faqHeading: "Frequently asked questions",
    faq: [
      {
        question: "How do I back up my collection?",
        answer:
          "Your collection syncs automatically with your Firebase account. Sign in with the same account on any device to access your data.",
      },
      {
        question: "I lost Premium access—what should I do?",
        answer: `Go to the app settings and tap "Restore Purchases." If the issue continues, contact us at ${SUPPORT_EMAIL}.`,
      },
      {
        question: "How do I delete my account?",
        answer: `To delete your account and all your data, contact us at ${SUPPORT_EMAIL} with the email you use to sign in. We’ll process your request within 48 hours.`,
      },
      {
        question: "The AI scan isn’t working—what should I do?",
        answer:
          "Make sure you have a stable internet connection and good lighting. If it still fails after restarting the app, contact our support team.",
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
    alternates: {
      canonical: `/${locale}/support`,
    },
  };
}

export default function SupportPage({
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

  const icons = [Mail, RefreshCw, Smartphone] as const;

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
          <p className="mt-3 text-base leading-relaxed text-gray-600">
            {c.subtitle}
          </p>

          <section className="mb-12 mt-12">
            <h2 className="border-b-2 border-[#0D264D] pb-2 text-[22px] font-semibold text-[#0D264D]">
              {c.helpHeading}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-1">
              {c.cards.map((card, i) => {
                const Icon = icons[i];
                return (
                  <div
                    key={card.title}
                    className="rounded-2xl bg-[#EEF1F7] p-6 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm"
                        aria-hidden
                      >
                        <Icon className="h-5 w-5 text-[#0D264D]" strokeWidth={2} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-[#0D264D]">
                          {card.title}
                        </h3>
                        <p className="mt-2 text-base leading-relaxed text-gray-600">
                          {card.text}
                        </p>
                        {card.cta ? (
                          <a
                            href={MAILTO}
                            className="mt-4 inline-flex rounded-full bg-[#0D264D] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                          >
                            {card.cta}
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mb-12">
            <h2
              id="support-faq-title"
              className="border-b-2 border-[#0D264D] pb-2 text-[22px] font-semibold text-[#0D264D]"
            >
              {c.faqHeading}
            </h2>
            <div className="mt-8">
              <SupportFaqAccordion items={[...c.faq]} headingId="support-faq-title" />
            </div>
          </section>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
