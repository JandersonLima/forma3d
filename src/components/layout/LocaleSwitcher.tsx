"use client";

import { useLocale } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/content/types";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  names: Record<Locale, string>;
  className?: string;
}

/**
 * Links para a mesma página em cada idioma; o nome de cada idioma vem escrito nele mesmo.
 * <a> comum com getPathname, e não o Link com `locale`: esse sempre prefixa o idioma
 * padrão ("/pt-BR", que o proxy redireciona), e aqui o href sai limpo ("/").
 */
export default function LocaleSwitcher({ label, names, className }: Props) {
  const current = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={label} className={cn("flex items-center", className)}>
      <ul className="flex items-center gap-1">
        {routing.locales.map((locale) => (
          <li key={locale}>
            <a
              href={getPathname({ href: pathname, locale })}
              lang={locale}
              hrefLang={locale}
              aria-current={locale === current ? "page" : undefined}
              className="block rounded-[var(--radius-input)] px-2 py-1 text-[length:var(--text-sm)] text-ink-muted transition-colors duration-150 hover:text-ink aria-[current=page]:text-ink aria-[current=page]:font-medium"
            >
              {names[locale]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
