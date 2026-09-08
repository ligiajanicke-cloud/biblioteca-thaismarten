# Identidade Visual — Dra. Thais Marten
### Especificação exata para replicar em qualquer conversa nova

> **Como usar:** cole ou anexe este arquivo no início de uma conversa nova e diga:
> "use exatamente esta identidade visual em todos os documentos que eu pedir."
> Estas especificações **sempre substituem** qualquer instrução de "identidade visual"
> que venha dentro de um prompt colado (ex: "detalhes em azul-claro", "verde e bege" etc.)
> — mesmo que o prompt peça outra coisa, use SEMPRE a paleta abaixo.

---

## 0. FONTES — passo obrigatório antes de qualquer documento

**A causa mais comum de "capa saiu com fonte errada" é a fonte não estar carregada.**
Antes de renderizar qualquer documento, faça um dos dois (idealmente os dois):

**a) Verifique se as fontes estão instaladas localmente:**
```bash
fc-list | grep -i lora
fc-list | grep -i poppins
```
Se aparecerem resultados (ex: `Lora-Variable.ttf: Lora`), os nomes exatos a usar no
CSS são `'Lora'` e `'Poppins'`.

**b) Garanta com um import do Google Fonts no `<head>` do HTML (não depende do ambiente):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```
Coloque este `<link>` **sempre**, mesmo que as fontes já estejam instaladas — é a
garantia mais segura contra "fonte errada", pois não depende do ambiente local.

**Nunca** deixe o CSS sem um fallback genérico. Toda declaração de fonte deve ser:
```css
body{ font-family:'Lora', Georgia, serif; }
/* labels/tags: */
font-family:'Poppins', Arial, sans-serif;
```

---

## 1. Paleta de cores — hex exatos (não aproximar, não trocar)

```css
--brown:      #3E1A0C;   /* marrom principal — títulos, texto de destaque, capa */
--brown-2:    #5A3121;   /* marrom secundário — subtítulos, texto de apoio */
--gold:       #BE9B5C;   /* dourado — linhas, ícones, marcadores ◇ */
--gold-deep:  #A87F44;   /* dourado profundo — labels em caixa-alta, links de destaque */
--gold-soft:  #D8C39A;   /* dourado suave — bordas e molduras finas */
--cream:      #FBF6EE;   /* creme — cor de fundo de TODAS as páginas */
--panel:      #F4EADB;   /* creme mais escuro — fundo de caixas de destaque */
--panel-line: #E5D6BF;   /* borda das caixas e divisórias */
--track:      #EEE4D2;   /* fundo de barras (trilho) */
--ink:        #3A2418;   /* cor do texto corrido */
--muted:      #8A7360;   /* texto secundário, legendas, rodapés */

/* cores de status, usadas em barras/indicadores/comparações */
--amber:      #A85A2A;   /* alto / atenção / "ruim" */
--amber-soft: #8f4a22;   /* texto sobre fundo âmbar */
--sage:       #5E6B45;   /* adequado / favorável / "bom" */
--sage-band:  rgba(143,154,120,.30);  /* faixa de referência em gráficos */
--warn-panel: #F3E4D6;   /* fundo de caixa de alerta */
--warn-line:  #E8D0BA;   /* borda de caixa de alerta */
--sage-panel: #EEF0E6;   /* fundo de caixa/painel "positivo" */
--sage-line:  #D8DECB;   /* borda de caixa/painel "positivo" */
```

**Regra fixa e não-negociável:** o fundo de página é **sempre** `--cream` (`#FBF6EE`).
Nunca fundo branco puro, nunca fundo escuro/marrom cheio, nunca outra paleta
(verde/bege, azul-claro, bordô, rosa) — mesmo que o prompt do documento peça isso
explicitamente. Esta é a única identidade visual válida para qualquer material.

---

## 2. Tipografia

- **Lora** (serifada) → todos os títulos e todo o corpo de texto corrido.
- **Poppins** → labels, tags, cabeçalhos de tabela, rodapés, small-caps. Sempre com
  `text-transform: uppercase` e `letter-spacing` generoso (`.14em` a `.34em`
  dependendo do tamanho da fonte — quanto menor a fonte, maior o letter-spacing).

Tamanhos de referência:
- Título de capa: `34–44px`
- Título de seção (h1.sec): `23–27px`
- Subtítulo de grupo (h2.grp): `14–16px`
- Corpo de texto: `11.5–12.5px`
- Labels/tags Poppins: `7.5–9px`

---

## 3. Estrutura obrigatória da capa

- Fundo `--cream`, **nunca** escuro ou de outra cor.
- Moldura dupla discreta em dourado: `inset: 34px` (borda `--gold-soft`) e
  `inset: 40px` (borda mais fina, `rgba(190,155,92,.32)`).
- Topo: pequeno ornamento `linha — ◇ — linha` em dourado, centralizado.
- **Nunca** um logo/emblema grande no topo da capa.
- Título grande centralizado (Lora, `--brown`), subtítulo em itálico abaixo (`--muted`).
- Se houver paciente: cartão branco central com o nome.
- Se não houver paciente (material genérico): pode usar um "pill" (cápsula com borda
  dourada) como categoria, ex: "Nutrição Funcional".
- **Assinatura SEMPRE discreta, apenas no rodapé da capa** — nunca no topo:
  ```
  MATERIAL ELABORADO POR
  Dra. Thais Marten
  NUTRICIONISTA FUNCIONAL INTEGRATIVA · CRN 13864
  ```

### Bloco completo e testado da capa (copiar inteiro, não montar por partes)

Este bloco foi renderizado e verificado neste ambiente — cada elemento de texto
confirmado programaticamente com a fonte correta (largura de glifo medida via canvas,
não só inspeção visual). Copie o HTML e o CSS juntos, sem alterar as classes.

**HTML:**
```html
<section class="page cover">
  <div class="cframe"></div><div class="cframe2"></div>
  <div class="cwrap">
    <div class="ctop"><span class="ln"></span><span class="dm">◇</span><span class="ln"></span></div>
    <div class="cmid">
      <h1>Título do Documento</h1>
      <div class="sub">Subtítulo em itálico</div>
      <div class="divider"><span class="ln"></span><span class="dm">◇</span><span class="ln"></span></div>
      <div class="pcard">
        <div class="lbl">Paciente</div>
        <div class="pname">Nome do Paciente</div>
      </div>
      <div class="pills">
        <span class="pill">Tag opcional 1</span>
        <span class="pill">Tag opcional 2</span>
      </div>
    </div>
    <div class="by">
      <div class="lbl">Material elaborado por</div>
      <div class="nm">Dra. Thais Marten</div>
      <div class="rl">Nutricionista Funcional Integrativa · CRN 13864</div>
    </div>
  </div>
</section>
```

**CSS (todas as regras têm `font-family` explícito — nenhuma depende de herança):**
```css
.cover{ background:var(--cream); }
.cframe{ position:absolute; inset:34px; border:1px solid var(--gold-soft); border-radius:3px; }
.cframe2{ position:absolute; inset:40px; border:1px solid rgba(190,155,92,.32); }
.cwrap{ position:relative; height:100%; display:flex; flex-direction:column; align-items:center; text-align:center; padding:96px 84px 80px; }
.cwrap .ctop{ display:flex; align-items:center; gap:14px; color:var(--gold); }
.cwrap .ctop .ln{ width:54px; height:1px; background:var(--gold-soft); }
.cwrap .ctop .dm{ font-family:'Lora', Georgia, serif; font-size:12px; }
.cwrap .cmid{ flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; }
.cover h1{ font-family:'Lora', Georgia, serif; font-size:38px; font-weight:600; color:var(--brown); text-align:center; }
.cover .sub{ font-family:'Lora', Georgia, serif; font-style:italic; color:var(--muted); text-align:center; font-size:14.5px; margin-top:14px; }
.cover .divider{ display:flex; align-items:center; gap:14px; margin:28px 0 22px; color:var(--gold); }
.cover .divider .ln{ width:64px; height:1px; background:var(--gold-soft); }
.cover .divider .dm{ font-family:'Lora', Georgia, serif; color:var(--gold); font-size:12px; }
.cover .pcard{ border:1px solid var(--gold-soft); border-radius:8px; padding:16px 48px; background:#fff; margin-bottom:22px; }
.cover .pcard .lbl{ font-family:'Poppins', Arial, sans-serif; font-size:8.5px; letter-spacing:.3em; text-transform:uppercase; color:var(--gold-deep); margin-bottom:7px; text-align:center; }
.cover .pcard .pname{ font-family:'Lora', Georgia, serif; font-size:21px; color:var(--brown); letter-spacing:.03em; text-align:center; }
.cover .pills{ display:flex; flex-wrap:wrap; gap:8px; justify-content:center; }
.cover .pill{ border:1px solid var(--gold-soft); border-radius:16px; padding:5px 13px; font-family:'Poppins', Arial, sans-serif; font-size:8.5px; letter-spacing:.16em; text-transform:uppercase; color:var(--brown-2); background:#fff; }
.cover .by{ margin-top:auto; }
.cover .by .lbl{ font-family:'Poppins', Arial, sans-serif; font-size:8px; letter-spacing:.28em; text-transform:uppercase; color:var(--muted); margin-bottom:8px; text-align:center; }
.cover .by .nm{ font-family:'Lora', Georgia, serif; font-size:18px; color:var(--brown); text-align:center; }
.cover .by .rl{ font-family:'Poppins', Arial, sans-serif; font-size:8.5px; letter-spacing:.22em; text-transform:uppercase; color:var(--gold-deep); margin-top:6px; text-align:center; }
```

Se o documento não tiver paciente específico (ex: guia genérico), remova o `.pcard` e
use só o `.pill` com a categoria do material.

---

## 4. Cabeçalho e rodapé — todas as páginas internas (exceto capa)

**Cabeçalho** (`.rh`): nome da marca em small-caps letter-spaced à esquerda —
`DRA. THAIS` em `--brown` + `MARTEN` em negrito `--gold-deep` — e a tag do documento
à direita (ex: "Plano Alimentar · Nome da Paciente"). Linha fina `--panel-line` abaixo.

**Rodapé** (`.rf`): texto de uso exclusivo à esquerda, símbolo `◇` dourado centralizado,
número de página (ou CRN) à direita. Linha fina `--panel-line` acima. Sempre em
Poppins, letter-spaced, uppercase, `~7.5-8px`, cor `--muted`.

---

## 5. Bloco de HTML + CSS completo — pronto para colar (base de qualquer documento)

**`<head>` obrigatório (sempre incluir o import de fontes):**
```html
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
/* CSS abaixo */
</style>
</head>
```

**CSS base:**
```css
:root{
  --brown:#3E1A0C; --brown-2:#5A3121;
  --gold:#BE9B5C; --gold-deep:#A87F44; --gold-soft:#D8C39A;
  --cream:#FBF6EE; --panel:#F4EADB; --panel-line:#E5D6BF; --track:#EEE4D2;
  --ink:#3A2418; --muted:#8A7360;
  --amber:#A85A2A; --amber-soft:#8f4a22; --sage:#5E6B45; --sage-band:rgba(143,154,120,.30);
  --warn-panel:#F3E4D6; --warn-line:#E8D0BA; --sage-panel:#EEF0E6; --sage-line:#D8DECB;
}
*{ margin:0; padding:0; box-sizing:border-box; }
body{ font-family:'Lora', Georgia, serif; color:var(--ink); -webkit-font-smoothing:antialiased; }

/* página A4 a 96dpi = 794x1123px */
.page{ position:relative; width:794px; height:1123px; overflow:hidden;
  background:var(--cream); margin:0 auto; page-break-after:always; }
.page:last-child{ page-break-after:auto; }
.pad{ padding:60px 72px 64px 72px; height:100%; display:flex; flex-direction:column; }

.rh{ display:flex; align-items:center; justify-content:space-between;
  padding-bottom:13px; border-bottom:1px solid var(--panel-line); margin-bottom:24px; }
.rh .wm{ font-family:'Lora', Georgia, serif; letter-spacing:.42em; font-size:12px; font-weight:600;
  color:var(--brown); text-transform:uppercase; }
.rh .wm b{ color:var(--gold-deep); }
.rh .tag{ font-family:'Poppins', Arial, sans-serif; font-size:8.5px; letter-spacing:.2em;
  text-transform:uppercase; color:var(--muted); }

.rf{ margin-top:auto; padding-top:14px; border-top:1px solid var(--panel-line);
  display:flex; align-items:center; justify-content:space-between;
  font-family:'Poppins', Arial, sans-serif; font-size:7.6px; letter-spacing:.14em;
  text-transform:uppercase; color:var(--muted); }
.rf .dia{ color:var(--gold); }

.eyebrow{ font-family:'Poppins', Arial, sans-serif; font-size:9px; letter-spacing:.34em;
  text-transform:uppercase; color:var(--gold-deep); margin-bottom:9px; }
h1.sec{ font-family:'Lora', Georgia, serif; font-size:25px; font-weight:600; color:var(--brown); line-height:1.18; }
.sec-rule{ width:50px; height:2px; background:var(--gold); margin:13px 0 18px; }
h2.grp{ font-family:'Lora', Georgia, serif; font-size:15px; font-weight:600; color:var(--brown); margin:15px 0 6px; }
p{ font-family:'Lora', Georgia, serif; font-size:12px; line-height:1.62; color:var(--ink); margin-bottom:9px; text-align:justify; }

.box{ background:var(--panel); border:1px solid var(--panel-line); border-radius:14px;
  padding:17px 22px; margin:8px 0; }
.box .bx-title{ font-family:'Poppins', Arial, sans-serif; font-size:9.3px; letter-spacing:.16em;
  text-transform:uppercase; color:var(--gold-deep); margin-bottom:9px; }
.box.warn{ background:var(--warn-panel); border-color:var(--warn-line); }
.box.warn .bx-title{ color:var(--amber); }
.box.brown{ background:var(--brown); border-color:var(--brown); }
.box.brown .bx-title{ color:var(--gold); }
.box.brown p{ color:#F0E4D2; }

/* CAPA — declarar a fonte explicitamente em cada elemento, nunca depender só da herança */
.cover{ background:var(--cream); }
.cover h1{ font-family:'Lora', Georgia, serif; font-size:38px; font-weight:600; color:var(--brown); text-align:center; }
.cover .sub{ font-family:'Lora', Georgia, serif; font-style:italic; color:var(--muted); text-align:center; }
.cover .pill{ font-family:'Poppins', Arial, sans-serif; letter-spacing:.16em; text-transform:uppercase; color:var(--gold-deep); }
.cover .by .lbl{ font-family:'Poppins', Arial, sans-serif; font-size:8px; letter-spacing:.28em; text-transform:uppercase; color:var(--muted); text-align:center; }
.cover .by .nm{ font-family:'Lora', Georgia, serif; font-size:18px; color:var(--brown); text-align:center; }
.cover .by .rl{ font-family:'Poppins', Arial, sans-serif; font-size:8.5px; letter-spacing:.22em; text-transform:uppercase; color:var(--gold-deep); text-align:center; }
.cover .divider .dm{ font-family:'Lora', Georgia, serif; color:var(--gold); }
.cover .pcard{ border:1px solid var(--gold-soft); border-radius:8px; padding:18px 48px; background:#fff; }
.cover .pcard .lbl{ font-family:'Poppins', Arial, sans-serif; font-size:8.5px; letter-spacing:.3em; text-transform:uppercase; color:var(--gold-deep); margin-bottom:7px; text-align:center; }
.cover .pcard .pname{ font-family:'Lora', Georgia, serif; font-size:21px; color:var(--brown); letter-spacing:.03em; text-align:center; }
```

**Depois de renderizar, confira visualmente (ou via screenshot) se a capa saiu com a
serifada Lora — se aparecer uma fonte sem serifa genérica (Arial/Helvetica/sans-serif
padrão do sistema), o import do Google Fonts não carregou; adicione um
`page.wait_for_timeout(600)` (ou mais) antes de gerar o PDF no Playwright, para dar
tempo da fonte carregar da web antes da renderização.

---

## 6. Exemplos de componentes — HTML real (copiar e adaptar)

**Caixa de destaque simples:**
```html
<div class="box">
  <div class="bx-title"><span style="color:var(--gold)">◇</span> Título da Caixa</div>
  <p>Texto da caixa.</p>
</div>
```

**Painel comparativo bom/ruim (ex: "o que ajuda" vs "o que atrapalha"):**
```html
<div class="panels" style="display:flex; gap:14px;">
  <div class="panel good" style="flex:1; background:var(--sage-panel); border:1px solid var(--sage-line); border-radius:14px; padding:16px 19px;">
    <div style="font-family:'Poppins'; font-size:9px; letter-spacing:.14em; text-transform:uppercase; color:var(--sage); margin-bottom:10px;">✓ Favorável</div>
    <!-- lista de itens com marcador ✓ -->
  </div>
  <div class="panel bad" style="flex:1; background:var(--warn-panel); border:1px solid var(--warn-line); border-radius:14px; padding:16px 19px;">
    <div style="font-family:'Poppins'; font-size:9px; letter-spacing:.14em; text-transform:uppercase; color:var(--amber); margin-bottom:10px;">✕ Evitar</div>
    <!-- lista de itens com marcador ✕ -->
  </div>
</div>
```

**Barra de intensidade / faixa de referência (relatórios de exame):**
```html
<div class="brow" style="display:flex; align-items:center; gap:12px; margin:7px 0;">
  <span class="bn" style="width:200px; font-size:10.8px;">Nome do marcador</span>
  <span class="btrack" style="flex:1; height:12px; border-radius:6px; background:var(--track); position:relative;">
    <span class="bband" style="position:absolute; top:0; bottom:0; left:30%; width:40%; background:var(--sage-band); border-left:1px solid rgba(143,154,120,.55); border-right:1px solid rgba(143,154,120,.55);"></span>
    <span class="bmark" style="position:absolute; top:-2px; bottom:-2px; width:2.5px; left:65%; background:var(--amber); border-radius:2px;"></span>
  </span>
  <span class="bval" style="width:44px; font-family:'Poppins'; font-size:9px; text-align:right;">valor</span>
  <span class="btag" style="width:74px; text-align:center; font-family:'Poppins'; font-size:7.5px; text-transform:uppercase; padding:3px 0; border-radius:10px; background:rgba(168,90,42,.12); color:var(--amber-soft);">Alto</span>
</div>
```

**Tabela (lista de alimentos, preparações, receitas):**
```html
<div class="rtable" style="border:1px solid var(--panel-line); border-radius:12px; overflow:hidden;">
  <div class="rt-head" style="background:var(--panel); font-family:'Poppins', Arial, sans-serif; font-size:9px; letter-spacing:.14em; text-transform:uppercase; color:var(--gold-deep); padding:9px 16px; border-bottom:1px solid var(--panel-line);">Cabeçalho</div>
  <div class="rt-row" style="display:flex; gap:14px; padding:8px 16px; border-bottom:1px solid var(--panel-line);">
    <span style="width:150px; font-weight:600; color:var(--brown); font-size:10.8px; font-family:'Lora', Georgia, serif;">Item</span>
    <span style="font-size:10.8px; font-family:'Lora', Georgia, serif;">Descrição</span>
  </div>
</div>
```

**Assinatura de fechamento (usar SEMPRE ao final do documento, em página própria ou junto
à última seção) — ESTE BLOCO É A CAUSA MAIS COMUM DE "FONTE ERRADA NO RODAPÉ": toda
linha precisa declarar `font-family` explicitamente, nenhuma pode depender de herança:**
```html
<div style="text-align:center; margin-top:28px;">
  <div style="font-family:'Poppins', Arial, sans-serif; font-size:8.5px; letter-spacing:.26em; text-transform:uppercase; color:var(--muted); margin-bottom:8px;">Com cuidado,</div>
  <div style="font-family:'Lora', Georgia, serif; font-size:20px; color:var(--brown);">Dra. Thais Marten</div>
  <div style="font-family:'Poppins', Arial, sans-serif; font-size:8.6px; letter-spacing:.2em; text-transform:uppercase; color:var(--gold-deep); margin-top:6px;">Nutricionista Funcional Integrativa · CRN 13864</div>
</div>
```

---

## 7. Checklist de fidelidade visual (usar antes de entregar qualquer documento)

- [ ] **Fontes:** `<link>` do Google Fonts (Lora + Poppins) presente no `<head>`, e a
      capa visualmente conferida como serifada (Lora) — não uma fonte sans-serif genérica
- [ ] **Prova definitiva de fonte** (não confiar só no olho): rodar este teste com
      Playwright para CADA elemento de texto da capa (título, subtítulo, pills, nome do
      paciente, "Material elaborado por", nome da Dra. Thais, CRN) — se a largura medida
      bater com a largura forçando Lora/Poppins, está correto:
      ```python
      result = page.evaluate('''() => {
          const el = document.querySelector('SELETOR_AQUI');
          const cs = getComputedStyle(el);
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          ctx.font = cs.fontSize + ' ' + cs.fontFamily;
          const wActual = ctx.measureText(el.textContent).width;
          ctx.font = cs.fontSize + " 'Lora'";
          const wLora = ctx.measureText(el.textContent).width;
          return {wActual, wLora, match: Math.abs(wActual-wLora)<0.5};
      }''')
      ```
      Se `match` for `false`, a fonte não carregou — adicionar/checar o `<link>` do
      Google Fonts e aumentar o `wait_for_timeout` antes de gerar o PDF.
- [ ] **Toda regra CSS de texto dentro de `.cover` tem `font-family` explícito** —
      nunca deixar um elemento (título, subtítulo, pills, pcard, "Material elaborado
      por", nome da Dra. Thais, CRN, ornamentos ◇) depender só da herança do `body`.
      Essa foi a causa raiz confirmada do problema "nome da Thais com fonte diferente".
- [ ] Fundo da página é `--cream` (`#FBF6EE`), nunca outra cor
- [ ] Capa é clara/minimalista, sem logo grande, assinatura só no rodapé
- [ ] Todos os títulos em Lora, todos os labels em Poppins uppercase letter-spaced
- [ ] Paleta usada é exatamente a da seção 1 — nenhuma cor fora dela
- [ ] Caixas de destaque usam `--panel` + borda `--panel-line` + `border-radius:14px`
- [ ] Cabeçalho e rodapé presentes em todas as páginas internas, no padrão da seção 4
- [ ] Nenhum título órfão, nenhuma tabela/caixa quebrada entre páginas
- [ ] Documento renderizado via HTML → Playwright (Chromium) → PDF, páginas de
      794×1123px (A4 a 96dpi)

---

*Especificação de identidade visual — materiais Dra. Thais Marten.*
