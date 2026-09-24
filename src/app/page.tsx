import GenerationModes from "@/components/sections/GenerationModes";
import Hero from "@/components/sections/Hero";

/**
 * Cada bloco marcado com TODO vira um componente em src/components/sections/ —
 * siga docs/03-plano-de-prompts.md. A ordem abaixo é a ordem final da página.
 */
export default function HomePage() {
  return (
    <main id="conteudo">
      <Hero />
      <GenerationModes />

      {/* TODO, nesta ordem:
          <PrintingSection />
          <GameAssets />
          <Industries />
          <SocialProof />
          <Gallery />
          <Faq />
          <FeatureGrid />
          <FinalCta />                                                        */}
    </main>
  );
}
