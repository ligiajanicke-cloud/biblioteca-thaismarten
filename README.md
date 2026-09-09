# Biblioteca — Dra. Thais Marten

Identidade visual e site "Biblioteca do Paciente" da Dra. Thais Marten
(Nutrição Funcional Integrativa · CRN 13864): uma central onde pacientes
acessam PDFs, guias e receitas — sem login, sem prontuário, sem dados
individuais.

Esta identidade **não foi inventada aqui** — ela foi extraída dos materiais já
em uso (planos de pacientes, guias e receitas entregues) e consolidada na
especificação abaixo. Qualquer documento ou página nova deve reutilizar
exatamente esta base, sem alterar cores, fontes ou estrutura.

## Estrutura

```
identidade-visual/
  ESPECIFICACAO.md   Especificação completa (paleta, tipografia, regras de capa/página)
  identidade.css      CSS único com as variáveis e todos os componentes visuais (uso em PDFs)
templates/
  capa.html            Template de capa (título, subtítulo, paciente, assinatura)
  pagina-interna.html  Template de página interna com todos os componentes disponíveis

src/                   Site "Biblioteca do Paciente" (Astro)
  data/materiais.json     Fonte única dos materiais (PDFs) exibidos no site
  data/videos.json        Fonte única dos vídeos (tutoriais do YouTube)
  data/suplementos.json   Fonte única da Lista de Suplementos Permitidos
  components/          Header, busca, filtros, card de material, card de vídeo,
                       card de produto, modal de vídeo, capa-placeholder,
                       placeholder de produto, rodapé
  pages/index.astro    Página principal da biblioteca
  pages/lista-de-suplementos-permitidos.astro  Página de suplementos
  styles/global.css    Paleta e tipografia do site (mesmos tokens da identidade)
  utils/youtube.ts     Extrai o ID do vídeo e monta a URL da thumbnail
public/
  materiais/           PDFs servidos pelo site
  capas/                Imagens de capa próprias dos materiais (opcional)
```

## Site "Biblioteca do Paciente"

Site estático feito em Astro, mobile-first, sem login e sem banco de dados.

```
npm install
npm run dev       # ambiente de desenvolvimento
npm run build     # gera a versão estática em dist/
npm run preview   # serve a versão de produção localmente
```

### Estrutura de categorias e exibição

A partir desta reorganização, a home não tem mais uma aba "Todos": ela abre
mostrando **uma seção por categoria**, cada uma com sua própria grade de
cards — os filtros no topo funcionam como um "isolar categoria" (clicar
mostra só aquela seção; clicar de novo no mesmo chip volta a mostrar todas).
A ordem das categorias é fixa para as já conhecidas (`ORDEM_CATEGORIAS` em
`src/pages/index.astro`: Comece aqui, Te auxilia no dia a dia, Saúde
intestinal, Receitas, Exames de precisão, Suplementação) e qualquer
categoria nova que apareça nos dados é adicionada ao final, em ordem
alfabética — sem precisar editar essa lista manualmente na maioria dos
casos.

Tanto `materiais.json` quanto `videos.json` usam `"categorias": [...]`
(array, não mais uma `categoria` única) — assim um mesmo material pode
pertencer a mais de uma seção **sem duplicar o arquivo físico**: ele só
aparece uma vez em cada categoria listada, renderizado como um card por
seção. Exemplo real do projeto: o Guia Low FODMAP tem
`"categorias": ["Saúde intestinal", "Te auxilia no dia a dia"]` e aparece
nas duas.

### Como adicionar um novo material

Não é necessário editar componentes ou páginas — apenas:

1. Coloque o PDF em `public/materiais/`.
2. (Opcional) Coloque uma capa própria em `public/capas/`. Se não houver
   capa, o site gera automaticamente um placeholder elegante na identidade
   da marca (moldura dourada, ornamento ◇, nome da categoria) — nunca uma
   imagem genérica de nutrição. Quando o material não tiver uma capa de
   marca própria (ex: fichas de preenchimento), pode-se usar a própria
   primeira página do PDF como capa (renderizada via `pdftoppm`, mesma
   técnica usada nos outros materiais).
3. Adicione uma entrada em `src/data/materiais.json`:
   ```json
   {
     "id": "identificador-unico",
     "titulo": "Título do material",
     "descricao": "Descrição curta e real do conteúdo.",
     "categorias": ["Uma ou mais categorias existentes, ou uma nova"],
     "arquivo": "/materiais/nome-do-arquivo.pdf",
     "imagem": "/capas/nome-da-capa.jpg",
     "destaque": false,
     "tags": ["tag1", "tag2"]
   }
   ```
   Deixe `"imagem": ""` para usar o placeholder automático.

A busca (título, descrição, categorias, tags) é 100% client-side e
instantânea — nenhuma dependência além do Astro.

Materiais com dados individuais de pacientes (planos nominais, exames
pessoais) **não devem** entrar nesta biblioteca — ela é só para conteúdo
educativo genérico.

### Como adicionar um novo vídeo

O vídeo precisa já estar público no YouTube. Só é preciso adicionar uma
entrada em `src/data/videos.json`:
```json
{
  "id": "identificador-unico",
  "titulo": "Título do vídeo",
  "descricao": "Descrição curta e real do conteúdo.",
  "categorias": ["Exames de precisão"],
  "youtubeUrl": "https://youtu.be/XXXXXXXXXXX",
  "destaque": false,
  "tags": ["tag1", "tag2"]
}
```

Por decisão de produto, todo vídeo de coleta de exame deve usar
`"categorias": ["Exames de precisão"]` — essa é a única seção onde tutoriais
em vídeo aparecem na home (o título da seção, "Tutoriais para Coleta de
Exames de Precisão", fica fixo em `index.astro`, independente do nome da
categoria/chip).

A thumbnail é obtida automaticamente do YouTube (`img.youtube.com`) a partir do
`youtubeUrl` — não precisa subir imagem nenhuma. O player só carrega quando o
paciente clica no card (thumbnail + selo de play até lá), para a página não
ficar pesada com vários vídeos incorporados de uma vez; o vídeo abre num modal
dentro da própria biblioteca e é removido do DOM ao fechar (o que também para
a reprodução). A busca enxerga vídeos e documentos juntos, pela mesma lógica.

### Lista de Suplementos Permitidos

Página própria em `/lista-de-suplementos-permitidos/`, com um card de entrada
na home (categoria "Suplementação"). Os produtos ficam em
`src/data/suplementos.json`, agrupados por seção (cada objeto do array é uma
seção com `secao` e `itens`). Para adicionar um produto nessa lista, edite o
JSON — não é preciso tocar em componentes:
```json
{
  "id": "identificador-unico",
  "nome": "Nome do produto",
  "categoria": "colágeno | colágeno neutro | whey | beef protein | proteína | pré-treino | ...",
  "proteinaPorDose": "14 g",
  "goma": "com goma | sem goma | a confirmar | \"\"",
  "cupom": "CODIGO ou \"\"",
  "observacao": "Nota curta, ex: divergência entre sabores, ou \"\"",
  "imagem": "/produtos/nome-da-imagem.jpg ou \"\""
}
```
Deixe `imagem` vazio para usar o placeholder da marca (moldura dourada,
ornamento ◇, categoria, "Foto em breve"). Produtos da seção "Estratégicos"
não mostram `proteinaPorDose` mesmo se o campo vier preenchido — a página
ignora esse campo para essa seção por regra de negócio (produtos que não são
fonte de proteína).

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
