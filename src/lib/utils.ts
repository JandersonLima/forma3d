import clsx, { type ClassValue } from "clsx";
import type { ImageFileError } from "@/content/types";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;

/** Devolve o código do problema; o texto exibido vem de home.hero.dropzone.errors. */
export function validateImageFile(file: File): ImageFileError | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number])) {
    return "type";
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return "size";
  }
  return null;
}

/** Mesma lista começando no índice `start` — desalinha esteiras que usam os mesmos itens. */
export function rotate<T>(items: T[], start: number): T[] {
  return [...items.slice(start), ...items.slice(0, start)];
}

/** Link externo abre em nova aba com <a>; interno usa o Link de @/i18n/navigation (prefixo do idioma). */
export const isExternalHref = (href: string) => href.startsWith("http");

/** Id do título de uma seção — Section aponta aria-labelledby para ele. */
export const sectionTitleId = (id: string) => `${id}-title`;
