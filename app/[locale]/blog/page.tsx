import { BlogCard } from "@/components/landing/BlogCard";
import { FooterSection } from "@/components/landing/FooterSection";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const locales = ["fr", "en"] as const;
type AppLocale = (typeof locales)[number];

const APP_STORE_BLOG_INDEX =
  "https://apps.apple.com/app/apple-store/id6755549562?pt=128302951&ct=BlogIndex&mt=8";

function baseUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (env) return env;
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  return "http://localhost:3000";
}

const copy = {
  fr: {
    metaTitle: "Blog Alcothèque – Guides Cave à Vins et Spiritueux",
    metaDescription:
      "Guides pratiques pour gérer votre cave à vins et spiritueux. Conseils sur le scan IA, la gestion de collection, le suivi des cadeaux et plus encore.",
    breadcrumbHome: "Alcothèque",
    breadcrumbCurrent: "Blog",
    eyebrow: "BLOG",
    title: "Guides & Conseils Cave",
    subtitle:
      "Apprenez à mieux gérer, organiser et valoriser votre collection de vins et spiritueux.",
    heroTagsLine: "Vins · Spiritueux · Scan IA · Collection",
    readCta: "Lire →",
    readTimeSuffix: "min de lecture",
    newsletterTitle: "Vous avez aimé ces guides ?",
    newsletterText:
      "Téléchargez Alcothèque et commencez à gérer votre collection dès aujourd'hui.",
    ctaBadgeAlt: "Télécharger sur l’App Store",
  },
  en: {
    metaTitle: "Alcotheque Blog – Wine and Spirits Cellar Guides",
    metaDescription:
      "Practical guides to manage your wine and spirits cellar. Tips on AI scanning, collection management, gift tracking and more.",
    breadcrumbHome: "Alcotheque",
    breadcrumbCurrent: "Blog",
    eyebrow: "BLOG",
    title: "Cellar Guides & Tips",
    subtitle:
      "Learn how to better manage, organize and grow your wine and spirits collection.",
    heroTagsLine: "Wine · Spirits · AI Scan · Collection",
    readCta: "Read →",
    readTimeSuffix: "min read",
    newsletterTitle: "Enjoyed these guides?",
    newsletterText:
      "Download Alcotheque and start managing your collection today.",
    ctaBadgeAlt: "Download on the App Store",
  },
} satisfies Record<AppLocale, Record<string, string>>;

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
    keywords: [
      locale === "fr"
        ? "blog cave à vin, gestion spiritueux, Alcothèque"
        : "wine cellar blog, spirits app, Alcotheque",
    ],
    alternates: {
      canonical: `/${locale}/blog`,
    },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `/${locale}/blog`,
      type: "website",
    },
  };
}

export default async function BlogIndexPage({
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
  const posts = await getAllPosts(locale);
  const site = baseUrl();
  const blogUrl = `${site}/${locale}/blog`;

  // Données structurées (schema.org) : aident Google et les LLM à comprendre que cette page est un blog et à lister les articles.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: locale === "fr" ? "Blog Alcothèque" : "Alcotheque Blog",
    description: c.metaDescription,
    url: blogUrl,
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    publisher: {
      "@type": "Organization",
      name: locale === "fr" ? "Alcothèque" : "Alcotheque",
      url: site,
      logo: {
        "@type": "ImageObject",
        url: `${site}/logo.png`,
      },
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `${site}/${locale}/blog/${post.slug}`,
      author: {
        "@type": "Person",
        name: post.author,
      },
      image: post.coverImage,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingNavbar transparentOver="dark" />
      <main className="min-h-screen bg-white text-zinc-900">
        <div className="pt-16">
          <nav
            className="mx-auto max-w-6xl px-6 py-3 text-sm text-gray-400"
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

        <section
          className="bg-navy pt-20 pb-[calc(theme(spacing.20)+theme(spacing.2))] text-center"
          aria-labelledby="blog-hero-title"
        >
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#93C5FD]">
              {c.eyebrow}
            </p>
            <h1
              id="blog-hero-title"
              className="mt-3 text-[32px] font-bold leading-tight text-white sm:text-[40px]"
            >
              {c.title}
            </h1>
            <p className="mt-3 text-[16px] text-white/75 sm:text-[18px]">
              {c.subtitle}
            </p>
            <p className="mt-4 text-sm tracking-[0.1em] text-white/40">
              {c.heroTagsLine}
            </p>
          </div>
        </section>

        <section
          className="bg-[#F8F9FF] py-16"
          aria-labelledby="blog-posts-heading"
        >
          <h2 id="blog-posts-heading" className="sr-only">
            {locale === "fr" ? "Articles du blog" : "Blog posts"}
          </h2>
          <div
            className={`mx-auto grid grid-cols-1 gap-8 px-6 ${
              posts.length === 1
                ? "max-w-2xl"
                : "max-w-6xl md:grid-cols-2"
            }`}
          >
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                locale={locale}
                title={post.title}
                description={post.description}
                date={post.date}
                slug={post.slug}
                readCta={c.readCta}
                author={post.author}
                coverImage={post.coverImage}
                readTimeSuffix={c.readTimeSuffix}
              />
            ))}
          </div>
        </section>

        {/* Bloc final : même logique que le hero (badge Apple officiel + lien tracké BlogIndex). */}
        <section
          className="bg-white py-16 text-center"
          aria-labelledby="blog-newsletter-cta"
        >
          <div className="mx-auto max-w-2xl px-6">
            <BookOpen
              className="mx-auto text-navy"
              strokeWidth={1.25}
              size={40}
              aria-hidden
            />
            <h2
              id="blog-newsletter-cta"
              className="mt-6 text-2xl font-bold text-navy sm:text-[28px]"
            >
              {c.newsletterTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gray-600">
              {c.newsletterText}
            </p>
            <AppStoreBadge
              href={APP_STORE_BLOG_INDEX}
              source="blog_index"
              className="mx-auto mt-6 inline-block transition-opacity hover:opacity-90"
              ariaLabel={c.ctaBadgeAlt}
              width={250}
              height={83}
            />
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
