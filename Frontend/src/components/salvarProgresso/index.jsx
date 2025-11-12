export async function salvarProgresso({
  idAtividade,
  progresso,
  token = localStorage.getItem("authToken"),
  endpoint = "http://localhost:5010/attprogresso",
}) {
  if (!token) {
    console.warn("Token não encontrado");
    return;
  }

  try {
    const resposta = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        id_curso: idAtividade,
        progresso,
      }),
    });

    const data = await resposta.json();
    console.log("Progresso salvo:", data.resposta);
    return data;
  } catch (error) {
    console.error("Erro ao salvar progresso:", error);
    throw error;
  }
}