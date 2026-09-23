# Forma3D

Landing page de gerador de modelos 3D por IA. A estrutura e os padrões de interação
foram levantados a partir de `tripo3d.ai/pt` (ver `docs/01-analise-referencia.md`);
o conteúdo, a marca e o visual são próprios.

## Começar

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre em http://localhost:3000 com o hero já funcional (dropzone e marquee).
O resto da página está marcado com `TODO` em `src/app/page.tsx`.

## Construir com o Claude Code

1. Abra a pasta no VS Code.
2. Terminal integrado: `claude`
3. Rode `/init` — ele lê o `CLAUDE.md`.
4. Siga `docs/03-plano-de-prompts.md`, **uma etapa por mensagem**.
5. `npm run build` no fim de cada etapa, antes de seguir.

## Documentos

| Arquivo | Para quê |
|---|---|
| `CLAUDE.md` | contexto permanente e regras que o Claude Code lê sempre |
| `docs/01-analise-referencia.md` | o que foi levantado do site de referência |
| `docs/02-design-system.md` | tokens de cor, tipografia, layout e movimento |
| `docs/03-plano-de-prompts.md` | os prompts prontos, etapa por etapa |

## Já implementado neste scaffold

- Tokens completos em `src/app/globals.css` (`@theme` do Tailwind v4)
- `Marquee` — esteira infinita, dois sentidos, pausa no hover, respeita `reduced-motion`
- `Dropzone` — clique, arrastar **e colar com Ctrl+V**
- `Container`, `Button`
- Conteúdo tipado em `src/content/` (nenhum texto solto em componente)
- Metadata, OpenGraph e JSON-LD de FAQ no `layout.tsx`

## Assets

`public/images/` está vazio de propósito. Os caminhos em `src/content/home.ts`
já apontam para os nomes esperados — coloque seus próprios renders, logos e avatares
nesses caminhos. Não use as imagens do site de referência.

## Antes de publicar

- [ ] Todo texto placeholder substituído
- [ ] Depoimentos reais, com autorização
- [ ] Imagens próprias em `public/images/`
- [ ] Marca e logo próprios
- [ ] `NEXT_PUBLIC_SITE_URL` apontando para o domínio real
