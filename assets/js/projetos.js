/*
  Projetos exibidos na seção "Projetos" da página.

  Para adicionar um projeto, copie um bloco { ... } abaixo, cole depois do
  último (separando com vírgula) e preencha:

    repo         só o nome do repositório, se ele estiver em github.com/pedromnzc
                 (ex.: "brasilia-transit-equity"); se for de outra conta ou
                 organização, use "dono/nome" (ex.: "COATD-Ouvidoria-ANTT/coatd-anonimizacao-publico")
    titulo       nome do projeto como deve aparecer na página
    descricao    uma ou duas frases sobre o que o projeto faz
    tecnologias  lista de tecnologias usadas
    imagem       (opcional) print do projeto, ex.: "assets/img/anonimizacao.png"
                 sem imagem, o projeto ganha uma capa de azulejos própria
    demo         (opcional) link de uma versão publicada do projeto
    destaque     true para mostrar o projeto em tamanho grande (use em só um)

  Todo campo é escrito como  nome: "valor",  e cada linha termina com vírgula.
*/
const PROJETOS = [
  {
    repo: "COATD-Ouvidoria-ANTT/coatd-anonimizacao-publico",
    titulo: "Anonimização de Manifestações de Ouvidoria",
    descricao:
      "Pipeline on-premises da COATD/ANTT que extrai manifestações do Fala.BR, rotula e ofusca dados " +
      "pessoais combinando Regex e modelos de NLP (spaCy e BERTimbau), em conformidade com a LGPD e sem " +
      "envio de dados à nuvem. Roda em Docker, com uma via leve para CPU comum e outra avançada para GPU, " +
      "com objetivo de alcançar qualquer ouvidoria de órgãos públicos.",
    tecnologias: ["Python", "spaCy", "BERTimbau", "Docker"],
    imagem: "",
    demo: "",
    destaque: true,
  },
  {
    repo: "brasilia-transit-equity",
    titulo: "Sincronização do Transporte Coletivo e Desigualdade de Acessibilidade em Brasília",
    descricao:
      "Projeto de pesquisa do UniCEUB, em fase inicial, que investiga como a sincronização dos ônibus " +
      "e a forma urbana de Brasília se combinam para produzir desigualdades de acesso entre as regiões do DF.",
    tecnologias: ["Python", "R", "Quarto"],
    imagem: "",
    demo: "",
    destaque: false,
  },
];
