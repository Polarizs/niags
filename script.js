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


function concluirLogin() {
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

    const senhaForte =
      senha.length >= 8 &&
      /[A-Z]/.test(senha) &&
      /[a-z]/.test(senha) &&
      /[0-9]/.test(senha) &&
      /[^A-Za-z0-9]/.test(senha);

    if (!senhaForte) {
      erroLogin.textContent =
        "A senha precisa ter no mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial.";

      return;
    }

    erroLogin.textContent =
      "verificando acesso...";

    const resposta =
      await niagsLogin(usuario, senha);

    if (!resposta.ok) {
      erroLogin.textContent =
        resposta.mensagem ||
        "acesso negado.";

      return;
    }

    erroLogin.textContent = "";

    concluirLogin();
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