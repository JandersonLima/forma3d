import { ImageResponse } from "next/og";
import { getContent } from "@/content";
import type { Locale } from "@/content/types";
import { routing } from "@/i18n/routing";
import { theme } from "@/lib/theme";

/**
 * `alt` é export estático e não recebe o locale; generateImageMetadata resolveria,
 * mas tira a rota da geração estática. Fica o alt do idioma padrão.
 */
export const alt = getContent(routing.defaultLocale).seo.home.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Rotas de imagem não herdam os params do layout; sem isto a OG sai dinâmica. */
export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

interface Params {
  // No Next 15 as rotas de imagem recebem params já resolvido (Promise só no 16).
  params: { locale: Locale };
}

export default function OpengraphImage({ params }: Params) {
  const { locale } = params;
  const { seo } = getContent(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: theme.void,
          borderBottom: `12px solid ${theme.accent}`,
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: theme.accent }}>
          {seo.siteName}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 80, fontWeight: 700, lineHeight: 1.05, color: theme.ink }}>
            {seo.home.title}
          </div>
          <div style={{ display: "flex", fontSize: 32, lineHeight: 1.35, color: theme.inkMuted }}>
            {seo.home.description}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
