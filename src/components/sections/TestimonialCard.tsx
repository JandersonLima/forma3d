import Image from "next/image";
import type { Testimonial } from "@/content/types";

/** Largura fixa para a esteira andar em passo regular; sem hover, não é interativo. */
export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex w-[var(--container-quote)] max-w-[80vw] flex-col gap-6 rounded-[var(--radius-card)] border border-line bg-surface p-6">
      <blockquote className="text-ink">{testimonial.quote}</blockquote>
      <figcaption className="flex items-center gap-3">
        {/* alt vazio: o nome já está ao lado */}
        <Image
          src={testimonial.avatar}
          alt=""
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-[var(--radius-pill)] object-cover"
        />
        <span className="flex flex-col">
          <span className="font-medium text-ink">{testimonial.name}</span>
          <span className="text-[length:var(--text-sm)] text-ink-muted">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
