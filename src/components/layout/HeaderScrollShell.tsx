"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Único responsável pelo efeito de scroll do header: transparente no topo,
 * `bg-surface` com borda após 24px. Fica de fora do SSR (não lê `window` no
 * estado inicial) para não quebrar a renderização no servidor.
 */
export default function HeaderScrollShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-200",
        scrolled ? "border-line bg-surface" : "border-transparent bg-transparent",
      )}
    >
      {children}
    </header>
  );
}
