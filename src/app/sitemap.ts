import type { MetadataRoute } from "next";
import { localeAlternates } from "@/i18n/alternates";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = localeAlternates("/");
  // hreflang recíproco: cada home lista as URLs de todos os idiomas, inclusive a própria.
  const languages = Object.fromEntries(routing.locales.map((locale) => [locale, absoluteUrl(home[locale])]));

  return routing.locales.map((locale) => ({
    url: absoluteUrl(home[locale]),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
    alternates: { languages },
  }));
}
