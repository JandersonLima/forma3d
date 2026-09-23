# Análise da referência — tripo3d.ai/pt

Engenharia reversa da **estrutura, layout e padrões de interação** da home do Tripo 3D
(versão pt-BR), usada como briefing deste projeto.

> ⚠️ Escopo: replicamos **padrões estruturais e de layout**, não o conteúdo.
> Textos, imagens, logotipos, marca e depoimentos do site original são protegidos por
> direitos autorais. Todo o conteúdo aqui é placeholder próprio e deve ser substituído
> pelo seu antes de publicar.

---

## 1. Stack detectada no original

| Indício encontrado | Conclusão |
|---|---|
| Rotas `/_ipx/q_85&s_88x88/...` | **Nuxt 3 + @nuxt/image** (módulo IPX) |
| `?x-oss-process=image/resize,w_40/quality,q_85` | CDN **Alibaba OSS** com transformação on-the-fly |
| Prefixo de idioma `/pt`, `og:locale:alternate: vi_VN` | i18n por **subpath** (`/`, `/pt`, `/vi`…) |
| `cdn-blog.holymolly.ai` | assets de mídia em CDN separado do app |
| Footer vindo de `mc.config.navigation.footer.json` | footer **orientado a dados** (JSON remoto) |
| `.webp` em todo conteúdo, `.svg` nos logos | pipeline de imagem agressivo |

**Decisão para o clone:** Next.js 15 (App Router) + TypeScript + Tailwind v4.
Capacidade equivalente, muito melhor suportado pelo Claude Code, e o `next/image`
cumpre o mesmo papel do `@nuxt/image`.

---

## 2. Arquitetura de informação da home

Ordem exata das seções, de cima para baixo:

```
00  Announcement bar    faixa fina, 1 link, dispensável
01  Header              logo (mark + wordmark), nav, CTA, seletor de idioma
02  Hero
      02a Showcase      6 casos de uso em carrossel infinito;
                        cada card tem 2 imagens (entrada / resultado)
      02b H1 + subtítulo
      02c Dropzone      clique, arraste OU cole imagem
      02d CTA primário
      02e Marquee de parceiros (12 logos SVG, loop contínuo)
03  Dois modos          "Alta definição" vs "Malha inteligente"
                        2 colunas: imagem + 3 bullets + H3 + texto + CTA
04  Impressão 3D        3 etapas + imagem grande + logos de fatiadores
05  Assets para jogos   3 sub-features com imagem + marquee de 9 engines/DCC
06  Setores criativos   carrossel horizontal de 4 cards
07  Prova social        H2 com números + selo Trustpilot
                        + 3 esteiras de depoimentos em direções alternadas
08  Galeria             3 esteiras horizontais de cards de modelo (10 cada)
09  FAQ                 8 perguntas em accordion
10  Explore mais        grid de 6 cards de recurso
11  CTA final           H2 + parágrafo + botão
12  Footer mega         6 colunas de links, redes, selos, ISO, contatos
```

---

## 3. Os 4 padrões que dão a "cara" do site

Se você não implementar estes quatro, o clone vira uma landing page genérica.

**1. Marquee infinito — usado 5x na página**
Lista duplicada 2–3x no DOM + `translateX` em `@keyframes`, pausando no hover.
Aparece em: parceiros, engines, setores, depoimentos e galeria.
→ Um único componente `<Marquee>` resolve os cinco casos.

**2. Card antes/depois no showcase do hero**
Cada card tem duas imagens sobrepostas; a segunda aparece no hover (ou em rotação
automática no mobile). Comunica "entrada → resultado" sem texto.

**3. Dropzone com três formas de entrada**
`onClick` (file picker), `onDrop` (arrastar) e `onPaste` (Ctrl+V capturado no
`document`). O terceiro quase ninguém implementa e é o mais usado na prática.

**4. Esteiras de depoimento com direções alternadas**
Linha 1 → esquerda, linha 2 → direita, linha 3 → esquerda, velocidades levemente
diferentes. É isso que cria a sensação de "parede viva" em vez de slider.

---

## 4. Contrato de dados por seção

O original monta quase tudo a partir de JSON. Vamos fazer igual: todo texto fica em
`src/content/home.ts`, zero texto hardcoded em componente.

| Seção | Tipo | Campos |
|---|---|---|
| Showcase | `ShowcaseItem[]` | `label, imageBefore, imageAfter, alt` |
| Parceiros | `Logo[]` | `name, src` |
| Modos | `GenerationMode[]` | `name, image, bullets[], title, body, ctaHref` |
| Impressão | `PrintStep[]` | `title` + bloco de destaque |
| Jogos | `GameFeature[]` | `image, title, body, href` |
| Setores | `Industry[]` | `image, alt, title, body, href` |
| Depoimentos | `Testimonial[]` | `avatar, name, role, quote` (18+ itens) |
| Galeria | `GalleryModel[]` | `thumb, name, href` (30 itens / 3 linhas) |
| FAQ | `FaqItem[]` | `question, answer` |
| Recursos | `Feature[]` | `image, title, body, href` |
| Footer | `FooterColumn[]` | `title, links[{label, href, external}]` |

---

## 5. SEO — a técnica vale copiar

- `<title>` com proposta de valor + palavra-chave principal
- `meta description` de ~155 caracteres começando com verbo de ação
- OG + Twitter card completos, com imagem `og.webp` dedicada
- `canonical` por idioma + `og:locale:alternate` para cada idioma
- JSON-LD: `SoftwareApplication` e `FAQPage` (alimentado pelo mesmo array do accordion)
- `sitemap.xml` e `robots.txt` gerados pelo framework

---

## 6. O que **não** copiar

- Textos, títulos e respostas de FAQ → reescrever do zero
- Imagens, renders, avatares e logotipos → placeholders ou assets próprios
- A marca, a paleta exata e os depoimentos nominais
- Nomes de features registrados

O resultado é um site com a mesma **qualidade estrutural** e identidade própria.
