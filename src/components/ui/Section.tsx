import type { ReactNode } from "react";
import { cn, sectionTitleId } from "@/lib/utils";

/**
 * Toda seção da home passa por aqui: metade do --spacing-section em cima e
 * embaixo (regra 8 do CLAUDE.md) e aria-labelledby apontando para `${id}-title`.
 */
export default function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={sectionTitleId(id)}
      className={cn("py-[calc(var(--spacing-section)/2)]", className)}
    >
      {children}
    </section>
  );
}
