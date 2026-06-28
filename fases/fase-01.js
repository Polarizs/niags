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

const botaoContinuar =
  formResposta.querySelector("button[type='submit']");


const NUMERO_DESTA_FASE =
  1;

const PROXIMA_FASE_PADRAO =
  "ruina.html";


let faseAtualQuandoAbriu =
  null;

let respostaSendoValidada =
  false;


async function verificarAcessoPorBackend() {
  document.body.style.visibility =
    "hidden";

  const resultado =
    await niagsChecarFase(NUMERO_DESTA_FASE);

  if (!resultado.ok || !resultado.permitido) {
    window.location.href =
      "../registro.html";

    return;
  }

  faseAtualQuandoAbriu =
    resultado.fase_atual;

  if (resultado.pode_revelar) {
    areaRespostaRevelada.hidden =
      false;
  }

  document.body.style.visibility =
    "visible";
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


function bloquearResposta() {
  respostaSendoValidada =
    true;

  campoResposta.disabled =
    true;

  botaoContinuar.disabled =
    true;

  botaoContinuar.style.opacity =
    "0.55";

  botaoContinuar.style.cursor =
    "default";
}


function liberarResposta() {
  respostaSendoValidada =
    false;

  campoResposta.disabled =
    false;

  botaoContinuar.disabled =
    false;

  botaoContinuar.style.opacity =
    "";

  botaoContinuar.style.cursor =
    "";

  campoResposta.focus();
}


function irParaRegistro() {
  transicaoFase.classList.add("ativa");

  setTimeout(() => {
    window.location.href =
      "../registro.html";
  }, 900);
}


function irParaProximaFase(arquivo) {
  transicaoFase.classList.add("ativa");

  setTimeout(() => {
    window.location.href =
      arquivo;
  }, 900);
}


formResposta.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  if (respostaSendoValidada) {
    return;
  }

  bloquearResposta();

  const respostaDigitada =
    campoResposta.value;

  const resultado =
    await niagsValidarResposta(
      NUMERO_DESTA_FASE,
      respostaDigitada
    );

  if (resultado.fase_atual) {
    localStorage.setItem(
      "niagsFaseAtual",
      String(resultado.fase_atual)
    );
  }

  if (!resultado.ok) {
    mostrarMensagem(
      resultado.mensagem || "erro ao validar resposta.",
      "erro"
    );

    liberarResposta();
    return;
  }

  if (!resultado.permitido) {
    irParaRegistro();
    return;
  }

  if (resultado.correta) {
    mostrarMensagem(
      "resposta correta.",
      "aviso"
    );

    const estaEraFaseAtual =
      faseAtualQuandoAbriu === NUMERO_DESTA_FASE;

    if (!estaEraFaseAtual) {
      irParaRegistro();
      return;
    }

    const destino =
      resultado.proximo_arquivo ||
      PROXIMA_FASE_PADRAO;

    irParaProximaFase(destino);
    return;
  }

  mostrarMensagem(
    resultado.mensagem || "resposta incorreta.",
    resultado.tipo || "erro"
  );

  liberarResposta();
});


botaoRevelarResposta.addEventListener("click", async () => {
  const resultado =
    await niagsRevelarResposta(NUMERO_DESTA_FASE);

  if (!resultado.ok || !resultado.permitido) {
    mostrarMensagem(
      resultado.mensagem || "resposta ainda não liberada.",
      "erro"
    );

    return;
  }

  botaoRevelarResposta.style.opacity =
    "0";

  botaoRevelarResposta.style.pointerEvents =
    "none";

  setTimeout(() => {
    botaoRevelarResposta.hidden =
      true;

    respostaRevelada.textContent =
      resultado.resposta;

    respostaRevelada.hidden =
      false;
  }, 700);
});


const enigmaBloqueado =
  document.querySelector(".enigma-bloqueado");

if (enigmaBloqueado) {
  enigmaBloqueado.addEventListener("copy", (evento) => {
    evento.preventDefault();
  });

  enigmaBloqueado.addEventListener("cut", (evento) => {
    evento.preventDefault();
  });

  enigmaBloqueado.addEventListener("contextmenu", (evento) => {
    evento.preventDefault();
  });

  enigmaBloqueado.addEventListener("dragstart", (evento) => {
    evento.preventDefault();
  });

  enigmaBloqueado.addEventListener("selectstart", (evento) => {
    evento.preventDefault();
  });
}


verificarAcessoPorBackend();