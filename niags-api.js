const NIAGS_SUPABASE_URL =
  "https://mwmfperxmifybalvqjrq.supabase.co";

const NIAGS_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13bWZwZXJ4bWlmeWJhbHZxanJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwODY2ODQsImV4cCI6MjA5NzY2MjY4NH0.frQG4iJtpK2Vdlif7T-3KiQyZQbS7xSwF5z1upEI8Gg";

const niagsSupabase =
  window.supabase.createClient(
    NIAGS_SUPABASE_URL,
    NIAGS_SUPABASE_ANON_KEY
  );

const CHAVE_NIAGS_SESSAO =
  "niagsSessionToken";

const CHAVE_NIAGS_USUARIO =
  "niagsUsuario";

const CHAVE_NIAGS_FASE_ATUAL =
  "niagsFaseAtual";


async function niagsChamarRpc(nomeFuncao, parametros) {
  const { data, error } =
    await niagsSupabase.rpc(
      nomeFuncao,
      parametros
    );

if (error) {
  console.error(
    `Erro em ${nomeFuncao}:`,
    error
  );

  return {
    ok: false,
    mensagem:
      error.message ||
      "erro de conexão com o NIAGS."
  };
}

  if (Array.isArray(data)) {
    return data[0] || {
      ok: false,
      mensagem: "resposta vazia do NIAGS."
    };
  }

  return data;
}


async function niagsLogin(usuario, senha) {
  const resposta =
    await niagsChamarRpc(
      "niags_login",
      {
        usuario,
        senha
      }
    );

  if (resposta.ok) {
    localStorage.setItem(
      CHAVE_NIAGS_SESSAO,
      resposta.session_token
    );

    localStorage.setItem(
      CHAVE_NIAGS_USUARIO,
      resposta.nome
    );

    localStorage.setItem(
      CHAVE_NIAGS_FASE_ATUAL,
      String(resposta.fase_atual)
    );
  }

  return resposta;
}


async function niagsStatus() {
  const token =
    localStorage.getItem(CHAVE_NIAGS_SESSAO);

  return niagsChamarRpc(
    "niags_status",
    {
      token
    }
  );
}


async function niagsChecarFase(numeroDaFase) {
  const token =
    localStorage.getItem(CHAVE_NIAGS_SESSAO);

  return niagsChamarRpc(
    "niags_checar_fase",
    {
      token,
      fase_numero: numeroDaFase
    }
  );
}


async function niagsValidarResposta(numeroDaFase, respostaEnviada) {
  const token =
    localStorage.getItem(CHAVE_NIAGS_SESSAO);

  return niagsChamarRpc(
    "niags_validar_resposta",
    {
      token,
      fase_numero: numeroDaFase,
      resposta_enviada: respostaEnviada
    }
  );
}


async function niagsRevelarResposta(numeroDaFase) {
  const token =
    localStorage.getItem(CHAVE_NIAGS_SESSAO);

  return niagsChamarRpc(
    "niags_revelar_resposta",
    {
      token,
      fase_numero: numeroDaFase
    }
  );
}

async function niagsChamarRpcLista(nomeFuncao, parametros) {
  const { data, error } =
    await niagsSupabase.rpc(
      nomeFuncao,
      parametros
    );

  if (error) {
    console.error(
      `Erro em ${nomeFuncao}:`,
      error
    );

    return [
      {
        ok: false,
        mensagem:
          error.message ||
          "erro de conexão com o NIAGS."
      }
    ];
  }

  return data || [];
}


async function niagsRanking() {
  const token =
    localStorage.getItem(CHAVE_NIAGS_SESSAO);

  return niagsChamarRpcLista(
    "niags_ranking",
    {
      token
    }
  );
}

function niagsLimparSessao() {
  localStorage.removeItem(CHAVE_NIAGS_SESSAO);
  localStorage.removeItem(CHAVE_NIAGS_USUARIO);
  localStorage.removeItem(CHAVE_NIAGS_FASE_ATUAL);
}
