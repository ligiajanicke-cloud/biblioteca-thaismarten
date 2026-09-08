# Biblioteca — Dra. Thais Marten

Base de identidade visual para os materiais da Dra. Thais Marten (Nutrição
Funcional Integrativa · CRN 13864): planos alimentares, guias e receitas.

Esta identidade **não foi inventada aqui** — ela foi extraída dos materiais já
em uso (planos de pacientes, guias e receitas entregues) e consolidada na
especificação abaixo. Qualquer documento novo deve reutilizar exatamente esta
base, sem alterar cores, fontes ou estrutura.

## Estrutura

```
identidade-visual/
  ESPECIFICACAO.md   Especificação completa (paleta, tipografia, regras de capa/página)
  identidade.css      CSS único com as variáveis e todos os componentes visuais
templates/
  capa.html            Template de capa (título, subtítulo, paciente, assinatura)
  pagina-interna.html  Template de página interna com todos os componentes disponíveis
```

## Como criar um novo documento

1. Copie `templates/capa.html` e `templates/pagina-interna.html` para o local
   do novo documento (ex: `planos/NOME_DO_PACIENTE/`).
2. Substitua os placeholders `{{ ... }}` pelo conteúdo real.
3. Em `pagina-interna.html`, mantenha só os componentes que o documento
   precisar (caixa, painel comparativo, barra, tabela etc.) — não é
   obrigatório usar todos.
4. Ambos os templates já apontam para `../identidade-visual/identidade.css`
   e carregam as fontes Lora/Poppins via Google Fonts — não remova esse
   `<link>`, é o que garante a fonte certa independente do ambiente.
5. Gere o PDF final via HTML → Playwright (Chromium), páginas de 794×1123px
   (A4 a 96dpi). Aguarde ao menos 600ms (`wait_for_timeout`) antes de tirar o
   screenshot/gerar o PDF, para as fontes web carregarem.

## Regras que nunca mudam

- Fundo de página sempre `--cream` (`#FBF6EE`) — nunca branco puro, nunca
  escuro, nunca outra paleta, mesmo que o pedido do documento sugira isso.
- Títulos e corpo de texto em **Lora**; labels/tags/cabeçalhos em **Poppins**
  maiúsculo com letter-spacing.
- Capa sempre clara e minimalista, sem logo grande no topo; a assinatura da
  Dra. Thais fica só no rodapé da capa.
- Toda regra de texto dentro de `.cover` declara `font-family` explicitamente
  (nunca depender só da herança do `body`) — essa foi a causa raiz de bugs
  de fonte em versões anteriores dos documentos.

Ver `identidade-visual/ESPECIFICACAO.md` para o detalhamento completo,
incluindo o checklist de fidelidade visual a rodar antes de entregar
qualquer documento.
