"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import type { Brand, Href, NavItem, NavigationContent } from "@/content/types";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface Props {
  nav: NavItem[];
  cta: { label: string; href: Href };
  brand: Brand;
  openLabel: string;
  closeLabel: string;
  title: string;
  localeSwitcher: NavigationContent["localeSwitcher"];
}

export default function MobileDrawer({ nav, cta, brand, openLabel, closeLabel, title, localeSwitcher }: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 900px)");
    function onChange(event: MediaQueryListEvent) {
      if (event.matches) close();
    }
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={openLabel}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-input)] text-ink md:hidden"
      >
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
          <path d="M0 1H20M0 7H20M0 13H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label={closeLabel}
            onClick={close}
            className="absolute inset-0 z-40 bg-void/60"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="absolute inset-y-0 right-0 z-50 flex h-dvh w-full max-w-sm flex-col gap-6 overflow-y-auto border-l border-line bg-surface p-6"
          >
            <div className="flex items-center justify-between">
              <Link href={brand.href} onClick={close} className="text-[length:var(--text-h3)] text-ink">
                {brand.name}
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label={closeLabel}
                onClick={close}
                className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-input)] text-ink"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1">
              {nav.map((item) =>
                item.children ? (
                  <div key={item.label} className="flex flex-col">
                    <button
                      type="button"
                      aria-expanded={expanded === item.label}
                      onClick={() => setExpanded((current) => (current === item.label ? null : item.label))}
                      className="flex items-center justify-between rounded-[var(--radius-input)] px-3 py-3 text-left text-[length:var(--text-body-lg)] text-ink"
                    >
                      {item.label}
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        aria-hidden="true"
                        className={expanded === item.label ? "rotate-180" : undefined}
                      >
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {expanded === item.label ? (
                      <ul className="flex flex-col gap-1 py-1 pl-6">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={close}
                              className="block rounded-[var(--radius-input)] px-3 py-2 text-[length:var(--text-sm)] text-ink-muted"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="rounded-[var(--radius-input)] px-3 py-3 text-[length:var(--text-body-lg)] text-ink"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <LocaleSwitcher label={localeSwitcher.label} names={localeSwitcher.names} />

            <Button href={cta.href} size="lg" onClick={close} className="w-full">
              {cta.label}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
