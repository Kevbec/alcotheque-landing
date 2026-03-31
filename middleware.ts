import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

// Config recommandée par next-intl (Vercel / Edge) :
// - Exclut api, tRPC, internals Next (`_next`), internes Vercel (`_vercel`) et fichiers statiques (segment avec extension).
// - `localePrefix: "as-needed"` exige que ce matcher couvre aussi les chemins sans préfixe (ex. `/`, `/about`) pour que `/` soit bien servi en `fr`.
// Réf. : https://next-intl.dev/docs/routing/middleware
export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
