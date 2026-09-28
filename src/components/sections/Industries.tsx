import LinkCard from "@/components/ui/LinkCard";
import ScrollCarousel from "@/components/ui/ScrollCarousel";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { getLocaleContent } from "@/content";
import { sectionTitleId } from "@/lib/utils";

const ID = "setores";

export default async function Industries() {
  const { home } = await getLocaleContent();
  const { title, subtitle, prevLabel, nextLabel, items } = home.industries;

  return (
    <Section id={ID}>
      <ScrollCarousel
        prevLabel={prevLabel}
        nextLabel={nextLabel}
        header={<SectionHeading id={sectionTitleId(ID)} align="left" title={title} description={subtitle} />}
      >
        {items.map((item) => (
          <LinkCard
            key={item.href}
            item={item}
            aspect="3/4"
            sizes="(min-width: 540px) 27rem, 80vw"
            className="w-[80vw] max-w-[var(--container-card)]"
          />
        ))}
      </ScrollCarousel>
    </Section>
  );
}
