import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

type BlogCardProps = {
  locale: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  readCta: string;
  /** Nom affiché sous l’article (depuis le frontmatter). */
  author: string;
  /** URL de couverture optionnelle (ex. Unsplash dans le YAML). */
  coverImage?: string;
  /** Libellé court après la durée, ex. "min read" / "min de lecture". */
  readTimeSuffix: string;
};

/** Formate une date ISO pour l’affichage (carte blog), selon la langue. */
function formatPostDate(iso: string, locale: string): string {
  const loc = locale === "fr" ? "fr-FR" : "en-US";
  return new Intl.DateTimeFormat(loc, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

/**
 * Estime un temps de lecture à partir du texte (environ 200 mots / minute).
 * Utile pour donner une fourchette sans lire tout l’article côté client.
 */
function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Carte cliquable : image optionnelle, date, titre, extrait, auteur, temps de lecture, lien.
 */
export function BlogCard({
  locale,
  title,
  description,
  date,
  slug,
  readCta,
  author,
  coverImage,
  readTimeSuffix,
}: BlogCardProps) {
  const href = `/${locale}/blog/${slug}`;
  const formattedDate = formatPostDate(date, locale);
  const minutes = estimateReadingMinutes(description);

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      {coverImage ? (
        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 672px"
          />
        </div>
      ) : null}
      <div className="p-6">
        <time
          dateTime={date}
          className="inline-block rounded-full bg-navy/10 px-3 py-1 text-xs font-medium text-navy"
        >
          {formattedDate}
        </time>
        <h2 className="mt-3 line-clamp-2 text-[20px] font-bold leading-snug text-navy">
          {title}
        </h2>
        <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-gray-500">
          {description}
        </p>
        <p className="mt-3 flex items-center gap-1 text-xs text-gray-400">
          <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>
            {minutes} {readTimeSuffix}
          </span>
        </p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <span className="text-xs text-gray-400">{author}</span>
          <span className="shrink-0 text-sm font-medium text-navy">
            {readCta}
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
