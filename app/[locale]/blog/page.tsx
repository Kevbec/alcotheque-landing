import { BlogCard } from "@/components/landing/BlogCard";
import { FooterSection } from "@/components/landing/FooterSection";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const locales = ["fr", "en"] as const;
type AppLocale = (typeof locales)[number];

const copy = {
  fr: {
    metaTitle: "Blog | Alcothèque",
    metaDescription:
      "Conseils et guides pour gérer votre cave à vins et spiritueux avec Alcothèque.",
    breadcrumbHome: "Alcothèque",
    breadcrumbCurrent: "Blog",
    eyebrow: "BLOG",
    title: "Conseils & guides",
    subtitle: "Tout savoir sur la gestion de votre collection.",
    readMore: "Lire l’article",
  },
  en: {
    metaTitle: "Blog | Alcotheque",
    metaDescription:
      "Tips and guides to manage your wine and spirits collection with Alcotheque.",
    breadcrumbHome: "Alcotheque",
    breadcrumbCurrent: "Blog",
    eyebrow: "BLOG",
    title: "Tips & Guides",
    subtitle: "Everything about managing your collection.",
    readMore: "Read more",
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

  return (
    <>
      <LandingNavbar />
      <main className="min-h-screen bg-white text-zinc-900">
        <div className="pt-16">
          <nav
            className="mx-auto max-w-5xl px-4 py-3 text-sm text-gray-400 sm:px-6"
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
          className="bg-navy py-16 text-center sm:py-20"
          aria-labelledby="blog-hero-title"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
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
          </div>
        </section>

        <section
          className="py-16"
          aria-labelledby="blog-posts-heading"
        >
          <h2 id="blog-posts-heading" className="sr-only">
            {locale === "fr" ? "Articles du blog" : "Blog posts"}
          </h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                locale={locale}
                title={post.title}
                description={post.description}
                date={post.date}
                slug={post.slug}
                readMoreLabel={c.readMore}
              />
            ))}
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
