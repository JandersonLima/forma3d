"use client";

import { useState, type ReactNode } from "react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * Botão de pausar/retomar para as esteiras que envolve (WCAG 2.2.2).
 * O rótulo alterna e comunica o estado sozinho, sem aria-pressed (padrão da APG).
 * O CSS lê data-marquee-paused e esconde o botão em prefers-reduced-motion.
 */
export default function MarqueePauseToggle({
  children,
  pauseLabel,
  resumeLabel,
  className,
}: {
  children: ReactNode;
  pauseLabel: string;
  resumeLabel: string;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div data-marquee-paused={paused} className={cn("flex flex-col gap-6", className)}>
      {/* -mt-4: discreto, colado ao que vem antes. Borda transparente em repouso
          (sem salto de layout); min-h-6 garante o alvo de 24px */}
      <Container className="-mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="marquee-pause-toggle inline-flex min-h-6 items-center gap-1.5 rounded-[var(--radius-pill)] border border-transparent px-2.5 py-1 text-[length:var(--text-xs)] text-ink-muted transition-colors duration-150 hover:border-line hover:bg-surface-2 focus-visible:border-line focus-visible:bg-surface-2"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            {paused ? (
              <path d="M5 3.5v9l7-4.5-7-4.5Z" fill="currentColor" />
            ) : (
              <path d="M5.5 3.5v9M10.5 3.5v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
          {paused ? resumeLabel : pauseLabel}
        </button>
      </Container>
      {children}
    </div>
  );
}
