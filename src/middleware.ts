import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // opengraph-image fica de fora em qualquer profundidade: a do pt-BR é servida em
  // /pt-BR/opengraph-image, que o as-needed redirecionaria para uma rota inexistente.
  matcher: ["/((?!_next|images|icon|sitemap\\.xml|robots\\.txt|.*opengraph-image|.*\\..*).*)"],
};
