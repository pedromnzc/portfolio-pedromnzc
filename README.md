# Portfólio — Pedro Muniz Cherulli

Estudante de Ciência de Dados no UniCEUB e estagiário na ANTT.
Este repositório é o meu currículo online: uma página única, publicada com GitHub Pages,
que reúne experiência, projetos, ferramentas, formação e contato.

**🔗 Site: https://pedromnzc.github.io/portfolio-pedromnzc/**

| Tema claro | Tema escuro |
|---|---|
| ![Abertura do site no tema claro](assets/img/prints/inicio-claro.png) | ![Abertura do site no tema escuro](assets/img/prints/inicio-escuro.png) |

---

## Sumário

- [Sobre o site](#sobre-o-site)
- [O que tem no site](#o-que-tem-no-site)
- [Funcionalidades](#funcionalidades)
- [Como atualizar o site](#como-atualizar-o-site)
  - [Experiência](#experiência)
  - [Projetos](#projetos)
  - [Ferramentas](#ferramentas)
  - [Formação](#formação)
  - [Idiomas](#idiomas)
  - [Contatos](#contatos)
- [Meus projetos](#meus-projetos)
- [Contato](#contato)

---

## Sobre o site

O site é o ponto de partida do meu portfólio: apresenta quem eu sou e leva para os repositórios
dos meus projetos, cada um com o próprio README.

O visual é uma homenagem aos azulejos de **Athos Bulcão**, artista que desenhou painéis para
vários prédios de Brasília. Ele criava poucas peças simples e deixava os operários decidirem a
posição de cada uma, então cada parede saía diferente. No site é igual: a parede de azulejos da
abertura muda a cada visita.

## O que tem no site

| Seção | O que mostra |
|---|---|
| **Abertura** | Nome, um resumo sobre mim, botões de LinkedIn, GitHub e e-mail, e a parede de azulejos |
| **Experiência** | Estágio na ANTT e monitoria no Colégio Rogacionista |
| **Projetos** | Meus projetos, com descrição, tecnologias e link para o repositório |
| **Ferramentas** | As ferramentas que uso, cada uma num azulejo com o seu ícone |
| **Formação** | Graduação, ensino médio e o nível de cada idioma |
| **Contato** | E-mail, LinkedIn e GitHub |

![Seção de projetos](assets/img/prints/projetos.png)

![Seção de ferramentas](assets/img/prints/ferramentas.png)

## Funcionalidades

| Funcionalidade | Como funciona |
|---|---|
| 🧱 **Parede de azulejos** | A cada visita os azulejos são sorteados e montados peça por peça. Clicar em um azulejo faz ele girar, e o botão "Sortear outra parede" monta uma nova. |
| 🌗 **Tema claro e escuro** | Os dois azulejos no canto direito do topo trocam o tema: o branco, com um sol, deixa a página clara; o azul-noite, com uma lua, deixa a página escura. Na primeira visita o site segue o tema do computador ou do celular e, depois, lembra a escolha. |
| 📅 **Projetos atualizados** | Cada projeto mostra sozinho a data da última atualização no GitHub e ganha uma capa de azulejos própria, que gira ao passar o mouse. |
| ✉️ **Contato rápido** | O botão de e-mail abre o Gmail com a mensagem já endereçada para mim. |
| 📱 **Celular** | A página se ajusta a telas pequenas. |
| 🎞️ **Animações suaves** | Quem configurou o computador para reduzir movimento vê a página sem animações. |
| 🖨️ **Impressão** | Ao imprimir, sai só o currículo, sem o menu e sem a parede de azulejos. |

<img src="assets/img/prints/celular.png" alt="O site aberto no celular" width="280">

---

## Como atualizar o site

Cada parte do currículo fica numa lista própria, dentro da pasta `assets/js/`. Para mudar o
site, basta editar a lista, salvar e fazer **commit e push**. O site se atualiza em cerca de um
minuto.

| O que mudar | Arquivo |
|---|---|
| Experiência | `assets/js/experiencia.js` |
| Projetos | `assets/js/projetos.js` |
| Ferramentas | `assets/js/ferramentas.js` |
| Formação | `assets/js/formacao.js` |
| Idiomas | `assets/js/idiomas.js` |
| Contatos | `assets/js/contatos.js` |

> **Dica:** cada item da lista termina com vírgula. Ao copiar uma linha ou um bloco, copie a vírgula junto.
> Nas listas de experiência e formação, o item que estiver em cima aparece primeiro no site.

### Experiência

Abra `assets/js/experiencia.js`, copie um bloco inteiro (de `{` até `},`), cole na posição certa
e preencha:

```js
{
  periodo: "2025 a 2026",
  cargo: "Nome da função",
  empresa: "Onde foi",
  descricao: "Uma ou duas frases sobre o que você fazia.",
},
```

| Campo | O que colocar |
|---|---|
| `periodo` | Quando foi, ex.: `"2025 a 2026"` ou `"Desde 2026"`. |
| `cargo` | O nome da função. |
| `empresa` | A empresa, o órgão ou a escola. |
| `descricao` | *Opcional.* Uma ou duas frases sobre o que você fazia. |

### Projetos

Abra `assets/js/projetos.js`, copie um bloco inteiro, cole logo abaixo do último e preencha:

```js
{
  repo: "nome-do-repositorio",
  titulo: "Nome do projeto",
  descricao: "Uma ou duas frases sobre o que o projeto faz.",
  tecnologias: ["Python", "R"],
  imagem: "",
  demo: "",
  destaque: false,
},
```

| Campo | O que colocar |
|---|---|
| `repo` | O nome do repositório no GitHub. Se ele for de outra conta ou organização, use `dono/nome` (ex.: `COATD-Ouvidoria-ANTT/coatd-anonimizacao-publico`). |
| `titulo` | O nome do projeto como deve aparecer no site. |
| `descricao` | Uma ou duas frases sobre o projeto. |
| `tecnologias` | As tecnologias usadas, entre aspas e separadas por vírgula. |
| `imagem` | *Opcional.* O caminho de um print do projeto, ex.: `"assets/img/meu-projeto.png"`. Sem imagem, o projeto ganha uma capa de azulejos. |
| `demo` | *Opcional.* O link de uma versão publicada do projeto. |
| `destaque` | `true` para mostrar o projeto em tamanho grande no topo da seção. Use em só um. |

### Ferramentas

Abra `assets/js/ferramentas.js` e, no grupo certo, adicione uma linha com o nome da ferramenta,
na posição em que ela deve aparecer:

```js
{ nome: "Jupyter" },
```

O ícone é encontrado sozinho no [Simple Icons](https://simpleicons.org) a partir do nome. Se o
nome do ícone lá for diferente, informe-o em `icone`:

```js
{ nome: "Pacote Office", icone: "office" },
```

Para criar um grupo novo, copie um bloco inteiro de grupo e troque o título:

```js
{
  grupo: "Notebooks",
  ferramentas: [
    { nome: "Jupyter" },
  ],
},
```

> Se o ícone não for encontrado, o azulejo aparece só com o nome da ferramenta.

### Formação

Abra `assets/js/formacao.js`, copie um bloco inteiro, cole na posição certa e preencha:

```js
{
  periodo: "2024 a 2027",
  curso: "Nome do curso",
  instituicao: "Onde, e a situação: ex. UniCEUB, graduação em andamento",
},
```

| Campo | O que colocar |
|---|---|
| `periodo` | Quando foi, ex.: `"2024 a 2027"`. |
| `curso` | O nome do curso. |
| `instituicao` | A instituição e a situação, ex.: `"UniCEUB, graduação em andamento"`. |
| `descricao` | *Opcional.* Uma ou duas frases sobre o curso. |

### Idiomas

Abra `assets/js/idiomas.js` e adicione uma linha com o idioma e o nível:

```js
{ idioma: "Francês", nivel: "Básico" },
```

Cada idioma tem 4 azulejos, e o nível define quantos ficam preenchidos:

| Nível | Azulejos preenchidos |
|---|---|
| Básico | 1 de 4 |
| Intermediário | 2 de 4 |
| Avançado | 3 de 4 |
| Nativo | 4 de 4 |

Para subir de nível, troque só o texto, por exemplo de `"Intermediário"` para `"Avançado"`.

### Contatos

Os contatos aparecem como botões na abertura e na seção Contato. Abra `assets/js/contatos.js` e
adicione uma linha com o nome e o link:

```js
{ nome: "Instagram", link: "https://www.instagram.com/seu-usuario/" },
```

Para um endereço de e-mail, use `email` no lugar de `link`. O botão abre o Gmail com a mensagem
já endereçada, e o primeiro e-mail da lista também aparece em destaque na seção Contato:

```js
{ nome: "E-mail", email: "seu-email@gmail.com" },
```

| Campo | O que colocar |
|---|---|
| `nome` | O texto do botão, ex.: `"Instagram"`. |
| `link` | O endereço da página. |
| `email` | Use no lugar de `link` para um endereço de e-mail. |
| `destaque` | *Opcional.* `true` deixa o botão preenchido na abertura. Use em só um. |
| `icone` | *Opcional.* O nome do ícone no Simple Icons, só se for diferente do nome do contato. |

> Se o ícone não for encontrado, o botão aparece só com o texto.

---

## Meus projetos

| Projeto | Descrição | Tecnologias |
|---|---|---|
| [Anonimização de Manifestações de Ouvidoria](https://github.com/COATD-Ouvidoria-ANTT/coatd-anonimizacao-publico) | Pipeline on-premises que ofusca dados pessoais em manifestações do Fala.BR, em conformidade com a LGPD | Python, spaCy, BERTimbau, Docker |
| [Transporte Coletivo e Acessibilidade em Brasília](https://github.com/pedromnzc/brasilia-transit-equity) | Pesquisa (UniCEUB, fase inicial) sobre sincronização dos ônibus e desigualdade de acesso no DF | Python, R, Quarto |

## Contato

- **LinkedIn:** [pedro-muniz-cherulli](https://www.linkedin.com/in/pedro-muniz-cherulli-04b519306/)
- **GitHub:** [@pedromnzc](https://github.com/pedromnzc)
- **E-mail:** pedromunizcherulli3@gmail.com
