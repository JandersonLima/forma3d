# Auditoria — etapa 8 (parte 1)

Data: 29/09/2026 · Base: commit `287c255` · Next 15.5.26, next-intl 3.26.5, Tailwind 4.3.3.

Método: leitura de todo o `src/`, configs, scripts e docs, mais o HTML pré-renderizado
em `.next/server/app/` (`pt-BR.html`, `en.html`, `_not-found.html`). Contrastes
calculados pela fórmula de luminância relativa do WCAG 2.2 sobre os hex do `@theme`.
Nada foi corrigido: cada item traz a correção **proposta**.

Formato: `ID · severidade · título`, depois **Onde** (arquivo:linha), **Problema** e
**Correção**. Prefixos: **A** acessibilidade, **P** desempenho, **H** higiene,
**K** pendências conhecidas.

---

## 1. Acessibilidade

### 1.1 Contraste — tabela de pares usados

Luminâncias: void 0,0027 · surface 0,0072 · surface-2 0,0123 · accent-soft 0,0182 ·
line 0,0242 · line-strong 0,0559 · accent 0,1931 · accent-strong 0,2679 ·
ink-muted 0,3646 · ink 0,9036.

| Texto / elemento | Fundo | Razão | Mínimo | Onde | Resultado |
|---|---|---|---|---|---|
| ink | void | 18,08 | 4,5 | corpo, títulos | ✅ |
| ink | surface | 16,68 | 4,5 | cards, header rolado, gaveta | ✅ |
| ink | surface-2 | 15,32 | 4,5 | dropdown | ✅ |
| ink | accent-soft | 13,98 | 4,5 | número das etapas, dropzone arrastando | ✅ |
| ink-muted | void | 7,86 | 4,5 | subtítulos, rodapé, hint | ✅ |
| ink-muted | surface | 7,25 | 4,5 | cards, LocaleSwitcher rolado | ✅ |
| ink-muted | surface-2 | 6,66 | 4,5 | AnnouncementBar | ✅ |
| ink-muted | accent-soft | 6,08 | 4,5 | hint com arquivo sobre a zona | ✅ |
| ink | void/70 sobre imagem (pior caso: pixel branco → #525355) | 7,00 | 4,5 | legenda do showcase, nome na galeria | ✅ |
| accent | void | 4,61 | 4,5 | eyebrow, link de avaliações, hover da nav no topo | ✅ (folga mínima) |
| void | accent | 4,61 | 4,5 | Button primary | ✅ (folga mínima) |
| void | accent-strong | 6,03 | 4,5 | Button primary em hover | ✅ |
| accent-strong | void / surface / surface-2 | 6,03 / 5,56 / 5,11 | 4,5 | hovers | ✅ |
| **accent** | **surface** | **4,25** | 4,5 | hover da nav com header rolado; hover do "ver tudo" | ❌ A4 |
| **accent** | **surface-2** | **3,91** | 4,5 | "ver tudo" do dropdown; AnnouncementBar | ❌ A3, A5 |
| outline de foco (accent) | void / surface / surface-2 / accent-soft | 4,61 / 4,25 / 3,91 / 3,57 | 3 | `globals.css:81-85` | ✅ |
| borda line (1px) | void / surface | 1,41 / 1,31 | 3* | Button ghost, Dropzone, pausa, setas | ⚠️ A16 |
| logo placeholder (ink-muted a 70%) | void | 4,30 | isento (logotipo) | parceiros, engines, fatiadores | ℹ️ K3 |

\* WCAG 1.4.11 só exige 3:1 da borda quando ela é o que identifica o controle.

### A1 · Alta · Esteiras do hero e das engines sem controle de pausa (WCAG 2.2.2)
- **Onde:** `src/components/sections/Hero.tsx:20` (showcase) e `:41` (parceiros);
  `src/components/sections/GameAssets.tsx:35` (engines); `src/app/globals.css:166-171`
  (troca automática antes/depois em touch).
- **Problema:** conteúdo em movimento contínuo por mais de 5 s sem mecanismo de pausa.
  A pausa no hover não atende teclado nem touch, e `:focus-within` não ajuda porque
  essas esteiras não têm itens focáveis. Só Depoimentos e Galeria usam
  `MarqueePauseToggle`. A animação `showcase-swap` também não para com
  `[data-marquee-paused]`, que só pausa `.marquee__track`.
- **Correção:** envolver as duas esteiras do hero e a das engines em
  `MarqueePauseToggle` (textos novos de pausar/retomar em `home.pt.ts` e `home.en.ts`,
  tipados em `types.ts`) e estender a regra de `globals.css:128-130` para
  `[data-marquee-paused="true"] .showcase-card__after { animation-play-state: paused; }`.
- **Status:** ✅ resolvido em 01/10/2026. Um único `MarqueePauseToggle` no hero
  (showcase e parceiros, "Pausar animações" / "Pause animations") e outro nas engines
  ("Pausar engines" / "Pause engines"). A regra de pausa de `globals.css` também para
  `.showcase-card__after`.

### A2 · Alta · CTAs do app e cards da galeria abrem em nova aba, sem aviso, quando `NEXT_PUBLIC_APP_URL` é absoluta
- **Onde:** `src/components/ui/Button.tsx:35-41`; `src/components/sections/GalleryCard.tsx:24-30`.
- **Problema:** `isExternalHref` é testado antes de `isAppHref`. Com a URL do
  `.env.example` (`https://app...`), todo CTA (header, hero, modos, impressão, jogos,
  CTA final, gaveta) e os 36 cards da galeria saem com `target="_blank"`, sem nenhum
  aviso para leitor de tela (confirmado em `.next/server/app/en.html`). No rodapé, o
  mesmo destino ("Editor", `localized: false`) abre na mesma aba: comportamento
  inconsistente e contrário à regra 11 do CLAUDE.md.
- **Correção:** testar `isAppHref(href)` primeiro nos dois componentes: o app sai como
  `<a>` comum, na mesma aba. Só depois cai no ramo externo.
- **Status:** ✅ resolvido em 01/10/2026. `isAppHref` é testado primeiro em `Button` e
  `GalleryCard`. Conferido no HTML gerado com `NEXT_PUBLIC_APP_URL` absoluta: só os links
  externos de verdade (redes sociais, avaliações) saem com `target="_blank"`.

### A3 · Alta · Link "ver tudo" do dropdown com contraste 3,91:1
- **Onde:** `src/components/layout/NavDropdown.tsx:79`.
- **Problema:** `text-accent` sobre `bg-surface-2` fica em 3,91:1 (texto de 14px) e em
  4,25:1 no hover `bg-surface`. Os dois ficam abaixo do AA.
- **Correção:** `text-accent-strong` (5,11:1 em surface-2 e 5,56:1 em surface). Se
  preferir, crie um token semântico `--color-accent-text: var(--color-accent-strong)`
  para todo texto de acento sobre superfície.
- **Status:** ✅ resolvido em 01/10/2026. `text-accent-strong` no "ver tudo"
  (sem o token semântico).

### A4 · Média · Hover da navegação com contraste 4,25:1 com o header rolado
- **Onde:** `src/components/layout/Header.tsx:36`; `src/components/layout/NavDropdown.tsx:65`;
  fundo em `src/components/layout/HeaderScrollShell.tsx:25`.
- **Problema:** `hover:text-accent` passa no topo (sobre void, 4,61:1) e falha depois de
  24px de rolagem (sobre surface, 4,25:1).
- **Correção:** `hover:text-accent-strong` (6,03:1 e 5,56:1).
- **Status:** ✅ resolvido em 01/10/2026. `hover:text-accent-strong` em `Header` e
  `NavDropdown`.

### A5 · Média · AnnouncementBar com link em 3,91:1 (latente)
- **Onde:** `src/components/layout/AnnouncementBar.tsx:16` e `:20`, sobre o fundo de `:12`.
- **Problema:** `text-accent` sobre `bg-surface-2`. Hoje não aparece (`announcement: null`
  nos dois idiomas), mas falha no primeiro anúncio publicado.
- **Correção:** `text-accent-strong` e `hover:text-ink`.
- **Status:** ✅ resolvido em 01/10/2026, como proposto, nos dois ramos (`<a>` e `Link`).

### A6 · Média · Links que abrem nova aba sem aviso para leitor de tela
- **Onde:** `src/components/layout/Footer.tsx:21-24` (colunas com `external`) e `:52-56`
  (redes sociais: YouTube, Instagram, Discord, LinkedIn);
  `src/components/layout/AnnouncementBar.tsx:16`; `src/components/ui/Button.tsx:37`;
  `src/components/sections/GalleryCard.tsx:26`.
- **Problema:** só o link de avaliações (`SocialProof.tsx:24-32`) tem o aviso
  `externalHint`. Esse texto fica em `home.social`, então os componentes de layout não
  o alcançam.
- **Correção:** mover o texto para `navigation.{pt,en}.ts` (`externalLinkHint`,
  "(abre em nova aba)" / "(opens in a new tab)") e renderizar
  `<span className="sr-only"> {hint}</span>` em todo `<a target="_blank">`. Em
  server components, ler via `getLocaleContent()`. No Button, que também roda dentro do
  Dropzone (client), receber por prop opcional. Depois de A2, nenhum Button do conteúdo
  atual cai no ramo externo.
- **Status:** ✅ resolvido em 01/10/2026. Texto único em `navigation.{pt,en}.ts`
  (`externalLinkHint`). `home.social.externalHint` saiu. Novo `ui/ExternalLink.tsx` é o
  único lugar que monta `target="_blank"` e sempre acrescenta o `sr-only`. Ele é usado
  no rodapé (colunas e redes), na AnnouncementBar (prop `externalHint` vinda do layout), na
  SocialProof, no `Button` (prop opcional `externalHint`) e no `GalleryCard` (prop vinda da
  `Gallery`). No HTML gerado, os 5 `target="_blank"` de cada idioma trazem o aviso.

### A7 · Média · Títulos do rodapé em h3: salto h1→h3 na 404 e aninhamento errado na home
- **Onde:** `src/components/layout/Footer.tsx:16`.
- **Problema:** hierarquia verificada no HTML gerado:
  - **Home (pt-BR e en, idêntica):** h1 hero → h2 Modos (h3 ×2, com h4 cada) → h2 Impressão
    (h3) → h2 Jogos (h3 ×3) → h2 Setores (h3 ×4) → h2 Depoimentos → h2 Galeria → h2 FAQ
    (h3 ×8) → h2 Recursos (h3 ×6) → h2 CTA final → **h3 ×6 do rodapé**. Não há salto de
    nível, mas as colunas do rodapé ficam como subseções de "Comece pelo primeiro modelo".
  - **404 (pt-BR e en):** h1 "Página não encontrada" / "Page not found" → **h3 ×6 do
    rodapé**. Aqui há salto de h1 para h3.
- **Correção:** adicionar ao rodapé um `<h2 className="sr-only">` com texto novo em
  `navigation.{pt,en}.ts` (ex.: "Mapa do site" / "Site map") e manter as colunas em h3.
  Isso resolve as duas páginas sem mudar o visual.
- **Status:** ✅ resolvido em 01/10/2026, como proposto (`navigation.footerTitle`:
  "Mapa do site" / "Site map").

### A8 · Média · Dropzone: o `aria-label` apaga a instrução do leitor de tela
- **Onde:** `src/components/ui/Dropzone.tsx:111` (`aria-label`), `:122-123` (textos visíveis).
- **Problema:** o `aria-label` substitui o conteúdo do `role="button"`. O hint (formatos
  aceitos, limite de 10 MB, atalho Ctrl+V) nunca é anunciado.
- **Correção:** remover o `aria-label`, para que o nome venha do `<span>` do rótulo, e
  ligar o hint com `aria-describedby` (id via `useId`).
- **Status:** ✅ resolvido em 01/10/2026. Sem `aria-label`. A zona usa `aria-labelledby` no
  `<span>` do rótulo e `aria-describedby` no hint (e no erro, A20).

### A9 · Média · Dropzone: o foco se perde ao aceitar a imagem e o sucesso não é anunciado
- **Onde:** `src/components/ui/Dropzone.tsx:91-125`.
- **Problema:** a zona focada é desmontada quando a prévia aparece. O foco cai no
  `<body>`, e nada avisa que a imagem foi aceita. O caminho inverso ("Trocar imagem"
  devolvendo o foco à zona) já está tratado em `:52-58`.
- **Correção:** espelhar o `focusZoneRef`: ao aceitar, focar o botão "Trocar imagem"
  (ou o CTA) e anunciar o sucesso numa região `role="status"`. O texto novo vai em
  `DropzoneContent`, nos dois idiomas.
- **Status:** ✅ resolvido em 01/10/2026. `focusReplaceRef` leva o foco a "Trocar imagem"
  (o `Button` aceita `ref` no modo `<button>`), mas só quando a zona estava focada, para
  colar ou soltar com o foco em outro lugar não o mover. Uma região `role="status"` fica
  sempre montada e anuncia `acceptedMessage` ("Imagem pronta. Confira a pré-visualização e
  gere seu modelo." / "Image ready. Check the preview and generate your model.").

### A10 · Média · Header sticky pode cobrir o elemento focado (WCAG 2.4.11) e os alvos de âncora
- **Onde:** `src/app/globals.css:62-64`; altura em `src/components/layout/Header.tsx:17` (`h-16`).
- **Problema:** ao navegar com Shift+Tab ou por âncora (`#conteudo`, `#faq`…), o navegador
  alinha o elemento no topo da janela, embaixo dos 64px do header.
- **Correção:** criar o token `--spacing-header: 4rem`, usá-lo no `h-*` do header e em
  `html { scroll-padding-top: var(--spacing-header); }`.
- **Status:** ✅ resolvido em 01/10/2026, como proposto (`h-header` no `Header`).

### A11 · Média · Em reduced-motion, as esteiras viram scrollers que o teclado não alcança
- **Onde:** `src/app/globals.css:264-268`; `src/components/ui/Marquee.tsx:31-37`.
- **Problema:** com `overflow-x: auto`, esteiras sem item focável (showcase, parceiros,
  engines, depoimentos) só rolam por mouse ou toque. No Safari, a região rolável não
  recebe foco, e os depoimentos 2 a 9 ficam inalcançáveis por teclado. Chrome 130+ e
  Firefox tornam o scroller focável sozinhos.
- **Correção:** prop opcional `label` no Marquee. Quando presente, o `.marquee` ganha
  `role="region"`, `aria-label` e `tabIndex={0}`. Passar o rótulo, vindo do conteúdo,
  nas esteiras sem links. Alternativa só para logos: `flex-wrap: wrap` no bloco
  reduced-motion, o que elimina o scroll.
- **Status:** ✅ resolvido em 01/10/2026. Prop `label` no `Marquee`, passada no showcase,
  nos parceiros, nas engines e na 1ª faixa de depoimentos. Os rótulos vêm de `home.{pt,en}.ts`
  (`hero.showcaseLabel`, `hero.partnersLabel`, `games.enginesRegionLabel`,
  `social.marqueeLabel`). As faixas `aria-hidden`, a galeria e a sandbox ficam sem `label`.

### A12 · Média · 404 global sem `lang`, sem estilo e em inglês
- **Onde:** ausência de `src/app/not-found.tsx`; saída em `.next/server/app/_not-found.html`
  (`<html>` sem `lang`, título "404: This page could not be found.").
- **Problema:** URLs que o `matcher` do middleware ignora (qualquer caminho com ponto, por
  exemplo `/pagina.html`, ou `/images/inexistente.webp`) caem na 404 padrão do Next, fora
  do layout do idioma.
- **Correção:** seguir o padrão do next-intl: `src/app/layout.tsx` repassando `children`
  e `src/app/not-found.tsx` renderizando a 404 em pt-BR (com `<html lang="pt-BR">` e o
  `globals.css`), reutilizando o conteúdo de `notFound.pt.ts` via `getContent`.
- **Status:** ✅ resolvido em 01/10/2026. `src/app/layout.tsx` repassa `children` e importa
  `globals.css` e `@/lib/fonts`: importados só no `not-found`, o Next não envia esse CSS.
  As fontes saíram para `src/lib/fonts.ts`. `src/app/not-found.tsx` renderiza
  `<html lang="pt-BR">` com o mesmo `sections/NotFoundMain.tsx` da 404 do idioma.
  **Armadilha:** a 404 raiz entra na árvore de todas as rotas, então não pode tocar no
  next-intl (provider, `Link`, `getLocale`, `setRequestLocale`). Com o provider, a home
  deixou de gerar `pt-BR.html`/`en.html`, e o build seguia mostrando ●. Com
  `setRequestLocale("pt-BR")`, `/en` saiu em português. Por isso o botão usa
  `Button localized={false}`, um `<a>` comum. Conferido no build: `/_not-found` ○,
  `/[locale]` ● com os dois HTML gerados e cada um no seu idioma, e um único CSS com
  `@font-face` nas três páginas.

### A13 · Baixa · Dropdown: `aria-haspopup` anuncia menu e o painel não fecha quando o foco sai
- **Onde:** `src/components/layout/NavDropdown.tsx:53`; efeito em `:19-41`.
- **Problema:** `aria-haspopup="true"` equivale a `menu`, mas o padrão é *disclosure*
  (lista de links, sem setas). Ao sair com Tab, o painel continua aberto.
- **Correção:** remover `aria-haspopup`, adicionar `aria-controls` e fechar no `onBlur` do
  wrapper quando o `relatedTarget` estiver fora dele.
- **Status:** ✅ resolvido em 01/10/2026, como proposto. O painel agora fica sempre montado,
  com `hidden` quando fechado, para o `aria-controls` apontar para um id que existe.

### A14 · Baixa · `<nav>` principal sem nome
- **Onde:** `src/components/layout/Header.tsx:22`; `src/components/layout/MobileDrawer.tsx:134`.
- **Problema:** a página tem mais de uma navegação (principal e "Idioma"), e só a de idioma
  tem `aria-label`.
- **Correção:** `aria-label` vindo de `navigation.{pt,en}.ts` ("Principal" / "Main").
- **Status:** ✅ resolvido em 01/10/2026 (`navigation.mainNavLabel`, no header e na gaveta).

### A15 · Baixa · Heading dentro de `<summary>`
- **Onde:** `src/components/sections/FaqItem.tsx:11`.
- **Problema:** alguns leitores (VoiceOver) achatam o conteúdo do `summary` e não listam
  o h3 na navegação por títulos. NVDA/JAWS com Chrome listam.
- **Correção:** manter e registrar como trade-off conhecido. Não há marcação válida que
  ponha o `summary` dentro do heading.
- **Status:** ✅ registrado em 02/10/2026 como trade-off conhecido, sem mudança no código.
  Anotado na seção de acessibilidade do `docs/02-design-system.md`.

### A16 · Baixa · Limites de controles com 1,41:1
- **Onde:** `src/components/ui/Dropzone.tsx:85` e `:120`; `src/components/ui/Button.tsx:14`;
  `src/components/ui/MarqueePauseToggle.tsx:31`; `src/components/ui/ScrollCarousel.tsx:8`.
- **Problema:** a borda `line` é o único contorno visível desses controles. Nos botões, o
  texto ou ícone já identifica o controle. Na Dropzone, o alvo de soltar é delimitado só
  pela borda tracejada, e `line-strong` também não chega a 3:1 (2,01:1).
- **Correção:** criar o token `--color-line-control: #626a7a` (3,66:1 sobre void, 3,38:1
  sobre surface) e usá-lo pelo menos na borda da Dropzone.
- **Status:** ✅ resolvido em 01/10/2026. Token criado e usado na borda da Dropzone (zona e
  prévia). Os botões ficam como estão: o texto ou ícone já os identifica. O botão de pausa
  não tem mais borda em repouso.

### A17 · Baixa · Links do rodapé com 21px de altura
- **Onde:** `src/components/layout/Footer.tsx:17`, `:25`, `:30`, `:34`, `:56`.
- **Problema:** abaixo dos 24px do WCAG 2.5.8. Passam hoje só pela exceção de espaçamento
  (`gap-2`: 29px entre centros). Os demais alvos foram medidos e passam: nav 37px,
  seletor de idioma 29px, botões de 40 a 48px, FAQ 70px+, gaveta 40px+.
- **Correção:** `py-0.5` nos links, ou manter o `gap` e registrar a dependência da exceção.
- **Status:** ✅ resolvido em 01/10/2026. `inline-block py-0.5` (cerca de 25px) em todos os
  links do rodapé, numa constante `linkClass`.

### A18 · Baixa · Transições de cor/opacidade não desligadas em reduced-motion
- **Onde:** `src/components/layout/HeaderScrollShell.tsx:24`; `src/components/ui/Button.tsx:10`;
  `src/components/ui/LinkCard.tsx:31`; `src/components/sections/GalleryCard.tsx:8`;
  `src/app/globals.css:135` (`.gallery-card__name`); `src/components/ui/Dropzone.tsx:84`;
  `src/components/layout/LocaleSwitcher.tsx:34`; `src/components/ui/MarqueePauseToggle.tsx:31`;
  `src/components/ui/ScrollCarousel.tsx:8`; `src/components/sections/FaqItem.tsx:10`.
- **Problema:** o bloco `@media (prefers-reduced-motion: reduce)` (`globals.css:264-295`)
  cobre marquees, showcase, entrada do hero e `scroll-behavior`. O carrossel usa
  `behavior: "instant"` e o chevron do FAQ usa `motion-safe:`. As transições de cor e de
  opacidade continuam ativas. Não são movimento (WCAG 2.3.3), mas o pedido é cobertura
  total.
- **Correção:** uma regra no bloco reduced-motion:
  `*, *::before, *::after { transition-duration: 0s !important; }`.
- **Status:** ✅ resolvido em 01/10/2026, como proposto.

### A19 · Baixa · Gaveta mobile não torna o resto da página `inert`
- **Onde:** `src/components/layout/MobileDrawer.tsx:102-116`.
- **Problema:** o focus trap funciona (Tab cicla, Esc fecha, o foco volta ao gatilho) e
  `aria-modal` isola o diálogo na maioria dos leitores. Ainda assim, `main` e `footer`
  seguem navegáveis pelo cursor virtual em combinações mais antigas.
- **Correção:** aplicar `inert` em `main` e `footer` enquanto a gaveta estiver aberta, ou
  renderizar a gaveta em portal no `body` e usar `inert` nos irmãos.
- **Status:** ✅ resolvido em 01/10/2026. `inert` em `main` e `footer` enquanto a gaveta está
  aberta, removido no cleanup do efeito.

### A20 · Baixa · Erro da Dropzone sem associação e com a mesma cor do hint
- **Onde:** `src/components/ui/Dropzone.tsx:140-144`.
- **Problema:** o `role="alert"` anuncia a mensagem, mas ela não fica ligada à zona e
  aparece em `text-ink-muted`, igual ao hint. O mesmo erro repetido não é anunciado de novo.
- **Correção:** incluir o id do erro no `aria-describedby` da zona, diferenciar
  visualmente o erro com um ícone e `text-ink`, e limpar o erro antes de um novo
  `setError` para forçar o reanúncio.
- **Status:** ✅ resolvido em 01/10/2026. O id do erro entra no `aria-describedby`, com
  ícone de alerta e `text-ink`. Para o reanúncio, em vez de limpar e regravar o erro, um
  contador vira `key` do `<p role="alert">`, que é remontado a cada rejeição.

### A21 · Baixa · Outline de foco da galeria some sob a máscara das bordas
- **Onde:** `src/app/globals.css:94-100`.
- **Problema:** o `mask-image` apaga 6rem de cada lado. Um card focado na borda fica com
  o outline esmaecido.
- **Correção:** `.marquee:focus-within { mask-image: none; }`.
- **Status:** ✅ resolvido em 01/10/2026, como proposto. Também cobre o próprio `.marquee`
  focado como região (A11).

### A22 · Baixa · `<title>` da 404 sem o template do site e possivelmente duplicado
- **Onde:** `src/app/[locale]/not-found.tsx:18`.
- **Problema:** o `<title>` é içado pelo React 19 e sai sem "| Forma3D". O layout também
  emite o `title.default`, então pode haver dois `<title>` no `<head>` (a 404 é dinâmica;
  a confirmar em view-source de `/en/xyz`).
- **Correção:** conferir no navegador. Se houver duplicata, compor o texto com
  `seo.titleTemplate` e garantir um único título.
- **Status:** ✅ resolvido em 01/10/2026. Título único conferido no navegador pelo usuário.
  `NotFoundMain` compõe o título com `seo.titleTemplate` ("Página não encontrada | Forma3D"),
  nas duas 404.

### 1.2 O que foi verificado e está correto
- `lang` no `<html>` por idioma (`pt-BR` / `en`) e `lang`/`hrefLang` em cada opção do seletor.
- Skip link para `#conteudo` visível no foco, nas duas páginas.
- Landmarks: `header`, `main#conteudo`, `footer` e seções com `aria-labelledby` →
  `${id}-title` (um único h1 por página).
- `aria-current="page"` no idioma ativo; `aria-expanded` no dropdown, na gaveta e nos
  grupos da gaveta; setas com `aria-disabled` (continuam focáveis).
- Cópia do marquee com `aria-hidden` e `inert`; esteiras decorativas da galeria com
  `aria-hidden` e `inert`. Nas de depoimentos, só `aria-hidden`, que basta porque não há
  focáveis.
- Foco visível global (`:focus-visible`, 3,57:1 a 4,61:1), inclusive na Dropzone, no
  `summary`, nos cards e nas setas. Sem armadilha de foco fora da gaveta, onde ela é
  intencional e tem saída por Esc.
- `alt` de todas as imagens nos dois idiomas:

| Imagem | pt-BR / en | Situação |
|---|---|---|
| Showcase: resultado (6) | descrição do par entrada→resultado | ✅ |
| Showcase: entrada (6) | `alt=""` (o par está descrito no resultado) | ✅ |
| Modos (2), impressão (1), jogos (3), setores (4), recursos (6) | descritivos nos dois idiomas | ✅ |
| Prévia da Dropzone | "Pré-visualização da imagem enviada" / "Preview of the uploaded image" | ✅ |
| Avatares (9) | `alt=""` (nome ao lado) | ✅ |
| Miniaturas da galeria (12) | `alt=""` (nome é o texto do link) | ✅ (nomes placeholder, K3) |
| Logos: parceiros (6), engines (6), fatiadores (3) | "Parceiro N" / "Partner N" etc. | ⚠️ placeholder, K3 |
| Imagem OG | só pt-BR nos dois idiomas | ❌ K1 |

---

## 2. Desempenho

### 2.1 Layout shift
Nenhuma fonte de CLS encontrada:
- Todas as imagens com `fill` estão em caixa de proporção fixa (`aspect-[4/5]`,
  `[4/3]`, `[16/10]`, `[3/4]`, `aspect-square`) ou com `width`/`height` (logos 160×48,
  iguais ao `viewBox` dos SVGs; avatares 40×40).
- A entrada do hero anima só `opacity` e `transform`. O header muda só a cor, e a borda
  existe desde o SSR (`border-transparent`).
- Botão de pausa, setas do carrossel e Dropzone já vêm no HTML do servidor.
- Fontes: `next/font` auto-hospedado, `display: swap` e fallback com métricas ajustadas
  (`adjustFontFallback` padrão). Duas famílias variáveis, subset `latin` (cobre os
  acentos do pt-BR).

### 2.2 `priority` e `sizes` de cada `next/image`

| Componente | priority | sizes | Largura real | Situação |
|---|---|---|---|---|
| ShowcaseCard (entrada e resultado) | cards 0–1 (4 imagens) | `(min-width: 900px) 256px, 224px` | `w-56` / `md:w-64` | ✅ sizes; ⚠️ P1 |
| ModeCard | — | `(min-width:1200px) 560px, (min-width:900px) 50vw, 100vw` | 548px no desktop | ✅ |
| PrintingSection | — | idem | 528px | ✅ |
| GameFeatureRow | — | idem | 528px | ✅ |
| LinkCard em Industries | — | `(min-width: 540px) 27rem, 80vw` | `w-[80vw] max-w-[27rem]` | ✅ |
| LinkCard em FeatureGrid | — | `(min-width:1200px) 360px, … 33vw, … 50vw, 100vw` | 357px | ✅ |
| GalleryCard | — | `14rem` | `w-[14rem] max-w-[40vw]` | ⚠️ P2 |
| TestimonialCard (avatar) | — | — (40×40 fixo, srcset 1x/2x) | 40px | ✅ |
| Logos (Hero, Printing, GameAssets) | — | — (`unoptimized`, SVG) | `h-8` | ✅ |
| Prévia da Dropzone | — | — (`unoptimized`, blob) | — | ✅ |

### P1 · Baixa · `priority` também nas imagens de resultado do showcase
- **Onde:** `src/components/sections/Hero.tsx:22`; `src/components/sections/ShowcaseCard.tsx:26-33`.
- **Problema:** o HTML gera 4 `preload` (char-in, char-out, print-in, print-out). Em
  desktop, as de resultado ficam com `opacity: 0` até o hover e competem com as visíveis.
- **Correção:** `priority` só no `imageBefore`. O resultado dos primeiros cards fica com o
  lazy padrão.
- **Status:** ✅ resolvido em 02/10/2026. `pt-BR.html` e `en.html` saem com 2 preloads de
  imagem (char-in, print-in), não 4.

### P2 · Baixa · `sizes` da galeria superestima no mobile
- **Onde:** `src/components/sections/GalleryCard.tsx:17`.
- **Problema:** abaixo de 560px o card é limitado a `40vw` (150px em 375px), mas `sizes`
  pede 14rem (224px).
- **Correção:** `sizes="(min-width: 560px) 14rem, 40vw"`.
- **Status:** ✅ resolvido em 02/10/2026. Conferido no `pt-BR.html`.

### 2.3 Client components e motivo de cada um

| Arquivo | Motivo |
|---|---|
| `layout/HeaderScrollShell.tsx` | estado `scrolled` + listener de scroll |
| `layout/NavDropdown.tsx` | estado aberto/fechado, Esc e clique fora |
| `layout/MobileDrawer.tsx` | estado, focus trap, trava de scroll, fecha ao passar de 900px |
| `layout/LocaleSwitcher.tsx` | `useLocale` + `usePathname` para o href do outro idioma |
| `ui/Dropzone.tsx` | estado, drag & drop, input de arquivo, colar |
| `ui/MarqueePauseToggle.tsx` | estado pausado |
| `ui/ScrollCarousel.tsx` | ref da trilha, estado das pontas, `scrollBy` |
| `hooks/usePasteImage.ts` | hook (a diretiva `"use client"` no arquivo é desnecessária, H5) |

Todos se justificam. O showcase do hero, que a regra 3 do CLAUDE.md lista como client,
é server (troca 100% em CSS). Ver H9.

---

## 3. Higiene

### H1 · Média · `serializeJsonLd` não escapa nada
- **Onde:** `src/lib/jsonLd.ts:3`.
- **Problema:** a sequência `<` dentro de um literal de string JS já é
  interpretada como `<`, então o `replace` troca `<` por `<` mesmo.
  Um texto de FAQ com `</script>` fecharia a tag antes da hora. O conteúdo hoje é
  estático e confiável, então não há exposição ativa.
- **Correção:** `.replace(/</g, "\\u003c")`.
- **Status:** ✅ resolvido em 01/10/2026. Conferido com uma sonda temporária (`</script>`
  numa resposta do FAQ, já revertida): o `pt-BR.html` trouxe `\u003c/script>` dentro do
  JSON-LD e nenhum `</script>` literal antes do fechamento real da tag.

### H2 · Média · `scripts/placeholders.mjs` quebrado desde a etapa 7.2a
- **Onde:** `scripts/placeholders.mjs:11` e `:16`; `package.json:11`.
- **Problema:** importa `src/content/home.ts`, que virou `home.pt.ts`/`home.en.ts`. Mesmo
  corrigido o caminho, o Node não resolve o alias `@/lib/site` importado por
  `home.pt.ts`. `sharp` não está declarado; só existe como dependência opcional do Next.
- **Correção:** apontar para `home.pt.ts`, rodar com
  `node --import ./scripts/alias-loader.mjs` (hook de resolve `@/x` → `src/x.ts`; o
  Node 24 já remove os tipos) e declarar `sharp` em `devDependencies`. Se as imagens
  reais vierem logo, a alternativa é apagar o script e a entrada no `package.json`.
- **Status:** ✅ resolvido em 02/10/2026 pela alternativa: `scripts/placeholders.mjs` (e a
  pasta `scripts/`, que ficou vazia) e a entrada `placeholders` do `package.json` foram
  apagados. As imagens de `public/images/` continuam (K3).

### H3 · Média · Sandbox e tudo que só existe por causa dela
- **Onde:**
  - `src/app/[locale]/sandbox/page.tsx` (usa `<section>` cru e não tem h1; o próprio
    comentário em `:24-25` diz para remover quando as seções estiverem prontas, e elas estão);
  - `src/content/sandbox.pt.ts`, `src/content/sandbox.en.ts`;
  - `src/content/types.ts:131-145` (`SandboxContent`), `:211` (`SeoContent.sandbox`),
    `:232` (`SiteContent.sandbox`);
  - `src/content/index.ts:11-12`, `:26`, `:34`;
  - `src/content/seo.pt.ts:18`, `src/content/seo.en.ts:18`;
  - `src/app/robots.ts:6` (`disallow` que revela o caminho);
  - `src/app/sitemap.ts:6` (comentário);
  - `CLAUDE.md` (estrutura: `sandbox`, `{…,sandbox,…}.{pt,en}.ts`).
- **Correção:** apagar os arquivos e as referências acima numa única mudança, depois
  rodar `typecheck` e `build`. `docs/03` (etapa 3) fica como histórico.
- **Status:** ✅ resolvido em 02/10/2026, numa mudança só. A rota `/[locale]/sandbox` saiu
  do build e o `robots.txt` ficou só com `Allow: /`. Button, SectionHeading e Marquee
  continuam em uso pela home; nada neles existia só por causa da sandbox.

### H4 · Média · `next lint` obsoleto
- **Onde:** `package.json:9`; `eslint.config.mjs:1`.
- **Problema:** `next lint` está depreciado no Next 15.5 (o instalado é o 15.5.26) e sai no
  16. O config usa `@eslint/eslintrc`, que não está declarado; só vem transitivo.
- **Correção:** `"lint": "eslint ."` e `@eslint/eslintrc` em `devDependencies`. O flat
  config atual já serve.
- **Status:** ✅ resolvido em 02/10/2026. `@eslint/eslintrc@^3.3.7` declarado. O config
  precisou de duas mudanças: `ignores` para `.next/`, `out/`, `build/` e `next-env.d.ts`
  (o CLI varre a raiz inteira) e o array nomeado antes do `export default`
  (`import/no-anonymous-default-export`, que o `next lint` não via). Conferido com uma
  sonda temporária (já apagada): `next/link`, `@/content/home.pt` e `@/content/seo.en`
  deram 3 erros `no-restricted-imports`.

### H5 · Baixa · Código sem uso
- `chunkInto`: `src/lib/utils.ts:20-24`, nenhum uso.
- `redirect`: exportado em `src/i18n/navigation.ts:5`, nenhum uso.
- Prop `onFileAccepted`: `src/components/ui/Dropzone.tsx:18-22`, `:40`, `:42`; ninguém passa.
- Parâmetro `enabled` de `usePasteImage`: `src/hooks/usePasteImage.ts:9`; ninguém passa.
- `"use client"` em `src/hooks/usePasteImage.ts:1`: hook não precisa da diretiva.
- Token `--color-ok`: `src/app/globals.css:15`, nenhum uso (o doc 02 promete "sucesso do upload").
- `MAX_UPLOAD_BYTES` e `ACCEPTED_IMAGE_TYPES` exportados (`src/lib/utils.ts:6-7`), mas a
  lista é repetida à mão em `Dropzone.tsx:130` (`accept`). Usar `ACCEPTED_IMAGE_TYPES.join(",")`.
- `experimental.optimizePackageImports: ["clsx"]`: `next.config.ts:13` não tem efeito
  (clsx é um arquivo só).
- **Correção:** remover os itens acima, ou ligar `--color-ok` ao estado de sucesso de A9.
- **Status:** ✅ resolvido em 02/10/2026. Tudo removido, inclusive `--color-ok`; o `accept`
  da Dropzone usa `ACCEPTED_IMAGE_TYPES.join(",")`.

### H6 · Baixa · `.gitkeep` sobrando
- **Onde:** `src/components/layout/.gitkeep`, `src/components/sections/.gitkeep`.
- **Correção:** apagar. As pastas já têm arquivos.
- **Status:** ✅ resolvido em 02/10/2026.

### H7 · Baixa · Valores soltos
- Gaps das esteiras como string: `"1.5rem"` e `"3.5rem"` (`Hero.tsx:20`, `:41`;
  `GameAssets.tsx:35`), `"1rem"` (`SocialProof.tsx:37-45`, `Gallery.tsx:29-37`).
- Medidas de linha `max-w-[18ch]` e `max-w-[60ch]` em `Hero.tsx:27`, `:31`,
  `not-found.tsx:22`, `:25`, `SectionHeading.tsx:28` e `FaqItem.tsx:23`. O doc 02 diz
  65ch para corpo.
- `text-base` (escala padrão do Tailwind, não token do projeto) em `Button.tsx:19` e
  `Dropzone.tsx:122`; o token equivalente é `--text-body`.
- **Correção:** tokens `--measure-display`/`--measure-body` e gaps de esteira no `@theme`;
  trocar `text-base` por `text-[length:var(--text-body)]`.
- **Status:** ✅ resolvido em 02/10/2026. Tokens `--spacing-marquee-sm/md/lg` (1 / 1,5 /
  3,5rem) e `--measure-display`/`--measure-body` (18ch / 60ch, os valores de hoje; o 65ch
  do doc 02 fica para H9). A prop `gap` da Marquee virou `"sm" | "md" | "lg"`, com os
  nomes dos tokens escritos por extenso (o Tailwind só emite os que acha no código).

### H8 · Baixa · Arquivos de conteúdo importam uns aos outros
- **Onde:** `src/content/seo.pt.ts:1`, `src/content/seo.en.ts:1` (importam `navigation.*`).
- **Problema:** é legítimo dentro de `content/`, e o lint só barra de fora. Mas a regra 10
  diz "nenhum arquivo importa `*.pt.ts`/`*.en.ts` direto".
- **Correção:** ajustar a regra 10 do CLAUDE.md: "nenhum arquivo **fora de `src/content/`**".
- **Status:** ✅ resolvido em 02/10/2026 (CLAUDE.md e o comentário de `content/index.ts`).

### H9 · Documentação desatualizada

**README.md · Média**
- `:15-16`: diz "resto da página marcado com `TODO` em `src/app/page.tsx`". A página está
  completa em `src/app/[locale]/page.tsx`.
- `:35-42`: a lista "Já implementado neste scaffold" está defasada. Cita "JSON-LD de FAQ no
  `layout.tsx`", mas ele fica em `Faq.tsx`.
- `:46-48`: "`public/images/` está vazio" e "`src/content/home.ts`". As imagens
  placeholder existem, o conteúdo é `home.{pt,en}.ts` e há `npm run placeholders`.
- Faltam i18n (`/` e `/en`), `NEXT_PUBLIC_APP_URL`, os comandos `lint`/`typecheck` e o
  equivalente PowerShell do `cp` (`Copy-Item`).
- O checklist "Antes de publicar" deve incorporar K1–K4.

**CLAUDE.md · Média** (orienta toda sessão do Claude)
- Regra 3: os "casos previstos" (Dropzone, showcase, Header, seletor) não batem com o
  código. Os client reais são os 7 da tabela 2.3. O showcase é server, e quem é client é
  o `HeaderScrollShell`, não o Header.
- Estrutura: `layout/` omite `NavDropdown` e `HeaderScrollShell`. `ui/` lista `Accordion`
  (não existe; o FAQ usa `sections/FaqItem`) e omite `JsonLd`, `LinkCard`,
  `MarqueePauseToggle` e `ScrollCarousel`. `lib/` só cita `utils.ts`, mas há `site.ts`,
  `theme.ts` e `jsonLd.ts`. Falta `scripts/`. `sandbox` sai com H3.
- Comandos: falta `npm run placeholders` (se H2 mantiver o script).
- Regra 10: ver H8.

**docs/02-design-system.md · Baixa**
- `:61`: padding de 40px "≥1024px"; o código usa 900px (`Container.tsx:12`, `md:px-10`).
- `:55`: 65ch para corpo; o código usa 60ch (H7).
- Tabela de cor sem `accent-strong` e `line-strong`. Faltam `--container-card/quote/thumb`.
- `:28-29`: halo `radial-gradient` atrás do hero não implementado. `:63-64`: grid de 12
  colunas não usado. `--color-ok` sem uso (H5).
- `:86`: diz "contraste AA sobre void e surface". Registrar que `accent` só passa sobre
  void (A3–A5).
- A seção de acessibilidade não cita o `inert` das cópias nem o botão de pausa.

**docs/01-analise-referencia.md · Baixa**
- `:86` e `:88-100`: citam `src/content/home.ts` e o tipo `PrintStep[]` (não existe); as
  quantidades (18+ depoimentos, 30 modelos) diferem das implementadas (9 e 12).
- `:108-109`: `og.webp` dedicada e `og:locale:alternate`. O projeto gera a OG por
  `next/og` e não emite `og:locale:alternate`.
- **Correção:** nota no topo dizendo que o doc é o briefing original e apontando para
  `types.ts`.

**docs/03-plano-de-prompts.md · Baixa**
- Etapas 4 e 7 citam `src/content/footer.ts`, `src/app/page.tsx` e `home.ts` (caminhos
  anteriores ao i18n). Manter como histórico, com uma nota de que os caminhos atuais
  estão no CLAUDE.md.

**Status:** ✅ resolvido em 02/10/2026, sem mudança de código.
- **README:** reescrito. O que é o projeto, como rodar no PowerShell (`Copy-Item`), os
  dois idiomas, `NEXT_PUBLIC_SITE_URL` e `NEXT_PUBLIC_APP_URL` com fallback e efeito,
  tabela de comandos, mapa dos documentos e checklist "Antes de publicar" com K3 (e o
  `Select-String` de conferência), K4, variáveis de produção, revisão do `npm audit` e
  build final. Saíram o "scaffold", o `TODO` e o `public/images/` vazio.
- **CLAUDE.md:** regra 3 com os 7 client components reais e o motivo de cada um
  (showcase e Header são server; o client é o `HeaderScrollShell`). Estrutura completa:
  `app/layout.tsx` e `app/not-found.tsx`, `og/[locale]`, `assets/fonts`, `NavDropdown`,
  `HeaderScrollShell`, as partes das seções, `ExternalLink`, `JsonLd`, `LinkCard`,
  `MarqueePauseToggle`, `ScrollCarousel`, os 5 arquivos de `lib/` e `public/images/`; sem
  `Accordion`, `scripts/` e sandbox. Comandos com `lint` = `eslint .`. Regras 10–13
  intocadas (a 10 já tinha sido ajustada em H8).
- **docs/02:** tokens atuais, incluindo os das sessões 8.2a–8.2c (`line-control`,
  `text-xs`, `measure-*`, `spacing-header`, `spacing-marquee-*`) e os que faltavam
  (`accent-strong`, `line-strong`, `container-*`); sem `--color-ok`. Tabela de contraste
  com a regra de que `accent` só passa AA sobre void. Medidas reais: padding de 40px a
  partir de 900px, `--measure-body` 60ch (o 65ch saiu, ver H7), esteiras 40–66s, colunas
  reais em vez do grid de 12, sem o halo. Acessibilidade com `inert`, pausa, região
  focável, Dropzone, `ExternalLink`, gaveta e o trade-off A15.
- **docs/01 e docs/03:** nota no topo de cada um: documento de planejamento mantido como
  histórico, com o `CLAUDE.md` como referência atual. Corpo intocado.
- **Fora do relatório:** `npm audit` em 02/10/2026 aponta 3 itens (`postcss` interno do
  `next`, alta; `next-intl` ≤ 4.9.1 e `next`, moderadas), corrigíveis só com major (Next 16,
  next-intl 4). Nada foi atualizado; ficou como item do checklist do README.

---

## 4. Pendências conhecidas

### K1 · Média · `alt` da imagem OG em pt-BR nos dois idiomas
- **Onde:** `src/app/[locale]/opengraph-image.tsx:7-11`. Confirmado em `en.html`:
  `og:image:alt="Gerador de modelos 3D com IA"`.
- **Problema:** o `alt` exportado é estático e não recebe o locale.
- **Correção:** trocar a convenção de arquivo por um Route Handler estático (ex.:
  `src/app/og/[locale]/route.tsx` com `generateStaticParams` e `dynamic = "force-static"`),
  excluir `og` no `matcher` de `src/middleware.ts:9` e declarar
  `openGraph.images`/`twitter.images` com `alt: seo.home.title` no `generateMetadata` de
  `src/app/[locale]/page.tsx`. Confirmar no build que a rota continua ○/●.
- **Status:** ✅ resolvido em 02/10/2026. `src/app/og/[locale]/route.tsx` sai como ●
  (`/og/pt-BR`, `/og/en`, PNG gerado no build); caminho e medidas em `ogImagePath`/
  `ogImageSize` (`src/lib/site.ts`). `en.html`: `og:image:alt="AI 3D model generator"` e
  `og:image` → `/og/en`; `pt-BR.html` com o alt em pt e `/og/pt-BR`.

### K2 · Baixa · Fonte da imagem OG diferente da do site
- **Onde:** `src/app/[locale]/opengraph-image.tsx:27-55`.
- **Problema:** sem a opção `fonts`, o `ImageResponse` usa a fonte embutida (Noto Sans,
  peso único), e o `fontWeight: 700` vira negrito sintético. O site usa Space Grotesk e Inter.
- **Correção:** versionar os TTF estáticos (OFL) de Space Grotesk 600/700 e Inter 400 em
  `src/assets/fonts/`, ler com `readFile` e passar em `fonts`. Na mesma mudança, espelhar
  `theme.ts` se novas cores entrarem.
- **Status:** ✅ resolvido em 02/10/2026. TTF estáticos do Google Fonts com os `OFL-*.txt`
  em `src/assets/fonts/`: marca em Space Grotesk 700, título em 600 (como o h1 do site),
  descrição em Inter 400. Sem cor nova; `theme.ts` não mudou.

### K3 · Alta (bloqueia publicação) · Conteúdo e imagens placeholder
- Números da prova social "X mil / Y milhões": `home.pt.ts:137`, `home.en.ts:137`.
- Depoimentos "Nome Sobrenome" / "First Last" e textos-instrução: `home.*.ts:145-153`.
- Respostas de FAQ-instrução ("Descreva aqui…", "Explique aqui…"): `home.*.ts:175`,
  `:177`, `:179`. Elas também vão para o JSON-LD `FAQPage`.
- `reviewHref` `https://exemplo.com/avaliacoes`: `home.*.ts:139`.
- Redes sociais `sua-conta`: `footer.*.ts:67-70`.
- Logos: nomes "Parceiro/Engine/Fatiador N" (`home.*.ts:41-46`, `:96-98`, `:112-117`). Os
  SVGs têm o texto em pt ("Parceiro 1") embutido e aparecem assim também em `/en`.
- Galeria "Modelo N" / "Model N" e links `/app/galeria/modelo-N`: `home.*.ts:162-166`.
- Todas as imagens de `public/images/` (geradas por `scripts/placeholders.mjs`).
- Fallback `https://exemplo.com.br` em `src/lib/site.ts:2`; `.env.example` com `seudominio`.
- **Correção:** substituir antes de publicar e, depois, rodar
  `Select-String -Path src/content/*.ts -Pattern 'X mil|Nome Sobrenome|First Last|Placeholder|Descreva aqui|Explique aqui|exemplo\.com|sua-conta'`
  e confirmar que não sobra nenhuma ocorrência.

### K4 · Alta (bloqueia publicação) · Todos os links internos levam à 404
- **Onde:** `navigation.*.ts:12-38` e `footer.*.ts:9-62`; também os hrefs dos cards em
  `home.*.ts` (jogos, setores, recursos).
- **Problema:** só existem `/` e `/en`. `/recursos/*`, `/solucoes/*`, `/planos`, `/blog`,
  `/galeria`, `/integracoes/*`, `/sobre`, `/contato`, `/termos`, `/privacidade`, `/ajuda`,
  `/tutoriais` e `/api` caem na 404. Há ainda slugs usados só em cards, fora da nav
  (`/recursos/malha`, `/solucoes/xr`).
- **Correção:** decidir por página: criar, apontar para o destino real ou retirar do
  conteúdo. Unificar os slugs dos cards com os da nav.

---

## 5. Resumo por severidade

| Severidade | Itens |
|---|---|
| **Alta (5)** | A1 pausa das esteiras · A2 CTAs em nova aba · A3 contraste do dropdown · K3 placeholders · K4 links internos 404 |
| **Média (16)** | A4 · A5 · A6 · A7 · A8 · A9 · A10 · A11 · A12 · H1 · H2 · H3 · H4 · H9 README · H9 CLAUDE.md · K1 |
| **Baixa (18)** | A13 · A14 · A15 · A16 · A17 · A18 · A19 · A20 · A21 · A22 · P1 · P2 · H5 · H6 · H7 · H8 · H9 docs 01/02/03 · K2 |

Sem nenhum problema de layout shift, de `sizes` incorreto (fora P2), de hierarquia na
home nem de `alt` faltando.

## 6. Ordem proposta para as correções

Cada passo termina com `npm run typecheck`, `npm run lint` e `npm run build` passando.

1. **Correções pontuais de alto impacto, sem texto novo:** A2 (ordem `isAppHref`), A3 +
   A4 + A5 (`accent-strong`), H1 (escape do JSON-LD). ✅ 01/10/2026
2. **Movimento:** A1 (pausa no hero e nas engines, com textos pt/en novos) + A11 (região
   focável) + A18 + A21. Tudo mexe em `Marquee`/`globals.css`. ✅ 01/10/2026
3. **Textos de acessibilidade de layout, numa mudança só de conteúdo:** A6 (aviso de nova
   aba), A7 (h2 do rodapé), A14 (nome da nav). ✅ 01/10/2026
4. **Dropzone:** A8, A9, A20, A16 (token de borda) e, opcionalmente, `--color-ok` (H5).
   ✅ 01/10/2026 (sem `--color-ok`, que fica para H5)
5. **Navegação e página:** A10 (`--spacing-header` + `scroll-padding`), A13, A19, A17.
   ✅ 01/10/2026
6. **404:** A12 (not-found global) e A22. ✅ 01/10/2026
7. **Desempenho:** P1, P2. ✅ 02/10/2026
8. **Limpeza:** H3 (sandbox), H5, H6, H7, H8, H4 (`eslint .`), H2 (script). ✅ 02/10/2026
9. **Imagem OG:** K1, K2. ✅ 02/10/2026
10. **Documentação:** H9, por último, para refletir o código final; registro do A15.
    ✅ 02/10/2026
11. **Antes de publicar:** K3 e K4.

## 7. Fora da auditoria (sessão de 02/10/2026)

- **404 global com dois `<meta name="robots">`:** ✅ resolvido em 02/10/2026. O Next já
  põe `noindex` em toda resposta 404 (`NonIndex` em `app-render`); a cópia em
  `NotFoundMain` saiu. `_not-found.html` com uma só meta; nada do next-intl tocado (regra 13).
- **LCP amarelo e a entrada do h1:** investigado, sem mudança no código. O h1 começa em
  `opacity: 0`, e o Chrome só o registra como LCP no primeiro quadro com opacidade > 0.
  Falta a medição manual (depois de P1) para saber se o h1 é o elemento de LCP e quanto
  pesa o render delay. Correção proposta, se for: animar só o `transform` do h1
  (`hero-enter--rise`), mantendo o fade no subtítulo e na Dropzone.
  - **Medição em 02/10/2026** (Chrome, painel Performance, desktop, depois de P1): LCP
    0,24 s, CLS 0, INP 8 ms. O elemento de LCP é `img.object-cover` (imagem do
    showcase), não o h1. ✅ Encerrado: a animação de entrada do h1 fica como está, e a
    correção proposta acima não será aplicada.

## 8. Quadro-resumo (02/10/2026)

### Resolvidos nas sessões 8.2a a 8.2d

| ID | Severidade | Item | Status |
|---|---|---|---|
| A1 | Alta | Pausa das esteiras do hero e das engines | ✅ 01/10 |
| A2 | Alta | CTAs do app e galeria em nova aba | ✅ 01/10 |
| A3 | Alta | Contraste do "ver tudo" do dropdown | ✅ 01/10 |
| A4 | Média | Contraste do hover da nav com header rolado | ✅ 01/10 |
| A5 | Média | Contraste do link da AnnouncementBar | ✅ 01/10 |
| A6 | Média | Aviso de nova aba para leitor de tela | ✅ 01/10 |
| A7 | Média | h2 do rodapé (hierarquia de títulos) | ✅ 01/10 |
| A8 | Média | Dropzone: nome e instrução acessíveis | ✅ 01/10 |
| A9 | Média | Dropzone: foco e anúncio ao aceitar | ✅ 01/10 |
| A10 | Média | Header sticky cobrindo foco e âncoras | ✅ 01/10 |
| A11 | Média | Esteiras roláveis por teclado em reduced-motion | ✅ 01/10 |
| A12 | Média | 404 global com `lang`, estilo e pt-BR | ✅ 01/10 |
| A13 | Baixa | Dropdown como disclosure, fecha ao perder o foco | ✅ 01/10 |
| A14 | Baixa | Nome da `<nav>` principal | ✅ 01/10 |
| A15 | Baixa | Heading dentro de `<summary>` | ✅ 02/10, registrado como trade-off conhecido (sem mudança) |
| A16 | Baixa | Limite da Dropzone com 3:1 (`line-control`) | ✅ 01/10 |
| A17 | Baixa | Altura dos links do rodapé | ✅ 01/10 |
| A18 | Baixa | Transições desligadas em reduced-motion | ✅ 01/10 |
| A19 | Baixa | `inert` com a gaveta aberta | ✅ 01/10 |
| A20 | Baixa | Erro da Dropzone associado e reanunciado | ✅ 01/10 |
| A21 | Baixa | Outline da galeria sob a máscara | ✅ 01/10 |
| A22 | Baixa | `<title>` da 404 | ✅ 01/10 |
| P1 | Baixa | `priority` só nas imagens visíveis do showcase | ✅ 02/10 |
| P2 | Baixa | `sizes` da galeria no mobile | ✅ 02/10 |
| H1 | Média | Escape do JSON-LD | ✅ 01/10 |
| H2 | Média | Script de placeholders quebrado | ✅ 02/10 (removido) |
| H3 | Média | Sandbox | ✅ 02/10 (removida) |
| H4 | Média | `next lint` → `eslint .` | ✅ 02/10 |
| H5 | Baixa | Código sem uso | ✅ 02/10 |
| H6 | Baixa | `.gitkeep` sobrando | ✅ 02/10 |
| H7 | Baixa | Valores soltos → tokens | ✅ 02/10 |
| H8 | Baixa | Regra 10 e imports dentro de `content/` | ✅ 02/10 |
| H9 | Média / Baixa | README, CLAUDE.md, docs 01, 02 e 03 | ✅ 02/10 |
| K1 | Média | `alt` da imagem OG por idioma | ✅ 02/10 |
| K2 | Baixa | Fontes do site na imagem OG | ✅ 02/10 |

Fora do relatório, também encerrados: meta `robots` duplicada na 404 global e medição do
LCP (§7).

### Pendentes: dependem do Janderson (bloqueiam a publicação)

| ID | Severidade | Item | O que falta |
|---|---|---|---|
| K3 | Alta | Conteúdo e imagens placeholder | Fornecer textos, números, depoimentos autorizados, logos, redes e imagens reais; depois rodar o `Select-String` do K3 sem ocorrências |
| K4 | Alta | Links internos levam à 404 | Decidir cada destino (criar página, apontar ao real ou retirar) e unificar os slugs dos cards com a nav |
| — | — | Revisão do `npm audit` | ✅ 02/10, etapa 9: Next 16.3.8 + next-intl 4.14.9, 0 vulnerabilidades |

K3 e K4 estão no checklist "Antes de publicar" do `README.md`.
