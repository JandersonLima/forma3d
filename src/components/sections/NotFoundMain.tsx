import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import type { Href, NotFoundContent } from "@/content/types";
import { sectionTitleId } from "@/lib/utils";

const ID = "nao-encontrada";

interface Props {
  content: NotFoundContent;
  /** `seo.titleTemplate`: o <title> sai com o mesmo "| Forma3D" das outras páginas. */
  titleTemplate: string;
  homeHref: Href;
  /** `false` na 404 global: fora da árvore de idioma, o link não passa pelo next-intl. */
  localizedHome?: false;
}

/**
 * Conteúdo das duas 404: a do idioma (`[locale]/not-found.tsx`) e a global
 * (`app/not-found.tsx`). not-found não aceita generateMetadata, então o título vai
 * aqui e o React o leva para o <head>. O noindex não: o Next já o põe em toda
 * resposta 404, e repeti-lo aqui duplicava a meta.
 */
export default function NotFoundMain({ content, titleTemplate, homeHref, localizedHome }: Props) {
  return (
    <main id="conteudo">
      <title>{titleTemplate.replace("%s", content.title)}</title>
      <Section id={ID}>
        <Container className="flex flex-col items-center gap-8 text-center">
          <h1 id={sectionTitleId(ID)} className="max-w-[var(--measure-display)] text-[length:var(--text-display)]">
            {content.title}
          </h1>
          <p className="max-w-[var(--measure-body)] text-[length:var(--text-body-lg)] text-ink-muted">{content.body}</p>
          <Button href={homeHref} size="lg" localized={localizedHome}>
            {content.homeLabel}
          </Button>
        </Container>
      </Section>
    </main>
  );
}
