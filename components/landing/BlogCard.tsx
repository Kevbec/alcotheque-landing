import Link from "next/link";

type BlogCardProps = {
  locale: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  readMoreLabel: string;
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
 * Carte cliquable pour un article : aperçu date, titre, extrait et lien « Lire ».
 */
export function BlogCard({
  locale,
  title,
  description,
  date,
  slug,
  readMoreLabel,
}: BlogCardProps) {
  const href = `/${locale}/blog/${slug}`;
  const formattedDate = formatPostDate(date, locale);

  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <time
        dateTime={date}
        className="inline-block rounded-full bg-navy/10 px-3 py-1 text-xs font-medium text-navy"
      >
        {formattedDate}
      </time>
      <h2 className="mt-3 text-[20px] font-bold leading-snug text-navy">
        {title}
      </h2>
      <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-gray-500">
        {description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-navy">
        {readMoreLabel}
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}
