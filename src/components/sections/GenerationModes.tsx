import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ModeCard from "@/components/sections/ModeCard";
import { getLocaleContent } from "@/content";
import { sectionTitleId } from "@/lib/utils";

const ID = "modos";

export default async function GenerationModes() {
  const { home } = await getLocaleContent();
  const { eyebrow, title, subtitle, items } = home.modes;

  return (
    <Section id={ID}>
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id={sectionTitleId(ID)}
          align="center"
          eyebrow={eyebrow}
          title={title}
          description={subtitle}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((mode) => (
            <ModeCard key={mode.id} mode={mode} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
