# Plano de execução — prompts para o Claude Code

Uma etapa por sessão. Rode `npm run build` no fim de cada uma antes de seguir.
Cole os prompts abaixo literalmente no Claude Code, dentro da pasta do projeto.

---

## Etapa 0 — setup

```bash
npx create-next-app@latest forma3d --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd forma3d
npm i next-intl clsx
```

Depois copie para dentro do projeto recém-criado: `CLAUDE.md`, a pasta `docs/`,
`src/content/`, `src/lib/`, `src/hooks/` e `src/app/globals.css` deste scaffold.

---

## Etapa 1 — primeira sessão

> Leia o `CLAUDE.md` e todos os arquivos de `docs/` antes de escrever qualquer código.

---

## Etapa 2 — design system

> Leia `docs/02-design-system.md` e `src/app/globals.css`. Confirme que todos os tokens
> do documento existem no bloco `@theme`. Depois crie `src/components/ui/Container.tsx`,
> `Button.tsx` (variantes `primary` e `ghost`, tamanhos `md` e `lg`, renderiza `<a>` se
> receber `href`) e `SectionHeading.tsx` (eyebrow opcional, h2, parágrafo opcional).
> Todos server components, só tokens, sem valor solto.

---

## Etapa 3 — o Marquee (faça antes de qualquer seção)

> Crie `src/components/ui/Marquee.tsx`. Props: `children`, `direction` ('left' | 'right'),
> `speed` em segundos, `pauseOnHover` (default true), `gap`. Duplique o conteúdo 2x no DOM
> com `aria-hidden` na cópia. Animação em CSS puro com `translateX`, sem JS, sem lib.
> Desligue a animação em `prefers-reduced-motion: reduce` deixando a lista estática e
> com scroll horizontal manual. Crie uma página `/sandbox` temporária provando os dois
> sentidos e o pause no hover.

---

## Etapa 4 — Header, AnnouncementBar e Footer

> Implemente `src/components/layout/`. O Header é sticky, fundo transparente no topo e
> `--color-surface` com borda inferior após 24px de scroll (client component só para isso).
> Nav com dropdown de Recursos e Soluções, colapsando em drawer abaixo de 900px.
> O Footer lê `src/content/footer.ts` e renderiza as colunas via map — nenhuma coluna
> escrita à mão no JSX.

---

## Etapa 5 — Hero completo

> Construa `src/components/sections/Hero.tsx` com: (a) showcase de 6 cards em marquee,
> cada card com duas imagens sobrepostas e troca no hover; (b) H1 e subtítulo vindos de
> `content.hero`; (c) `Dropzone.tsx` aceitando clique, drag & drop e colar (Ctrl+V via
> listener no document — use `src/hooks/usePasteImage.ts`), com preview da imagem,
> validação de tipo e tamanho e estado de erro textual; (d) CTA; (e) marquee de parceiros.
> Só a Dropzone e o showcase são client.

---

## Etapa 6 — seções de conteúdo

Uma mensagem por seção, nesta ordem:

> Implemente `GenerationModes.tsx` — duas colunas, cada uma com imagem, 3 bullets, h3,
> parágrafo e CTA. Dados em `content.modes`.

> Implemente `PrintingSection.tsx` — 3 etapas numeradas (aqui a numeração é legítima:
> é sequência), imagem grande e faixa de logos compatíveis.

> Implemente `GameAssets.tsx` — 3 sub-features alternando imagem esquerda/direita,
> mais um marquee com os logos de engines de `content.engines`.

> Implemente `Industries.tsx` — carrossel horizontal com scroll-snap nativo
> (`overflow-x: auto; scroll-snap-type: x mandatory`) e setas em desktop.

> Implemente `SocialProof.tsx` — headline com números, selo de avaliação e 3 esteiras
> de depoimentos com direções alternadas e velocidades diferentes (40s / 55s / 48s).

> Implemente `Gallery.tsx` — 3 esteiras de cards de modelo, cada card com thumb,
> nome no hover e link.

> Implemente `Faq.tsx` — accordion acessível a partir de `content.faq`, e exporte o
> mesmo array como JSON-LD `FAQPage` dentro da própria seção Faq (não no `layout.tsx`).

> Implemente `FeatureGrid.tsx` (6 cards) e `FinalCta.tsx`.

---

## Etapa 7 — montagem, SEO e i18n

> Monte `src/app/page.tsx` na ordem de `docs/01-analise-referencia.md` seção 2.
> Preencha o `metadata` do `layout.tsx` com title, description, OpenGraph, Twitter,
> canonical e alternates. Adicione `app/sitemap.ts` e `app/robots.ts`.

> Configure `next-intl` com locales `pt-BR` (default, sem prefixo) e `en` (`/en`).
> Mova `src/content/home.ts` para `src/content/home.pt.ts` e `home.en.ts` mantendo os
> mesmos tipos. Adicione o seletor de idioma no Header.

---

## Etapa 8 — qualidade

> Rode o build e o lint. Depois audite: contraste AA em todo texto, foco visível em todo
> interativo, `alt` descritivo em toda imagem, nenhum layout shift no hero,
> `prefers-reduced-motion` respeitado. Liste o que encontrou antes de corrigir.

---

## Dicas de uso do Claude Code

- Abra a pasta no VS Code e rode `claude` no terminal integrado.
- `/init` na primeira vez faz ele ler o `CLAUDE.md`.
- Peça **uma seção por mensagem**. Prompt grande demais gera código raso.
- Use `#` para gravar uma decisão nova no `CLAUDE.md` no meio da sessão.
- `/clear` entre etapas mantém o contexto limpo e as respostas melhores.
