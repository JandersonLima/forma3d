import NotFoundMain from "@/components/sections/NotFoundMain";
import { getLocaleContent } from "@/content";

/** 404 dentro do layout do idioma (header, footer e lang certos). */
export default async function NotFound() {
  const { notFound, navigation, seo } = await getLocaleContent();

  return <NotFoundMain content={notFound} titleTemplate={seo.titleTemplate} homeHref={navigation.brand.href} />;
}
