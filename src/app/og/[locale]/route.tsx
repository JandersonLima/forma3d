import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getContent } from "@/content";
import { isLocale, routing } from "@/i18n/routing";
import { ogImageSize } from "@/lib/site";
import { theme } from "@/lib/theme";

/**
 * Imagem de compartilhamento de cada idioma (/og/pt-BR, /og/en), gerada no build.
 * Route Handler em vez da convenção opengraph-image: assim o `alt` sai no idioma
 * certo pelo generateMetadata da página. Fora de [locale] e excluída do middleware.
 */
export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

// TTF estáticos (OFL) das famílias do site: sem `fonts`, o ImageResponse cai na fonte embutida.
const fontFile = (name: string) => readFile(join(process.cwd(), "src/assets/fonts", name));

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response(null, { status: 404 });
  const { seo } = getContent(locale);

  const [groteskSemiBold, groteskBold, interRegular] = await Promise.all([
    fontFile("SpaceGrotesk-SemiBold.ttf"),
    fontFile("SpaceGrotesk-Bold.ttf"),
    fontFile("Inter-Regular.ttf"),
  ]);

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
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", fontFamily: "Space Grotesk", fontSize: 40, fontWeight: 700, color: theme.accent }}>
          {seo.siteName}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Space Grotesk",
              fontSize: 80,
              fontWeight: 600,
              lineHeight: 1.05,
              color: theme.ink,
            }}
          >
            {seo.home.title}
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 400, lineHeight: 1.35, color: theme.inkMuted }}>
            {seo.home.description}
          </div>
        </div>
      </div>
    ),
    {
      ...ogImageSize,
      fonts: [
        { name: "Space Grotesk", data: groteskSemiBold, weight: 600, style: "normal" },
        { name: "Space Grotesk", data: groteskBold, weight: 700, style: "normal" },
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
      ],
    },
  );
}
