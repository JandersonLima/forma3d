import { appUrl } from "@/lib/site";
import type { FooterContent } from "./types";

export const footer: FooterContent = {
  columns: [
    {
      title: "Product",
      links: [
        { label: "Editor", href: appUrl, localized: false },
        { label: "API", href: "/api", localized: false },
        { label: "Pricing", href: "/planos" },
      ],
    },
    {
      title: "Features",
      links: [
        { label: "Image to 3D", href: "/recursos/imagem-para-3d" },
        { label: "Text to 3D", href: "/recursos/texto-para-3d" },
        { label: "Retopology", href: "/recursos/retopologia" },
        { label: "Texturing", href: "/recursos/textura" },
        { label: "Segmentation", href: "/recursos/segmentacao" },
        { label: "Rigging", href: "/recursos/rigging" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "3D printing", href: "/solucoes/impressao-3d" },
        { label: "Games", href: "/solucoes/jogos" },
        { label: "Animation", href: "/solucoes/animacao" },
        { label: "E-commerce", href: "/solucoes/ecommerce" },
        { label: "Industrial design", href: "/solucoes/design-industrial" },
        { label: "Education", href: "/solucoes/educacao" },
      ],
    },
    {
      title: "Integrations",
      links: [
        { label: "Blender", href: "/integracoes/blender" },
        { label: "Unity", href: "/integracoes/unity" },
        { label: "Unreal", href: "/integracoes/unreal" },
        { label: "Godot", href: "/integracoes/godot" },
        { label: "Maya", href: "/integracoes/maya" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Tutorials", href: "/tutoriais" },
        { label: "Gallery", href: "/galeria" },
        { label: "Help center", href: "/ajuda" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/sobre" },
        { label: "Contact", href: "/contato" },
        { label: "Terms of use", href: "/termos" },
        { label: "Privacy", href: "/privacidade" },
      ],
    },
  ],

  socialLinks: [
    { label: "YouTube", href: "https://youtube.com/@sua-conta", external: true },
    { label: "Instagram", href: "https://instagram.com/sua-conta", external: true },
    { label: "Discord", href: "https://discord.gg/sua-conta", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/company/sua-conta", external: true },
  ],
};
