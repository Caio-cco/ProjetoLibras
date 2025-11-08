import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";
import "./index.scss";

const API_URL = 'http://localhost:5010/frases-quiz';

const DADOS_INICIAIS_ESTATICOS = [
  {
    id: 1,
    frase: "Eu gosto de estudar LIBRAS",
    respostaCorreta: [
      "/sinais/eu.png",
      "/sinais/gostar.png",
      "/sinais/estudar.png",
      "/sinais/libras.png"
    ],
    palavrasDisponiveis: [
      { caminho: "/sinais/eu.png", label: "EU" },
      { caminho: "/sinais/gostar.png", label: "GOSTAR" },
      { caminho: "/sinais/estudar.png", label: "ESTUDAR" },
      { caminho: "/sinais/libras.png", label: "LIBRAS" },
      { caminho: "/sinais/voce.png", label: "VOCÊ" },
      { caminho: "/sinais/nao.png", label: "NÃO" }
    ]
  },
  {
    id: 2,
    frase: "Bom dia, tudo bem?",
    respostaCorreta: ["/sinais/bom.png", "/sinais/dia.png", "/sinais/tudo.png", "/sinais/bem.png"],
    palavrasDisponiveis: [
      { caminho: "/sinais/tarde.png", label: "TARDE" },
      { caminho: "/sinais/bom.png", label: "BOM" },
      { caminho: "/sinais/noite.png", label: "NOITE" },
      { caminho: "/sinais/tudo.png", label: "TUDO" },
      { caminho: "/sinais/bem.png", label: "BEM" },
      { caminho: "/sinais/dia.png", label: "DIA" }
    ]
  },
  {
    id: 3,
    frase: "Qual é o seu nome?",
    respostaCorreta: ["/sinais/qual.png", "/sinais/seu.png", "/sinais/nome.png"],
    palavrasDisponiveis: [
      { caminho: "/sinais/qual.png", label: "QUAL" },
      { caminho: "/sinais/seu.png", label: "SEU" },
      { caminho: "/sinais/idade.png", label: "IDADE" },
      { caminho: "/sinais/nome.png", label: "NOME" },
      { caminho: "/sinais/profissao.png", label: "PROFISSÃO" }
    ]
  },
  {
    id: 4,
    frase: "Minha casa é amarela.",
    respostaCorreta: ["/sinais/minha.png", "/sinais/casa.png", "/sinais/amarela.png"],
    palavrasDisponiveis: [
      { caminho: "/sinais/minha.png", label: "MINHA" },
      { caminho: "/sinais/carro.png", label: "CARRO" },
      { caminho: "/sinais/casa.png", label: "CASA" },
      { caminho: "/sinais/azul.png", label: "AZUL" },
      { caminho: "/sinais/amarela.png", label: "AMARELA" }
    ]
  },
  {
    id: 5,
    frase: "Eu quero água agora.",
    respostaCorreta: ["/sinais/eu.png", "/sinais/querer.png", "/sinais/agua.png", "/sinais/agora.png"],
    palavrasDisponiveis: [
      { caminho: "/sinais/voce.png", label: "VOCÊ" },
      { caminho: "/sinais/querer.png", label: "QUERER" },
      { caminho: "/sinais/agua.png", label: "ÁGUA" },
      { caminho: "/sinais/comida.png", label: "COMIDA" },
      { caminho: "/sinais/agora.png", label: "AGORA" },
      { caminho: "/sinais/eu.png", label: "EU" }
    ]
  },
];

const FeedbackModal = ({ mensagem, acertos, total, onRefazer, onVoltarAtividades, tipo }) => {
  return (
    <div className="modal-overlay">
      <div className={`modal-content ${tipo}`}>
        <h3>{mensagem}</h3>
        {tipo === 'fim' && (
          <>
            <p>Seu placar final: <strong>{acertos} de {total}</strong></p>
            <div className="modal-actions">
              <button className="btn-voltar" onClick={onVoltarAtividades}>Voltar para Atividades</button>
              {acertos < Math.ceil(total * 0.6) && (<button className="btn-refazer" onClick={onRefazer}>Refazer Atividade</button>)}
            </div>
          </>
        )}
        {(tipo === 'certo-rodada' || tipo === 'erro-rodada') && (
          <div className="modal-actions">
            <button className="btn-continuar" onClick={onVoltarAtividades}>Próximo</button>
          </div>
        )}
      </div>
    </div>
  );
};

const FraseMontadaDisplay = ({ fraseMontada, onRemover, getCampoRespostaClass }) => (
  <div className={`${getCampoRespostaClass()} imagem-container`} onClick={onRemover}>
    {fraseMontada.length > 0 ? (
      fraseMontada.map((caminho, index) => (
        <img key={index} src={caminho} alt={`Sinal ${index + 1}`} className="sinal-montado-img" />
      ))
    ) : ("Clique nos sinais abaixo para montar a frase")}
  </div>
);

const RespostaCorretaDisplay = ({ respostaCorreta }) => (
  <div className="resposta-correta-display imagem-container">
    {respostaCorreta.map((caminho, index) => (
      <img key={index} src={caminho} alt={`Sinal Correto ${index + 1}`} className="sinal-montado-img" />
    ))}
  </div>
);


export default function JogoDasFrasesImagens() {
  const [frasesCarregadas, setFrasesCarregadas] = useState(DADOS_INICIAIS_ESTATICOS);
  const [isLoading, setIsLoading] = useState(false);

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [fraseMontada, setFraseMontada] = useState([]);
  const [statusVerificacao, setStatusVerificacao] = useState(null);
  const [acertos, setAcertos] = useState(0);
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const totalPerguntas = frasesCarregadas.length;
  const perguntaAtual = frasesCarregadas[indiceAtual];

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_URL, {
        headers: { "x-access-token": token },
      });

      if (!res.ok) throw new Error("Falha ao carregar frases.");

      const data = await res.json();

      setFrasesCarregadas(data.frases || []);

    } catch (err) {
      console.error("Erro ao buscar frases:", err);
      if (frasesCarregadas.length === 0) {
        setFrasesCarregadas(DADOS_INICIAIS_ESTATICOS);
      }
    } finally {
      setIsLoading(false);
    }
  }, [token, frasesCarregadas.length]);

  useEffect(() => {
    fetchData();

  }, []);

  const respostaEstaCorreta = useMemo(() => {
    if (!perguntaAtual) return false;
    if (fraseMontada.length !== perguntaAtual.respostaCorreta.length) {
      return false;
    }
    return fraseMontada.every((caminho, index) => caminho === perguntaAtual.respostaCorreta[index]);
  }, [fraseMontada, perguntaAtual]);

  const adicionarPalavra = (palavraCaminho) => {
    if (statusVerificacao || !perguntaAtual) return;
    setFraseMontada([...fraseMontada, palavraCaminho]);
  };

  const removerUltimaPalavra = () => {
    if (statusVerificacao || !perguntaAtual) return;
    setFraseMontada(fraseMontada.slice(0, -1));
  };

  const handleVerificar = () => {
    if (!perguntaAtual) return;
    if (respostaEstaCorreta) {
      setAcertos(prev => prev + 1);
      setStatusVerificacao('correta');
      setModal({ tipo: 'certo-rodada', mensagem: '🎉 Muito bem! Você acertou!' });
    } else {
      setStatusVerificacao('incorreta');
      setModal({ tipo: 'erro-rodada', mensagem: 'Ops! Tente novamente.' });
    }
  };

  const handleProximaFrase = () => {
    if (indiceAtual < totalPerguntas - 1) {
      setIndiceAtual(indiceAtual + 1);
      setFraseMontada([]);
      setStatusVerificacao(null);
      setModal(null);
    } else {
      const mensagemFinal = acertos >= Math.ceil(totalPerguntas * 0.6)
        ? "🎉 Parabéns! Você completou o jogo com sucesso!"
        : "Que tal tentar novamente para melhorar sua pontuação?";

      setModal({ tipo: 'fim', mensagem: mensagemFinal, acertos, total: totalPerguntas });
    }
  };

  const reiniciarJogo = () => {
    setIndiceAtual(0);
    setFraseMontada([]);
    setStatusVerificacao(null);
    setAcertos(0);
    setModal(null);
    fetchData();
  };

  const getCampoRespostaClass = () => {
    if (statusVerificacao === 'correta') return 'campo-resposta correta';
    if (statusVerificacao === 'incorreta') return 'campo-resposta incorreta';
    return 'campo-resposta';
  };

  const isVerificarDisabled = fraseMontada.length === 0 || statusVerificacao !== null || !perguntaAtual;
  const mostrarResultadoCorreto = statusVerificacao === 'correta';


  return (
    <div className="associacao-basico">
      <Cabecalho logado={true} />

      <div className="banner-conteudo">
        <img src="/maovermelha.png" alt="Mão vermelha" className="banner-imagem" />
        <div className="banner-texto">
          <h1>Jogo da Frase (Sinais)</h1>
          <p>Organize os sinais na estrutura correta de LIBRAS</p>
        </div>
      </div>

      <div className="conteudo-principal">
        <div className="card-atividade">

          {isLoading && <div className="loading-state"><p>Tentando carregar dados da API...</p></div>}

          {!perguntaAtual && !isLoading && (
            <div className="loading-state">
              <p>Nenhuma atividade de frase disponível.</p>
              <button className="btn-refazer" onClick={() => navigate('/atividades')}>
                Voltar para Atividades
              </button>
            </div>
          )}

          {perguntaAtual && (
            <>
              <div className="progress-container">
                <span className="pergunta-numero">Frase {indiceAtual + 1} de {totalPerguntas}</span>
                <div className="barra-progresso">
                  <div className="preenchimento" style={{ width: `${((indiceAtual + 1) / totalPerguntas) * 100}%` }}></div>
                </div>
              </div>

              <section className="secao-frase-alvo-visual">
                <h2 className="titulo-frase-alvo">"{perguntaAtual.frase}"</h2>
                <p className="instrucao-quiz">Monte a frase em LIBRAS, clicando nos sinais disponíveis abaixo.</p>
              </section>

              <section className="secao-resposta">
                <div className="area-montagem-frase">
                  <h3 className="titulo-resposta">Sua resposta em Sinais:</h3>
                  <FraseMontadaDisplay
                    fraseMontada={fraseMontada}
                    onRemover={!statusVerificacao ? removerUltimaPalavra : undefined}
                    getCampoRespostaClass={getCampoRespostaClass}
                  />
                </div>

                {mostrarResultadoCorreto && (
                  <div className="feedback-correto">
                    ✅ Resposta correta!
                    <RespostaCorretaDisplay respostaCorreta={perguntaAtual.respostaCorreta} />
                  </div>
                )}

                <div className="area-palavras-disponiveis">
                  <h3 className="titulo-palavras">Sinais disponíveis:</h3>
                  <div className="botoes-palavras">
                    {perguntaAtual.palavrasDisponiveis.map((palavraObj) => (
                      <button
                        key={palavraObj.caminho}
                        className="btn-palavra sinal-img-btn"
                        onClick={() => adicionarPalavra(palavraObj.caminho)}
                        disabled={statusVerificacao}
                        title={`Adicionar ${palavraObj.label}`}
                      >
                        <img src={palavraObj.caminho} alt={palavraObj.label} className="sinal-disponivel-img" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="botoes-acao">
                  {!statusVerificacao && (
                    <button className="btn-verificar" onClick={handleVerificar} disabled={isVerificarDisabled}>Verificar</button>
                  )}
                  {statusVerificacao === 'correta' && (
                    <button className="btn-avancar" onClick={handleProximaFrase}>Próxima Frase »</button>
                  )}
                  {statusVerificacao === 'incorreta' && (
                    <button
                      className="btn-tentar-novamente"
                      onClick={() => { setFraseMontada([]); setStatusVerificacao(null); }}
                    >Tentar Novamente</button>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      </div>

      {modal && (
        <FeedbackModal
          {...modal}
          acertos={acertos}
          total={totalPerguntas}
          onRefazer={reiniciarJogo}
          onVoltarAtividades={() => {
            if (modal.tipo === 'fim') { navigate('/atividades'); } else { handleProximaFrase(); }
          }}
        />
      )}

      <Rodape />
    </div>
  );
}
