import clsx, { type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;

export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number])) {
    return "Formato não aceito. Use PNG, JPG ou WebP.";
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return "Arquivo acima de 10 MB. Reduza a imagem e tente de novo.";
  }
  return null;
}

/** Divide uma lista em n partes aproximadamente iguais — usado nas esteiras. */
export function chunkInto<T>(items: T[], parts: number): T[][] {
  const size = Math.ceil(items.length / parts);
  return Array.from({ length: parts }, (_, i) => items.slice(i * size, (i + 1) * size));
}
