import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Marquee from "@/components/ui/Marquee";
import MarqueePauseToggle from "@/components/ui/MarqueePauseToggle";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import GameFeatureRow from "@/components/sections/GameFeatureRow";
import { getLocaleContent } from "@/content";
import { sectionTitleId } from "@/lib/utils";

const ID = "jogos";

export default async function GameAssets() {
  const { home } = await getLocaleContent();
  const {
    title,
    subtitle,
    features,
    enginesLabel,
    enginesRegionLabel,
    enginesPauseLabel,
    enginesResumeLabel,
    engines,
    ctaLabel,
    ctaHref,
  } = home.games;

  return (
    <Section id={ID} className="flex flex-col gap-12">
      <Container className="flex flex-col gap-12">
        <SectionHeading id={sectionTitleId(ID)} align="center" title={title} description={subtitle} />
        <div className="flex flex-col gap-16 md:gap-24">
          {features.map((feature, i) => (
            <GameFeatureRow key={feature.href} feature={feature} reverse={i % 2 === 1} />
          ))}
        </div>
        <Button variant="ghost" href={ctaHref} className="self-center">
          {ctaLabel}
        </Button>
      </Container>

      <div className="flex flex-col gap-6">
        <Container>
          <p className="text-center text-[length:var(--text-sm)] text-ink-muted">{enginesLabel}</p>
        </Container>
        <MarqueePauseToggle pauseLabel={enginesPauseLabel} resumeLabel={enginesResumeLabel}>
          <Marquee speed={45} gap="3.5rem" label={enginesRegionLabel}>
            {engines.map((logo) => (
              <Image
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                width={160}
                height={48}
                unoptimized
                className="h-8 w-auto opacity-70"
              />
            ))}
          </Marquee>
        </MarqueePauseToggle>
      </div>
    </Section>
  );
}
