import type { CSSProperties } from "react";
import Image from "next/image";
import type { ShowcaseItem } from "@/content/types";

const SIZES = "(min-width: 900px) 256px, 224px";

/**
 * Card antes/depois do hero. A troca é CSS puro (globals.css, .showcase-card):
 * hover em mouse, alternância automática em touch, só o resultado em reduced-motion.
 * O alt fica na imagem de resultado e já descreve o par; a de entrada é decorativa.
 * `priority` só na entrada: o resultado começa invisível e não deve disputar o preload.
 */
export default function ShowcaseCard({
  item,
  index,
  priority = false,
}: {
  item: ShowcaseItem;
  index: number;
  priority?: boolean;
}) {
  return (
    <figure
      className="showcase-card relative aspect-[4/5] w-56 shrink-0 overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface md:w-64"
      style={{ "--swap-index": index } as CSSProperties}
    >
      <Image src={item.imageBefore} alt="" fill sizes={SIZES} priority={priority} className="object-cover" />
      <Image
        src={item.imageAfter}
        alt={item.alt}
        fill
        sizes={SIZES}
        className="showcase-card__after object-cover"
      />
      <figcaption className="absolute inset-x-3 bottom-3 rounded-[var(--radius-pill)] bg-void/70 px-3 py-1 text-center text-sm text-ink">
        {item.label}
      </figcaption>
    </figure>
  );
}
