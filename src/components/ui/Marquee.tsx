import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Esteira infinita. Na home: showcase e parceiros (hero), engines, depoimentos e
 * galeria. CSS puro — as classes vivem em globals.css.
 * A cópia duplicada recebe aria-hidden para não repetir conteúdo no leitor de tela
 * e inert para que links dentro dela não entrem na ordem do Tab.
 * `label` é para esteiras sem item focável: vira uma região nomeada e focável, para
 * o teclado conseguir rolá-la quando reduced-motion a transforma em scroller.
 */
export default function Marquee({
  children,
  direction = "left",
  speed = 50,
  gap = "2rem",
  pauseOnHover = true,
  label,
  className,
}: {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number;
  gap?: string;
  pauseOnHover?: boolean;
  label?: string;
  className?: string;
}) {
  const style = {
    "--marquee-speed": `${speed}s`,
    "--marquee-gap": gap,
  } as CSSProperties;

  const region = label ? { role: "region", "aria-label": label, tabIndex: 0 } : {};

  return (
    <div
      className={cn("marquee", className)}
      data-direction={direction}
      data-pause={pauseOnHover}
      style={style}
      {...region}
    >
      <div className="marquee__track">{children}</div>
      <div className="marquee__track" aria-hidden="true" inert>
        {children}
      </div>
    </div>
  );
}
