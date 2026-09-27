import GameAssets from "@/components/sections/GameAssets";
import GenerationModes from "@/components/sections/GenerationModes";
import Hero from "@/components/sections/Hero";
import Industries from "@/components/sections/Industries";
import PrintingSection from "@/components/sections/PrintingSection";

/**
 * Cada bloco marcado com TODO vira um componente em src/components/sections/ —
 * siga docs/03-plano-de-prompts.md. A ordem abaixo é a ordem final da página.
 */
export default function HomePage() {
  return (
    <main id="conteudo">
      <Hero />
      <GenerationModes />
      <PrintingSection />
      <GameAssets />
      <Industries />

      {/* TODO, nesta ordem:
          <SocialProof />
          <Gallery />
          <Faq />
          <FeatureGrid />
          <FinalCta />                                                        */}
    </main>
  );
}
