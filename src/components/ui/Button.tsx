import type { ReactNode, Ref } from "react";
import ExternalLink from "@/components/ui/ExternalLink";
import { Link } from "@/i18n/navigation";
import { isAppHref } from "@/lib/site";
import { cn, isExternalHref } from "@/lib/utils";

type Variant = "primary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center rounded-[var(--radius-pill)] font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-void hover:bg-accent-strong",
  ghost: "border border-line text-ink hover:bg-surface-2",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

interface Props {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  /** Aviso de nova aba (`navigation.externalLinkHint`) quando `href` é externo. */
  externalHint?: string;
  /** Só no modo <button> (sem `href`): permite devolver o foco a ele. */
  ref?: Ref<HTMLButtonElement>;
  /**
   * `false`: `href` interno sai como <a> comum, sem o Link do next-intl (que lê o
   * locale da requisição). Só para fora da árvore de idioma, como a 404 global.
   */
  localized?: false;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  externalHint = "",
  ref,
  localized,
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    // O app vem antes do teste de externo: mesmo com URL absoluta, abre na mesma aba
    // e sai sem o prefixo de idioma que o Link acrescentaria.
    if (isAppHref(href) || (localized === false && !isExternalHref(href))) {
      return (
        <a className={classes} href={href} onClick={onClick}>
          {children}
        </a>
      );
    }

    return isExternalHref(href) ? (
      <ExternalLink className={classes} href={href} hint={externalHint} onClick={onClick}>
        {children}
      </ExternalLink>
    ) : (
      <Link className={classes} href={href} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button ref={ref} type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
