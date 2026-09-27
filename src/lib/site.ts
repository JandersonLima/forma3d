/** Origem pública do site — única fonte para metadata, sitemap, robots e JSON-LD. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://exemplo.com.br";

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();
