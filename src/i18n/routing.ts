import { defineRouting } from "next-intl/routing";
import type { Locale } from "@/content/types";

/**
 * pt-BR sem prefixo, en em /en. O idioma só muda pela URL: sem detecção por
 * Accept-Language, sem cookie e sem header `Link` de hreflang (esse vai no metadata).
 */
export const routing = defineRouting({
  locales: ["pt-BR", "en"] satisfies Locale[],
  defaultLocale: "pt-BR",
  localePrefix: "as-needed",
  localeDetection: false,
  localeCookie: false,
  alternateLinks: false,
});

export const isLocale = (value: string | undefined): value is Locale =>
  routing.locales.includes(value as Locale);
