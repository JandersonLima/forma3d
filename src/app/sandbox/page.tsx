import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Marquee from "@/components/ui/Marquee";
import { sandbox } from "@/content/sandbox";
import { seo } from "@/content/seo";

/** Fora do sitemap, bloqueada no robots.txt e noindex aqui. */
export const metadata: Metadata = {
  title: seo.sandbox.title,
  robots: { index: false, follow: false },
};

/**
 * Página temporária para validar o design system. Removida quando as
 * seções da home (docs/03-plano-de-prompts.md) estiverem todas prontas.
 */
export default function SandboxPage() {
  const { buttonLabels, headings, marqueeTest } = sandbox;

  return (
    <main id="conteudo">
      <section className="py-[calc(var(--spacing-section)/2)]">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            align="center"
            eyebrow={headings.center.eyebrow}
            title={headings.center.title}
            description={headings.center.description}
          />
          <div className="grid grid-cols-2 gap-6 justify-items-center">
            <Button variant="primary" size="md">
              {buttonLabels.primary}
            </Button>
            <Button variant="ghost" size="md">
              {buttonLabels.ghost}
            </Button>
            <Button variant="primary" size="lg">
              {buttonLabels.primary}
            </Button>
            <Button variant="ghost" size="lg">
              {buttonLabels.ghost}
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-[calc(var(--spacing-section)/2)]">
        <Container>
          <SectionHeading
            align="left"
            eyebrow={headings.left.eyebrow}
            title={headings.left.title}
            description={headings.left.description}
          />
        </Container>
      </section>

      <section className="py-[calc(var(--spacing-section)/2)]">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            align="left"
            eyebrow={marqueeTest.eyebrow}
            title={marqueeTest.title}
            description={marqueeTest.description}
          />
          <div className="flex flex-col gap-8">
            <Marquee direction="left" speed={45}>
              {marqueeTest.few.map((label) => (
                <span key={label} className="text-sm text-ink-muted">
                  {label}
                </span>
              ))}
            </Marquee>
            <Marquee direction="right" speed={30}>
              {marqueeTest.many.map((label) => (
                <span key={label} className="text-sm text-ink-muted">
                  {label}
                </span>
              ))}
            </Marquee>
            <Marquee direction="left" speed={60}>
              {marqueeTest.cards.map((label) => (
                <div
                  key={label}
                  className="rounded-[var(--radius-card)] border border-line bg-surface-2 px-6 py-5 text-body text-ink"
                >
                  {label}
                </div>
              ))}
            </Marquee>
          </div>
        </Container>
      </section>
    </main>
  );
}
