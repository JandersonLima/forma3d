import { useEffect } from "react";

/**
 * Captura Ctrl+V / Cmd+V no documento e entrega o primeiro arquivo de imagem colado.
 * É a terceira forma de entrada da dropzone e a mais usada na prática.
 */
export function usePasteImage(onImage: (file: File) => void) {
  useEffect(() => {
    function handlePaste(event: ClipboardEvent) {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.kind !== "file" || !item.type.startsWith("image/")) continue;
        const file = item.getAsFile();
        if (file) {
          event.preventDefault();
          onImage(file);
          return;
        }
      }
    }

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [onImage]);
}
