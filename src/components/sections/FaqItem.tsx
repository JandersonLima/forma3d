import type { FaqItem as FaqItemData } from "@/content/types";

/**
 * <details> nativo, sem JS e sem `name`: cada pergunta abre de forma independente.
 * O chevron gira só com motion-safe — com reduced motion a troca é instantânea.
 */
export default function FaqItem({ item }: { item: FaqItemData }) {
  return (
    <details className="group border-b border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-ink transition-colors hover:text-accent-strong [&::-webkit-details-marker]:hidden">
        <h3 className="text-[length:var(--text-body-lg)]">{item.question}</h3>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
          className="shrink-0 group-open:rotate-180 motion-safe:transition-transform"
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <p className="max-w-[60ch] pb-6 text-[length:var(--text-body)] text-ink-muted">{item.answer}</p>
    </details>
  );
}
