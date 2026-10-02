import { appUrl } from "@/lib/site";
import type { NavigationContent } from "./types";

export const navigation: NavigationContent = {
  brand: { name: "Forma3D", href: "/" },

  announcement: null,

  headerNav: [
    {
      label: "Recursos",
      href: "/recursos",
      overviewLabel: "Ver todos os recursos",
      children: [
        { label: "Imagem para 3D", href: "/recursos/imagem-para-3d" },
        { label: "Texto para 3D", href: "/recursos/texto-para-3d" },
        { label: "Retopologia", href: "/recursos/retopologia" },
        { label: "Texturização", href: "/recursos/textura" },
        { label: "Segmentação", href: "/recursos/segmentacao" },
        { label: "Rigging", href: "/recursos/rigging" },
      ],
    },
    {
      label: "Soluções",
      href: "/solucoes",
      overviewLabel: "Ver todas as soluções",
      children: [
        { label: "Impressão 3D", href: "/solucoes/impressao-3d" },
        { label: "Jogos", href: "/solucoes/jogos" },
        { label: "Animação", href: "/solucoes/animacao" },
        { label: "E-commerce", href: "/solucoes/ecommerce" },
        { label: "Design industrial", href: "/solucoes/design-industrial" },
        { label: "Educação", href: "/solucoes/educacao" },
      ],
    },
    { label: "Galeria", href: "/galeria" },
    { label: "Planos", href: "/planos" },
    { label: "Blog", href: "/blog" },
  ],

  headerCta: { label: "Começar sem custo", href: appUrl },

  skipLinkLabel: "Pular para o conteúdo",
  mobileMenuLabel: "Abrir menu",
  mobileMenuCloseLabel: "Fechar menu",
  mobileMenuTitle: "Menu de navegação",
  localeSwitcher: {
    label: "Idioma",
    names: { "pt-BR": "Português", en: "English" },
  },
  copyright: "Forma3D. Todos os direitos reservados.",
  externalLinkHint: "(abre em nova aba)",
  footerTitle: "Mapa do site",
  mainNavLabel: "Principal",
};
