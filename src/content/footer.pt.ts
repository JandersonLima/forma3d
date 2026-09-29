import { appUrl } from "@/lib/site";
import type { FooterContent } from "./types";

export const footer: FooterContent = {
  columns: [
    {
      title: "Produto",
      links: [
        { label: "Editor", href: appUrl, localized: false },
        { label: "API", href: "/api", localized: false },
        { label: "Planos", href: "/planos" },
      ],
    },
    {
      title: "Recursos",
      links: [
        { label: "Imagem para 3D", href: "/recursos/imagem-para-3d" },
        { label: "Texto para 3D", href: "/recursos/texto-para-3d" },
        { label: "Retopologia", href: "/recursos/retopologia" },
        { label: "Texturização", href: "/recursos/textura" },
        { label: "Segmentação", href: "/recursos/segmentacao" },
        { label: "Rigging", href: "/recursos/rigging" },
      ],
    },
    {
      title: "Soluções",
      links: [
        { label: "Impressão 3D", href: "/solucoes/impressao-3d" },
        { label: "Jogos", href: "/solucoes/jogos" },
        { label: "Animação", href: "/solucoes/animacao" },
        { label: "E-commerce", href: "/solucoes/ecommerce" },
        { label: "Design industrial", href: "/solucoes/design-industrial" },
        { label: "Educação", href: "/solucoes/educacao" },
      ],
    },
    {
      title: "Integrações",
      links: [
        { label: "Blender", href: "/integracoes/blender" },
        { label: "Unity", href: "/integracoes/unity" },
        { label: "Unreal", href: "/integracoes/unreal" },
        { label: "Godot", href: "/integracoes/godot" },
        { label: "Maya", href: "/integracoes/maya" },
      ],
    },
    {
      title: "Conteúdo",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Tutoriais", href: "/tutoriais" },
        { label: "Galeria", href: "/galeria" },
        { label: "Central de ajuda", href: "/ajuda" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { label: "Sobre", href: "/sobre" },
        { label: "Contato", href: "/contato" },
        { label: "Termos de uso", href: "/termos" },
        { label: "Privacidade", href: "/privacidade" },
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
