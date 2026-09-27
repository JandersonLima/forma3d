import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Esteira infinita. Usada 5x na home: parceiros, engines, setores,
 * depoimentos e galeria. CSS puro — as classes vivem em globals.css.
 * A cópia duplicada recebe aria-hidden para não repetir conteúdo no leitor de tela
 * e inert para que links dentro dela não entrem na ordem do Tab.
 */
export default function Marquee({
  children,
  direction = "left",
  speed = 50,
  gap = "2rem",
  pauseOnHover = true,
  className,
}: {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number;
  gap?: string;
  pauseOnHover?: boolean;
  className?: string;
}) {
  const style = {
    "--marquee-speed": `${speed}s`,
    "--marquee-gap": gap,
  } as CSSProperties;

  return (
    <div
      className={cn("marquee", className)}
      data-direction={direction}
      data-pause={pauseOnHover}
      style={style}
    >
      <div className="marquee__track">{children}</div>
      <div className="marquee__track" aria-hidden="true" inert>
        {children}
      </div>
    </div>
  );
}
