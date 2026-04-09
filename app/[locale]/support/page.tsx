import { LandingNavbar } from "@/components/landing/LandingNavbar";
import {
  SupportFaqAccordion,
  type SupportFaqItem,
} from "@/components/landing/SupportFaqAccordion";
import { FooterSection } from "@/components/landing/FooterSection";
import { Mail, RefreshCw, Smartphone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Locales prises en charge pour cette page (cohérent avec le reste du site).
const locales = ["fr", "en"] as const;
type AppLocale = (typeof locales)[number];

const SUPPORT_EMAIL = "alcotheque.app@gmail.com";
const MAILTO = `mailto:${SUPPORT_EMAIL}`;

const copy = {
  fr: {
    metaTitle: "Support | Alcothèque",
    metaDescription:
      "Contact, restauration des achats et aide pour l’app Alcothèque.",
    breadcrumbHome: "Alcothèque",
    breadcrumbCurrent: "Support",
    heroEyebrow: "SUPPORT",
    heroTitle: "Comment pouvons-nous vous aider ?",
    heroSubtitle: "Réponse garantie sous 48h.",
    cards: [
      {
        title: "Nous contacter",
        text: "Pour toute question ou problème, notre équipe vous répond sous 48 heures.",
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
    faqEyebrow: "FAQ",
    faqTitle: "Questions fréquentes",
    bottomTitle: "Vous n'avez pas trouvé votre réponse ?",
    bottomSubtitle: "Notre équipe est disponible pour vous aider.",
    bottomCta: "Envoyer un email",
    faq: [
      {
        question: "Comment mes données sont-elles sauvegardées ?",
        answer:
          "Votre collection est automatiquement synchronisée avec Firebase. Connectez-vous avec le même compte sur n'importe quel appareil pour retrouver toutes vos données.",
      },
      {
        question: "J'ai perdu mon accès Premium, que faire ?",
        mailtoParts: {
          prefix:
            "Allez dans les paramètres de l'app et appuyez sur Restaurer les achats. Si le problème persiste, contactez-nous à ",
          suffix: "",
        },
      },
      {
        question: "Comment supprimer mon compte ?",
        mailtoParts: {
          prefix: "Contactez-nous à ",
          suffix:
            " avec votre adresse email de connexion. Nous traiterons votre demande sous 48h.",
        },
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
    breadcrumbHome: "Alcotheque",
    breadcrumbCurrent: "Support",
    heroEyebrow: "SUPPORT",
    heroTitle: "How can we help you?",
    heroSubtitle: "Response guaranteed within 48h.",
    cards: [
      {
        title: "Contact Us",
        text: "For any question or issue, our team responds within 48 hours.",
        cta: "Send an email",
      },
      {
        title: "Restore Purchases",
        text: "Premium not active? Open the app, go to Settings and tap Restore Purchases.",
        cta: undefined as string | undefined,
      },
      {
        title: "Compatibility",
        text: "Alcotheque works on iPhone and iPad running iOS 17 or later.",
        cta: undefined as string | undefined,
      },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Frequently Asked Questions",
    bottomTitle: "Didn't find your answer?",
    bottomSubtitle: "Our team is available to help you.",
    bottomCta: "Send an email",
    faq: [
      {
        question: "How is my data saved?",
        answer:
          "Your collection is automatically synced with Firebase. Sign in with the same account on any device to access all your data.",
      },
      {
        question: "I lost my Premium access, what should I do?",
        mailtoParts: {
          prefix:
            "Go to app settings and tap Restore Purchases. If the issue persists, contact us at ",
          suffix: "",
        },
      },
      {
        question: "How do I delete my account?",
        mailtoParts: {
          prefix: "Contact us at ",
          suffix: " with your login email. We will process your request within 48 hours.",
        },
      },
      {
        question: "The AI scan is not working, what should I do?",
        answer:
          "Check your internet connection and make sure you have good lighting. Restart the app if needed. If the issue persists, contact our support.",
      },
    ],
  },
} as const;

/** Même classes que sur les pages légales : lien email visible et cliquable. */
const LEGAL_EMAIL_LINK_CLASS =
  "text-navy underline hover:opacity-70 transition";

/** Entrée FAQ côté contenu : paragraphe seul ou texte découpé autour de l’email cliquable. */
type SupportFaqSourceItem =
  | { question: string; answer: string }
  | {
      question: string;
      mailtoParts: { prefix: string; suffix: string };
    };

/**
 * Transforme les entrées FAQ (texte seul ou morceaux autour du mail) en items pour l’accordéon.
 */
function toSupportFaqItems(faq: readonly SupportFaqSourceItem[]): SupportFaqItem[] {
  return faq.map((item) => {
    if ("mailtoParts" in item) {
      return {
        question: item.question,
        answer: (
          <>
            {item.mailtoParts.prefix}
            <a href={MAILTO} className={LEGAL_EMAIL_LINK_CLASS}>
              {SUPPORT_EMAIL}
            </a>
            {item.mailtoParts.suffix}
          </>
        ),
      };
    }
    return { question: item.question, answer: item.answer };
  });
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
    alternates: {
      canonical: `/${locale}/support`,
    },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `/${locale}/support`,
      siteName: "Alcotheque",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: c.metaTitle,
      description: c.metaDescription,
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
        {/* Espace sous la navbar fixe + fil d’Ariane lisible sur fond clair (contraste avec la barre). */}
        <div className="pt-16">
          <nav
            className="mx-auto max-w-5xl px-6 py-3 text-sm text-gray-400"
            aria-label="Breadcrumb"
          >
            <Link
              href={`/${locale}`}
              className="transition-colors hover:text-gray-600"
            >
              {c.breadcrumbHome}
            </Link>
            <span className="mx-1.5" aria-hidden>
              &gt;
            </span>
            <span className="text-gray-500">{c.breadcrumbCurrent}</span>
          </nav>
        </div>

        {/* Héros pleine largeur : message principal et repère email décoratif. */}
        <section
          className="bg-navy py-20 text-center"
          aria-labelledby="support-hero-title"
        >
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#93C5FD]">
              {c.heroEyebrow}
            </p>
            <h1
              id="support-hero-title"
              className="mt-3 text-[40px] font-bold leading-tight text-white"
            >
              {c.heroTitle}
            </h1>
            <p className="mt-3 text-[18px] text-white/70">{c.heroSubtitle}</p>
            {/* Pilule décorative : l’adresse est cliquable (mailto) pour cohérence avec le reste du site. */}
            <div className="mx-auto mt-8 inline-flex max-w-full items-center gap-3 rounded-full bg-white/10 px-5 py-3">
              <Mail
                className="h-4 w-4 shrink-0 text-white/60"
                strokeWidth={2}
                aria-hidden
              />
              <a
                href={MAILTO}
                className="truncate text-sm text-white/60 underline decoration-white/30 underline-offset-2 transition hover:opacity-70"
              >
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>
        </section>

        {/* Cartes d’aide : fond lavé, cartes blanches avec élévation au survol. */}
        <section
          className="bg-[#F8F9FF] py-16"
          aria-labelledby="support-cards-heading"
        >
          <h2 id="support-cards-heading" className="sr-only">
            {locale === "fr" ? "Options d’aide" : "Help options"}
          </h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 md:grid-cols-3">
            {c.cards.map((card, i) => {
              const Icon = icons[i];
              return (
                <div
                  key={card.title}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-8 shadow-md transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy shadow-[0_8px_20px_rgba(13,38,77,0.2)]"
                    aria-hidden
                  >
                    <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold text-navy">
                    {card.title}
                  </h3>
                  <p className="flex-1 text-[16px] leading-relaxed text-gray-600">
                    {card.text}
                  </p>
                  {card.cta ? (
                    <a
                      href={MAILTO}
                      className="inline-flex w-fit rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      {card.cta}
                    </a>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ : accordéon aligné visuellement sur la section FAQ de l’accueil. */}
        <section
          className="bg-white py-16"
          aria-labelledby="support-faq-title"
        >
          <div className="mx-auto max-w-3xl px-6">
            <div className="mx-auto mb-12 flex max-w-[500px] flex-col items-center text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-navy">
                {c.faqEyebrow}
              </p>
              <h2
                id="support-faq-title"
                className="mt-3 text-[40px] font-bold leading-tight tracking-tight text-navy"
              >
                {c.faqTitle}
              </h2>
              <span
                className="mt-3 block h-1 w-10 rounded-full bg-navy"
                aria-hidden
              />
            </div>
            <SupportFaqAccordion
              items={toSupportFaqItems(c.faq)}
              headingId="support-faq-title"
            />
          </div>
        </section>

        {/* Dernier appel à contacter le support. */}
        <section
          className="bg-navy py-16 text-center"
          aria-labelledby="support-bottom-cta-title"
        >
          <div className="mx-auto max-w-2xl px-6">
            <h2
              id="support-bottom-cta-title"
              className="text-[28px] font-bold text-white"
            >
              {c.bottomTitle}
            </h2>
            <p className="mt-2 text-base text-white/70">{c.bottomSubtitle}</p>
            <a
              href={MAILTO}
              className="mt-8 inline-block rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-navy"
            >
              {c.bottomCta}
            </a>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
