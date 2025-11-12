import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../cabecalho";
import Rodape from "../rodape";
import "./index.scss";
import { salvarProgresso } from "../salvarProgresso";

const FeedbackModal = ({ mensagem, acertos, total, onRefazer, onVoltarAtividades, tipo }) => {
  if (tipo !== 'fim') {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${tipo}`}>
        <h3>{mensagem}</h3>

        {tipo === 'fim' && (
          <>
            <p>Sua pontuação final: <strong>{acertos} / {total} etapas</strong></p>
            <div className="modal-actions">
              <button className="btn-voltar" onClick={onVoltarAtividades}>
                Voltar para Atividades
              </button>
              <button className="btn-refazer" onClick={acertos < total ? onRefazer : onVoltarAtividades}>
                {acertos < total ? "Refazer Atividade" : "Próxima Atividade"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function AssosiacaoAtividade({ banner, titulo, descricao, idInicial, idFinal, idCurso }) {

  const [todosParesCarregados, setTodosParesCarregados] = useState([]);

  const totalEtapasFixas = 5;
  const [totalEtapas, setTotalEtapas] = useState(totalEtapasFixas);

  const [paresPorEtapa, setParesPorEtapa] = useState(0);
  const [etapaAtual, setEtapaAtual] = useState(1);

  const [paresRestantesEtapa, setParesRestantesEtapa] = useState([]);
  const [acertosEtapa, setAcertosEtapa] = useState(0);
  const [acertosTotais, setAcertosTotais] = useState(0);

  const [sinaisExibidos, setSinaisExibidos] = useState([]);
  const [significadosExibidos, setSignificadosExibidos] = useState([]);

  const [selecionadoSinal, setSelecionadoSinal] = useState(null);
  const [selecionadoSignificado, setSelecionadoSignificado] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const [modalData, setModalData] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const embaralharArray = (array) => {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const iniciarEtapa = useCallback((paresDaEtapa) => {
    if (!paresDaEtapa || paresDaEtapa.length === 0) {
      setParesRestantesEtapa([]);
      setSinaisExibidos([]);
      setSignificadosExibidos([]);
      setParesPorEtapa(0);
      return;
    }

    setParesRestantesEtapa(paresDaEtapa);
    setParesPorEtapa(paresDaEtapa.length);

    setSinaisExibidos(embaralharArray(paresDaEtapa.map((p) => p.caminhoImagem)));
    setSignificadosExibidos(embaralharArray(paresDaEtapa.map((p) => p.significado)));

    setSelecionadoSinal(null);
    setSelecionadoSignificado(null);
    setFeedback(null);
    setAcertosEtapa(0);
  }, []);


  const avancarOuFinalizar = useCallback(async (novosAcertosTotais) => {
    const proximaEtapaIndex = etapaAtual;

    if (proximaEtapaIndex < totalEtapas) {
      setEtapaAtual((ant) => ant + 1);
      setAcertosTotais(novosAcertosTotais);

    } else {
      const mensagem = novosAcertosTotais === totalEtapas
        ? "Parabéns! Você completou todas as atividades!"
        : `Atividade concluída! Você completou ${novosAcertosTotais} de ${totalEtapas} etapas.`;

      const progresso = Math.round((novosAcertosTotais / totalEtapas) * 100);

      await salvarProgresso({
        idAtividade: idCurso,
        progresso,
      });

      setModalData({
        mensagem,
        acertos: novosAcertosTotais,
        total: totalEtapas,
        tipo: 'fim'
      });
    }
  }, [etapaAtual, totalEtapas, token]);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:5010/sinais/${idInicial}/${idFinal}`, {
        headers: { "x-access-token": token },
      });

      if (!res.ok) throw new Error("Falha ao carregar dados.");

      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        const todosPares = data.map((item) => ({
          caminhoImagem: `http://localhost:5010${item.url_imagem}`,
          significado: item.descricao,
        }));

        const paresPorBloco = Math.ceil(todosPares.length / totalEtapasFixas);

        const etapas = [];
        for (let i = 0; i < totalEtapasFixas; i++) {
          const inicio = i * paresPorBloco;
          const fim = inicio + paresPorBloco;
          const paresDoBloco = todosPares.slice(inicio, fim);
          if (paresDoBloco.length > 0) {
            etapas.push(paresDoBloco);
          }
        }

        const numEtapasReais = etapas.length;

        setTodosParesCarregados(etapas);
        setTotalEtapas(numEtapasReais);
        setEtapaAtual(1);

        if (numEtapasReais > 0) {
          iniciarEtapa(etapas[0]);
        } else {
          setTotalEtapas(0);
        }

      } else {
        setTodosParesCarregados([]);
        setTotalEtapas(0);
      }
    } catch (err) {
      console.error("Erro ao buscar pares de associação:", err);
      setTodosParesCarregados([]);
      setTotalEtapas(0);
    }
  };

  useEffect(() => {
    if (todosParesCarregados.length === 0 && totalEtapas === totalEtapasFixas) {
      fetchData();
    } else if (etapaAtual > 1 && etapaAtual <= totalEtapas) {
      const proximaEtapaIndex = etapaAtual - 1;
      iniciarEtapa(todosParesCarregados[proximaEtapaIndex]);
    }
  }, [todosParesCarregados, totalEtapas, etapaAtual]);


  const tentarChecar = useCallback((indSinal, indSignificado) => {
    if (indSinal === null || indSignificado === null || feedback || modalData) return;

    const sinalEscolhido = sinaisExibidos[indSinal];
    const significadoEscolhido = significadosExibidos[indSignificado];

    const pareado = paresRestantesEtapa.find(
      (p) => p.caminhoImagem === sinalEscolhido && p.significado === significadoEscolhido
    );

    if (pareado) {
      setFeedback("certo");

      const novosAcertosEtapa = acertosEtapa + 1;
      setAcertosEtapa(novosAcertosEtapa);

      const novosSinais = sinaisExibidos.filter((_, i) => i !== indSinal);
      const novosSignificados = significadosExibidos.filter((_, i) => i !== indSignificado);

      const novosParesRestantes = paresRestantesEtapa.filter(p => p !== pareado);

      setTimeout(() => {
        setFeedback(null);
        setSelecionadoSinal(null);
        setSelecionadoSignificado(null);
        setSinaisExibidos(novosSinais);
        setSignificadosExibidos(novosSignificados);
        setParesRestantesEtapa(novosParesRestantes);

        if (novosAcertosEtapa === paresPorEtapa && totalEtapas > 0) {
          avancarOuFinalizar(acertosTotais + 1);
        }
      }, 700);

    } else {
      setFeedback("errado");
      setTimeout(() => {
        setFeedback(null);
        setSelecionadoSinal(null);
        setSelecionadoSignificado(null);
      }, 700);
    }
  }, [acertosEtapa, feedback, modalData, paresRestantesEtapa, sinaisExibidos, significadosExibidos, avancarOuFinalizar, acertosTotais, paresPorEtapa, totalEtapas]);

  function selecionarSinal(indice) {
    if (feedback || modalData) return;
    setSelecionadoSinal(indice);
    tentarChecar(indice, selecionadoSignificado);
  }

  function selecionarSignificado(indice) {
    if (feedback || modalData) return;
    setSelecionadoSignificado(indice);
    tentarChecar(selecionadoSinal, indice);
  }

  const handleRefazer = () => {
    setEtapaAtual(1);
    setAcertosTotais(0);
    setModalData(null);

    if (todosParesCarregados.length > 0) {
      iniciarEtapa(todosParesCarregados[0]);
    } else {
      fetchData();
    }
  };

  const handleVoltarAtividades = () => {
    setModalData(null);
    navigate("/atividades");
  };

  const porcentagem = totalEtapas > 0 ? Math.round((etapaAtual / totalEtapas) * 100) : 0;
  const exibirConteudo = todosParesCarregados.length > 0 && totalEtapas > 0;

  return (
    <div className="associacao-basico">
      {modalData && (
        <FeedbackModal
          mensagem={modalData.mensagem}
          acertos={modalData.acertos}
          total={modalData.total}
          onRefazer={handleRefazer}
          onVoltarAtividades={handleVoltarAtividades}
          tipo={modalData.tipo}
        />
      )}

      <Cabecalho logado={true} />

      <div className="banner-conteudo">
        <img src={banner} className="banner-imagem" />
        <div className="banner-texto">
          <h1>{titulo}</h1>
          <p>{descricao}</p>
        </div>
      </div>

      <section className="progresso-area">
        <div className="barra-progresso">
          <div className="preenchimento" style={{ width: `${porcentagem}%` }} />
        </div>
        <div className="legenda-progresso">
          {exibirConteudo
            ? `Etapa ${etapaAtual} de ${totalEtapas} (Pares acertados: ${acertosEtapa} de ${paresPorEtapa})`
            : totalEtapas === 0
              ? 'Nenhuma atividade disponível.'
              : 'Carregando atividade...'
          }
        </div>
      </section>

      {exibirConteudo && (
        <main className="conteudo" aria-busy={!!modalData}>
          <div className="card">
            <h2>Clique em um sinal e depois em sua letra correspondente</h2>

            <div className="grade">
              <div className="coluna sinais">
                {sinaisExibidos.map((s, i) => {
                  const ativo = selecionadoSinal === i;
                  const destaque = feedback && selecionadoSinal === i;

                  return (
                    <button
                      key={i}
                      type="button"
                      className={`botao-sinal ${ativo ? "ativo" : ""} ${destaque ? (feedback === "certo" ? "certo" : "errado") : ""
                        }`}
                      onClick={() => selecionarSinal(i)}
                      aria-pressed={ativo}
                      disabled={!!modalData}
                    >
                      <img
                        src={s}
                        alt={`Sinal em LIBRAS ${i + 1}`}
                        className="sinal-imagem"
                      />
                    </button>
                  );
                })}
              </div>

              <div className="coluna significados">
                {significadosExibidos.map((s, i) => {
                  const ativo = selecionadoSignificado === i;
                  const destaque = feedback && selecionadoSignificado === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`botao-significado ${ativo ? "ativo" : ""} ${destaque ? (feedback === "certo" ? "certo" : "errado") : ""
                        }`}
                      onClick={() => selecionarSignificado(i)}
                      aria-pressed={ativo}
                      disabled={!!modalData}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      )}

      {!exibirConteudo && totalEtapas === 0 && (
        <main className="conteudo">
          <div className="card">
            <h2>{todosParesCarregados.length === 0 ? "Nenhuma atividade de Associação Básica encontrada." : "Carregando..."}</h2>
            <p>Verifique sua conexão ou a disponibilidade de atividades.</p>
          </div>
        </main>
      )}

      <Rodape />
    </div>
  );
}