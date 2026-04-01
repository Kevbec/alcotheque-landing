import { type NextRequest, NextResponse } from "next/server";

/**
 * Redirige uniquement la page d’accueil `/` vers `/en` ou `/fr`
 * selon la langue préférée du navigateur (en-tête Accept-Language).
 * Les autres URLs ne passent pas par ce middleware grâce au `matcher`.
 */
export function middleware(request: NextRequest) {
  const accept =
    request.headers.get("accept-language")?.toLowerCase() ?? "";
  const localePath = accept.includes("en") ? "/en" : "/fr";
  return NextResponse.redirect(new URL(localePath, request.url));
}

// N’exécute le middleware que pour `/` exact (pas /fr, /api, /_next, fichiers statiques, etc.).
export const config = {
  matcher: ["/"],
};
