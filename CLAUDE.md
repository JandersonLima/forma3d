# CLAUDE.md — contexto do projeto Forma3D

Este arquivo é lido automaticamente pelo Claude Code no início de cada sessão.
Mantenha-o curto e atualizado.

## O que é

Landing page de um gerador de modelos 3D por IA. A estrutura e os padrões de
interação são inspirados em `tripo3d.ai`; o conteúdo, a marca e o visual são
próprios. Ver `docs/01-analise-referencia.md`.

## Stack

- Next.js 15 (App Router, Server Components por padrão)
- TypeScript strict
- Tailwind CSS v4 (tokens em `@theme` dentro de `src/app/globals.css`)
- `next/image` para toda imagem — nunca `<img>`
- `next-intl` 3.x para pt-BR / en: pt-BR sem prefixo (`/`), en em `/en`; o
  idioma só muda pela URL (sem detecção, sem cookie). Config em `src/i18n/`.
- Sem biblioteca de animação: marquees e transições são CSS puro

## Regras não negociáveis

1. **Zero texto hardcoded em componente.** Todo conteúdo vem de `src/content/`.
   Se um componente precisa de uma string nova, adicione ao content file e passe por prop.
2. **Zero cor/espaçamento solto.** Só tokens do `@theme`. Se faltar token, crie um.
3. `"use client"` só onde há estado, evento ou hook — critério, não lista fechada.
   Hoje são 7:
   - `layout/HeaderScrollShell`: estado `scrolled` e listener de scroll (o
     `Header` em si é server e envolve seu conteúdo nele);
   - `layout/NavDropdown`: aberto/fechado, Esc, clique fora e saída do foco;
   - `layout/MobileDrawer`: estado, focus trap, trava de scroll e `inert` no resto;
   - `layout/LocaleSwitcher`: `useLocale` e `usePathname` para o href do outro idioma;
   - `ui/Dropzone`: estado, drag & drop, input de arquivo e colar;
   - `ui/MarqueePauseToggle`: estado pausado;
   - `ui/ScrollCarousel`: ref da trilha, estado das pontas e `scrollBy`.
   O showcase do hero troca antes/depois só com CSS e é server. O accordion do
   FAQ usa `<details>`/`<summary>` e também é server. Hooks (`usePasteImage`) não
   levam a diretiva. Todo o resto é server.
4. Um componente por arquivo, nomeado igual ao arquivo, export default.
5. Não copie textos, imagens ou logotipos do site de referência.
6. `prefers-reduced-motion: reduce` desliga todos os marquees.
7. Nada de `any`. Tipos ficam em `src/content/types.ts`.
8. Espaçamento vertical entre seções: cada `<section>` usa
   `py-[calc(var(--spacing-section)/2)]` (metade em cima, metade embaixo),
   nunca `py-[var(--spacing-section)]` inteiro — assim duas seções
   adjacentes somam exatamente um `--spacing-section` no encontro, em vez de
   dois tokens inteiros.
9. Toda seção da home usa `<Section id="…">` (`src/components/ui/Section.tsx`),
   nunca `<section>` cru. Ela aplica a regra 8 e `aria-labelledby` apontando
   para `sectionTitleId(id)` (`${id}-title`, em `src/lib/utils.ts`), que deve
   ir no título da seção (h1 do Hero, `SectionHeading id` nas demais).
10. **Conteúdo só pelo ponto único `@/content`** (`src/content/index.ts`).
    Nenhum arquivo fora de `src/content/` importa `*.pt.ts`/`*.en.ts` direto (o
    lint barra).
    - Server component: `const { home } = await getLocaleContent()`.
    - Layout, páginas, `generateMetadata` e imagem OG (têm o locale nos params):
      `getContent(locale)`.
    - Client component: recebe os textos por props, nunca importa conteúdo.
    - Todo arquivo de conteúdo existe nas duas línguas com o mesmo tipo e entra
      em `SiteContent` (`types.ts`) e no mapa de `index.ts`.
    - **Todo texto novo entra nos dois arquivos de idioma (`.pt.ts` e `.en.ts`)
      na mesma mudança** — em inglês de produto, não tradução literal.
11. **Link interno usa `Link` de `@/i18n/navigation`**, nunca `next/link` (o lint
    barra) — ele acrescenta o prefixo do idioma. Link externo continua `<a>`.
    - `NavLink` com `localized: false` sai como `<a>` comum, sem prefixo de idioma
      e na mesma aba (ex.: API e Editor no rodapé).
    - O app (`appUrl`/`isAppHref` em `src/lib/site.ts`) nunca leva prefixo:
      conteúdo usa `appUrl`, e Button/GalleryCard já saem com `<a>` para ele.
12. Toda página em `app/[locale]/` chama `setRequestLocale(locale)` para
    continuar estática.
13. A 404 global (`src/app/not-found.tsx`) não usa nada do next-intl (provider,
    `Link`, `getLocale`, `setRequestLocale`): ela entra na árvore de todas as
    rotas, e isso tira a home do pré-render ou fixa o idioma errado. Depois de
    mexer em layouts ou na 404, confira que `.next/server/app/pt-BR.html` e
    `en.html` existem e estão no idioma certo; o ● do build não basta.

## Estrutura

```
src/
  app/          layout.tsx (só repassa children; importa globals.css e as fontes),
                not-found.tsx (404 global, regra 13), globals.css, icon.svg,
                sitemap.ts, robots.ts
    og/[locale]/ route.tsx: imagem de compartilhamento, PNG estático por idioma
    [locale]/   layout (<html lang>, header, footer), page, not-found,
                [...rest] (404 localizada)
  assets/fonts/ TTF estáticos + licenças OFL usados só pela imagem OG
  i18n/         routing, navigation (Link, usePathname, getPathname), request,
                alternates (hreflang)
  middleware.ts next-intl
  components/
    layout/     AnnouncementBar, Header, HeaderScrollShell, NavDropdown,
                MobileDrawer, LocaleSwitcher, Footer
    sections/   seções da home na ordem da página: Hero, GenerationModes,
                PrintingSection, GameAssets, Industries, SocialProof, Gallery,
                Faq, FeatureGrid, FinalCta; partes delas: ShowcaseCard, ModeCard,
                GameFeatureRow, TestimonialCard, GalleryCard, FaqItem; e
                NotFoundMain (corpo das duas 404)
    ui/         Button, Container, Dropzone, ExternalLink (único target="_blank"),
                JsonLd, LinkCard, Marquee, MarqueePauseToggle, ScrollCarousel,
                Section, SectionHeading
  content/      index.ts (getContent, getLocaleContent), types.ts e
                {home,navigation,footer,seo,notFound}.{pt,en}.ts
  lib/          utils (cn, sectionTitleId, isExternalHref, rotate, validação de
                upload), site (siteUrl,
                appUrl, isAppHref, ogImagePath), theme (cores para onde CSS não
                chega), jsonLd (serializeJsonLd), fonts (next/font)
  hooks/        usePasteImage.ts
public/images/  placeholders (substituir antes de publicar)
```

## Comandos

```bash
npm run dev        # localhost:3000 (só o usuário roda)
npm run build      # obrigatório rodar antes de commitar
npm run lint       # ESLint CLI (eslint .), flat config em eslint.config.mjs
npm run typecheck  # tsc --noEmit
```

## Definição de pronto (cada seção)

- [ ] Render correto em 375px, 900px e 1440px
- [ ] `npm run build` passa sem warning
- [ ] Foco visível por teclado em todo elemento interativo
- [ ] Conteúdo vindo de `src/content/`
- [ ] Nenhum valor mágico de cor ou espaçamento

## Ordem de construção

Siga `docs/03-plano-de-prompts.md`. Uma seção por vez, build passando antes da próxima.

## Ambiente

Desenvolvimento é no Windows com PowerShell. Use comandos compatíveis
(`Copy-Item`, `Remove-Item`, `Move-Item`, `New-Item`, etc.) — nunca `cp`, `rm`,
`mv`, `mkdir -p` ou outra sintaxe bash.

Nunca rodar `npm run dev` em background; a verificação no navegador é manual.
O Claude roda apenas `typecheck`, `lint` e `build`.

O PowerShell é o 5.1: ao ler ou gravar arquivos por comando (Get-Content,
Set-Content, Out-File), use sempre -Encoding utf8, senão os acentos se
corrompem. Prefira as ferramentas de edição.

Python não está instalado; edite arquivos com as ferramentas de edição, não com scripts Python.

Nunca encadeie `npm run build` com `| Select-String` ou outro filtro no PowerShell; rode o build puro.

A ferramenta de edição converte sequências como \u003c no caractere correspondente ao
gravar; para escapes Unicode literais, edite com Node e confira os bytes.

Nunca deixe o shell dentro de .next: no Windows isso trava o build.
Use caminhos absolutos para inspecionar o build.
