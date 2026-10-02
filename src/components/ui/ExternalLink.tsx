import type { ReactNode } from "react";

interface Props {
  href: string;
  /** Aviso de nova aba, só para leitor de tela (`navigation.externalLinkHint`). */
  hint: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

/**
 * Único lugar que monta um link com target="_blank": todo link que abre nova aba
 * avisa o leitor de tela. Sem hooks, então serve a server e client components.
 */
export default function ExternalLink({ href, hint, className, onClick, children }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
      {children}
      <span className="sr-only"> {hint}</span>
    </a>
  );
}
