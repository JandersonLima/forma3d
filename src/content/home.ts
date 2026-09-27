import type { HomeContent } from "./types";

/**
 * Todo o texto da home vive aqui. Nenhum componente deve conter string de conteúdo.
 * Os textos abaixo são placeholders originais — reescreva para a sua marca.
 * As imagens apontam para /public/images; troque pelos seus renders.
 */
const APP = process.env.NEXT_PUBLIC_APP_URL ?? "/app";

export const home: HomeContent = {
  hero: {
    title: "Seu render vira modelo 3D antes do café esfriar",
    subtitle:
      "Envie uma foto, um esboço ou uma descrição. Você recebe uma malha texturizada, pronta para abrir no Blender, no Unity ou na impressora.",
    dropzone: {
      label: "Solte uma imagem para começar",
      hint: "Clique, arraste ou cole com Ctrl+V — PNG, JPG ou WebP até 10 MB",
      previewAlt: "Pré-visualização da imagem enviada",
      replaceLabel: "Trocar imagem",
      ctaWithImageLabel: "Gerar modelo desta imagem",
      errors: {
        type: "Formato não aceito. Use PNG, JPG ou WebP.",
        size: "Arquivo acima de 10 MB. Reduza a imagem e tente de novo.",
      },
    },
    ctaLabel: "Gerar meu primeiro modelo",
    ctaHref: APP,
  },

  // 6 itens: cada card mostra a entrada e o resultado, trocando no hover.
  showcase: [
    { label: "Personagem de jogo", imageBefore: "/images/showcase/char-in.webp", imageAfter: "/images/showcase/char-out.webp", alt: "Concept art de personagem e a malha 3D gerada a partir dela" },
    { label: "Impressão 3D", imageBefore: "/images/showcase/print-in.webp", imageAfter: "/images/showcase/print-out.webp", alt: "Miniatura fotografada e o modelo dividido em peças para impressão" },
    { label: "Produto e e-commerce", imageBefore: "/images/showcase/product-in.webp", imageAfter: "/images/showcase/product-out.webp", alt: "Foto de produto e sua versão em 3D texturizada" },
    { label: "Design industrial", imageBefore: "/images/showcase/industrial-in.webp", imageAfter: "/images/showcase/industrial-out.webp", alt: "Esboço de produto e o modelo conceitual em 3D" },
    { label: "Animação", imageBefore: "/images/showcase/anim-in.webp", imageAfter: "/images/showcase/anim-out.webp", alt: "Arte conceitual e o personagem com esqueleto pronto para animar" },
    { label: "Realidade virtual", imageBefore: "/images/showcase/vr-in.webp", imageAfter: "/images/showcase/vr-out.webp", alt: "Cena de referência e os assets otimizados para VR" },
  ],

  partners: [
    { name: "Parceiro 1", src: "/images/logos/partner-1.svg" },
    { name: "Parceiro 2", src: "/images/logos/partner-2.svg" },
    { name: "Parceiro 3", src: "/images/logos/partner-3.svg" },
    { name: "Parceiro 4", src: "/images/logos/partner-4.svg" },
    { name: "Parceiro 5", src: "/images/logos/partner-5.svg" },
    { name: "Parceiro 6", src: "/images/logos/partner-6.svg" },
  ],

  modes: {
    eyebrow: "Dois caminhos",
    title: "Detalhe escultural ou malha pronta para engine",
    subtitle: "Escolha conforme o destino do modelo. O mesmo upload alimenta os dois.",
    items: [
      {
        id: "detail",
        name: "Alta definição",
        image: "/images/modes/high-detail.webp",
        alt: "Modelo 3D com superfície detalhada e alta contagem de polígonos",
        bullets: ["Estrutura fiel à referência", "Superfície com microdetalhe", "Até 2 milhões de polígonos"],
        title: "Quando cada relevo importa",
        body: "Indicado para render, VFX, impressão em resina e foto de produto — situações em que você esculpe primeiro e faz a retopologia depois.",
        ctaLabel: "Testar alta definição",
        ctaHref: APP,
      },
      {
        id: "mesh",
        name: "Malha limpa",
        image: "/images/modes/smart-mesh.webp",
        alt: "Modelo 3D com topologia em quadriláteros e fluxo de arestas organizado",
        bullets: ["Quadriláteros nativos", "Fluxo de arestas previsível", "De 500 a 25 mil polígonos"],
        title: "Abre na engine sem retrabalho",
        body: "Topologia limpa e contagem de polígonos sob seu controle, para jogos, animação e headsets — sem passar por retopologia manual.",
        ctaLabel: "Testar malha limpa",
        ctaHref: APP,
      },
    ],
  },

  printing: {
    title: "Da foto à mesa de impressão",
    subtitle: "Modelo fechado, sem furo e já fatiado em peças que cabem na sua impressora.",
    steps: [
      "Envie uma foto, um esboço ou uma descrição",
      "O modelo é dividido em peças do tamanho da sua mesa",
      "Exporte em STL, 3MF ou OBJ e mande fatiar",
    ],
    highlightTitle: "Sem reparo de malha antes de imprimir",
    highlightBody:
      "A segmentação encaixa as peças respeitando o volume de impressão que você informar. A malha sai estanque, pronta para o fatiador.",
    image: "/images/printing/printer.webp",
    alt: "Impressora 3D produzindo um modelo gerado na plataforma",
    ctaLabel: "Preparar para impressão",
    ctaHref: APP,
    compatibleLabel: "Compatível com",
    compatible: [
      { name: "Fatiador 1", src: "/images/logos/slicer-1.svg" },
      { name: "Fatiador 2", src: "/images/logos/slicer-2.svg" },
      { name: "Fatiador 3", src: "/images/logos/slicer-3.svg" },
    ],
  },

  games: {
    title: "Assets que entram direto no projeto",
    subtitle: "Exporte em GLB, FBX, OBJ ou USD e importe sem etapa intermediária.",
    features: [
      { image: "/images/games/topology.webp", alt: "Malha low-poly com topologia em quadriláteros", title: "Topologia sob controle", body: "Você define a contagem de polígonos e recebe uma malha em quads com fluxo de arestas utilizável em deformação.", href: "/recursos/malha" },
      { image: "/images/games/rigging.webp", alt: "Personagem 3D com esqueleto aplicado", title: "Esqueleto automático", body: "Humanoides e criaturas saem com rig pronto, com articulações no lugar certo para animar.", href: "/recursos/rigging" },
      { image: "/images/games/texturing.webp", alt: "Modelo 3D com conjunto de texturas PBR aplicado", title: "Textura PBR completa", body: "Albedo, normal, metallic e roughness em até 8K — ou base color limpa, se o seu estilo for pintado à mão.", href: "/recursos/textura" },
    ],
    enginesLabel: "Funciona com",
    engines: [
      { name: "Engine 1", src: "/images/logos/engine-1.svg" },
      { name: "Engine 2", src: "/images/logos/engine-2.svg" },
      { name: "Engine 3", src: "/images/logos/engine-3.svg" },
      { name: "Engine 4", src: "/images/logos/engine-4.svg" },
      { name: "Engine 5", src: "/images/logos/engine-5.svg" },
      { name: "Engine 6", src: "/images/logos/engine-6.svg" },
    ],
    ctaLabel: "Começar sem custo",
    ctaHref: APP,
  },

  industries: {
    title: "Quem já trabalha assim",
    subtitle: "O mesmo fluxo atende times bem diferentes. Veja o mais parecido com o seu.",
    prevLabel: "Setor anterior",
    nextLabel: "Próximo setor",
    items: [
      { image: "/images/industries/media.webp", alt: "Personagem 3D em duas versões: texturizada e em argila", title: "Animação e cinema", body: "Concept art vira personagem com rig, pronto para o primeiro teste de movimento.", href: "/solucoes/animacao" },
      { image: "/images/industries/ecommerce.webp", alt: "Cadeira de escritório em variações de cor para loja online", title: "E-commerce", body: "Uma foto do produto vira modelo texturizado para girar 360° na página.", href: "/solucoes/ecommerce" },
      { image: "/images/industries/industrial.webp", alt: "Protótipo de produto em modelo 3D conceitual", title: "Design industrial", body: "Teste volume e proporção antes de abrir o CAD.", href: "/solucoes/design-industrial" },
      { image: "/images/industries/xr.webp", alt: "Cena imersiva vista em headset de realidade virtual", title: "VR e AR", body: "Cenários leves o bastante para manter o frame rate estável no headset.", href: "/solucoes/xr" },
    ],
  },

  social: {
    title: "Mais de X mil criadores, Y milhões de modelos gerados",
    reviewLabel: "Ver avaliações",
    reviewHref: "https://exemplo.com/avaliacoes",
    externalHint: "(abre em nova aba)",
    pauseLabel: "Pausar depoimentos",
    resumeLabel: "Retomar depoimentos",
    // Placeholders. Substitua por depoimentos reais com autorização de uso.
    testimonials: [
      { avatar: "/images/avatars/01.webp", name: "Nome Sobrenome", role: "Artista 3D", quote: "Coloque aqui um depoimento real, curto, com um detalhe concreto do fluxo de trabalho." },
      { avatar: "/images/avatars/02.webp", name: "Nome Sobrenome", role: "Desenvolvedor indie", quote: "Depoimentos funcionam melhor quando citam a etapa exata que deixou de ser feita à mão." },
      { avatar: "/images/avatars/03.webp", name: "Nome Sobrenome", role: "Designer de produto", quote: "Evite superlativos. Um número ou um software citado vale mais que 'incrível'." },
      { avatar: "/images/avatars/04.webp", name: "Nome Sobrenome", role: "Engenheiro de impressão 3D", quote: "Placeholder — troque antes de publicar." },
      { avatar: "/images/avatars/05.webp", name: "Nome Sobrenome", role: "Artista técnico", quote: "Placeholder — troque antes de publicar." },
      { avatar: "/images/avatars/06.webp", name: "Nome Sobrenome", role: "Concept artist", quote: "Placeholder — troque antes de publicar." },
      { avatar: "/images/avatars/07.webp", name: "Nome Sobrenome", role: "Animador", quote: "Placeholder — troque antes de publicar." },
      { avatar: "/images/avatars/08.webp", name: "Nome Sobrenome", role: "Desenvolvedor AR", quote: "Placeholder — troque antes de publicar." },
      { avatar: "/images/avatars/09.webp", name: "Nome Sobrenome", role: "Generalista 3D", quote: "Placeholder — troque antes de publicar." },
    ],
  },

  gallery: {
    title: "Feito na plataforma",
    pauseLabel: "Pausar galeria",
    resumeLabel: "Retomar galeria",
    // 12 itens; cada uma das 3 esteiras mostra todos, em ordem rotacionada.
    models: Array.from({ length: 12 }, (_, i) => ({
      thumb: `/images/gallery/model-${String(i + 1).padStart(2, "0")}.webp`,
      name: `Modelo ${i + 1}`,
      href: `${APP}/galeria/modelo-${i + 1}`,
    })),
  },

  faq: {
    title: "Perguntas frequentes",
    items: [
      { question: "Como funciona?", answer: "Você envia uma imagem ou escreve uma descrição. Em segundos recebe uma malha 3D texturizada, que pode baixar e abrir no software que já usa." },
      { question: "Preciso instalar alguma coisa?", answer: "Não. Tudo roda no navegador. Há também uma API para quem quiser integrar a geração ao próprio fluxo." },
      { question: "Quais formatos posso exportar?", answer: "GLB, FBX, OBJ e USD para pipelines 3D; STL e 3MF quando o destino é impressão." },
      { question: "Dá para usar em projeto comercial?", answer: "Descreva aqui a sua licença de uso e aponte para os termos de serviço." },
      { question: "Funciona a partir de esboço?", answer: "Sim. Fotos, renders e desenhos funcionam. Imagens de mais de um ângulo tendem a gerar proporções mais fiéis." },
      { question: "Quanto custa?", answer: "Explique aqui o plano gratuito e os limites de cada plano pago." },
      { question: "Serve para desenvolvimento de jogos?", answer: "Sim — a malha limpa sai em quads com contagem de polígonos controlada e UV mapeado, pronta para importar na engine." },
      { question: "Meus arquivos ficam privados?", answer: "Explique aqui a política de privacidade e retenção dos uploads." },
    ],
  },

  features: {
    title: "Todos os recursos",
    items: [
      { image: "/images/features/image-to-3d.webp", alt: "Imagem sendo convertida em modelo 3D", title: "Imagem para 3D", body: "Qualquer foto ou render vira um modelo em um clique.", href: "/recursos/imagem-para-3d" },
      { image: "/images/features/text-to-3d.webp", alt: "Texto sendo convertido em modelo 3D", title: "Texto para 3D", body: "Descreva o objeto e receba a primeira versão para iterar.", href: "/recursos/texto-para-3d" },
      { image: "/images/features/remesh.webp", alt: "Malha triangular sendo convertida em quadriláteros", title: "Retopologia", body: "Converta malhas trianguladas em topologia limpa em quads.", href: "/recursos/retopologia" },
      { image: "/images/features/texturing.webp", alt: "Modelo recebendo textura em alta resolução", title: "Texturização", body: "Conjuntos PBR em até 8K, prontos para render em tempo real.", href: "/recursos/textura" },
      { image: "/images/features/segmentation.webp", alt: "Modelo 3D dividido em partes separadas", title: "Segmentação", body: "Separe o modelo em partes editáveis, com nível de detalhe ajustável.", href: "/recursos/segmentacao" },
      { image: "/images/features/rigging.webp", alt: "Personagem com esqueleto e animação aplicados", title: "Rigging", body: "Esqueleto automático para humanoides e criaturas.", href: "/recursos/rigging" },
    ],
  },

  finalCta: {
    title: "Comece pelo primeiro modelo",
    body: "Sem curva de aprendizado e sem instalar nada. Leva menos de um minuto.",
    ctaLabel: "Criar agora",
    ctaHref: APP,
  },
};
