import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

/** Dossier racine des articles : un sous-dossier par langue (fr, en). */
const BLOG_ROOT = path.join(process.cwd(), "content", "blog");

/** Métadonnées attendues dans l’en-tête YAML de chaque fichier Markdown. */
export type BlogPostFrontmatter = {
  title: string;
  description: string;
  date: string;
  slug: string;
  keywords: string[];
  author: string;
  coverImage?: string;
};

/** Article complet : métadonnées + corps converti en HTML pour la page détail. */
export type BlogPost = BlogPostFrontmatter & {
  contentHtml: string;
};

/**
 * Retire le premier titre Markdown (# …) du corps pour éviter un doublon
 * avec le titre principal (h1) affiché à partir du frontmatter.
 */
function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^#\s+[^\r\n]+(\r?\n|$)/, "").trimStart();
}

/**
 * Enveloppe chaque tableau GFM pour le défilement horizontal sur mobile.
 * Les classes Tailwind sont interprétées sur le conteneur article.
 */
function wrapTablesInScrollContainer(html: string): string {
  return html.replace(
    /<table(\s[^>]*)?>[\s\S]*?<\/table>/gi,
    (table) =>
      `<div class="blog-table-wrap overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">${table}</div>`,
  );
}

/**
 * Liste tous les articles d’une locale, du plus récent au plus ancien
 * (sans convertir le Markdown — plus rapide pour l’index).
 */
export async function getAllPosts(
  locale: string,
): Promise<BlogPostFrontmatter[]> {
  const dir = path.join(BLOG_ROOT, locale);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(
    (f) => f.endsWith(".md") || f.endsWith(".mdx"),
  );
  const posts: BlogPostFrontmatter[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data } = matter(raw);
    posts.push(data as BlogPostFrontmatter);
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/**
 * Charge un article par son slug et transforme le Markdown en HTML
 * (remark + GFM pour tableaux, listes, etc.).
 */
export async function getPostBySlug(
  locale: string,
  slug: string,
): Promise<BlogPost | null> {
  const dir = path.join(BLOG_ROOT, locale);
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir).filter(
    (f) => f.endsWith(".md") || f.endsWith(".mdx"),
  );

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as BlogPostFrontmatter;

    if (fm.slug !== slug) continue;

    const body = stripLeadingH1(content);
    const htmlVfile = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(body);

    return {
      ...fm,
      contentHtml: wrapTablesInScrollContainer(String(htmlVfile)),
    };
  }

  return null;
}
