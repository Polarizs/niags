const formLogin =
  document.getElementById("formLogin");

const painelAcesso =
  document.getElementById("painelAcesso");

const campoUsuario =
  document.getElementById("usuario");

const campoSenha =
  document.getElementById("senha");

const erroLogin =
  document.getElementById("erroLogin");

const botaoDesafio =
  document.getElementById("botaoDesafio");

const somAdentro =
  document.getElementById("somAdentro");

const transicaoPagina =
  document.getElementById("transicaoPagina");


const CHAVE_USUARIO =
  "niagsUsuario";

const CHAVE_FASE_ATUAL =
  "niagsFaseAtual";


async function iniciarSomAdentro() {
  if (!somAdentro || !somAdentro.paused) {
    return;
  }

  somAdentro.volume = 0.35;

  try {
    await somAdentro.play();
  } catch (erro) {
    console.log(
      "O navegador bloqueou o áudio.",
      erro
    );
  }
}


function mostrarBotaoDesafio() {
  botaoDesafio.classList.add("visivel");
}


function concluirLogin(usuario) {
  /*
    A senha não é salva.

    Guardamos apenas o usuário provisório
    e a fase atual neste navegador.
  */
  localStorage.setItem(
    CHAVE_USUARIO,
    usuario
  );

  if (
    !localStorage.getItem(CHAVE_FASE_ATUAL)
  ) {
    localStorage.setItem(
      CHAVE_FASE_ATUAL,
      "1"
    );
  }

  painelAcesso.classList.add("saindo");

  setTimeout(() => {
    painelAcesso.hidden = true;

    mostrarBotaoDesafio();
  }, 1000);
}


formLogin.addEventListener(
  "submit",
  async (evento) => {
    evento.preventDefault();

    const usuario =
      campoUsuario.value.trim();

    const senha =
      campoSenha.value;

    erroLogin.textContent = "";

    if (!usuario || !senha) {
      erroLogin.textContent =
        "Preencha o usuário e a senha.";

      return;
    }

    if (usuario.length < 3) {
      erroLogin.textContent =
        "O usuário precisa ter pelo menos 3 caracteres.";

      return;
    }

    if (senha.length < 4) {
      erroLogin.textContent =
        "A senha precisa ter pelo menos 4 caracteres.";

      return;
    }

    /*
      O som começa somente após o clique
      em acessar.
    */
    

    concluirLogin(usuario);
  }
);


botaoDesafio.addEventListener(
  "click",
  () => {
    transicaoPagina.classList.add("ativa");

    setTimeout(() => {
      window.location.href =
        "registro.html";
    }, 900);
  }
);