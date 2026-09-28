import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
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
];
