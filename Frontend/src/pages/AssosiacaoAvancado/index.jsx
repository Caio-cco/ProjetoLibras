import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";
import "./index.scss";

const API_URL = 'http://localhost:5010/pares-associacao';

const FeedbackModal = ({ mensagem, acertos, total, onRefazer, onVoltarAtividades, tipo }) => {
  if (tipo === 'certo-rodada' || tipo === 'erro-rodada') {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${tipo}`}>
        <h3>{mensagem}</h3>

        {tipo === 'fim' && (
          <>
            <p>Seu placar final: <strong>{acertos} / {total}</strong></p>
            <div className="modal-actions">
              <button className="btn-voltar" onClick={onVoltarAtividades}>
                Voltar para Atividades
              </button>
              {acertos < total && (
                <button className="btn-refazer" onClick={onRefazer}>
                  Refazer Atividade
                </button>
              )}
              {acertos === total && (
                <button className="btn-refazer" onClick={onVoltarAtividades}>
                  Próxima Atividade
                </button>
              )}
            </div>
          </>
        )}

        {tipo === 'erro-pular' && (
          <div className="modal-actions">
            <button className="btn-continuar" onClick={onVoltarAtividades}>
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default function AssosiacaoAvancado() {
  const PARES_POR_RODADA = 3;

  const [todosParesCarregados, setTodosParesCarregados] = useState([]);
  const [totalRodadas, setTotalRodadas] = useState(0);

  const [rodadaAtual, setRodadaAtual] = useState(1);
  const [paresRodada, setParesRodada] = useState([]);
  const [sinais, setSinais] = useState([]);
  const [significados, setSignificados] = useState([]);
  const [selecionadoSinal, setSelecionadoSinal] = useState(null);
  const [selecionadoSignificado, setSelecionadoSignificado] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const [acertosTotais, setAcertosTotais] = useState(0);
  const [errosNaRodada, setErrosNaRodada] = useState(0);
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
  }

  const iniciarRodada = useCallback((paresDaRodada) => {
    if (!paresDaRodada || paresDaRodada.length === 0) return;

    setParesRodada(paresDaRodada);
    setSinais(embaralharArray(paresDaRodada.map((p) => p.caminhoImagem || p.sinal)));
    setSignificados(embaralharArray(paresDaRodada.map((p) => p.significado)));

    setSelecionadoSinal(null);
    setSelecionadoSignificado(null);
    setFeedback(null);
    setErrosNaRodada(0);
  }, []);

  const avancarOuFinalizar = useCallback(() => {
    if (rodadaAtual < totalRodadas) {
      setRodadaAtual((ant) => ant + 1);
    } else {
      const mensagem = acertosTotais === totalRodadas
        ? "Excelente! Você dominou todos os sinais avançados!"
        : `Atividade concluída! Você acertou ${acertosTotais} de ${totalRodadas}.`;

      setModalData({ mensagem, acertos: acertosTotais, total: totalRodadas, tipo: 'fim' });
    }
  }, [rodadaAtual, totalRodadas, acertosTotais]);

  const fetchData = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: { "x-access-token": token },
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      const pares = data.pares || [];

      if (pares.length > 0) {
        setTodosParesCarregados(pares);
        setTotalRodadas(pares.length);
        iniciarRodada(pares[0]);
      } else {
        setTodosParesCarregados([]);
        setTotalRodadas(0);
      }
    } catch (err) {
      setTodosParesCarregados([]);
      setTotalRodadas(0);
    }
  };

  useEffect(() => {
    if (todosParesCarregados.length === 0 && totalRodadas === 0) {
      fetchData();
    }
    else if (rodadaAtual <= totalRodadas && todosParesCarregados.length > 0) {
      iniciarRodada(todosParesCarregados[rodadaAtual - 1]);
    }
  }, [rodadaAtual, todosParesCarregados, iniciarRodada, totalRodadas]);

  const tentarChecar = useCallback((indSinal, indSignificado) => {
    if (indSinal === null || indSignificado === null || feedback || modalData) return;

    const sinalEscolhido = sinais[indSinal];
    const significadoEscolhido = significados[indSignificado];

    const pareado = paresRodada.find(
      (p) => (p.caminhoImagem || p.sinal) === sinalEscolhido && p.significado === significadoEscolhido
    );

    if (pareado) {
      setFeedback("certo");
      setAcertosTotais(ant => ant + 1);

      setTimeout(() => {
        avancarOuFinalizar();
      }, 700);

    } else {
      setFeedback("errado");
      const novosErros = errosNaRodada + 1;
      setErrosNaRodada(novosErros);

      if (novosErros >= 2) {
        setModalData({
          mensagem: "Você errou duas vezes. Esta rodada será pulada. Vamos para a próxima!",
          tipo: 'erro-pular'
        });

        setTimeout(() => {
          setModalData(null);
          avancarOuFinalizar();
        }, 1500);

      } else {
        setTimeout(() => {
          setFeedback(null);
          setSelecionadoSinal(null);
          setSelecionadoSignificado(null);
        }, 700);
      }
    }
  }, [avancarOuFinalizar, errosNaRodada, sinais, significados, paresRodada, feedback, modalData]);

  const selecionarSinal = (indice) => {
    if (feedback || modalData || !paresRodada.length) return;
    setSelecionadoSinal(indice);
    tentarChecar(indice, selecionadoSignificado);
  }

  const selecionarSignificado = (indice) => {
    if (feedback || modalData || !paresRodada.length) return;
    setSelecionadoSignificado(indice);
    tentarChecar(selecionadoSinal, indice);
  }

  const handleRefazer = () => {
    setRodadaAtual(1);
    setAcertosTotais(0);
    setModalData(null);
    if (todosParesCarregados.length > 0) {
      iniciarRodada(todosParesCarregados[0]);
    } else {
      fetchData();
    }
  };

  const handleVoltarAtividades = () => {
    navigate("/atividades");
  };

  const porcentagem = totalRodadas > 0 ? Math.round((rodadaAtual / totalRodadas) * 100) : 0;
  const isGameReady = totalRodadas > 0;

  return (
    <div className="associacao-avancado">
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
        <img src="/maovermelha.png" alt="Mão vermelha" className="banner-imagem" />
        <div className="banner-texto">
          <h1>Associação Avançada</h1>
          <p>Conecte frases e conceitos complexos</p>
        </div>
      </div>

      <section className="progresso-area">
        <div className="barra-progresso">
          <div className="preenchimento" style={{ width: `${porcentagem}%` }} />
        </div>
        <div className="legenda-progresso">
          {isGameReady ?
            `Rodada ${rodadaAtual} de ${totalRodadas} (Acertos: ${acertosTotais})` :
            `Aguardando dados da API...`
          }
        </div>
      </section>

      <main className="conteudo" aria-busy={!!modalData}>
        <div className="card">
          <h2>Clique em um sinal e depois em seu significado</h2>
          {isGameReady && errosNaRodada > 0 &&
            <p className="alerta-erro">Erros nesta rodada: {errosNaRodada}/2</p>
          }

          <div className="grade" style={{ opacity: isGameReady ? 1 : 0.5, pointerEvents: isGameReady ? 'auto' : 'none' }}>
            <div className="coluna sinais">
              {sinais.map((s, i) => {
                const ativo = selecionadoSinal === i;
                const destaque = feedback && selecionadoSinal === i;

                const isImage = s && (s.includes('/') || s.includes('.'));

                return (
                  <button
                    key={i}
                    type="button"
                    className={`botao-sinal ${ativo ? "ativo selecionado" : ""} ${destaque ? (feedback === "certo" ? "certo" : "errado") : ""
                      }`}
                    onClick={() => selecionarSinal(i)}
                    aria-pressed={ativo}
                    disabled={!!modalData}
                  >
                    {isImage ? (
                      <img
                        src={s}
                        alt={`Sinal de Libras ${i + 1}`}
                        className="sinal-imagem"
                      />
                    ) : (
                      <span className="emoji">{s}</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="coluna significados">
              {significados.map((s, i) => {
                const ativo = selecionadoSignificado === i;
                const destaque = feedback && selecionadoSignificado === i;
                return (
                  <button
                    key={i}
                    type="button"
                    className={`botao-significado ${ativo ? "ativo selecionado" : ""} ${destaque ? (feedback === "certo" ? "certo" : "errado") : ""
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

      <Rodape />
    </div>
  );
}