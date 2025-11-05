import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";
import "./index.scss";

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
              {acertos < total ? (
                <button className="btn-refazer" onClick={onRefazer}>
                  Refazer Atividade
                </button>
              ) : (
                <button className="btn-refazer" onClick={onVoltarAtividades}>
                  Próxima Atividade
                </button>
              )}
            </div>
          </>
        )}
        
        {tipo === 'erro-pular' && (
          <div className="modal-actions">
            <button className="btn-continuar" onClick={onRefazer}> 
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function AssosiacaoBasico() {
  const todosPares = [
    { caminhoImagem: "/associacao.png", significado: "Olá / Oi" },
    { caminhoImagem: "/breve.png", significado: "Legal / Beleza" },
    { caminhoImagem: "/frase.png", significado: "Obrigado" },
    { caminhoImagem: "/imagem.png", significado: "Pare / Alto" },
    { caminhoImagem: "/teoria.png", significado: "Parabéns" }
  ];

  const totalRodadas = 5;
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

  function embaralharArray(array) {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function iniciarRodada() {
    const inicio = ((rodadaAtual - 1) * 3) % todosPares.length; 
    
    let paresSelecionados = [];
    for (let i = 0; i < 3; i++) {
        paresSelecionados.push(todosPares[(inicio + i) % todosPares.length]);
    }
    setParesRodada(paresSelecionados);

    setSinais(embaralharArray(paresSelecionados.map((p) => p.caminhoImagem)));
    setSignificados(embaralharArray(paresSelecionados.map((p) => p.significado)));

    setSelecionadoSinal(null);
    setSelecionadoSignificado(null);
    setFeedback(null);
    setErrosNaRodada(0); 
  }

  useEffect(() => {
    iniciarRodada();
    
  }, [rodadaAtual]);

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

  function avancarOuFinalizar() {
    setFeedback(null);
    if (rodadaAtual < totalRodadas) {
      setRodadaAtual((ant) => ant + 1);
    } else {
      const mensagem = acertosTotais === totalRodadas
        ? "Parabéns! Você acertou todos os sinais!"
        : `Atividade concluída! Você acertou ${acertosTotais} de ${totalRodadas}.`;
      
      setModalData({ mensagem, acertos: acertosTotais, total: totalRodadas, tipo: 'fim' });
    }
  }

  function tentarChecar(indSinal, indSignificado) {
    if (indSinal === null || indSignificado === null) return;

    const sinalEscolhido = sinais[indSinal]; 
    const significadoEscolhido = significados[indSignificado];

    const pareado = paresRodada.find(
      (p) => p.caminhoImagem === sinalEscolhido && p.significado === significadoEscolhido
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
            mensagem: "Você errou duas vezes. Esta rodada será pulada. Clique em Continuar para ir para a próxima!", 
            tipo: 'erro-pular' 
        });
      } else {
        setTimeout(() => {
          setFeedback(null);
          setSelecionadoSinal(null);
          setSelecionadoSignificado(null);
        }, 700);
      }
    }
  }
  
  const handleRefazer = () => {
    if (modalData && modalData.tipo === 'erro-pular') {
      setModalData(null);
      avancarOuFinalizar();
    } else {
      setRodadaAtual(1);
      setAcertosTotais(0);
      setModalData(null);
    }
  };
  
  const handleVoltarAtividades = () => {
    setModalData(null); 
    navigate("/atividades");
  };

  const porcentagem = Math.round((rodadaAtual / totalRodadas) * 100);

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
        <img src="/mãoazul.png" alt="Mão azul" className="banner-imagem"/>
        <div className="banner-texto">
          <h1>Associação</h1>
          <p>Conecte os sinais com seus significados</p>
        </div>
      </div>

      <section className="progresso-area">
        <div className="barra-progresso">
          <div className="preenchimento" style={{ width: `${porcentagem}%` }} />
          </div>
        <div className="legenda-progresso">
          {rodadaAtual} de {totalRodadas} (Acertos: {acertosTotais})
        </div>
      </section>

      <main className="conteudo" aria-busy={!!modalData}>
        <div className="card">
          <h2>Clique em um sinal e depois em seu significado</h2>
          {errosNaRodada > 0 && 
            <p className="alerta-erro">Erros nesta rodada: {errosNaRodada}/2</p>
          }

          <div className="grade">
            <div className="coluna sinais">
              {sinais.map((s, i) => {
                const ativo = selecionadoSinal === i;
                const destaque = feedback && selecionadoSinal === i;
                
                return (
                  <button
                    key={i}
                    type="button"
                    className={`botao-sinal ${ativo ? "ativo" : ""} ${
                      destaque ? (feedback === "certo" ? "certo" : "errado") : ""
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
              {significados.map((s, i) => {
                const ativo = selecionadoSignificado === i;
                const destaque = feedback && selecionadoSignificado === i;
                return (
                  <button
                    key={i}
                    type="button"
                    className={`botao-significado ${ativo ? "ativo" : ""} ${
                      destaque ? (feedback === "certo" ? "certo" : "errado") : ""
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