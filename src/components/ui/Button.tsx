import type { ReactNode } from "react";
import Link from "next/link";
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
}

export default function Button({ children, href, variant = "primary", size = "md", className, onClick }: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return isExternalHref(href) ? (
      <a className={classes} href={href} rel="noopener noreferrer" target="_blank" onClick={onClick}>
        {children}
      </a>
    ) : (
      <Link className={classes} href={href} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
