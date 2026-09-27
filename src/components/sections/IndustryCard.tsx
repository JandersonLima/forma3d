import Image from "next/image";
import Link from "next/link";
import type { Industry } from "@/content/types";

/**
 * Card inteiro clicável via stretched link: o ::after do link do h3 cobre o
 * article (relative). O único elemento interativo continua sendo o <a>.
 */
export default function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <article className="relative flex w-[80vw] max-w-[var(--container-card)] flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-colors duration-150 focus-within:border-line-strong hover:border-line-strong">
      <div className="relative aspect-[3/4]">
        <Image
          src={industry.image}
          alt={industry.alt}
          fill
          sizes="(min-width: 540px) 27rem, 80vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 p-6">
        <h3 className="text-[length:var(--text-h3)]">
          <Link
            href={industry.href}
            className="after:absolute after:inset-0 after:rounded-[var(--radius-card)] after:content-['']"
          >
            {industry.title}
          </Link>
        </h3>
        <p className="text-ink-muted">{industry.body}</p>
      </div>
    </article>
  );
}
