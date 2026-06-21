const campoResposta =
  document.getElementById("campoResposta");

const botaoContinuar =
  document.getElementById("botaoContinuar");

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

const NUMERO_DESTA_FASE =
  2;

const CHAVE_FASE_ATUAL =
  "niagsFaseAtual";
  
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


botaoRevelarResposta.addEventListener("click", () => {
  botaoRevelarResposta.style.opacity = "0";
  botaoRevelarResposta.style.pointerEvents = "none";

  setTimeout(() => {
    botaoRevelarResposta.hidden = true;
    respostaRevelada.hidden = false;
  }, 700);
});


verificarSeFaseJaFoiConcluida();


function normalizarResposta(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .replace(/-/g, "")
    .trim();
}


function mostrarMensagem(texto, tipo) {
  mensagemResposta.textContent = texto;
  mensagemResposta.className = "mensagem-resposta";

  if (tipo) {
    mensagemResposta.classList.add(tipo);
  }
}


function avancarParaFase03() {
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
    "3"
  );

  setTimeout(() => {
    window.location.href =
      "fase-03.html";
  }, 900);
}


function verificarResposta() {
  const respostaOriginal =
    campoResposta.value;

  const resposta =
    normalizarResposta(respostaOriginal);

  if (!resposta) {
    mostrarMensagem("resposta incorreta.", "erro");
    return;
  }

  if (resposta === "voltar") {
    avancarParaFase03();
    return;
  }

  if (resposta === "codigo") {
    mostrarMensagem("codigo?", "aviso");
    return;
  }

  if (resposta === "morse") {
    mostrarMensagem("ta de sacanagem?", "aviso");
    return;
  }

  if (resposta === "codigomorse") {
    mostrarMensagem("KKKKKKKKKK", "aviso");
    return;
  }

  mostrarMensagem("resposta incorreta.", "erro");
}


botaoContinuar.addEventListener("click", verificarResposta);

campoResposta.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    verificarResposta();
  }
});