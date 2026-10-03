# Forma3D

Landing page de um gerador de modelos 3D por IA, em português e inglês. A estrutura e
os padrões de interação foram levantados a partir de `tripo3d.ai` (ver
`docs/01-analise-referencia.md`); o conteúdo, a marca e o visual são próprios.

Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS v4 e next-intl 4. Sem biblioteca de
animação: as esteiras e transições são CSS puro.

## Requisitos

- Node.js 20.9 ou mais novo, mínimo do Next 16 (desenvolvido no Node 24)
- npm

## Como rodar (Windows, PowerShell)

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Abre em http://localhost:3000 (pt-BR) e http://localhost:3000/en (inglês).

## Idiomas

| Idioma | URL | Conteúdo |
|---|---|---|
| Português (padrão) | `/` | `src/content/*.pt.ts` |
| Inglês | `/en` | `src/content/*.en.ts` |

O idioma muda só pela URL: não há detecção pelo navegador nem cookie. O seletor no
header leva à mesma página no outro idioma. Os componentes leem o conteúdo pelo ponto
único `@/content`; todo texto novo entra nos dois arquivos de idioma na mesma mudança.

## Variáveis de ambiente

Ficam em `.env.local` (modelo em `.env.example`).

| Variável | Para quê | Sem ela |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | origem pública do site: canonical, hreflang, sitemap, robots, JSON-LD e imagem de compartilhamento | `https://exemplo.com.br` |
| `NEXT_PUBLIC_APP_URL` | endereço do app (editor) usado pelos CTAs, pela galeria e pelo rodapé. Nunca recebe prefixo de idioma e abre na mesma aba, mesmo quando é absoluta | `/app` |
| `SITE_INDEXABLE` | libera buscadores no lançamento. Só o valor `true` libera. É só do servidor (sem `NEXT_PUBLIC`) e lida no build: mudar o valor exige novo deploy | bloqueado: `robots.txt` com `Disallow: /` e `noindex, nofollow` nas páginas de idioma |

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento em `localhost:3000` |
| `npm run build` | build de produção; rodar antes de cada commit, sem warning |
| `npm run start` | serve o build |
| `npm run lint` | ESLint (`eslint .`), com as regras do projeto (ex.: barra `next/link` e import direto de `*.pt.ts`/`*.en.ts`) |
| `npm run typecheck` | `tsc --noEmit` |

## Documentos

| Arquivo | Para quê |
|---|---|
| `CLAUDE.md` | referência atual: stack, regras, estrutura de pastas e comandos |
| `docs/02-design-system.md` | tokens de cor, tipografia, layout e movimento, e o piso de acessibilidade |
| `docs/04-auditoria.md` | auditoria da etapa 8, com o status de cada item |
| `docs/01-analise-referencia.md` | briefing original (planejamento, mantido como histórico) |
| `docs/03-plano-de-prompts.md` | plano de construção por etapas (planejamento, mantido como histórico) |

## Antes de publicar

- [ ] **Conteúdo e imagens placeholder (K3).** Substituir os números da prova social,
      os depoimentos (reais e com autorização), as respostas do FAQ (vão também para o
      JSON-LD), o link de avaliações, as redes sociais `sua-conta`, os nomes e SVGs dos
      logos, os modelos da galeria e todas as imagens de `public/images/`. Depois, rodar
      e confirmar que não sobra nenhuma ocorrência:
      ```powershell
      Select-String -Path src/content/*.ts -Pattern 'X mil|Nome Sobrenome|First Last|Placeholder|Descreva aqui|Explique aqui|exemplo\.com|sua-conta'
      ```
- [ ] **Links internos (K4).** Hoje só existem `/` e `/en`; os demais links da
      navegação, do rodapé e dos cards levam à 404. Para cada um: criar a página,
      apontar para o destino real ou retirar do conteúdo. Unificar os slugs dos cards
      com os da navegação.
- [ ] **Variáveis de ambiente** de produção com os domínios reais
      (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_URL`).
- [ ] **Liberar buscadores** no lançamento: `SITE_INDEXABLE=true` nas variáveis de
      produção da Vercel e novo deploy. Conferir `/robots.txt` com `Allow: /` e a home
      (`/` e `/en`) sem `noindex`.
- [x] **Revisar o `npm audit`.** Resolvido em 02/10/2026 (etapa 9) com Next 16.3.8 e
      next-intl 4.14.9: `found 0 vulnerabilities`. Rodar de novo antes de publicar.
      Nota: o next-intl 4.13+ marca `setRequestLocale` como depreciado (só no tipo; segue
      funcionando) em favor de `next/root-params`. Migrar exige `[locale]` como layout
      raiz, sem o `app/layout.tsx` repassador, o que muda a 404 global (regra 13 do
      `CLAUDE.md`); fica para uma etapa própria.
- [ ] `npm run typecheck`, `npm run lint` e `npm run build` passando sem warning, e
      `.next/server/app/pt-BR.html` e `en.html` gerados, cada um no seu idioma.
