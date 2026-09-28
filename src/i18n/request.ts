import { getRequestConfig } from "next-intl/server";
import { isLocale, routing } from "./routing";

/** Só o locale: os textos vêm de src/content, não de messages do next-intl. */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  return { locale: isLocale(requested) ? requested : routing.defaultLocale };
});
