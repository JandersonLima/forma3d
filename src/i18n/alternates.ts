import type { Locale } from "@/content/types";
import { getPathname } from "./navigation";
import { routing } from "./routing";

/** Caminho de `href` em cada idioma, mais `x-default` (o idioma padrão) — para hreflang. */
export function localeAlternates(href: string): Record<Locale | "x-default", string> {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, getPathname({ href, locale })]),
  ) as Record<Locale, string>;

  return { ...languages, "x-default": languages[routing.defaultLocale] };
}
