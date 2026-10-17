/*
  Ferramentas exibidas na seção "Ferramentas" da página, separadas em grupos.

  Para adicionar uma ferramenta, copie uma linha  { nome: "..." },  e cole no
  grupo certo, na posição em que ela deve aparecer.

    nome   como o nome deve aparecer na página
    icone  (opcional) o nome do ícone em simpleicons.org. Só é preciso quando
           ele for diferente do nome da ferramenta em minúsculas, sem espaços
           nem hífens. Ex.: "Power BI" já vira "powerbi" sozinho.

  Para criar um grupo novo, copie um bloco  { grupo: "...", ferramentas: [ ... ] },
  Se o ícone não for encontrado, o azulejo mostra só o nome da ferramenta.
*/
const FERRAMENTAS = [
  {
    grupo: "Dados e análise",
    ferramentas: [
      { nome: "Python" },
      { nome: "R" },
      { nome: "Quarto" },
      { nome: "PostgreSQL" },
      { nome: "Power BI" },
    ],
  },
  {
    grupo: "Desenvolvimento",
    ferramentas: [
      { nome: "Git" },
      { nome: "GitHub" },
      { nome: "Docker" },
      { nome: "FastAPI" },
    ],
  },
  {
    grupo: "Sistemas e escritório",
    ferramentas: [
      { nome: "Linux" },
      { nome: "Windows" },
      { nome: "Pacote Office", icone: "office" },
    ],
  },
];
