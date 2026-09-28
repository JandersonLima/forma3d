import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { getLocaleContent } from "@/content";
import { sectionTitleId } from "@/lib/utils";

const ID = "impressao";

/**
 * Ordem no DOM: heading → imagem → corpo. Abaixo de 900px isso já é o
 * empilhamento; a partir de 900px o grid leva a imagem para a coluna direita.
 */
export default async function PrintingSection() {
  const { home } = await getLocaleContent();
  const {
    title,
    subtitle,
    steps,
    highlightTitle,
    highlightBody,
    image,
    alt,
    ctaLabel,
    ctaHref,
    compatibleLabel,
    compatible,
  } = home.printing;

  return (
    <Section id={ID}>
      <Container className="grid gap-12 md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-x-16">
        <SectionHeading
          id={sectionTitleId(ID)}
          align="left"
          title={title}
          description={subtitle}
          className="md:col-start-1 md:row-start-1"
        />

        <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] border border-line md:col-start-2 md:row-span-2 md:row-start-1 md:self-center">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1200px) 560px, (min-width: 900px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-8 md:col-start-1 md:row-start-2">
          {/* role="list": o Safari/VoiceOver descarta a semântica quando há list-style none */}
          <ol role="list" className="steps flex flex-col gap-4">
            {steps.map((step) => (
              <li key={step} className="flex items-center gap-4 text-[length:var(--text-body-lg)]">
                {step}
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-line bg-surface p-6">
            <h3 className="text-[length:var(--text-h3)]">{highlightTitle}</h3>
            <p className="text-[length:var(--text-body)] text-ink-muted">{highlightBody}</p>
          </div>

          <Button variant="ghost" href={ctaHref} className="self-start">
            {ctaLabel}
          </Button>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="text-[length:var(--text-sm)] text-ink-muted">{compatibleLabel}</p>
            <ul className="flex flex-wrap items-center gap-6">
              {compatible.map((logo) => (
                <li key={logo.name}>
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={160}
                    height={48}
                    unoptimized
                    className="h-8 w-auto opacity-70"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
