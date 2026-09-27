import Image from "next/image";
import Link from "next/link";
import type { LinkCardItem } from "@/content/types";
import { cn } from "@/lib/utils";

/** Classes literais: o Tailwind só gera o que encontra escrito no fonte. */
const aspects = {
  "3/4": "aspect-[3/4]",
  "16/10": "aspect-[16/10]",
} as const;

/**
 * Card inteiro clicável via stretched link: o ::after do link do h3 cobre o
 * article (relative). O único elemento interativo continua sendo o <a>.
 * Largura vem por className; proporção e sizes, de quem usa.
 */
export default function LinkCard({
  item,
  aspect,
  sizes,
  className,
}: {
  item: LinkCardItem;
  aspect: keyof typeof aspects;
  sizes: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-colors duration-150 focus-within:border-line-strong hover:border-line-strong",
        className,
      )}
    >
      <div className={cn("relative", aspects[aspect])}>
        <Image src={item.image} alt={item.alt} fill sizes={sizes} className="object-cover" />
      </div>
      <div className="flex flex-col gap-3 p-6">
        <h3 className="text-[length:var(--text-h3)]">
          <Link
            href={item.href}
            className="after:absolute after:inset-0 after:rounded-[var(--radius-card)] after:content-['']"
          >
            {item.title}
          </Link>
        </h3>
        <p className="text-ink-muted">{item.body}</p>
      </div>
    </article>
  );
}
