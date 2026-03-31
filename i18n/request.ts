import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import type { AbstractIntlMessages } from "use-intl";
import enMessages from "../messages/en.json";
import frMessages from "../messages/fr.json";
import { routing } from "./routing";

// Fusion récursive : l’anglais est la base, le français surcharge (clés manquantes en FR → EN).
function mergeMessagesWithFallback(
  base: AbstractIntlMessages,
  override: AbstractIntlMessages
): AbstractIntlMessages {
  const out: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    const b = out[key];
    const o = override[key];
    if (
      o !== null &&
      typeof o === "object" &&
      !Array.isArray(o) &&
      b !== null &&
      typeof b === "object" &&
      !Array.isArray(b)
    ) {
      out[key] = mergeMessagesWithFallback(
        b as AbstractIntlMessages,
        o as AbstractIntlMessages
      );
    } else {
      out[key] = o;
    }
  }
  return out as AbstractIntlMessages;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages: AbstractIntlMessages =
    locale === "fr"
      ? mergeMessagesWithFallback(
          enMessages as AbstractIntlMessages,
          frMessages as AbstractIntlMessages
        )
      : (enMessages as AbstractIntlMessages);

  return {
    locale,
    messages,
  };
});
