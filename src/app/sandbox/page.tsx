import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { sandbox } from "@/content/sandbox";

/**
 * Página temporária para validar o design system. Removida quando as
 * seções da home (docs/03-plano-de-prompts.md) estiverem todas prontas.
 */
export default function SandboxPage() {
  const { buttonLabels, headings } = sandbox;

  return (
    <main>
      <section className="py-[var(--spacing-section)]">
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

      <section className="py-[var(--spacing-section)]">
        <Container>
          <SectionHeading
            align="left"
            eyebrow={headings.left.eyebrow}
            title={headings.left.title}
            description={headings.left.description}
          />
        </Container>
      </section>
    </main>
  );
}
