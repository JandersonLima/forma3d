/** Origem pública do site — única fonte para metadata, sitemap, robots e JSON-LD. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://exemplo.com.br";

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();

/** Endereço do app (editor) — único para CTAs, rodapé e galeria. Nunca leva prefixo de idioma. */
export const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "/app";

/** Href que aponta para o app: sai como <a> comum, sem o prefixo de idioma do Link. */
export const isAppHref = (href: string) => href === appUrl || href.startsWith(`${appUrl}/`);
