"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Href, NavLink as NavLinkType } from "@/content/types";

interface Props {
  label: string;
  href: Href;
  overviewLabel: string;
  items: NavLinkType[];
}

export default function NavDropdown({ label, href, overviewLabel, items }: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    function onPointerDown(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={(event) => {
          // Teclado (Enter/Espaço) chega com detail 0 e continua fechando o
          // menu; clique de mouse (detail >= 1) só abre — um clique depois
          // do hover já ter aberto o painel não deve fechá-lo.
          if (event.detail === 0) {
            setOpen((current) => !current);
          } else {
            setOpen(true);
          }
        }}
        className="flex items-center gap-1 px-3 py-2 text-[length:var(--text-sm)] text-ink transition-colors duration-150 hover:text-accent"
      >
        {label}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" className={open ? "rotate-180" : undefined}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div className="absolute left-0 top-full w-64 pt-3">
          <ul className="flex flex-col gap-1 rounded-[var(--radius-card)] border border-line bg-surface-2 p-3">
            <li>
              <Link
                href={href}
                className="block rounded-[var(--radius-input)] px-3 py-2 text-[length:var(--text-sm)] font-medium text-accent hover:bg-surface"
              >
                {overviewLabel}
              </Link>
            </li>
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-[var(--radius-input)] px-3 py-2 text-[length:var(--text-sm)] text-ink hover:bg-surface"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
