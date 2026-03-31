import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

const locales = ["fr", "en"] as const;
export type AppLocale = (typeof locales)[number];

function pickLocale(segmentLocale: string | undefined): AppLocale {
  if (segmentLocale && locales.includes(segmentLocale as AppLocale)) {
    return segmentLocale as AppLocale;
  }
  const fromCookie = cookies().get("NEXT_LOCALE")?.value;
  if (fromCookie && locales.includes(fromCookie as AppLocale)) {
    return fromCookie as AppLocale;
  }
  const accept = headers().get("accept-language")?.toLowerCase() ?? "";
  if (accept.includes("en")) return "en";
  return "fr";
}

export default getRequestConfig(async ({ locale }) => {
  const resolved = pickLocale(locale);
  return {
    messages: (await import(`./messages/${resolved}.json`)).default,
  };
});
