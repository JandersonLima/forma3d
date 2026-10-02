import Container from "@/components/ui/Container";
import Marquee from "@/components/ui/Marquee";
import MarqueePauseToggle from "@/components/ui/MarqueePauseToggle";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/sections/TestimonialCard";
import { getLocaleContent } from "@/content";
import type { Testimonial } from "@/content/types";
import { rotate, sectionTitleId } from "@/lib/utils";

const ID = "depoimentos";

const cards = (items: Testimonial[]) =>
  items.map((item) => <TestimonialCard key={item.avatar} testimonial={item} />);

export default async function SocialProof() {
  const { home } = await getLocaleContent();
  const { title, reviewLabel, reviewHref, externalHint, pauseLabel, resumeLabel, marqueeLabel, testimonials } =
    home.social;

  return (
    <Section id={ID} className="flex flex-col gap-10">
      <Container className="flex flex-col items-center gap-4">
        <SectionHeading id={sectionTitleId(ID)} align="center" title={title} />
        <a
          href={reviewHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-4 hover:text-accent-strong hover:underline"
        >
          {reviewLabel}
          <span className="sr-only"> {externalHint}</span>
        </a>
      </Container>

      <MarqueePauseToggle pauseLabel={pauseLabel} resumeLabel={resumeLabel}>
        <div className="flex flex-col gap-4">
          <Marquee speed={40} gap="1rem" label={marqueeLabel}>
            {cards(testimonials)}
          </Marquee>
          {/* mesmos depoimentos, só para compor a parede: o leitor de tela lê a 1ª faixa */}
          <div aria-hidden="true" className="marquee-decorative flex flex-col gap-4">
            <Marquee direction="right" speed={55} gap="1rem">
              {cards(rotate(testimonials, 3))}
            </Marquee>
            <Marquee speed={48} gap="1rem">
              {cards(rotate(testimonials, 6))}
            </Marquee>
          </div>
        </div>
      </MarqueePauseToggle>
    </Section>
  );
}
