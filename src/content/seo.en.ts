import { navigation } from "./navigation.en";
import type { SeoContent } from "./types";

const siteName = navigation.brand.name;

export const seo: SeoContent = {
  siteName,
  titleTemplate: `%s | ${siteName}`,
  defaultTitle: `${siteName} — gerador de modelos 3D com IA`,
  defaultDescription:
    "Transforme fotos, esboços ou descrições em modelos 3D texturizados, prontos para jogos, impressão 3D e animação.",
  ogLocale: "pt_BR",
  home: {
    title: "Gerador de modelos 3D com IA",
    description:
      "Transforme fotos, esboços ou descrições em modelos 3D texturizados e prontos para jogos, impressão 3D e animação. Sem instalar nada.",
  },
  sandbox: { title: "Sandbox do design system" },
  app: { category: "DesignApplication", operatingSystem: "Web" },
};
