import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // /og/{locale} (imagem de compartilhamento) fica de fora: o prefixo de idioma do
  // next-intl a mandaria para /pt-BR/og/…, que não existe.
  matcher: ["/((?!_next|images|icon|og/|sitemap\\.xml|robots\\.txt|.*\\..*).*)"],
};
