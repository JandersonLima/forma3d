import { cn } from "@/lib/utils";

interface Props {
  /** Vai no h2 — use sectionTitleId(id da Section) para ligar o aria-labelledby. */
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <div className={cn("flex flex-col gap-3", align === "center" ? "items-center text-center" : "items-start text-left", className)}>
      {eyebrow ? (
        <p className="text-[length:var(--text-sm)] text-accent">{eyebrow}</p>
      ) : null}
      <h2 id={id} className="text-[length:var(--text-h2)]">{title}</h2>
      {description ? (
        <p className="max-w-[60ch] text-[length:var(--text-body-lg)] text-ink-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
