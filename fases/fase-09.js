const formResposta =
  document.getElementById("formResposta");

const campoResposta =
  document.getElementById("campoResposta");

const mensagemResposta =
  document.getElementById("mensagemResposta");

const transicaoFase =
  document.getElementById("transicaoFase");

const areaRespostaRevelada =
  document.getElementById("areaRespostaRevelada");

const botaoRevelarResposta =
  document.getElementById("botaoRevelarResposta");

const respostaRevelada =
  document.getElementById("respostaRevelada");

const codigoEnigma =
  document.getElementById("codigoEnigma");


const CHAVE_FASE_ATUAL =
  "niagsFaseAtual";

const NUMERO_DESTA_FASE =
  9;


function normalizarResposta(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[\s\-_.]/g, "")
    .trim();
}


function mostrarMensagem(texto, tipo) {
  mensagemResposta.textContent =
    texto;

  mensagemResposta.classList.remove(
    "aviso",
    "erro"
  );

  mensagemResposta.classList.add(tipo);
}


function verificarSeFaseJaFoiConcluida() {
  const faseAtualSalva =
    Number.parseInt(
      localStorage.getItem(CHAVE_FASE_ATUAL),
      10
    );

  if (
    Number.isInteger(faseAtualSalva) &&
    faseAtualSalva > NUMERO_DESTA_FASE
  ) {
    areaRespostaRevelada.hidden = false;
  }
}


function concluirFase() {
  const faseAtualSalva =
    Number.parseInt(
      localStorage.getItem(CHAVE_FASE_ATUAL),
      10
    );

  const faseJaConcluida =
    Number.isInteger(faseAtualSalva) &&
    faseAtualSalva > NUMERO_DESTA_FASE;

  transicaoFase.classList.add("ativa");

  if (faseJaConcluida) {
    setTimeout(() => {
      window.location.href =
        "../registro.html";
    }, 900);

    return;
  }

  localStorage.setItem(
    CHAVE_FASE_ATUAL,
    "10"
  );

  setTimeout(() => {
    window.location.href =
      "fase-10.html";
  }, 900);
}


botaoRevelarResposta.addEventListener("click", () => {
  botaoRevelarResposta.style.opacity =
    "0";

  botaoRevelarResposta.style.pointerEvents =
    "none";

  setTimeout(() => {
    botaoRevelarResposta.hidden =
      true;

    respostaRevelada.hidden =
      false;
  }, 700);
});


codigoEnigma.addEventListener("copy", (evento) => {
  evento.preventDefault();
});

codigoEnigma.addEventListener("contextmenu", (evento) => {
  evento.preventDefault();
});


formResposta.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const resposta =
    normalizarResposta(campoResposta.value);

  if (resposta === "algoritmo") {
    concluirFase();
    return;
  }

  if (resposta === "base64") {
    mostrarMensagem(
      "kkk?",
      "aviso"
    );

    return;
  }

  if (resposta === "base32") {
    mostrarMensagem(
      "kkkk?",
      "aviso"
    );

    return;
  }

  if (resposta === "adalovelace") {
    mostrarMensagem(
      "ta, o que que tem?",
      "aviso"
    );

    return;
  }

  mostrarMensagem(
    "resposta incorreta.",
    "erro"
  );
});


verificarSeFaseJaFoiConcluida();