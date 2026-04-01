import { FooterSection } from "@/components/landing/FooterSection";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const locales = ["fr", "en"] as const;
type AppLocale = (typeof locales)[number];

const APP_STORE_BLOG_CTA =
  "https://apps.apple.com/app/apple-store/id6755549562?pt=128302951&ct=BlogCTA&mt=8";

function baseUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (env) return env;
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  return "http://localhost:3000";
}

function formatPostDate(iso: string, locale: AppLocale): string {
  const loc = locale === "fr" ? "fr-FR" : "en-US";
  return new Intl.DateTimeFormat(loc, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

const ui = {
  fr: {
    breadcrumbHome: "Alcothèque",
    breadcrumbBlog: "Blog",
    ctaTitle: "Prêt à organiser votre collection ?",
    ctaBadgeAlt: "Télécharger sur l’App Store",
  },
  en: {
    breadcrumbHome: "Alcotheque",
    breadcrumbBlog: "Blog",
    ctaTitle: "Ready to organize your collection?",
    ctaBadgeAlt: "Download on the App Store",
  },
} satisfies Record<AppLocale, Record<string, string>>;

/** Classes appliquées au HTML généré (titres, listes, tableaux, etc.). */
const articleBodyClass =
  "mx-auto max-w-3xl px-4 pb-16 sm:px-6 [&_a]:text-navy [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:border-l-4 [&_h2]:border-navy [&_h2]:pl-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-navy [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-navy/80 [&_p]:mb-4 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-gray-600 [&_strong]:font-semibold [&_strong]:text-navy [&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:text-gray-600 [&_ol]:mb-4 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:text-gray-600 [&_li]:mb-2 [&_table]:mb-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_th]:bg-navy [&_th]:px-3 [&_th]:py-2 [&_th]:text-sm [&_th]:font-semibold [&_th]:text-white [&_td]:border [&_td]:border-gray-200 [&_td]:px-3 [&_td]:py-2 [&_td]:text-sm [&_td]:text-gray-700 [&_hr]:my-8 [&_hr]:border-gray-200 [&_em]:text-gray-600";

export async function generateStaticParams(): Promise<
  { locale: string; slug: string }[]
> {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const posts = await getAllPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale: localeParam, slug } = params;
  if (!locales.includes(localeParam as AppLocale)) {
    return {};
  }
  const locale = localeParam as AppLocale;
  const post = await getPostBySlug(locale, slug);
  if (!post) {
    return {};
  }

  const site = baseUrl();
  const url = `${site}/${locale}/blog/${slug}`;
  const ogImage = post.coverImage?.startsWith("http")
    ? post.coverImage
    : post.coverImage
      ? `${site}${post.coverImage.startsWith("/") ? "" : "/"}${post.coverImage}`
      : `${site}/logo.png`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [{ url: ogImage, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    robots: { index: true, follow: true },
  };
}

function appStoreBadgeSrc(locale: AppLocale): string {
  return locale === "fr"
    ? "https://tools.applemediaservices.com/api/badges/download-on-the-app-store/white/fr-fr?size=250x83"
    : "https://tools.applemediaservices.com/api/badges/download-on-the-app-store/white/en-us?size=250x83";
}

export default async function BlogArticlePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale: localeParam, slug } = params;
  if (!locales.includes(localeParam as AppLocale)) {
    notFound();
  }
  const locale = localeParam as AppLocale;
  const t = ui[locale];
  const post = await getPostBySlug(locale, slug);
  if (!post) {
    notFound();
  }

  const site = baseUrl();
  const articleUrl = `${site}/${locale}/blog/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: locale === "fr" ? "Alcothèque" : "Alcotheque",
      logo: {
        "@type": "ImageObject",
        url: `${site}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    url: articleUrl,
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingNavbar />
      <main className="min-h-screen bg-white text-zinc-900">
        <div className="pt-16">
          <nav
            className="mx-auto max-w-3xl px-4 py-3 text-sm text-gray-400 sm:px-6"
            aria-label="Breadcrumb"
          >
            <Link
              href={`/${locale}`}
              className="transition-colors hover:text-gray-600"
            >
              {t.breadcrumbHome}
            </Link>
            <span className="mx-1.5" aria-hidden>
              &gt;
            </span>
            <Link
              href={`/${locale}/blog`}
              className="transition-colors hover:text-gray-600"
            >
              {t.breadcrumbBlog}
            </Link>
            <span className="mx-1.5" aria-hidden>
              &gt;
            </span>
            <span className="line-clamp-1 text-gray-500">{post.title}</span>
          </nav>
        </div>

        <header className="mx-auto max-w-3xl px-4 pb-8 text-center sm:px-6">
          <time
            dateTime={post.date}
            className="inline-block rounded-full bg-navy/10 px-3 py-1 text-xs font-medium text-navy"
          >
            {formatPostDate(post.date, locale)}
          </time>
          <h1 className="mt-4 text-[28px] font-bold leading-tight text-navy sm:text-[40px]">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            {post.author}
          </p>
          <div className="mx-auto mt-8 max-w-xl border-b border-gray-200" />
        </header>

        <article>
          <div
            className={articleBodyClass}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>

        <section
          className="bg-navy py-12 text-center"
          aria-labelledby="blog-article-cta"
        >
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <h2
              id="blog-article-cta"
              className="text-xl font-bold text-white sm:text-2xl"
            >
              {t.ctaTitle}
            </h2>
            <a
              href={APP_STORE_BLOG_CTA}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block transition-opacity hover:opacity-90"
            >
              {/* Badge Apple officiel (image distante). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={appStoreBadgeSrc(locale)}
                alt={t.ctaBadgeAlt}
                width={250}
                height={83}
                className="mx-auto h-[50px] w-auto sm:h-[60px]"
              />
            </a>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
