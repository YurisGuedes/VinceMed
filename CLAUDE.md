# CLAUDE.md — Site Institucional VinceMed

## O que é este projeto

Site institucional **one-page** da **VinceMed**, distribuidora brasileira de produtos médicos para **hemodinâmica e cardiologia intervencionista**. Slogan oficial: **"Saúde para toda vida"**.

O site foi construído iterativamente (v1 → v7.1) com uma referência visual clara: o template **Athelas** (https://athelas-template.webflow.io/) — estética **editorial, premium e contida**. O objetivo é parecer um site desenhado sob medida, nunca um template médico genérico.

Os três recados que a página precisa passar, nesta ordem:
1. A VinceMed é uma marca séria.
2. A VinceMed oferece produtos médicos de qualidade.
3. A VinceMed tem estrutura para atender todo o Brasil.

## Stack e comandos

Stack mínima de propósito: **HTML + CSS + JS vanilla, buildado com Vite**. Sem framework, sem dependências de runtime.

```bash
npm install
npm run dev        # http://localhost:5173 — hot reload a cada alteração
npm run build      # gera /dist (deploy)
npm run preview    # serve o build local
```

**Regra de fluxo:** após qualquer alteração visual, o usuário confere o resultado no `localhost:5173`. Mantenha o dev server sempre rodável; nunca quebre o `npm run dev`.

**Deploy:** Vercel com preset Vite (detectado automaticamente). Não criar `vercel.json` sem necessidade.

## Estrutura de arquivos

```
vincemed/
├── CLAUDE.md            ← este arquivo
├── README.md
├── package.json
├── index.html           ← toda a estrutura da página (única página)
├── styles.css           ← todo o CSS (design tokens no :root)
├── main.js              ← todos os comportamentos JS
└── public/
    └── assets/
        ├── favicon.png
        ├── logo/
        │   ├── mark.png         ← símbolo "V" colorido (navbar clara, manifesto)
        │   ├── mark-white.png   ← símbolo "V" branco (navbar sobre o hero escuro)
        │   └── logo-white.png   ← logo completo branco (footer)
        └── img/
            ├── hero-produtos.jpg        ← hero: produtos VinceMed em cena escura
            ├── produto-fio-guia.jpg     ← carrossel 01
            ├── produto-insuflador.jpg   ← carrossel 02
            ├── produto-manifold.jpg     ← carrossel 03
            ├── produto-pulseira.jpg     ← carrossel 04
            └── cta-equipe.jpg           ← faixa CTA (médico no celular)
```

Imagens são referenciadas por caminho absoluto (`/assets/...`) — o Vite serve `public/` na raiz.

## Identidade visual (não mudar sem pedido explícito)

**Paleta — editorial e contida.** O azul da marca é ACENTO, não fundo:
- `--bg: #F2F3F1` (off-white quente, fundo geral)
- `--ink: #15222E` (tinta principal) · `--muted: #6A7682` · `--faint: #AEB6BC` · `--line: #E3E6E3`
- `--dark: #0E1C28` (footer e overlays escuros)
- `--accent: #1788C8` e `--accent2: #19CFE4` (azuis VinceMed — usar pontualmente: bolinha do eyebrow, hovers, dots, detalhes)

**Tipografia: UMA fonte só** — `Hanken Grotesk` (Google Fonts). Eyebrows e tags usam uppercase + letter-spacing para diferenciar; **não** adicionar segunda família. Pesos contidos: títulos 600–700, nunca 800.

**Headings em dois tons:** linha 1 em `--ink`, linha 2 em `--faint` (classe `.l2`). Composição assimétrica (título à esquerda, apoio à direita).

## Anatomia da página (ordem das seções)

1. **Navbar** — fixa; transparente com texto branco sobre o hero (classe `over`), vira clara com blur ao rolar (`scrolled`). Logo central, troca entre `mark-white.png` e `mark.png` automaticamente.
2. **Hero** — `100svh` full-bleed com `hero-produtos.jpg`; gradiente lateral escurece só a esquerda. Entrada coreografada ao carregar (classe `played`): imagem assenta (zoom 1.06→1), eyebrow → título palavra-por-palavra (`.wd` com delays) → parágrafo → botões → scroll cue.
3. **Manifesto** (`#sobre`) — seção sticky de `150vh` com **text-reveal no scroll**: as palavras acendem de cinza (opacity .14) para preto num gradiente suave que atravessa ~2,5 palavras. Layout assimétrico: símbolo à esquerda, citação alinhada à direita. Texto atual (entre aspas, todo em preto): *"Desenvolvemos produtos com excelência, focados em atender as necessidades clínicas e promover os melhores resultados para os pacientes."*
4. **Produtos** (`#produtos`) — carrossel com profundidade (card central + laterais a 84% atrás), **sem cabeçalho de seção** (decisão do cliente). Painel direito sincronizado: eyebrow "Linha Hemodinâmica", título, descrição, tags de spec, botão. Dados no array `PRODUCTS` em `main.js`.
5. **Atendemos todo o Brasil** — mapa do Brasil em **SVG inline** (gradiente azul da marca, pontos nas capitais, hub pulsando em Brasília) + três diferenciais com hairlines.
6. **FAQ** — accordion (um aberto por vez).
7. **CTA** (`#contato`) — faixa full-bleed com `cta-equipe.jpg` + overlay escuro.
8. **Footer** — fundo `--dark`; e-mail gigante, newsletter, colunas de navegação/produtos/contato, linha regulatória.

## Conteúdo dos produtos (regra crítica)

Os 4 produtos e suas descrições vêm dos **rótulos reais** das embalagens. **NUNCA inventar especificação técnica, alegação clínica ou de desempenho.** Se precisar de mais detalhe, deixar placeholder e perguntar ao usuário.

| # | Produto | Specs do rótulo |
|---|---------|-----------------|
| 01 | Fio Guia PTFE | ponta tipo J, 0,035", 260 cm |
| 02 | Kit Insuflador de Balão | manômetro integrado, 20 mL/cc |
| 03 | Manifold 3 Vias | config. RIGHT, estéril (EO), livre de látex |
| 04 | Pulseira de Compressão Radial | hemostasia radial, insuflação por seringa |

## Placeholders a preencher (aguardando dados do cliente)

- Telefone: `+55 (00) 0000-0000`
- Cidade/Estado no footer
- Linha regulatória: CNPJ real, nome do Responsável Técnico, CRF
- Links das redes sociais (Instagram: @vincemedoficial)
- Destino do botão "Entrar em contato" (WhatsApp? formulário? e-mail?)

## Regras de engenharia

- **Acessibilidade de movimento:** todo efeito respeita `prefers-reduced-motion` — manter isso em qualquer animação nova.
- **Vocabulário único de micro-interações:** tudo interativo responde com a mesma física (`--ease: cubic-bezier(.2,.7,.2,1)`, lift de -2px, durações ~.3s). Não criar easings novos por elemento.
- **Mobile first nos testes:** validar em 390px e 1280px. No mobile: menu hamburger, carrossel empilha (texto antes do stage), manifesto vira coluna única com texto à esquerda.
- **Performance:** página leve (~600KB). Otimizar qualquer imagem nova (JPEG progressivo, q≈70, largura máx. 1680px).
- **SEO/social:** title, meta description e OG tags já configurados — manter atualizados se o conteúdo mudar.
- Site em **pt-BR**; o seletor PT|EN é visual por enquanto (i18n é roadmap).

## Roadmap (próximas fases, em ordem)

1. **Faixa de números institucionais** (anos de mercado, clientes, cobertura) — aguardando dados reais; com count-up no scroll.
2. **Formulário de contato / WhatsApp** no CTA.
3. **Páginas internas por produto** (specs completas, registro ANVISA, IFU para download) — quando entrar, avaliar migração para Next.js; por ora manter Vite.
4. **Versão EN** (ativar o seletor PT|EN).
