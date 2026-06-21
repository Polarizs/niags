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
    console.log("O navegador bloqueou o áudio.", erro);
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

const CHAVE_FASE_ATUAL =
  "niagsFaseAtual";

const CHAVE_USUARIO =
  "niagsUsuario";


function obterFaseAtual() {
  const valorSalvo =
    localStorage.getItem(CHAVE_FASE_ATUAL);

  const numero =
    Number.parseInt(valorSalvo, 10);

  if (
    Number.isInteger(numero) &&
    numero >= 1
  ) {
    return numero;
  }

  localStorage.setItem(
    CHAVE_FASE_ATUAL,
    "1"
  );

  return 1;
}


function limparColunas() {
  colunasFases.forEach((coluna) => {
    coluna.innerHTML = "";
  });
}


function criarFasesConcluidas(faseAtual) {
  limparColunas();

  const quantidadeConcluida =
    faseAtual - 1;

  if (quantidadeConcluida <= 0) {
    nenhumaFase.hidden = false;
    return;
  }

  nenhumaFase.hidden = true;

  for (
    let numero = 1;
    numero <= quantidadeConcluida;
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


function mostrarUsuario() {
  const usuario =
    localStorage.getItem(CHAVE_USUARIO);

  if (!usuario) {
    usuarioRegistro.hidden = true;
    return;
  }

  usuarioRegistro.textContent =
    `REGISTRO: ${usuario.toUpperCase()}`;
}


function abrirFase(faseAtual) {
  const numeroFormatado =
    String(faseAtual).padStart(2, "0");

  transicaoFase.classList.add("ativa");

  setTimeout(() => {
    window.location.href =
      `fases/fase-${numeroFormatado}.html`;
  }, 900);
}


const faseAtual =
  obterFaseAtual();

criarFasesConcluidas(faseAtual);

numeroFaseAtual.textContent =
  `FASE ${faseAtual}`;

mostrarUsuario();


botaoFaseAtual.addEventListener(
  "click",
  () => {
    abrirFase(faseAtual);
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