import type { Metadata } from "next";

/** Origem pública do site — única fonte para metadata, sitemap, robots e JSON-LD. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://exemplo.com.br";

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();

/** Endereço do app (editor) — único para CTAs, rodapé e galeria. Nunca leva prefixo de idioma. */
export const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "/app";

/** Href que aponta para o app: sai como <a> comum, sem o prefixo de idioma do Link. */
export const isAppHref = (href: string) => href === appUrl || href.startsWith(`${appUrl}/`);

/** Imagem de compartilhamento (src/app/og/[locale]/route.tsx): caminho e medidas. */
export const ogImagePath = (locale: string) => `/og/${locale}`;
export const ogImageSize = { width: 1200, height: 630 } as const;

/**
 * Prévia bloqueada para buscadores até o lançamento: só SITE_INDEXABLE="true" libera.
 * Só do servidor (sem NEXT_PUBLIC) e lida no build: mudar o valor exige novo deploy.
 */
export const siteIndexable = process.env.SITE_INDEXABLE === "true";

/**
 * robots das páginas de idioma: noindex, nofollow na prévia; sem meta quando liberado.
 * Vai no page.tsx, nunca no layout: as 404 herdam o layout e já recebem noindex do Next.
 */
export const pageRobots: Metadata["robots"] = siteIndexable ? undefined : { index: false, follow: false };
