import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Os configs do Next já ignoram .next/, out/, build/ e next-env.d.ts; o ESLint CLI
// varre a raiz inteira (o `next lint` só olhava src/).
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "next/link", message: "Use o Link de @/i18n/navigation — ele acrescenta o prefixo do idioma." },
          ],
          patterns: [
            {
              group: ["@/content/*", "!@/content/types"],
              message: "Conteúdo só via @/content: getLocaleContent() em server components, getContent(locale) com o locale em mãos.",
            },
          ],
        },
      ],
    },
  },
]);
