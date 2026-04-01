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

/**
 * Styles du corps d’article : tableaux GFM dans `.blog-table-wrap` (lib/blog.ts),
 * avec défilement horizontal mobile. La 2e colonne = Alcothèque (mise en avant).
 * Légende : paragraphe juste après le wrapper (équivalent sémantique de table + p).
 * La pilule « Notre choix » / « Our pick » sous Alcothèque est rendue via ::after sur le 2e <th>
 * (contenu Markdown inchangé, ✓ conservé).
 */
function articleBodyClass(locale: AppLocale): string {
  const alcothequePillContent =
    locale === "fr"
      ? "[&_th:nth-child(2)::after]:content-['Notre_choix']"
      : "[&_th:nth-child(2)::after]:content-['Our_pick']";

  return [
    "mx-auto max-w-3xl px-4 pb-16 sm:px-6",
    "[&_a]:text-navy [&_a]:underline [&_a]:underline-offset-2",
    "[&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:border-l-4 [&_h2]:border-navy [&_h2]:pl-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-navy",
    "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-navy/80",
    "[&_p]:mb-4 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-gray-600",
    "[&_strong]:font-semibold [&_strong]:text-navy",
    "[&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:text-gray-600",
    "[&_ol]:mb-4 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:text-gray-600",
    "[&_li]:mb-2",
    // Tableau premium (GFM) : ombre prononcée, colonne Alcothèque mise en avant.
    "[&_table]:w-full [&_table]:border-collapse [&_table]:rounded-2xl [&_table]:overflow-hidden",
    "[&_table]:shadow-[0_8px_40px_rgba(13,38,77,0.12)] [&_table]:my-10 [&_table]:text-sm",
    "[&_thead_tr]:bg-[#0D264D]",
    // En-têtes hors Alcothèque : fond marine, libellés blancs bien lisibles.
    "[&_th]:px-6 [&_th]:py-4 [&_th]:font-semibold [&_th]:text-sm [&_th]:text-center",
    "[&_th:not(:nth-child(2))]:bg-[#0D264D] [&_th:not(:nth-child(2))]:text-white",
    "[&_th:first-child]:text-left [&_th:first-child]:rounded-tl-2xl [&_th:last-child]:rounded-tr-2xl",
    // 2e colonne = Alcothèque : fond blanc, texte marine, liseré supérieur, pilule sous le titre.
    "[&_th:nth-child(2)]:bg-[#FFFFFF]",
    "[&_th:nth-child(2)]:text-[#0D264D]",
    "[&_th:nth-child(2)]:font-bold [&_th:nth-child(2)]:text-base",
    "[&_th:nth-child(2)]:border-t-4 [&_th:nth-child(2)]:border-[#0D264D]",
    "[&_th:nth-child(2)::after]:mt-1 [&_th:nth-child(2)::after]:block [&_th:nth-child(2)::after]:rounded-full",
    "[&_th:nth-child(2)::after]:bg-navy/10 [&_th:nth-child(2)::after]:text-navy",
    "[&_th:nth-child(2)::after]:text-[10px] [&_th:nth-child(2)::after]:font-semibold",
    "[&_th:nth-child(2)::after]:px-2 [&_th:nth-child(2)::after]:py-0.5",
    "[&_th:nth-child(2)::after]:text-center",
    alcothequePillContent,
    "[&_tbody_tr:nth-child(odd)]:bg-white [&_tbody_tr:nth-child(even)]:bg-[#F8F9FF]",
    "[&_tbody_tr:hover]:bg-[#EEF1F7] [&_tbody_tr]:transition-colors [&_tbody_tr]:duration-150",
    "[&_td]:px-6 [&_td]:py-4 [&_td]:text-center [&_td]:border-b [&_td]:border-gray-100",
    "[&_td:first-child]:text-left [&_td:first-child]:font-medium [&_td:first-child]:text-[#0D264D] [&_td:first-child]:text-sm",
    // Cellules Alcothèque : fond bleu clair, texte marine gras, bordures latérales discrètes.
    "[&_td:nth-child(2)]:bg-[#EEF1F7]",
    "[&_td:nth-child(2)]:font-bold [&_td:nth-child(2)]:text-[#0D264D]",
    "[&_td:nth-child(2)]:border-x-2 [&_td:nth-child(2)]:border-[#0D264D]/20",
    "[&_tbody_tr:last-child_td]:border-b-0",
    "[&_tbody_tr:last-child_td:first-child]:rounded-bl-2xl [&_tbody_tr:last-child_td:last-child]:rounded-br-2xl",
    // Cible aussi table+p si jamais le HTML n’a pas de wrapper (robustesse).
    "[&_table+p]:text-sm [&_table+p]:text-gray-400 [&_table+p]:italic [&_table+p]:mt-4 [&_table+p]:leading-relaxed",
    "[&_table+p]:border-l-2 [&_table+p]:border-navy/20 [&_table+p]:pl-4",
    "[&_.blog-table-wrap+p]:text-sm [&_.blog-table-wrap+p]:text-gray-400 [&_.blog-table-wrap+p]:italic [&_.blog-table-wrap+p]:mt-4",
    "[&_.blog-table-wrap+p]:leading-relaxed [&_.blog-table-wrap+p]:border-l-2 [&_.blog-table-wrap+p]:border-navy/20 [&_.blog-table-wrap+p]:pl-4",
    "[&_hr]:my-8 [&_hr]:border-gray-200 [&_em]:text-gray-600",
  ].join(" ");
}

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
            className={articleBodyClass(locale)}
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
