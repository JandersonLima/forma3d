import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Faq from "@/components/sections/Faq";
import FeatureGrid from "@/components/sections/FeatureGrid";
import FinalCta from "@/components/sections/FinalCta";
import Gallery from "@/components/sections/Gallery";
import GameAssets from "@/components/sections/GameAssets";
import GenerationModes from "@/components/sections/GenerationModes";
import Hero from "@/components/sections/Hero";
import Industries from "@/components/sections/Industries";
import PrintingSection from "@/components/sections/PrintingSection";
import SocialProof from "@/components/sections/SocialProof";
import JsonLd from "@/components/ui/JsonLd";
import { getContent } from "@/content";
import type { Locale } from "@/content/types";
import { localeAlternates } from "@/i18n/alternates";
import { getPathname } from "@/i18n/navigation";
import { absoluteUrl } from "@/lib/site";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { seo } = getContent(locale);
  const { title, description } = seo.home;
  // Canonical do próprio idioma (/ ou /en) e hreflang para todos, com x-default no pt-BR.
  const url = getPathname({ href: "/", locale });

  return {
    // O template do layout só vale para segmentos filhos; a home está no mesmo segmento.
    title: { absolute: seo.titleTemplate.replace("%s", title) },
    description,
    alternates: { canonical: url, languages: localeAlternates("/") },
    // openGraph/twitter do filho substituem os do layout por inteiro — repete os campos comuns.
    openGraph: { type: "website", locale: seo.ogLocale, siteName: seo.siteName, url, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** A ordem abaixo é a ordem final da página. */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { seo } = getContent(locale);
  const softwareApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: seo.siteName,
    description: seo.home.description,
    url: absoluteUrl(getPathname({ href: "/", locale })),
    inLanguage: locale,
    applicationCategory: seo.app.category,
    operatingSystem: seo.app.operatingSystem,
  };

  return (
    <main id="conteudo">
      <Hero />
      <GenerationModes />
      <PrintingSection />
      <GameAssets />
      <Industries />
      <SocialProof />
      <Gallery />
      <Faq />
      <FeatureGrid />
      <FinalCta />
      <JsonLd data={softwareApplicationJsonLd} />
    </main>
  );
}
