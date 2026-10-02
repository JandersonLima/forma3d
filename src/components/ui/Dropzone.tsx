"use client";

import { useCallback, useEffect, useId, useRef, useState, type DragEvent } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { usePasteImage } from "@/hooks/usePasteImage";
import { ACCEPTED_IMAGE_TYPES, cn, validateImageFile } from "@/lib/utils";
import type { DropzoneContent, Href, ImageFileError } from "@/content/types";

/**
 * Três formas de entrada: clicar, arrastar e colar (Ctrl+V).
 * A terceira é a que a maioria dos clones esquece e a mais usada na prática.
 * Não há upload real: com a imagem aceita, a prévia aparece e o CTA ganha destaque.
 */
export default function Dropzone({
  content,
  cta,
}: {
  content: DropzoneContent;
  cta: { label: string; href: Href };
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const replaceRef = useRef<HTMLButtonElement>(null);
  const focusZoneRef = useRef(false);
  const focusReplaceRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<ImageFileError | null>(null);
  // Muda a cada rejeição: o alerta é remontado e o mesmo erro é anunciado de novo.
  const [errorKey, setErrorKey] = useState(0);
  const labelId = useId();
  const hintId = useId();
  const errorId = useId();

  const accept = useCallback((file: File) => {
    const problem = validateImageFile(file);
    if (problem) {
      setError(problem);
      setErrorKey((key) => key + 1);
      return;
    }
    // A zona focada vai desmontar: o foco segue para "Trocar imagem". Colar ou
    // soltar com o foco em outro lugar não o tira de onde está.
    focusReplaceRef.current = document.activeElement === zoneRef.current;
    setError(null);
    setPreview(URL.createObjectURL(file));
  }, []);

  const clear = () => {
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
    focusZoneRef.current = true;
  };

  // Depois de "trocar imagem", o foco volta para a zona de envio; ao aceitar a
  // imagem pela zona, vai para "Trocar imagem".
  useEffect(() => {
    if (!preview && focusZoneRef.current) {
      focusZoneRef.current = false;
      zoneRef.current?.focus();
    }
    if (preview && focusReplaceRef.current) {
      focusReplaceRef.current = false;
      replaceRef.current?.focus();
    }
  }, [preview]);

  // Libera o blob anterior sempre que a prévia muda ou o componente desmonta.
  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  usePasteImage(accept);

  const dropHandlers = {
    onDragOver: (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    },
    onDragLeave: () => setIsDragging(false),
    onDrop: (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) accept(file);
    },
  };

  const frame = cn(
    "relative flex min-h-44 flex-col items-center justify-center gap-2",
    "rounded-[var(--radius-card)] border transition-colors duration-150",
    isDragging ? "border-accent bg-accent-soft" : "border-line-control bg-surface",
  );

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="w-full">
        {preview ? (
          <div className="flex flex-col items-center gap-3">
            <div {...dropHandlers} className={cn(frame, "w-full")}>
              <Image
                src={preview}
                alt={content.previewAlt}
                fill
                unoptimized
                className="rounded-[var(--radius-card)] object-contain p-3"
              />
            </div>
            <Button ref={replaceRef} variant="ghost" onClick={clear}>
              {content.replaceLabel}
            </Button>
          </div>
        ) : (
          <div
            ref={zoneRef}
            role="button"
            tabIndex={0}
            aria-labelledby={labelId}
            aria-describedby={error ? `${hintId} ${errorId}` : hintId}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                inputRef.current?.click();
              }
            }}
            {...dropHandlers}
            className={cn(frame, "cursor-pointer border-dashed px-6 py-10 hover:border-accent")}
          >
            <span id={labelId} className="text-[length:var(--text-body)] font-medium">
              {content.label}
            </span>
            <span id={hintId} className="text-sm text-ink-muted">
              {content.hint}
            </span>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) accept(file);
          }}
        />

        {/* sempre montada: a região só anuncia o que muda dentro dela */}
        <p role="status" className="sr-only">
          {preview ? content.acceptedMessage : ""}
        </p>

        {error && (
          <p key={errorKey} id={errorId} role="alert" className="mt-2 flex items-center gap-2 text-sm text-ink">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 4.5v4.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="11.25" r="0.9" fill="currentColor" />
            </svg>
            {content.errors[error]}
          </p>
        )}
      </div>

      <Button
        href={cta.href}
        size="lg"
        className={cn(
          preview && "w-full ring-2 ring-accent/40 ring-offset-2 ring-offset-void sm:w-auto sm:min-w-80",
        )}
      >
        {preview ? content.ctaWithImageLabel : cta.label}
      </Button>
    </div>
  );
}
