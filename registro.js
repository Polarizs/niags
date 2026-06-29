const avisoInicial =
  document.getElementById("avisoInicial");

const botaoProsseguirAviso =
  document.getElementById("botaoProsseguirAviso");

const conteudoRegistro =
  document.getElementById("conteudoRegistro");

const somAdentroRegistro =
  document.getElementById("somAdentroRegistro");


function criarMarcaTemporaria() {
  const marcador =
    document.createElement("span");

  marcador.className =
    "marca-temporaria";

  marcador.textContent =
    [100, 101, 115, 105, 115, 116, 105, 114]
      .map((codigo) => String.fromCharCode(codigo))
      .join("");

  document.body.appendChild(marcador);

  setTimeout(() => {
    marcador.remove();
  }, 6000);
}


function iniciarSequenciaDoAviso() {
  setTimeout(() => {
    avisoInicial.classList.add("mostrar-cabecalho");
  }, 1000);

  setTimeout(() => {
    avisoInicial.classList.add("mostrar-texto");

    criarMarcaTemporaria();
  }, 3000);

  setTimeout(() => {
    avisoInicial.classList.add("mostrar-prosseguir");
  }, 10000);
}


async function iniciarMusicaDoRegistro() {
  if (!somAdentroRegistro) {
    return;
  }

  somAdentroRegistro.volume = 0.15;

  try {
    await somAdentroRegistro.play();
  } catch (erro) {
  console.error("O áudio não tocou:", erro);
}
}


botaoProsseguirAviso.addEventListener("click", async () => {
  await iniciarMusicaDoRegistro();

  avisoInicial.classList.add("saindo");

  setTimeout(() => {
    avisoInicial.hidden = true;

    conteudoRegistro.classList.remove("bloqueado");
    conteudoRegistro.classList.add("liberado");
  }, 1200);
});


iniciarSequenciaDoAviso();


const colunasFases = [
  document.getElementById("colunaFases1"),
  document.getElementById("colunaFases2"),
  document.getElementById("colunaFases3")
];

const nenhumaFase =
  document.getElementById("nenhumaFase");

const botaoFaseAtual =
  document.getElementById("botaoFaseAtual");

const numeroFaseAtual =
  document.getElementById("numeroFaseAtual");

const usuarioRegistro =
  document.getElementById("usuarioRegistro");

const transicaoFase =
  document.getElementById("transicaoFase");

const botaoInstrucoes =
  document.getElementById("botaoInstrucoes");

const telaInstrucoes =
  document.getElementById("telaInstrucoes");

const botaoFecharInstrucoes =
  document.getElementById("botaoFecharInstrucoes");

const botaoRanking =
  document.getElementById("botaoRanking");

const telaRanking =
  document.getElementById("telaRanking");

const botaoFecharRanking =
  document.getElementById("botaoFecharRanking");

const listaRanking =
  document.getElementById("listaRanking");

const CHAVE_FASE_ATUAL =
  "niagsFaseAtual";

const CHAVE_USUARIO =
  "niagsUsuario";

const CHAVE_SESSAO =
  "niagsSessionToken";


const ARQUIVOS_FASES = {
  1: "observacao.html",
  2: "ruina.html",
  3: "penitencia.html",
  4: "desespero.html",
  5: "confusao.html",
  6: "metamorfose.html",
  7: "consequencias.html",
  8: "perigo.html",
  9: "contemplacao.html",
  10: "lamentacao.html"
};


let faseAtualServidor =
  1;


function limparColunas() {
  colunasFases.forEach((coluna) => {
    coluna.innerHTML = "";
  });
}


function criarFasesConcluidas(faseAtual) {
  limparColunas();

  const ultimaFaseConcluida =
    Math.min(faseAtual - 1, 10);

  if (ultimaFaseConcluida <= 0) {
    nenhumaFase.hidden = false;
    return;
  }

  nenhumaFase.hidden = true;

  for (
    let numero = 1;
    numero <= ultimaFaseConcluida;
    numero += 1
  ) {
    const indiceColuna =
      Math.floor((numero - 1) / 7);

    if (indiceColuna >= colunasFases.length) {
      break;
    }

    const item =
      document.createElement("button");

    item.type =
      "button";

    item.className =
      "fase-concluida";

    item.textContent =
      `FASE ${numero}`;

    item.style.animationDelay =
      `${numero * 0.06}s`;

    item.addEventListener("click", () => {
      abrirFase(numero);
    });

    colunasFases[indiceColuna]
      .appendChild(item);
  }
}


function mostrarUsuario(nome) {
  if (!nome) {
    usuarioRegistro.hidden = true;
    return;
  }

  usuarioRegistro.hidden = false;

  usuarioRegistro.textContent =
    `REGISTRO: ${nome.toUpperCase()}`;
}


function abrirFase(numeroDaFase) {
  const arquivo =
    ARQUIVOS_FASES[numeroDaFase];

  if (!arquivo) {
    return;
  }

  transicaoFase.classList.add("ativa");

  setTimeout(() => {
    window.location.href =
      `fases/${arquivo}`;
  }, 900);
}


async function carregarRegistroPeloSupabase() {
  const token =
    localStorage.getItem(CHAVE_SESSAO);

  if (!token) {
    window.location.href =
      "index.html";

    return;
  }

  const status =
    await niagsStatus();

  if (!status.ok) {
    niagsLimparSessao();

    window.location.href =
      "index.html";

    return;
  }

  faseAtualServidor =
    status.fase_atual;

  localStorage.setItem(
    CHAVE_USUARIO,
    status.nome
  );

  localStorage.setItem(
    CHAVE_FASE_ATUAL,
    String(status.fase_atual)
  );

  criarFasesConcluidas(status.fase_atual);

  mostrarUsuario(status.nome);

  if (status.fase_atual > 10) {
    numeroFaseAtual.textContent =
      "PARTE 1 CONCLUÍDA";

    botaoFaseAtual.textContent =
      "AGUARDAR PARTE 2";

    botaoFaseAtual.disabled =
      true;

    botaoFaseAtual.style.cursor =
      "default";

    botaoFaseAtual.style.opacity =
      "0.55";

    return;
  }

  numeroFaseAtual.textContent =
    `FASE ${status.fase_atual}`;
}


botaoFaseAtual.addEventListener(
  "click",
  () => {
    abrirFase(faseAtualServidor);
  }
);


botaoInstrucoes.addEventListener("click", () => {
  telaInstrucoes.hidden = false;
  telaInstrucoes.classList.remove("saindo");

  requestAnimationFrame(() => {
    telaInstrucoes.classList.add("ativa");
  });
});


botaoFecharInstrucoes.addEventListener("click", () => {
  telaInstrucoes.classList.remove("ativa");
  telaInstrucoes.classList.add("saindo");

  setTimeout(() => {
    telaInstrucoes.hidden = true;
    telaInstrucoes.classList.remove("saindo");
  }, 1000);
});


carregarRegistroPeloSupabase();
