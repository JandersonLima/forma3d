import { appUrl } from "@/lib/site";
import type { NavigationContent } from "./types";

export const navigation: NavigationContent = {
  brand: { name: "Forma3D", href: "/" },

  announcement: null,

  headerNav: [
    {
      label: "Features",
      href: "/recursos",
      overviewLabel: "See all features",
      children: [
        { label: "Image to 3D", href: "/recursos/imagem-para-3d" },
        { label: "Text to 3D", href: "/recursos/texto-para-3d" },
        { label: "Retopology", href: "/recursos/retopologia" },
        { label: "Texturing", href: "/recursos/textura" },
        { label: "Segmentation", href: "/recursos/segmentacao" },
        { label: "Rigging", href: "/recursos/rigging" },
      ],
    },
    {
      label: "Solutions",
      href: "/solucoes",
      overviewLabel: "See all solutions",
      children: [
        { label: "3D printing", href: "/solucoes/impressao-3d" },
        { label: "Games", href: "/solucoes/jogos" },
        { label: "Animation", href: "/solucoes/animacao" },
        { label: "E-commerce", href: "/solucoes/ecommerce" },
        { label: "Industrial design", href: "/solucoes/design-industrial" },
        { label: "Education", href: "/solucoes/educacao" },
      ],
    },
    { label: "Gallery", href: "/galeria" },
    { label: "Pricing", href: "/planos" },
    { label: "Blog", href: "/blog" },
  ],

  headerCta: { label: "Start for free", href: appUrl },

  skipLinkLabel: "Skip to content",
  mobileMenuLabel: "Open menu",
  mobileMenuCloseLabel: "Close menu",
  mobileMenuTitle: "Navigation menu",
  localeSwitcher: {
    label: "Language",
    names: { "pt-BR": "Português", en: "English" },
  },
  copyright: "Forma3D. All rights reserved.",
};
