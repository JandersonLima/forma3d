import NotFoundMain from "@/components/sections/NotFoundMain";
import { getContent } from "@/content";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";

/**
 * 404 global: caminhos fora de [locale] (ex.: /pagina.html, /images/inexistente.webp),
 * cujo segmento não é um idioma. Sai no idioma padrão, sem header/footer.
 *
 * Não pode tocar no next-intl (provider, Link, getLocale, setRequestLocale): esta 404
 * entra na árvore de todas as rotas, e ler o locale da requisição aqui tira o
 * pré-render da home, e fixá-lo põe /en em pt-BR. Daí o `localizedHome={false}`.
 */
export default function GlobalNotFound() {
  const locale = routing.defaultLocale;
  const { notFound, navigation, seo } = getContent(locale);

  return (
    <html lang={locale} className={fontVariables} data-scroll-behavior="smooth">
      <body>
        <NotFoundMain
          content={notFound}
          titleTemplate={seo.titleTemplate}
          homeHref={navigation.brand.href}
          localizedHome={false}
        />
      </body>
    </html>
  );
}
