import { defineRouting } from "next-intl/routing";

// Locales supportées : français par défaut (URL sans préfixe avec `as-needed`), anglais sous `/en`.
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
});
