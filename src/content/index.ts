import { getLocale } from "next-intl/server";
import { isLocale, routing } from "@/i18n/routing";
import { footer as footerEn } from "./footer.en";
import { footer as footerPt } from "./footer.pt";
import { home as homeEn } from "./home.en";
import { home as homePt } from "./home.pt";
import { navigation as navigationEn } from "./navigation.en";
import { navigation as navigationPt } from "./navigation.pt";
import { notFound as notFoundEn } from "./notFound.en";
import { notFound as notFoundPt } from "./notFound.pt";
import { seo as seoEn } from "./seo.en";
import { seo as seoPt } from "./seo.pt";
import type { Locale, SiteContent } from "./types";

/**
 * Ponto único de acesso ao conteúdo. Nenhum arquivo fora de `src/content/` importa `*.pt.ts`/`*.en.ts`.
 */
const content: Record<Locale, SiteContent> = {
  "pt-BR": {
    home: homePt,
    navigation: navigationPt,
    footer: footerPt,
    seo: seoPt,
    notFound: notFoundPt,
  },
  en: {
    home: homeEn,
    navigation: navigationEn,
    footer: footerEn,
    seo: seoEn,
    notFound: notFoundEn,
  },
};

/** Para quem já tem o locale em mãos: layout, páginas, metadata e imagem OG. */
export const getContent = (locale: Locale): SiteContent => content[locale];

/** Para server components: conteúdo do idioma da requisição atual. */
export async function getLocaleContent(): Promise<SiteContent> {
  const locale = await getLocale();
  return getContent(isLocale(locale) ? locale : routing.defaultLocale);
}
