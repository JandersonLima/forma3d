import type { Metadata } from "next";
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
import { seo } from "@/content/seo";
import { siteUrl } from "@/lib/site";

const { title, description } = seo.home;

export const metadata: Metadata = {
  // O template do layout só vale para segmentos filhos; a home está no mesmo segmento.
  title: { absolute: seo.titleTemplate.replace("%s", title) },
  description,
  alternates: { canonical: "/" },
  // openGraph/twitter do filho substituem os do layout por inteiro — repete os campos comuns.
  openGraph: { type: "website", locale: seo.ogLocale, siteName: seo.siteName, url: "/", title, description },
  twitter: { card: "summary_large_image", title, description },
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: seo.siteName,
  description,
  url: siteUrl,
  applicationCategory: seo.app.category,
  operatingSystem: seo.app.operatingSystem,
};

/** A ordem abaixo é a ordem final da página. */
export default function HomePage() {
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
