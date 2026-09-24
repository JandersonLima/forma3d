import Image from "next/image";
import Button from "@/components/ui/Button";
import type { GenerationMode } from "@/content/types";

/**
 * Card estático: não é clicável, então não reage ao hover. O único feedback
 * interativo é o do próprio Button.
 */
export default function ModeCard({ mode }: { mode: GenerationMode }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
      <div className="relative aspect-[4/3]">
        <Image
          src={mode.image}
          alt={mode.alt}
          fill
          sizes="(min-width: 1200px) 560px, (min-width: 900px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <h3 className="text-[length:var(--text-h3)]">{mode.name}</h3>
        <ul className="flex flex-col gap-2 text-[length:var(--text-sm)] text-ink-muted">
          {mode.bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-3">
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-[var(--radius-pill)] bg-accent" />
              {bullet}
            </li>
          ))}
        </ul>
        <h4 className="text-[length:var(--text-body-lg)] font-medium">{mode.title}</h4>
        <p className="text-[length:var(--text-body)] text-ink-muted">{mode.body}</p>
        <Button variant="ghost" href={mode.ctaHref} className="mt-auto self-start">
          {mode.ctaLabel}
        </Button>
      </div>
    </article>
  );
}
