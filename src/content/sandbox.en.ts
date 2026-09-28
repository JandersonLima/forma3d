import type { SandboxContent } from "./types";

export const sandbox: SandboxContent = {
  buttonLabels: {
    primary: "Gerar modelo 3D",
    ghost: "Ver exemplos",
  },
  headings: {
    center: {
      eyebrow: "Design system",
      title: "Título de seção centralizado",
      description: "Usado em blocos de destaque, como o hero e o CTA final.",
    },
    left: {
      eyebrow: "Alinhado à esquerda",
      title: "Título de seção alinhado à esquerda",
      description: "Usado na maioria das seções de conteúdo da home.",
    },
  },
  marqueeTest: {
    eyebrow: "Marquee",
    title: "Esteiras de teste",
    description:
      "Valida o loop sem vão com poucos itens e o comportamento com muitos itens e cards maiores.",
    few: ["Alpha Studio", "Nimbus", "Vector Labs", "Órbita"],
    many: [
      "Alpha Studio",
      "Nimbus",
      "Vector Labs",
      "Órbita",
      "Prisma",
      "Quanta",
      "Estúdio Norte",
      "Fractal",
      "Lumen",
      "Meridiano",
      "Solaris",
      "Vértice",
    ],
    cards: [
      "Modelagem procedural",
      "Retopologia automática",
      "Texturas em 4K",
      "Exportação para engines",
      "Otimização de malha",
      "Preview em tempo real",
    ],
  },
};
