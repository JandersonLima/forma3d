import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { home } from "@/content/home";
import { sectionTitleId } from "@/lib/utils";

const ID = "comecar";

export default function FinalCta() {
  const { title, body, ctaLabel, ctaHref } = home.finalCta;

  return (
    <Section id={ID}>
      <Container>
        <div className="flex flex-col items-center gap-8 rounded-[var(--radius-card)] border border-line bg-surface px-6 py-16 text-center md:px-10 md:py-20">
          <SectionHeading id={sectionTitleId(ID)} align="center" title={title} description={body} />
          <Button href={ctaHref} size="lg">
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
