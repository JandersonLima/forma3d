import { appUrl } from "@/lib/site";
import type { HomeContent } from "./types";

/**
 * Todo o texto da home vive aqui. Nenhum componente deve conter string de conteúdo.
 * Os textos abaixo são placeholders originais — reescreva para a sua marca.
 * As imagens apontam para /public/images; troque pelos seus renders.
 */

export const home: HomeContent = {
  hero: {
    title: "Turn a render into a 3D model before your coffee gets cold",
    subtitle:
      "Upload a photo, a sketch or a description. You get a textured mesh, ready to open in Blender, drop into Unity or send to the printer.",
    dropzone: {
      label: "Drop an image to get started",
      hint: "Click, drag or paste with Ctrl+V — PNG, JPG or WebP up to 10 MB",
      previewAlt: "Preview of the uploaded image",
      replaceLabel: "Replace image",
      ctaWithImageLabel: "Generate a model from this image",
      acceptedMessage: "Image ready. Check the preview and generate your model.",
      errors: {
        type: "Unsupported format. Use PNG, JPG or WebP.",
        size: "File is over 10 MB. Shrink the image and try again.",
      },
    },
    ctaLabel: "Generate my first model",
    ctaHref: appUrl,
    showcaseLabel: "Examples: uploaded image and generated model",
    partnersLabel: "Partner companies",
    pauseLabel: "Pause animations",
    resumeLabel: "Resume animations",
  },

  // 6 itens: cada card mostra a entrada e o resultado, trocando no hover.
  showcase: [
    { label: "Game character", imageBefore: "/images/showcase/char-in.webp", imageAfter: "/images/showcase/char-out.webp", alt: "Character concept art and the 3D mesh generated from it" },
    { label: "3D printing", imageBefore: "/images/showcase/print-in.webp", imageAfter: "/images/showcase/print-out.webp", alt: "Photo of a miniature and the model split into printable parts" },
    { label: "Products & e-commerce", imageBefore: "/images/showcase/product-in.webp", imageAfter: "/images/showcase/product-out.webp", alt: "Product photo and its textured 3D version" },
    { label: "Industrial design", imageBefore: "/images/showcase/industrial-in.webp", imageAfter: "/images/showcase/industrial-out.webp", alt: "Product sketch and the 3D concept model" },
    { label: "Animation", imageBefore: "/images/showcase/anim-in.webp", imageAfter: "/images/showcase/anim-out.webp", alt: "Concept art and the character rigged and ready to animate" },
    { label: "Virtual reality", imageBefore: "/images/showcase/vr-in.webp", imageAfter: "/images/showcase/vr-out.webp", alt: "Reference scene and the assets optimized for VR" },
  ],

  partners: [
    { name: "Partner 1", src: "/images/logos/partner-1.svg" },
    { name: "Partner 2", src: "/images/logos/partner-2.svg" },
    { name: "Partner 3", src: "/images/logos/partner-3.svg" },
    { name: "Partner 4", src: "/images/logos/partner-4.svg" },
    { name: "Partner 5", src: "/images/logos/partner-5.svg" },
    { name: "Partner 6", src: "/images/logos/partner-6.svg" },
  ],

  modes: {
    eyebrow: "Two paths",
    title: "Sculpted detail or an engine-ready mesh",
    subtitle: "Pick based on where the model is going. The same upload feeds both.",
    items: [
      {
        id: "detail",
        name: "High detail",
        image: "/images/modes/high-detail.webp",
        alt: "3D model with a detailed surface and a high polygon count",
        bullets: ["Shape true to the reference", "Micro-detail on the surface", "Up to 2 million polygons"],
        title: "When every ridge matters",
        body: "Made for rendering, VFX, resin printing and product shots — work where you sculpt first and retopologize later.",
        ctaLabel: "Try high detail",
        ctaHref: appUrl,
      },
      {
        id: "mesh",
        name: "Clean mesh",
        image: "/images/modes/smart-mesh.webp",
        alt: "3D model with quad topology and tidy edge flow",
        bullets: ["Native quads", "Predictable edge flow", "500 to 25k polygons"],
        title: "Opens in your engine, no cleanup",
        body: "Clean topology and a polygon budget you control, for games, animation and headsets — no manual retopology pass.",
        ctaLabel: "Try clean mesh",
        ctaHref: appUrl,
      },
    ],
  },

  printing: {
    title: "From photo to print bed",
    subtitle: "A closed, hole-free model, already split into parts that fit your printer.",
    steps: [
      "Upload a photo, a sketch or a description",
      "The model is split into parts sized for your print bed",
      "Export to STL, 3MF or OBJ and send it to the slicer",
    ],
    highlightTitle: "No mesh repair before printing",
    highlightBody:
      "Segmentation fits the parts together within the build volume you set. The mesh comes out watertight, ready for your slicer.",
    image: "/images/printing/printer.webp",
    alt: "3D printer producing a model generated on the platform",
    ctaLabel: "Prepare for printing",
    ctaHref: appUrl,
    compatibleLabel: "Works with",
    compatible: [
      { name: "Slicer 1", src: "/images/logos/slicer-1.svg" },
      { name: "Slicer 2", src: "/images/logos/slicer-2.svg" },
      { name: "Slicer 3", src: "/images/logos/slicer-3.svg" },
    ],
  },

  games: {
    title: "Assets that go straight into your project",
    subtitle: "Export to GLB, FBX, OBJ or USD and import with no extra steps.",
    features: [
      { image: "/images/games/topology.webp", alt: "Low-poly mesh with quad topology", title: "Topology you control", body: "Set the polygon count and get a quad mesh with edge flow that holds up under deformation.", href: "/recursos/malha" },
      { image: "/images/games/rigging.webp", alt: "3D character with a skeleton applied", title: "Automatic rigging", body: "Humanoids and creatures come out rigged, with joints in the right places, ready to animate.", href: "/recursos/rigging" },
      { image: "/images/games/texturing.webp", alt: "3D model with a PBR texture set applied", title: "Full PBR textures", body: "Albedo, normal, metallic and roughness up to 8K — or a clean base color if your style is hand-painted.", href: "/recursos/textura" },
    ],
    enginesLabel: "Works with",
    enginesRegionLabel: "Supported engines",
    enginesPauseLabel: "Pause engines",
    enginesResumeLabel: "Resume engines",
    engines: [
      { name: "Engine 1", src: "/images/logos/engine-1.svg" },
      { name: "Engine 2", src: "/images/logos/engine-2.svg" },
      { name: "Engine 3", src: "/images/logos/engine-3.svg" },
      { name: "Engine 4", src: "/images/logos/engine-4.svg" },
      { name: "Engine 5", src: "/images/logos/engine-5.svg" },
      { name: "Engine 6", src: "/images/logos/engine-6.svg" },
    ],
    ctaLabel: "Start for free",
    ctaHref: appUrl,
  },

  industries: {
    title: "Teams already working this way",
    subtitle: "The same workflow serves very different teams. Find the one closest to yours.",
    prevLabel: "Previous industry",
    nextLabel: "Next industry",
    items: [
      { image: "/images/industries/media.webp", alt: "3D character in two versions: textured and clay", title: "Animation & film", body: "Concept art becomes a rigged character, ready for the first motion test.", href: "/solucoes/animacao" },
      { image: "/images/industries/ecommerce.webp", alt: "Office chair in several color variants for an online store", title: "E-commerce", body: "One product photo becomes a textured model shoppers can spin 360° on the page.", href: "/solucoes/ecommerce" },
      { image: "/images/industries/industrial.webp", alt: "Product prototype as a 3D concept model", title: "Industrial design", body: "Test volume and proportion before you open CAD.", href: "/solucoes/design-industrial" },
      { image: "/images/industries/xr.webp", alt: "Immersive scene viewed in a virtual reality headset", title: "VR & AR", body: "Scenes light enough to keep the frame rate steady on a headset.", href: "/solucoes/xr" },
    ],
  },

  social: {
    title: "X thousand creators, Y million models generated",
    reviewLabel: "Read reviews",
    reviewHref: "https://exemplo.com/avaliacoes",
    pauseLabel: "Pause testimonials",
    resumeLabel: "Resume testimonials",
    marqueeLabel: "Creator testimonials",
    // Placeholders. Substitua por depoimentos reais com autorização de uso.
    testimonials: [
      { avatar: "/images/avatars/01.webp", name: "First Last", role: "3D artist", quote: "Put a real testimonial here — short, with one concrete detail about the workflow." },
      { avatar: "/images/avatars/02.webp", name: "First Last", role: "Indie developer", quote: "Testimonials work best when they name the exact step that no longer has to be done by hand." },
      { avatar: "/images/avatars/03.webp", name: "First Last", role: "Product designer", quote: "Skip the superlatives. A number or a named tool beats 'amazing'." },
      { avatar: "/images/avatars/04.webp", name: "First Last", role: "3D printing engineer", quote: "Placeholder — replace before publishing." },
      { avatar: "/images/avatars/05.webp", name: "First Last", role: "Technical artist", quote: "Placeholder — replace before publishing." },
      { avatar: "/images/avatars/06.webp", name: "First Last", role: "Concept artist", quote: "Placeholder — replace before publishing." },
      { avatar: "/images/avatars/07.webp", name: "First Last", role: "Animator", quote: "Placeholder — replace before publishing." },
      { avatar: "/images/avatars/08.webp", name: "First Last", role: "AR developer", quote: "Placeholder — replace before publishing." },
      { avatar: "/images/avatars/09.webp", name: "First Last", role: "3D generalist", quote: "Placeholder — replace before publishing." },
    ],
  },

  gallery: {
    title: "Made on the platform",
    pauseLabel: "Pause gallery",
    resumeLabel: "Resume gallery",
    // 12 itens; cada uma das 3 esteiras mostra todos, em ordem rotacionada.
    models: Array.from({ length: 12 }, (_, i) => ({
      thumb: `/images/gallery/model-${String(i + 1).padStart(2, "0")}.webp`,
      name: `Model ${i + 1}`,
      href: `${appUrl}/galeria/modelo-${i + 1}`,
    })),
  },

  faq: {
    title: "Frequently asked questions",
    items: [
      { question: "How does it work?", answer: "Upload an image or type a description. In seconds you get a textured 3D mesh you can download and open in the software you already use." },
      { question: "Do I need to install anything?", answer: "No. Everything runs in the browser. There's also an API if you want to build generation into your own pipeline." },
      { question: "Which formats can I export?", answer: "GLB, FBX, OBJ and USD for 3D pipelines; STL and 3MF when the model is headed for a printer." },
      { question: "Can I use it in commercial projects?", answer: "Describe your usage license here and link to the terms of service." },
      { question: "Does it work from a sketch?", answer: "Yes. Photos, renders and drawings all work. Images from more than one angle tend to produce more accurate proportions." },
      { question: "How much does it cost?", answer: "Explain the free plan and the limits of each paid plan here." },
      { question: "Is it suitable for game development?", answer: "Yes — the clean mesh comes out in quads with a controlled polygon count and UV mapping, ready to import into your engine." },
      { question: "Are my files private?", answer: "Explain your privacy policy and how long uploads are kept here." },
    ],
  },

  features: {
    title: "All features",
    items: [
      { image: "/images/features/image-to-3d.webp", alt: "Image being converted into a 3D model", title: "Image to 3D", body: "Turn any photo or render into a model in one click.", href: "/recursos/imagem-para-3d" },
      { image: "/images/features/text-to-3d.webp", alt: "Text being converted into a 3D model", title: "Text to 3D", body: "Describe the object and get a first version to iterate on.", href: "/recursos/texto-para-3d" },
      { image: "/images/features/remesh.webp", alt: "Triangle mesh being converted into quads", title: "Retopology", body: "Convert triangulated meshes into clean quad topology.", href: "/recursos/retopologia" },
      { image: "/images/features/texturing.webp", alt: "Model receiving a high-resolution texture", title: "Texturing", body: "PBR sets up to 8K, ready for real-time rendering.", href: "/recursos/textura" },
      { image: "/images/features/segmentation.webp", alt: "3D model split into separate parts", title: "Segmentation", body: "Split the model into editable parts, with adjustable level of detail.", href: "/recursos/segmentacao" },
      { image: "/images/features/rigging.webp", alt: "Character with a skeleton and animation applied", title: "Rigging", body: "Automatic skeletons for humanoids and creatures.", href: "/recursos/rigging" },
    ],
  },

  finalCta: {
    title: "Start with your first model",
    body: "No learning curve, nothing to install. It takes less than a minute.",
    ctaLabel: "Create now",
    ctaHref: appUrl,
  },
};
