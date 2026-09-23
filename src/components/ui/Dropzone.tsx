"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { usePasteImage } from "@/hooks/usePasteImage";
import { cn, validateImageFile } from "@/lib/utils";

/**
 * Três formas de entrada: clicar, arrastar e colar (Ctrl+V).
 * A terceira é a que a maioria dos clones esquece e a mais usada na prática.
 */
export default function Dropzone({
  label,
  hint,
  onFileAccepted,
}: {
  label: string;
  hint: string;
  onFileAccepted?: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const accept = useCallback(
    (file: File) => {
      const problem = validateImageFile(file);
      if (problem) {
        setError(problem);
        return;
      }
      setError(null);
      setPreview((old) => {
        if (old) URL.revokeObjectURL(old);
        return URL.createObjectURL(file);
      });
      onFileAccepted?.(file);
    },
    [onFileAccepted],
  );

  usePasteImage(accept);

  return (
    <div className="w-full">
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) accept(file);
        }}
        className={cn(
          "relative flex min-h-44 cursor-pointer flex-col items-center justify-center gap-2",
          "rounded-[var(--radius-card)] border border-dashed border-line bg-surface px-6 py-10",
          "transition-colors duration-150 hover:border-accent",
          isDragging && "border-accent bg-accent-soft",
        )}
      >
        {preview ? (
          <Image
            src={preview}
            alt="Pré-visualização da imagem enviada"
            fill
            unoptimized
            className="rounded-[var(--radius-card)] object-contain p-3"
          />
        ) : (
          <>
            <span className="text-base font-medium">{label}</span>
            <span className="text-sm text-ink-muted">{hint}</span>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) accept(file);
        }}
      />

      {error && (
        <p role="alert" className="mt-2 text-sm text-ink-muted">
          {error}
        </p>
      )}
    </div>
  );
}
