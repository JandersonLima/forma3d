import ScrollCarousel from "@/components/ui/ScrollCarousel";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import IndustryCard from "@/components/sections/IndustryCard";
import { home } from "@/content/home";
import { sectionTitleId } from "@/lib/utils";

const ID = "setores";

export default function Industries() {
  const { title, subtitle, prevLabel, nextLabel, items } = home.industries;

  return (
    <Section id={ID}>
      <ScrollCarousel
        prevLabel={prevLabel}
        nextLabel={nextLabel}
        header={<SectionHeading id={sectionTitleId(ID)} align="left" title={title} description={subtitle} />}
      >
        {items.map((item) => (
          <IndustryCard key={item.href} industry={item} />
        ))}
      </ScrollCarousel>
    </Section>
  );
}
