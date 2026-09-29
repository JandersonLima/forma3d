import type { SandboxContent } from "./types";

export const sandbox: SandboxContent = {
  buttonLabels: {
    primary: "Generate 3D model",
    ghost: "See examples",
  },
  headings: {
    center: {
      eyebrow: "Design system",
      title: "Centered section heading",
      description: "Used in highlight blocks, such as the hero and the final CTA.",
    },
    left: {
      eyebrow: "Left-aligned",
      title: "Left-aligned section heading",
      description: "Used in most content sections on the home page.",
    },
  },
  marqueeTest: {
    eyebrow: "Marquee",
    title: "Test tracks",
    description:
      "Checks the seamless loop with few items and the behavior with many items and larger cards.",
    few: ["Alpha Studio", "Nimbus", "Vector Labs", "Orbit"],
    many: [
      "Alpha Studio",
      "Nimbus",
      "Vector Labs",
      "Orbit",
      "Prisma",
      "Quanta",
      "North Studio",
      "Fractal",
      "Lumen",
      "Meridian",
      "Solaris",
      "Vertex",
    ],
    cards: [
      "Procedural modeling",
      "Automatic retopology",
      "4K textures",
      "Export to engines",
      "Mesh optimization",
      "Real-time preview",
    ],
  },
};
