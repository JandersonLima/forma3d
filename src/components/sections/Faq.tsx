import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqItem from "@/components/sections/FaqItem";
import { home } from "@/content/home";
import { sectionTitleId } from "@/lib/utils";

const ID = "faq";

/** FAQPage sai só onde a seção é renderizada, montado dos mesmos itens da sanfona. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: home.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function Faq() {
  const { title, items } = home.faq;

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
    </Section>
  );
}
