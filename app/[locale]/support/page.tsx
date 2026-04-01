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
    subtitle: "Nous sommes là pour vous aider. Réponse sous 48h.",
    faqHeading: "Questions fréquentes",
    cards: [
      {
        title: "Nous contacter",
        text: "Pour toute question ou problème, écrivez-nous directement.",
        cta: "Envoyer un email",
      },
      {
        title: "Restaurer les achats",
        text: "Abonnement Premium non actif ? Ouvrez l'app, allez dans Paramètres et appuyez sur Restaurer les achats.",
        cta: undefined as string | undefined,
      },
      {
        title: "Compatibilité",
        text: "Alcothèque fonctionne sur iPhone et iPad avec iOS 17 ou version ultérieure.",
        cta: undefined as string | undefined,
      },
    ],
    faq: [
      {
        question: "Comment mes données sont-elles sauvegardées ?",
        answer:
          "Votre collection est automatiquement synchronisée avec Firebase. Connectez-vous avec le même compte sur n'importe quel appareil pour retrouver toutes vos données.",
      },
      {
        question: "J'ai perdu mon accès Premium, que faire ?",
        answer:
          "Allez dans les paramètres de l'app et appuyez sur Restaurer les achats. Si le problème persiste, contactez-nous à alcotheque.app@gmail.com",
      },
      {
        question: "Comment supprimer mon compte ?",
        answer:
          "Contactez-nous à alcotheque.app@gmail.com avec votre adresse email de connexion. Nous traiterons votre demande sous 48h.",
      },
      {
        question: "Le scan IA ne fonctionne pas, que faire ?",
        answer:
          "Vérifiez votre connexion internet et assurez-vous d'avoir un bon éclairage. Redémarrez l'app si nécessaire. Si le problème persiste, contactez notre support.",
      },
    ],
  },
  en: {
    metaTitle: "Support | Alcotheque",
    metaDescription:
      "Contact, restore purchases, and help for the Alcotheque app.",
    back: "← Back",
    title: "Support",
    subtitle: "We are here to help. Response within 48 hours.",
    faqHeading: "Frequently asked questions",
    cards: [
      {
        title: "Contact Us",
        text: "For any question or issue, write to us directly.",
        cta: "Send an email",
      },
      {
        title: "Restore Purchases",
        text: "Premium subscription not active? Open the app, go to Settings and tap Restore Purchases.",
        cta: undefined as string | undefined,
      },
      {
        title: "Compatibility",
        text: "Alcotheque works on iPhone and iPad running iOS 17 or later.",
        cta: undefined as string | undefined,
      },
    ],
    faq: [
      {
        question: "How is my data saved?",
        answer:
          "Your collection is automatically synced with Firebase. Sign in with the same account on any device to access all your data.",
      },
      {
        question: "I lost my Premium access, what should I do?",
        answer:
          'Go to app settings and tap Restore Purchases. If the issue persists, contact us at alcotheque.app@gmail.com',
      },
      {
        question: "How do I delete my account?",
        answer:
          "Contact us at alcotheque.app@gmail.com with your login email. We will process your request within 48 hours.",
      },
      {
        question: "The AI scan is not working, what should I do?",
        answer:
          "Check your internet connection and make sure you have good lighting. Restart the app if needed. If the issue persists, contact our support.",
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
          <p className="mt-2 text-[18px] text-gray-500">{c.subtitle}</p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {c.cards.map((card, i) => {
              const Icon = icons[i];
              return (
                <div
                  key={card.title}
                  className="rounded-2xl bg-[#EEF1F7] p-6 shadow-sm"
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy"
                    aria-hidden
                  >
                    <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                  </div>
                  <h2 className="mt-4 border-l-4 border-navy pl-3 text-[20px] font-semibold text-navy">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-[16px] leading-relaxed text-gray-600">
                    {card.text}
                  </p>
                  {card.cta ? (
                    <a
                      href={MAILTO}
                      className="mt-4 inline-flex rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      {card.cta}
                    </a>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="my-8 border-t border-gray-100" aria-hidden />

          <section className="mb-12">
            <h2
              id="support-faq-title"
              className="mb-3 border-l-4 border-navy pl-3 text-[20px] font-semibold text-navy"
            >
              {c.faqHeading}
            </h2>
            <SupportFaqAccordion items={[...c.faq]} headingId="support-faq-title" />
          </section>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
