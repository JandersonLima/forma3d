import Container from "@/components/ui/Container";
import JsonLd from "@/components/ui/JsonLd";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqItem from "@/components/sections/FaqItem";
import { getLocaleContent } from "@/content";
import { sectionTitleId } from "@/lib/utils";

const ID = "faq";

export default async function Faq() {
  const { home } = await getLocaleContent();
  const { title, items } = home.faq;

  /** FAQPage sai só onde a seção é renderizada, montado dos mesmos itens da sanfona. */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <Section id={ID}>
      <Container className="grid gap-10 md:grid-cols-[1fr_2fr] md:items-start md:gap-x-16">
        <SectionHeading id={sectionTitleId(ID)} title={title} />
        <div className="border-t border-line">
          {items.map((item) => (
            <FaqItem key={item.question} item={item} />
          ))}
        </div>
      </Container>
      <JsonLd data={faqJsonLd} />
    </Section>
  );
}
