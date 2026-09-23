import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center rounded-[var(--radius-pill)] font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-void hover:bg-[color-mix(in_srgb,var(--color-accent)_85%,white)]",
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
  onClick?: ComponentProps<"button">["onClick"];
  type?: ComponentProps<"button">["type"];
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const external = href.startsWith("http");
    return external ? (
      <a className={classes} href={href} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    ) : (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
