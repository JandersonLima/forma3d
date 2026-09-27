/** Serializa JSON-LD escapando `<`, para nenhum texto fechar o <script> antes da hora. */
export const serializeJsonLd = (data: Record<string, unknown>) =>
  JSON.stringify(data).replace(/</g, "\u003c");
