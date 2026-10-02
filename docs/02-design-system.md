# Design system — Forma3D

Tokens definidos aqui são a **fonte única da verdade**. Nenhum valor de cor, espaçamento
ou tamanho de fonte deve aparecer solto em componente.

Implementação: `src/app/globals.css`, bloco `@theme` do Tailwind v4. Onde variável CSS
não chega (`viewport.themeColor` e imagem OG), as cores são espelhadas em
`src/lib/theme.ts`; ao mudar um valor no `@theme`, mude lá também.

Estado em 02/10/2026, depois das correções da etapa 8 (ver `docs/04-auditoria.md`).

---

## Cor

Base escura de estúdio 3D: o conteúdo são renders coloridos, então a interface precisa
recuar. Superfície quase preta levemente azulada (não `#000`, que achata os renders) e
um acento elétrico único, com uma variante mais clara para texto.

| Token | Hex | Uso |
|---|---|---|
| `--color-void` | `#08090C` | fundo da página |
| `--color-surface` | `#111318` | cards, dropzone, header depois da rolagem, gaveta mobile |
| `--color-surface-2` | `#1A1D24` | dropdown da nav, AnnouncementBar, hover de botões |
| `--color-line` | `#272B35` | bordas de 1px decorativas (cards, Button ghost, setas) |
| `--color-line-strong` | `#3D4350` | borda de card em hover/foco |
| `--color-line-control` | `#626A7A` | limite de controle que só a borda identifica (Dropzone) |
| `--color-ink` | `#F2F4F8` | texto principal |
| `--color-ink-muted` | `#9BA3B4` | texto secundário, labels, rodapé |
| `--color-accent` | `#4D6BFF` | fundo do Button primary, outline de foco, texto de acento **só sobre void** |
| `--color-accent-strong` | `#6A84FF` | Button primary em hover; texto de acento sobre surface/surface-2; hovers da nav |
| `--color-accent-soft` | `#1C2340` | fundo do número das etapas, Dropzone ao arrastar |

Regra: **um acento só** (`accent` e `accent-strong` são o mesmo matiz). Sem gradiente
decorativo; o único `linear-gradient` é a máscara das bordas das esteiras.

### Contraste (WCAG 2.2, AA)

| Par | Razão | Resultado |
|---|---|---|
| `ink` sobre void / surface / surface-2 / accent-soft | 18,08 / 16,68 / 15,32 / 13,98 | ✅ |
| `ink-muted` sobre void / surface / surface-2 / accent-soft | 7,86 / 7,25 / 6,66 / 6,08 | ✅ |
| `accent` sobre void (e void sobre `accent`, no Button) | 4,61 | ✅ folga mínima |
| `accent` sobre surface / surface-2 | 4,25 / 3,91 | ❌ não usar como texto |
| `accent-strong` sobre void / surface / surface-2 | 6,03 / 5,56 / 5,11 | ✅ |
| void sobre `accent-strong` (Button primary em hover) | 6,03 | ✅ |
| outline de foco (`accent`) sobre void / surface / surface-2 / accent-soft | 4,61 / 4,25 / 3,91 / 3,57 | ✅ (mínimo 3) |
| `line-control` sobre void / surface | 3,66 / 3,38 | ✅ (mínimo 3, WCAG 1.4.11) |
| `line` / `line-strong` sobre void | 1,41 / 2,01 | só decorativo |

**`accent` como texto só passa AA sobre `void`.** Sobre `surface` ou `surface-2`
(header rolado, dropdown, AnnouncementBar, cards), texto de acento usa `accent-strong`.
Número sobre `accent-soft` usa `ink`. Borda só pode ser o que identifica um controle se
for `line-control`.

---

## Tipografia

Duas famílias, papéis bem separados, via `next/font` (`src/lib/fonts.ts`), subset
`latin`, `display: swap`:

- **Display / títulos:** `Space Grotesk` (h1–h3 em peso 600) — geométrica com
  terminações levemente técnicas, casa com o assunto (malha, topologia) sem virar
  fonte "futurista".
- **Texto / UI:** `Inter` — legibilidade em corpo pequeno e números tabulares.

A imagem OG usa os TTF estáticos de `src/assets/fonts/` (Space Grotesk 600/700, Inter 400).

| Token | Tamanho / linha | Uso |
|---|---|---|
| `--text-display` | `clamp(2.75rem, 6vw, 4.5rem)` / 1.05, tracking -0.02em | h1 (hero e 404) |
| `--text-h2` | `clamp(2rem, 4vw, 3rem)` / 1.12, tracking -0.015em | título de seção |
| `--text-h3` | `1.5rem` / 1.25 | título de card |
| `--text-body-lg` | `1.125rem` / 1.6 | subtítulo do hero e das seções |
| `--text-body` | `1rem` / 1.65 | corpo, Button, rótulo da Dropzone |
| `--text-sm` | `0.875rem` / 1.5 | meta, label de card, nav |
| `--text-xs` | `0.8125rem` / 1.4 | controles secundários (botão de pausa) |

Medida de linha:

| Token | Valor | Uso |
|---|---|---|
| `--measure-display` | `18ch` | h1 |
| `--measure-body` | `60ch` | subtítulos e parágrafos de corpo (FAQ, 404) |

Regras:
- Títulos em **sentence case**. Nunca caixa alta em label.
- Nenhuma palavra isolada colorida dentro do H1.

---

## Layout

| Token | Valor | Uso |
|---|---|---|
| `--container-page` | `1200px` | largura máxima do `Container` |
| `--spacing-section` | `clamp(80px, 10vw, 140px)` | ritmo entre seções: cada `Section` usa metade em cima e metade embaixo |
| `--spacing-header` | `4rem` | altura do header sticky e `scroll-padding-top` do `html` (âncoras e foco não ficam sob o header) |
| `--container-card` | `27rem` | teto do card do carrossel (Industries), ~2,5 cards visíveis |
| `--container-quote` | `22rem` | largura do card de depoimento (até `80vw`) |
| `--container-thumb` | `14rem` | largura do card da galeria (até `40vw`) |
| `--spacing-marquee-sm` / `-md` / `-lg` | `1rem` / `1.5rem` / `3.5rem` | espaço entre itens das esteiras (prop `gap` da `Marquee`) |

- Container: padding lateral `24px` (`px-6`) no mobile e `40px` (`md:px-10`) a partir de
  **900px**.
- Hero: coluna única centralizada.
- Seções de feature (modos, impressão, jogos): duas colunas a partir de 900px,
  empilhadas abaixo. Recursos: 1 → 2 (640px) → 3 colunas (900px). FAQ: título e lista em
  `1fr 2fr` a partir de 900px. Não há grid de 12 colunas.
- Raio: `--radius-card: 16px`, `--radius-pill: 999px`, `--radius-input: 12px`.
  Três valores, não um só — a hierarquia de raio carrega informação.

Breakpoints (`--breakpoint-*`): `sm 640` / `md 900` / `lg 1200` / `xl 1440`. Telas de
conferência: 375, 900 e 1440px.

---

## Movimento

- Esteiras (`Marquee`): `translateX` linear, 40–66s por volta, pausa no hover e com o
  foco dentro. Hero (showcase e parceiros) e engines têm um botão de pausa
  (`MarqueePauseToggle`, WCAG 2.2.2) que também para a troca antes/depois do showcase;
  depoimentos e galeria têm o seu.
- Showcase do hero: antes/depois só com CSS — hover em desktop, troca automática em
  touch.
- Hover de card: só o que muda de estado (borda e imagem antes/depois). Sem
  `translateY(-4px)` em tudo.
- Uma única entrada orquestrada: o hero (`opacity` + `transform`, 90ms entre passos). O
  resto da página não anima ao entrar na viewport.
- `prefers-reduced-motion: reduce` desliga esteiras (viram scroll horizontal, sem as
  cópias e sem o botão de pausa), a troca do showcase, a entrada do hero, o
  `scroll-behavior: smooth` e todas as transições de cor e opacidade.

---

## Acessibilidade — piso de qualidade

- Foco visível global: `outline: 2px solid var(--color-accent); outline-offset: 2px`.
  A máscara das bordas das esteiras some quando há foco dentro, para o outline ficar
  inteiro.
- Contraste AA em todo texto, com a restrição do `accent` acima.
- Esteiras: a cópia duplicada leva `aria-hidden` e `inert`. Esteiras sem item focável
  recebem `label` e viram região nomeada e focável, para o teclado rolá-las em
  reduced-motion.
- Dropzone operável por teclado (`role="button"`, `tabIndex={0}`, Enter/Espaço), com
  nome por `aria-labelledby`, instruções e erro por `aria-describedby`, sucesso anunciado
  em `role="status"` e foco levado a "Trocar imagem" ao aceitar.
- Todo `target="_blank"` passa por `ui/ExternalLink`, que acrescenta o aviso
  "(abre em nova aba)" em `sr-only`. O app abre na mesma aba.
- Gaveta mobile: focus trap, Esc fecha, foco volta ao gatilho e `inert` em `main` e
  `footer` enquanto aberta.
- Alvos de toque com pelo menos 24px (WCAG 2.5.8).
- FAQ com `<details>`/`<summary>` e o h3 dentro do `summary`. **Trade-off conhecido
  (A15):** o VoiceOver achata o `summary` e não lista esse h3 na navegação por títulos;
  NVDA e JAWS com Chrome listam. Não há marcação válida que ponha o `summary` dentro do
  heading, então fica assim.
