import { navigation } from "./navigation.en";
import type { SeoContent } from "./types";

const siteName = navigation.brand.name;

export const seo: SeoContent = {
  siteName,
  titleTemplate: `%s | ${siteName}`,
  defaultTitle: `${siteName} — AI 3D model generator`,
  defaultDescription:
    "Turn photos, sketches or text descriptions into textured 3D models, ready for games, 3D printing and animation.",
  ogLocale: "en_US",
  home: {
    title: "AI 3D model generator",
    description:
      "Turn photos, sketches or text descriptions into textured 3D models, ready for games, 3D printing and animation. Nothing to install.",
  },
  app: { category: "DesignApplication", operatingSystem: "Web" },
};
