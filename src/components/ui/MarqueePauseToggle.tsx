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
      <Container className="flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="marquee-pause-toggle inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-line px-4 py-2 text-[length:var(--text-sm)] text-ink transition-colors duration-150 hover:bg-surface-2"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
