"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const arrowClasses =
  "inline-flex size-12 items-center justify-center rounded-[var(--radius-pill)] border border-line text-ink transition-colors duration-150 hover:bg-surface-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:bg-transparent";

/**
 * Carrossel com scroll-snap nativo. Cada filho direto encaixa pelo início;
 * o último encaixa pelo fim, senão o fim da trilha não seria alcançável.
 * As setas usam aria-disabled (não disabled) para continuarem focáveis na
 * ponta da trilha — com disabled o foco do teclado cairia para o body.
 */
export default function ScrollCarousel({
  children,
  header,
  prevLabel,
  nextLabel,
  className,
}: {
  children: ReactNode;
  header: ReactNode;
  prevLabel: string;
  nextLabel: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [update]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    if ((direction === -1 && atStart) || (direction === 1 && atEnd)) return;

    // Distância entre dois filhos = largura do card + gap.
    const [first, second] = Array.from(track.children) as HTMLElement[];
    const step = first && second ? second.offsetLeft - first.offsetLeft : track.clientWidth;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduceMotion ? "instant" : "smooth";

    const max = track.scrollWidth - track.clientWidth;
    if (direction === 1 && track.scrollLeft + step > max) {
      track.scrollTo({ left: max, behavior });
      return;
    }
    track.scrollBy({ left: direction * step, behavior });
  };

  return (
    <div className={cn("flex flex-col gap-10", className)}>
      <Container className="flex items-end justify-between gap-6">
        {header}
        <div className="hidden shrink-0 gap-2 md:flex">
          <button
            type="button"
            aria-label={prevLabel}
            aria-disabled={atStart}
            onClick={() => scrollByCard(-1)}
            className={arrowClasses}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            aria-disabled={atEnd}
            onClick={() => scrollByCard(1)}
            className={arrowClasses}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </Container>

      <div
        ref={trackRef}
        className="scroll-carousel__track flex snap-x snap-mandatory gap-4 overflow-x-auto md:gap-6 [&>*]:shrink-0 [&>*]:snap-start [&>*:last-child]:snap-end"
      >
        {children}
      </div>
    </div>
  );
}
