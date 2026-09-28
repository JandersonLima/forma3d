import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { getLocaleContent } from "@/content";
import { sectionTitleId } from "@/lib/utils";

const ID = "nao-encontrada";

/**
 * 404 dentro do layout do idioma (header, footer e lang certos). not-found não
 * recebe params nem aceita generateMetadata, então título e noindex vão aqui.
 */
export default async function NotFound() {
  const { notFound, navigation } = await getLocaleContent();

  return (
    <main id="conteudo">
      <title>{notFound.title}</title>
      <meta name="robots" content="noindex" />
      <Section id={ID}>
        <Container className="flex flex-col items-center gap-8 text-center">
          <h1 id={sectionTitleId(ID)} className="max-w-[18ch] text-[length:var(--text-display)]">
            {notFound.title}
          </h1>
          <p className="max-w-[60ch] text-[length:var(--text-body-lg)] text-ink-muted">{notFound.body}</p>
          <Button href={navigation.brand.href} size="lg">
            {notFound.homeLabel}
          </Button>
        </Container>
      </Section>
    </main>
  );
}
