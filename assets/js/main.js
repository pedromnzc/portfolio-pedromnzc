/* Interações da página: azulejos, projetos do GitHub e navegação. */
(() => {
  "use strict";

  const USUARIO = "pedromnzc";
  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Azulejos ---------- */

  // Desenhos definidos no <svg class="motivos"> do index.html, com o peso de cada sorteio.
  const MOTIVOS = [
    ["quarto", 24],
    ["triangulo", 18],
    ["arcos", 26],
    ["meia", 16],
    ["ponto", 10],
  ];
  const PESO_TOTAL = MOTIVOS.reduce((soma, [, peso]) => soma + peso, 0);

  function sortearMotivo(aleatorio) {
    let x = aleatorio() * PESO_TOTAL;
    for (const [nome, peso] of MOTIVOS) {
      x -= peso;
      if (x < 0) return nome;
    }
    return MOTIVOS[0][0];
  }

  // Sorteio com semente: o mesmo texto gera sempre a mesma sequência,
  // então cada projeto mantém a mesma capa entre visitas.
  function sorteioComSemente(texto) {
    let h = 1779033703 ^ texto.length;
    for (let i = 0; i < texto.length; i++) {
      h = Math.imul(h ^ texto.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return () => {
      h = (h + 0x6d2b79f5) | 0;
      let t = Math.imul(h ^ (h >>> 15), 1 | h);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function criarAzulejo(aleatorio = Math.random) {
    const motivo = sortearMotivo(aleatorio);
    const peca = document.createElement("span");
    peca.className = "azulejo";
    if (motivo === "ponto" && aleatorio() < 0.5) peca.classList.add("azulejo--ipe");
    definirGiro(peca, Math.floor(aleatorio() * 4));
    peca.innerHTML = `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><use href="#m-${motivo}"></use></svg>`;
    return peca;
  }

  // O giro só aumenta (nunca volta a 0) para a peça sempre girar no mesmo sentido.
  function definirGiro(peca, giro) {
    peca.dataset.giro = giro;
    peca.style.setProperty("--giro", giro * 90 + "deg");
  }

  function girar(peca) {
    definirGiro(peca, Number(peca.dataset.giro) + 1);
  }

  function embaralhar(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    return lista;
  }

  // "Assentamento": as peças chegam em ordem sorteada, girando até a posição final.
  function assentar(pecas, duracaoTotal = 1100) {
    if (reduzirMovimento.matches || !Element.prototype.animate) return;
    const ordem = embaralhar(Array.from(pecas));
    const passo = Math.min(45, duracaoTotal / Math.max(ordem.length, 1));
    ordem.forEach((peca, i) => {
      const giro = (Number(peca.dataset.giro) || 0) * 90;
      peca.animate(
        [
          { opacity: 0, transform: `rotate(${giro - 90}deg) scale(.5)` },
          { opacity: 1, transform: `rotate(${giro}deg) scale(1)` },
        ],
        { duration: 560, delay: i * passo, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" }
      );
    });
  }

  // Assenta as peças de um bloco só quando ele aparece na tela
  // (no celular a parede da abertura fica abaixo do texto).
  function assentarAoAparecer(bloco, duracaoTotal = 700) {
    if (!bloco || reduzirMovimento.matches || !("IntersectionObserver" in window)) return;
    bloco.classList.add("a-assentar");
    const observador = new IntersectionObserver((entradas) => {
      if (!entradas.some((e) => e.isIntersecting)) return;
      observador.disconnect();
      assentar(bloco.children, duracaoTotal);
      bloco.classList.remove("a-assentar");
    }, { threshold: 0.3 });
    observador.observe(bloco);
  }

  /* ---------- Parede da abertura ---------- */

  const parede = document.querySelector("[data-parede]");

  if (parede) {
    const JUNTA = 3;

    // Calcula o tamanho das peças e completa ou corta a parede para cobrir a área.
    const ajustarParede = () => {
      const largura = parede.clientWidth - JUNTA;
      const altura = parede.clientHeight - JUNTA;
      if (largura <= 0 || altura <= 0) return;
      const lado = Math.round(Math.min(112, Math.max(60, largura / 6.5)));
      const colunas = Math.ceil(largura / (lado + JUNTA));
      const linhas = Math.ceil(altura / (lado + JUNTA));
      parede.style.setProperty("--lado", lado + "px");
      parede.style.setProperty("--colunas", colunas);
      let diferenca = colunas * linhas - parede.children.length;
      for (; diferenca > 0; diferenca--) parede.append(criarAzulejo());
      for (; diferenca < 0; diferenca++) parede.lastElementChild.remove();
    };

    const sortearParede = () => {
      parede.replaceChildren();
      ajustarParede();
      assentar(parede.children);
    };

    ajustarParede();
    assentarAoAparecer(parede, 1100);
    if ("ResizeObserver" in window) new ResizeObserver(ajustarParede).observe(parede);

    parede.addEventListener("click", (evento) => {
      const peca = evento.target.closest(".azulejo");
      if (peca) girar(peca);
    });

    document.querySelector("[data-sortear]")?.addEventListener("click", sortearParede);

    // De tempos em tempos uma peça gira sozinha, só enquanto a parede está visível.
    let paredeVisivel = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => { paredeVisivel = e.isIntersecting; }).observe(parede);
    }
    setInterval(() => {
      if (!paredeVisivel || document.hidden || reduzirMovimento.matches) return;
      const pecas = parede.children;
      if (pecas.length) girar(pecas[Math.floor(Math.random() * pecas.length)]);
    }, 2800);
  }

  /* ---------- Ícones (ferramentas e contatos) ---------- */

  // Ícones do Simple Icons; os de ICONES_PROPRIOS não existem lá e foram desenhados no style.css.
  const CDN_ICONES = "https://cdn.jsdelivr.net/npm/simple-icons@14.15.0/icons/";
  const ICONES_PROPRIOS = new Set(["powerbi", "windows", "office", "linkedin", "email"]);

  const semAcento = (texto) =>
    String(texto).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

  // Mesma regra de nomes do Simple Icons: "Power BI" → "powerbi", "Node.js" → "nodedotjs".
  const nomeDoIcone = (nome) =>
    semAcento(nome).replace(/\+/g, "plus").replace(/\./g, "dot").replace(/&/g, "and").replace(/[^a-z0-9]/g, "");

  // Liga o ícone ao elemento; se ele não existir no Simple Icons, o elemento fica só com o texto.
  function ligarIcone(elemento, nome, icone) {
    const chave = icone || nomeDoIcone(nome);
    elemento.dataset.icone = chave;
    if (ICONES_PROPRIOS.has(chave)) return;
    const url = CDN_ICONES + encodeURIComponent(chave) + ".svg";
    elemento.style.setProperty("--icone", `url("${url}")`);
    const teste = new Image();
    teste.onerror = () => elemento.classList.add("sem-icone");
    teste.src = url;
  }

  // Lê uma lista de um dos arquivos de conteúdo, ignorando o que estiver vazio.
  const lista = (dados, campo) => (Array.isArray(dados) ? dados : []).filter((item) => item && item[campo]);

  /* ---------- Experiência e formação (de experiencia.js e formacao.js) ---------- */

  const criarMarco = (periodo, titulo, onde, texto) =>
    el("li", { class: "marco" },
      el("p", { class: "marco__quando" }, periodo),
      el("div", {},
        el("h3", {}, titulo),
        onde && el("p", { class: "marco__onde" }, onde),
        texto && el("p", { class: "marco__texto" }, texto)));

  const areaExperiencia = document.querySelector("[data-experiencia]");
  if (areaExperiencia && typeof EXPERIENCIAS !== "undefined") {
    areaExperiencia.replaceChildren(...lista(EXPERIENCIAS, "cargo")
      .map((e) => criarMarco(e.periodo, e.cargo, e.empresa, e.descricao)));
  }

  const areaFormacao = document.querySelector("[data-formacao]");
  if (areaFormacao && typeof FORMACAO !== "undefined") {
    areaFormacao.replaceChildren(...lista(FORMACAO, "curso")
      .map((f) => criarMarco(f.periodo, f.curso, f.instituicao, f.descricao)));
  }

  /* ---------- Ferramentas (de ferramentas.js) ---------- */

  function criarFerramenta({ nome, icone }) {
    const item = el("li", { class: "ferramenta" },
      el("span", { class: "ferramenta__icone", "aria-hidden": "true" }), nome);
    ligarIcone(item, nome, icone);
    return item;
  }

  const areaFerramentas = document.querySelector("[data-ferramentas]");
  if (areaFerramentas && typeof FERRAMENTAS !== "undefined") {
    areaFerramentas.replaceChildren(...lista(FERRAMENTAS, "grupo").map((g) =>
      el("div", { class: "grupo" },
        el("h3", {}, g.grupo),
        el("ul", { class: "ferramentas" }, lista(g.ferramentas, "nome").map(criarFerramenta)))
    ));
  }

  /* ---------- Idiomas (de idiomas.js) ---------- */

  // Do menor para o maior: o nível preenche tantos azulejos quanto a sua posição na lista.
  const NIVEIS = ["Básico", "Intermediário", "Avançado", "Nativo"];

  const areaIdiomas = document.querySelector("[data-idiomas]");
  if (areaIdiomas && typeof IDIOMAS !== "undefined") {
    areaIdiomas.replaceChildren(...lista(IDIOMAS, "idioma").map(({ idioma, nivel }) => {
      const cheios = NIVEIS.findIndex((n) => semAcento(n) === semAcento(nivel || "")) + 1;
      return el("div", { class: "idioma" },
        el("dt", {}, idioma),
        el("dd", {},
          el("span", { class: "nivel", "aria-hidden": "true" },
            NIVEIS.map((_, posicao) => el("i", { class: posicao < cheios ? "cheio" : null }))),
          nivel));
    }));
  }

  /* ---------- Contatos (de contatos.js) ---------- */

  // E-mail abre a tela de escrever do Gmail, com o "Para" e o assunto preenchidos.
  const linkDoEmail = (email) =>
    "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(email) +
    "&su=" + encodeURIComponent("Contato pelo portfólio");

  function criarContato(contato, comDestaque) {
    const botao = el("a", {
      class: "botao" + (comDestaque && contato.destaque ? " botao--cheio" : ""),
      href: contato.email ? linkDoEmail(contato.email) : contato.link,
      target: "_blank", rel: "noopener",
    }, el("span", { class: "botao__icone", "aria-hidden": "true" }), contato.nome);
    ligarIcone(botao, contato.nome, contato.icone || (contato.email ? "email" : null));
    return el("li", {}, botao);
  }

  const contatos = typeof CONTATOS !== "undefined" ? lista(CONTATOS, "nome").filter((c) => c.link || c.email) : [];

  // Abertura: todos os contatos, com o destaque preenchido.
  document.querySelector("[data-contatos-abertura]")
    ?.replaceChildren(...contatos.map((c) => criarContato(c, true)));

  // Seção Contato: o primeiro e-mail vira a frase em destaque; os demais contatos viram botões.
  const email = contatos.find((c) => c.email);
  const chamada = document.querySelector("[data-chamada-email]");
  if (chamada) {
    if (email) {
      chamada.replaceChildren("O jeito mais rápido de falar comigo é por e-mail: ",
        el("a", { href: linkDoEmail(email.email), target: "_blank", rel: "noopener" }, email.email));
    } else {
      chamada.remove();
    }
  }
  document.querySelector("[data-contatos-rodape]")
    ?.replaceChildren(...contatos.filter((c) => c !== email).map((c) => criarContato(c, false)));

  /* ---------- Rodapé e animação das ferramentas ---------- */

  const rodape = document.querySelector("[data-rodape]");
  if (rodape) {
    const quantidade = Math.ceil(Math.max(window.screen.width, window.innerWidth) / 59) + 1;
    for (let i = 0; i < quantidade; i++) rodape.append(criarAzulejo());
    assentarAoAparecer(rodape);
  }

  document.querySelectorAll(".ferramentas").forEach(assentarAoAparecer);

  /* ---------- Projetos ---------- */

  // Cria um elemento: el("a", { href: "..." }, "texto", outroElemento)
  function el(tag, atributos = {}, ...filhos) {
    const no = document.createElement(tag);
    for (const [nome, valor] of Object.entries(atributos)) {
      if (valor == null || valor === false) continue;
      if (nome === "class") no.className = valor;
      else no.setAttribute(nome, valor);
    }
    for (const filho of filhos.flat()) if (filho) no.append(filho);
    return no;
  }

  const linkExterno = (href, texto, classe) =>
    el("a", { href, class: classe, target: "_blank", rel: "noopener" }, texto);

  // Aceita "nome" (repositório do Pedro), "dono/nome" (de outra conta ou organização)
  // ou o link completo do GitHub.
  function lerRepo(texto) {
    const caminho = String(texto).trim()
      .replace(/^https?:\/\/github\.com\//i, "")
      .replace(/(\.git)?\/*$/i, "");
    const [dono, nome] = caminho.includes("/") ? caminho.split("/") : [USUARIO, caminho];
    return { dono, nome, chave: `${dono}/${nome}`.toLowerCase(), url: `https://github.com/${dono}/${nome}` };
  }

  const formatarData = (iso) =>
    new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(new Date(iso));

  function criarCapa(projeto) {
    const capa = el("a", {
      href: projeto.url, target: "_blank", rel: "noopener",
      tabindex: "-1", "aria-hidden": "true", class: "capa",
    });
    if (projeto.imagem) {
      capa.classList.add("capa--imagem");
      capa.append(el("img", { src: projeto.imagem, alt: "", loading: "lazy" }));
      return capa;
    }
    const aleatorio = sorteioComSemente(projeto.nome);
    for (let i = 0; i < 12; i++) {
      const peca = criarAzulejo(aleatorio);
      peca.style.setProperty("--i", i);
      capa.append(peca);
    }
    return capa;
  }

  function criarProjeto(projeto) {
    const tecnologias = projeto.tecnologias || [];
    return el("article", { class: "projeto" + (projeto.destaque ? " projeto--destaque" : "") },
      criarCapa(projeto),
      el("div", { class: "projeto__corpo" },
        el("h3", {}, linkExterno(projeto.url, projeto.titulo || projeto.nome)),
        projeto.descricao && el("p", { class: "projeto__descricao" }, projeto.descricao),
        tecnologias.length > 0 && el("ul", { class: "etiquetas", "aria-label": "Tecnologias" },
          tecnologias.map((t) => el("li", {}, t))),
        el("p", { class: "projeto__acoes" },
          linkExterno(projeto.url, "Ver repositório", "botao"),
          projeto.demo && linkExterno(projeto.demo, "Abrir demonstração", "botao")),
        el("p", { class: "projeto__info", "data-info": projeto.chave })
      )
    );
  }

  const resumirRepo = (r) => ({ chave: r.full_name.toLowerCase(), atualizado: r.pushed_at });

  // Consulta a API pública do GitHub, guardando a resposta por 10 minutos na aba.
  async function buscarNoGitHub(caminho, resumir) {
    const chave = "github:" + caminho;
    try {
      const salvo = JSON.parse(sessionStorage.getItem(chave));
      if (salvo && Date.now() - salvo.quando < 10 * 60 * 1000) return salvo.dados;
    } catch (_) { /* sem armazenamento: busca de novo */ }

    const resposta = await fetch("https://api.github.com/" + caminho);
    if (!resposta.ok) throw new Error("GitHub respondeu " + resposta.status);
    const dados = resumir(await resposta.json());
    try { sessionStorage.setItem(chave, JSON.stringify({ quando: Date.now(), dados })); } catch (_) {}
    return dados;
  }

  const areaProjetos = document.querySelector("[data-projetos]");
  const projetos = (typeof PROJETOS !== "undefined" && Array.isArray(PROJETOS) ? PROJETOS : [])
    .filter((p) => p && p.repo)
    .map((p) => ({ ...p, ...lerRepo(p.repo) }));

  // Data do último envio de código no projeto.
  function mostrarData(repo) {
    const info = areaProjetos.querySelector(`[data-info="${CSS.escape(repo.chave)}"]`);
    if (info && repo.atualizado) info.textContent = "Atualizado em " + formatarData(repo.atualizado);
  }

  if (areaProjetos) {
    // Destaque primeiro, depois os demais na ordem do arquivo.
    const ordenados = [...projetos].sort((a, b) => Boolean(b.destaque) - Boolean(a.destaque));
    areaProjetos.replaceChildren(...ordenados.map(criarProjeto));

    // Sem conexão com o GitHub, os projetos continuam na página, só sem a data.
    projetos.forEach((p) => {
      buscarNoGitHub(`repos/${p.dono}/${p.nome}`, resumirRepo)
        .then(mostrarData)
        .catch(() => {});
    });
  }

  /* ---------- Tema claro e escuro ---------- */

  // Sem escolha do visitante, vale o tema do sistema; a escolha fica salva no navegador.
  const raiz = document.documentElement;
  const sistemaEscuro = window.matchMedia("(prefers-color-scheme: dark)");
  const botoesTema = document.querySelectorAll("[data-tema-botao]");
  const COR_DA_BARRA = { claro: "#F3F5F9", escuro: "#0E1838" };

  const temaAtual = () => raiz.dataset.tema || (sistemaEscuro.matches ? "escuro" : "claro");

  function aplicarTema(tema) {
    raiz.dataset.tema = tema;
    // Cor da barra do navegador no celular.
    document.querySelectorAll('meta[name="theme-color"]')
      .forEach((meta) => meta.setAttribute("content", COR_DA_BARRA[tema]));
    botoesTema.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.temaBotao === tema)));
  }

  botoesTema.forEach((botao) => {
    botao.addEventListener("click", () => {
      girar(botao);
      aplicarTema(botao.dataset.temaBotao);
      try { localStorage.setItem("tema", botao.dataset.temaBotao); } catch (_) {}
    });
  });

  const marcarTema = () =>
    botoesTema.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.temaBotao === temaAtual())));
  if (raiz.dataset.tema) aplicarTema(raiz.dataset.tema);
  else marcarTema();
  sistemaEscuro.addEventListener("change", marcarTema);

  /* ---------- Navegação ---------- */

  const linksDoMenu = document.querySelectorAll(".topo nav a");
  const linkPorSecao = new Map([...linksDoMenu].map((a) => [a.getAttribute("href").slice(1), a]));

  if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        linksDoMenu.forEach((a) => a.removeAttribute("aria-current"));
        linkPorSecao.get(entrada.target.id)?.setAttribute("aria-current", "true");
      }
    }, { rootMargin: "-45% 0px -50% 0px" });
    linkPorSecao.forEach((_, id) => {
      const secao = document.getElementById(id);
      if (secao) observador.observe(secao);
    });
  }

  const marcarRolagem = () => document.documentElement.classList.toggle("rolou", window.scrollY > 4);
  window.addEventListener("scroll", marcarRolagem, { passive: true });
  marcarRolagem();
})();
