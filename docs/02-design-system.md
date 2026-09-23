# Design system — Forma3D

Tokens definidos aqui são a **fonte única da verdade**. Nenhum valor de cor, espaçamento
ou tamanho de fonte deve aparecer solto em componente.

Implementação: `src/app/globals.css`, bloco `@theme` do Tailwind v4.

---

## Cor

Base escura de estúdio 3D: o conteúdo são renders coloridos, então a interface precisa
recuar. Superfície quase preta levemente azulada (não `#000`, que achata os renders),
um acento elétrico único e um verde de suporte só para estados de sucesso.

| Token | Hex | Uso |
|---|---|---|
| `--color-void` | `#08090C` | fundo da página |
| `--color-surface` | `#111318` | cards, dropzone, header no scroll |
| `--color-surface-2` | `#1A1D24` | hover de card, bordas preenchidas |
| `--color-line` | `#272B35` | bordas de 1px |
| `--color-ink` | `#F2F4F8` | texto principal |
| `--color-ink-muted` | `#9BA3B4` | texto secundário, labels |
| `--color-accent` | `#4D6BFF` | CTA primário, links, foco |
| `--color-accent-soft` | `#1C2340` | fundo de badge, halo do acento |
| `--color-ok` | `#3ECF8E` | sucesso do upload |

Regra: **um acento só**. Gradiente permitido apenas no halo atrás do hero
(`radial-gradient` de `--color-accent-soft` para transparente).

---

## Tipografia

Duas famílias, papéis bem separados:

- **Display / títulos:** `Space Grotesk` — geométrica com terminações levemente
  técnicas, casa com o assunto (malha, topologia) sem virar fonte "futurista".
- **Texto / UI:** `Inter` — legibilidade em corpo pequeno e números tabulares.

Escala (razão 1.25, base 16px):

| Token | Tamanho / linha | Uso |
|---|---|---|
| `--text-display` | `clamp(2.75rem, 6vw, 4.5rem)` / 1.05 | H1 do hero |
| `--text-h2` | `clamp(2rem, 4vw, 3rem)` / 1.12 | título de seção |
| `--text-h3` | `1.5rem` / 1.25 | título de card |
| `--text-body-lg` | `1.125rem` / 1.6 | subtítulo do hero |
| `--text-body` | `1rem` / 1.65 | corpo |
| `--text-sm` | `0.875rem` / 1.5 | meta, label de card |

Regras:
- Títulos em **sentence case**. Nunca caixa alta em label.
- Nenhuma palavra isolada colorida dentro do H1.
- Largura máxima de linha: `65ch` para corpo, `18ch` para o H1.

---

## Layout

- Container: `max-width: 1200px`, padding lateral `24px` (mobile) / `40px` (≥1024px).
- Ritmo vertical entre seções: `clamp(80px, 10vw, 140px)`.
- Grid do hero: coluna única centralizada. Grid das seções de feature: 12 colunas,
  conteúdo em 6+6 no desktop, empilhado abaixo de 900px.
- Raio: `--radius-card: 16px`, `--radius-pill: 999px`, `--radius-input: 12px`.
  Três valores, não um só — a hierarquia de raio carrega informação.

Breakpoints: `640 / 900 / 1200 / 1440`.

---

## Movimento

- Marquees: `translateX` linear, 40–70s por volta, `animation-play-state: paused`
  no hover e **desligado** em `prefers-reduced-motion`.
- Hover de card: só o que muda de estado (borda e imagem antes/depois). Sem
  `translateY(-4px)` em tudo.
- Uma única entrada orquestrada: o hero. O resto da página não anima ao entrar na
  viewport.

---

## Acessibilidade — piso de qualidade

- Foco visível: `outline: 2px solid var(--color-accent); outline-offset: 2px`.
- Contraste mínimo AA em todo texto sobre `--color-void` e `--color-surface`.
- Marquee marcado com `aria-hidden` nas cópias duplicadas.
- Dropzone operável por teclado (`role="button"`, `tabIndex={0}`, Enter/Espaço).
- Accordion do FAQ com `<details>`/`<summary>` ou `aria-expanded` correto.
