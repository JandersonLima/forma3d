import type { ReactNode } from "react";
import "@/lib/fonts";
import "./globals.css";

/**
 * Padrão do next-intl: o <html> fica em [locale]/layout.tsx. Este layout só existe
 * para a 404 global (not-found.tsx), que precisa de um layout raiz acima dela.
 * O CSS (globals e @font-face) é importado aqui: importado só no not-found, o Next
 * não o envia.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
