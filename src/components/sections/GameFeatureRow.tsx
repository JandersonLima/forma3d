import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { GameFeature } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * No DOM a ordem é sempre imagem → texto. `reverse` só troca o lado visualmente
 * a partir de 900px (order no CSS). O único elemento interativo é o link do h3.
 */
export default function GameFeatureRow({ feature, reverse }: { feature: GameFeature; reverse: boolean }) {
  return (
    <article className="grid gap-8 md:grid-cols-2 md:items-center md:gap-16">
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-line",
          reverse && "md:order-2",
        )}
      >
        <Image
          src={feature.image}
          alt={feature.alt}
          fill
          sizes="(min-width: 1200px) 560px, (min-width: 900px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-[length:var(--text-h3)]">
          <Link href={feature.href} className="underline-offset-4 hover:underline">
            {feature.title}
          </Link>
        </h3>
        <p className="text-[length:var(--text-body-lg)] text-ink-muted">{feature.body}</p>
      </div>
    </article>
  );
}
