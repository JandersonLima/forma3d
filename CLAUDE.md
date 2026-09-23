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
- `next-intl` para pt-BR / en (rota com prefixo: `/`, `/en`)
- Sem biblioteca de animação: marquees e transições são CSS puro

## Regras não negociáveis

1. **Zero texto hardcoded em componente.** Todo conteúdo vem de `src/content/`.
   Se um componente precisa de uma string nova, adicione ao content file e passe por prop.
2. **Zero cor/espaçamento solto.** Só tokens do `@theme`. Se faltar token, crie um.
3. `"use client"` só onde há estado, evento ou hook — critério, não lista fechada.
   Casos previstos: Dropzone, showcase do hero, Header (efeito de scroll) e
   seletor de idioma. O accordion do FAQ usa `<details>`/`<summary>` e continua
   server component. Todo o resto é server.
4. Um componente por arquivo, nomeado igual ao arquivo, export default.
5. Não copie textos, imagens ou logotipos do site de referência.
6. `prefers-reduced-motion: reduce` desliga todos os marquees.
7. Nada de `any`. Tipos ficam em `src/content/types.ts`.
8. Espaçamento vertical entre seções: cada `<section>` usa
   `py-[calc(var(--spacing-section)/2)]` (metade em cima, metade embaixo),
   nunca `py-[var(--spacing-section)]` inteiro — assim duas seções
   adjacentes somam exatamente um `--spacing-section` no encontro, em vez de
   dois tokens inteiros.

## Estrutura

```
src/
  app/          layout, page, globals.css, sitemap, robots
  components/
    layout/     Header, Footer, AnnouncementBar
    sections/   uma seção da home por arquivo, na ordem da página
    ui/         Button, Marquee, Container, SectionHeading, Accordion, Dropzone
  content/      home.ts (dados), footer.ts, types.ts
  lib/          utils.ts
  hooks/        usePasteImage.ts
```

## Comandos

```bash
npm run dev      # localhost:3000
npm run build    # obrigatório rodar antes de commitar
npm run lint
npm run typecheck
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
