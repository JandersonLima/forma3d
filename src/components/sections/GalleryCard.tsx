import Image from "next/image";
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
export default function GalleryCard({ model }: { model: GalleryModel }) {
  const content = (
    <>
      <Image src={model.thumb} alt="" fill sizes="14rem" className="object-cover" />
      <span className="gallery-card__name absolute inset-x-0 bottom-0 bg-void/70 px-4 py-3 text-[length:var(--text-sm)] font-medium text-ink">
        {model.name}
      </span>
    </>
  );

  if (isExternalHref(model.href)) {
    return (
      <a className={classes} href={model.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return isAppHref(model.href) ? (
    <a className={classes} href={model.href}>
      {content}
    </a>
  ) : (
    <Link className={classes} href={model.href}>
      {content}
    </Link>
  );
}
