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

/** Divide uma lista em n partes aproximadamente iguais — usado nas esteiras. */
export function chunkInto<T>(items: T[], parts: number): T[][] {
  const size = Math.ceil(items.length / parts);
  return Array.from({ length: parts }, (_, i) => items.slice(i * size, (i + 1) * size));
}
