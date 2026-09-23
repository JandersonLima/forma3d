import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Dropzone from "@/components/ui/Dropzone";
import Marquee from "@/components/ui/Marquee";
import { home } from "@/content/home";

/**
 * Esqueleto navegável. Cada bloco marcado com TODO vira um componente em
 * src/components/sections/ — siga docs/03-plano-de-prompts.md, etapa 5.
 * A ordem abaixo é a ordem final da página.
 */
export default function HomePage() {
  const { hero, partners } = home;

  return (
    <main id="conteudo">
      <section className="py-[calc(var(--spacing-section)/2)]">
        <Container className="flex flex-col items-center gap-8 text-center">
          {/* TODO etapa 4: showcase de 6 cards antes/depois em marquee */}
          <h1 className="max-w-[18ch] text-[length:var(--text-display)]">{hero.title}</h1>
          <p className="max-w-[60ch] text-[length:var(--text-body-lg)] text-ink-muted">
            {hero.subtitle}
          </p>
          <div className="w-full max-w-2xl">
            <Dropzone label={hero.dropzoneLabel} hint={hero.dropzoneHint} />
          </div>
          <Button href={hero.ctaHref} size="lg">
            {hero.ctaLabel}
          </Button>
        </Container>

        <div className="mt-16">
          <Marquee speed={45} gap="3.5rem">
            {partners.map((logo) => (
              <span key={logo.name} className="text-sm text-ink-muted">
                {logo.name}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* TODO etapa 5, nesta ordem:
          <GenerationModes />
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
