import Container from "@/components/ui/Container";
import Marquee from "@/components/ui/Marquee";
import MarqueePauseToggle from "@/components/ui/MarqueePauseToggle";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryCard from "@/components/sections/GalleryCard";
import { getLocaleContent } from "@/content";
import type { GalleryModel } from "@/content/types";
import { rotate, sectionTitleId } from "@/lib/utils";

const ID = "galeria";

const cards = (items: GalleryModel[], externalHint: string) =>
  items.map((model) => <GalleryCard key={model.href} model={model} externalHint={externalHint} />);

export default async function Gallery() {
  const { home, navigation } = await getLocaleContent();
  const { title, pauseLabel, resumeLabel, models } = home.gallery;
  const hint = navigation.externalLinkHint;

  return (
    <Section id={ID} className="flex flex-col gap-10">
      <Container>
        <SectionHeading id={sectionTitleId(ID)} align="center" title={title} />
      </Container>

      <MarqueePauseToggle pauseLabel={pauseLabel} resumeLabel={resumeLabel}>
        {/* py-1: o .marquee corta o overflow, e o outline de foco precisa de folga vertical */}
        <div className="flex flex-col gap-4">
          <Marquee speed={60} gap="1rem" className="py-1">
            {cards(models, hint)}
          </Marquee>
          {/* mesmos modelos rotacionados, só para compor a parede: Tab e leitor de tela ficam na 1ª faixa */}
          <div aria-hidden="true" inert className="marquee-decorative flex flex-col gap-4">
            <Marquee direction="right" speed={44} gap="1rem" className="py-1">
              {cards(rotate(models, 4), hint)}
            </Marquee>
            <Marquee speed={66} gap="1rem" className="py-1">
              {cards(rotate(models, 8), hint)}
            </Marquee>
          </div>
        </div>
      </MarqueePauseToggle>
    </Section>
  );
}
