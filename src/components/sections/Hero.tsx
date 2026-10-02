import type { CSSProperties } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Dropzone from "@/components/ui/Dropzone";
import Marquee from "@/components/ui/Marquee";
import MarqueePauseToggle from "@/components/ui/MarqueePauseToggle";
import Section from "@/components/ui/Section";
import ShowcaseCard from "@/components/sections/ShowcaseCard";
import { getLocaleContent } from "@/content";
import { sectionTitleId } from "@/lib/utils";

/** Passo da entrada orquestrada (globals.css, .hero-enter). */
const enterStep = (step: number) => ({ "--enter-step": step }) as CSSProperties;

export default async function Hero() {
  const { home } = await getLocaleContent();
  const { hero, showcase, partners } = home;

  return (
    <Section id="hero">
      {/* um só botão pausa as duas esteiras e a troca antes/depois do showcase */}
      <MarqueePauseToggle pauseLabel={hero.pauseLabel} resumeLabel={hero.resumeLabel}>
        <div className="flex flex-col gap-12">
          <Marquee speed={60} gap="md" label={hero.showcaseLabel}>
            {showcase.map((item, i) => (
              <ShowcaseCard key={item.label} item={item} index={i} priority={i < 2} />
            ))}
          </Marquee>

          <Container className="flex flex-col items-center gap-8 text-center">
            <h1 id={sectionTitleId("hero")} className="hero-enter max-w-[var(--measure-display)] text-[length:var(--text-display)]" style={enterStep(0)}>
              {hero.title}
            </h1>
            <p
              className="hero-enter max-w-[var(--measure-body)] text-[length:var(--text-body-lg)] text-ink-muted"
              style={enterStep(1)}
            >
              {hero.subtitle}
            </p>
            <div className="hero-enter w-full max-w-2xl" style={enterStep(2)}>
              <Dropzone content={hero.dropzone} cta={{ label: hero.ctaLabel, href: hero.ctaHref }} />
            </div>
          </Container>

          <Marquee speed={45} gap="lg" label={hero.partnersLabel}>
            {partners.map((logo) => (
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
        </div>
      </MarqueePauseToggle>
    </Section>
  );
}
