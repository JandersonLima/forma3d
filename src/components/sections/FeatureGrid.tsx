import Container from "@/components/ui/Container";
import LinkCard from "@/components/ui/LinkCard";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { getLocaleContent } from "@/content";
import { sectionTitleId } from "@/lib/utils";

const ID = "recursos";

/** 3 colunas no conteúdo de 1120px com gap-6 ≈ 357px por card. */
const SIZES = "(min-width: 1200px) 360px, (min-width: 900px) 33vw, (min-width: 640px) 50vw, 100vw";

export default async function FeatureGrid() {
  const { home } = await getLocaleContent();
  const { title, items } = home.features;

  return (
    <Section id={ID}>
      <Container className="flex flex-col gap-10">
        <SectionHeading id={sectionTitleId(ID)} align="center" title={title} />
        {/* itens de grid esticam por padrão: cards da mesma linha com a mesma altura */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {items.map((item) => (
            <LinkCard key={item.href} item={item} aspect="16/10" sizes={SIZES} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
