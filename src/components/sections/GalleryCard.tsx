import Image from "next/image";
import ExternalLink from "@/components/ui/ExternalLink";
import { Link } from "@/i18n/navigation";
import type { GalleryModel } from "@/content/types";
import { isAppHref } from "@/lib/site";
import { isExternalHref } from "@/lib/utils";

const classes =
  "gallery-card relative block aspect-square w-[var(--container-thumb)] max-w-[40vw] shrink-0 overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-colors duration-150 hover:border-line-strong focus-visible:border-line-strong";

/**
 * O card inteiro é o link. Miniatura com alt vazio: o nome do modelo é o texto
 * do link e fica sempre no HTML — o CSS só alterna a opacity (globals.css).
 */
export default function GalleryCard({ model, externalHint }: { model: GalleryModel; externalHint: string }) {
  const content = (
    <>
      <Image src={model.thumb} alt="" fill sizes="(min-width: 560px) 14rem, 40vw" className="object-cover" />
      <span className="gallery-card__name absolute inset-x-0 bottom-0 bg-void/70 px-4 py-3 text-[length:var(--text-sm)] font-medium text-ink">
        {model.name}
      </span>
    </>
  );

  // O app vem antes do teste de externo: mesma aba, sem prefixo de idioma.
  if (isAppHref(model.href)) {
    return (
      <a className={classes} href={model.href}>
        {content}
      </a>
    );
  }

  return isExternalHref(model.href) ? (
    <ExternalLink className={classes} href={model.href} hint={externalHint}>
      {content}
    </ExternalLink>
  ) : (
    <Link className={classes} href={model.href}>
      {content}
    </Link>
  );
}
