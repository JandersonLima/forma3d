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
    </main>
  );
}
