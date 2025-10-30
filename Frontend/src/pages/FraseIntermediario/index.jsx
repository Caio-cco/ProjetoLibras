import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";
import "./index.scss";

const frasesQuiz = [
    {
        id: 1,
        frase: "Eu gosto de estudar LIBRAS",
        respostaCorreta: ["EU", "GOSTAR", "ESTUDAR", "LIBRAS"],
        palavrasDisponiveis: ["EU", "GOSTAR", "ESTUDAR", "LIBRAS", "VOCÊ", "NÃO"]
    },
    {
        id: 2,
        frase: "Bom dia, tudo bem?",
        respostaCorreta: ["BOM", "DIA", "TUDO", "BEM"],
        palavrasDisponiveis: ["TARDE", "BOM", "NOITE", "TUDO", "BEM", "DIA"]
    },
    {
        id: 3,
        frase: "Qual é o seu nome?",
        respostaCorreta: ["QUAL", "SEU", "NOME"],
        palavrasDisponiveis: ["QUAL", "SEU", "IDADE", "NOME", "PROFISSÃO"]
    },
    {
        id: 4,
        frase: "Minha casa é amarela.",
        respostaCorreta: ["MINHA", "CASA", "AMARELA"], 
        palavrasDisponiveis: ["MINHA", "CARRO", "CASA", "AZUL", "AMARELA"]
    },
    {
        id: 5,
        frase: "Eu quero água agora.",
        respostaCorreta: ["EU", "QUERER", "ÁGUA", "AGORA"],
        palavrasDisponiveis: ["VOCÊ", "QUERER", "ÁGUA", "COMIDA", "AGORA", "EU"]
    },
];

export default function JogoDasFrasesIntermediario() {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [fraseMontada, setFraseMontada] = useState([]);
  const [statusVerificacao, setStatusVerificacao] = useState(null);
  const [acertos, setAcertos] = useState(0);
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";

  const perguntaAtual = frasesQuiz[indiceAtual];
  const totalPerguntas = frasesQuiz.length;

  const respostaEstaCorreta = useMemo(() => {
      if (!perguntaAtual) return false;
      if (fraseMontada.length !== perguntaAtual.respostaCorreta.length) {
          return false;
      }
      return fraseMontada.every((palavra, index) => palavra === perguntaAtual.respostaCorreta[index]);
  }, [fraseMontada, perguntaAtual]);

  const adicionarPalavra = (palavra) => {
      if (statusVerificacao) return;
      setFraseMontada([...fraseMontada, palavra]);
  };

  const removerUltimaPalavra = () => {
      if (statusVerificacao) return;
      setFraseMontada(fraseMontada.slice(0, -1));
  };

  const FeedbackModal = ({ mensagem, acertos, total, onRefazer, onVoltarAtividades, tipo }) => {
    return (
      <div className="modal-overlay">
        <div className={`modal-content ${tipo}`}>
          <h3>{mensagem}</h3>
          
          {tipo === 'fim' && (
            <>
              <p>Seu placar final: <strong>{acertos} de {total}</strong></p>
              <div className="modal-actions">
                <button className="btn-voltar" onClick={onVoltarAtividades}>
                  Voltar para Atividades
                </button>
                {acertos < Math.ceil(total * 0.6) && (
                  <button className="btn-refazer" onClick={onRefazer}>
                    Refazer Atividade
                  </button>
                )}
              </div>
            </>
          )}
          
          {(tipo === 'certo-rodada' || tipo === 'erro-rodada') && (
            <div className="modal-actions">
              <button className="btn-continuar" onClick={onVoltarAtividades}>
                Próximo
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleVerificar = () => {
    if (respostaEstaCorreta) {
      setAcertos(prev => prev + 1);
      setStatusVerificacao('correta');
      setModal({
        tipo: 'certo-rodada',
        mensagem: '🎉 Muito bem! Você acertou!'
      });
    } else {
      setStatusVerificacao('incorreta');
      setModal({
        tipo: 'erro-rodada',
        mensagem: 'Ops! Tente novamente.'
      });
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
      
      setModal({
        tipo: 'fim',
        mensagem: mensagemFinal,
        acertos,
        total: totalPerguntas
      });
    }
  };

  const reiniciarJogo = () => {
    setIndiceAtual(0);
    setFraseMontada([]);
    setStatusVerificacao(null);
    setAcertos(0);
    setModal(null);
  };

  const getCampoRespostaClass = () => {
      if (statusVerificacao === 'correta') return 'campo-resposta correta';
      if (statusVerificacao === 'incorreta') return 'campo-resposta incorreta';
      return 'campo-resposta';
  };

  const isVerificarDisabled = fraseMontada.length === 0 || statusVerificacao !== null;
  const mostrarResultadoCorreto = statusVerificacao === 'correta';


  return (
    <div className="associacao-basico">
      <Cabecalho logado={true} />

      <div className="banner-conteudo">
        <img 
          src="/maolaranja.png"
          alt="Mão laranja" 
          className="banner-imagem"
        />
        <div className="banner-texto">
          <h1>Jogo da Frase</h1>
          <p>Organize as palavras na estrutura correta de LiBRAS</p>
        </div>
      </div>

      <div className="conteudo-principal">
        <div className="card-atividade">

          <div className="progress-container">
            <span className="pergunta-numero">
              Frase {indiceAtual + 1} de {totalPerguntas}
            </span>
            <div className="barra-progresso">
              <div
                className="preenchimento"
                style={{ width: `${((indiceAtual + 1) / totalPerguntas) * 100}%` }}
              ></div>
            </div>
          </div>

          <section className="secao-video">
            <div className="video-player">
              <iframe
                title="Vídeo de Sinais"
                src={videoUrl}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <p className="instrucao-quiz">Monte a frase em LIBRAS, clicando nas palavras disponíveis.</p>
          </section>

          <section className="secao-resposta">
            <h2 className="titulo-frase-alvo">
              "{perguntaAtual.frase}"
            </h2>

            <div className="area-montagem-frase">
              <h3 className="titulo-resposta">Sua resposta em LIBRAS:</h3>
              <div
                className={getCampoRespostaClass()}
                onClick={!statusVerificacao ? removerUltimaPalavra : undefined}
              >
                {fraseMontada.length > 0 ? (
                  fraseMontada.join(' ')
                ) : (
                  "Clique nas palavras abaixo para montar a frase"
                )}
              </div>
            </div>

            {mostrarResultadoCorreto && (
              <div className="feedback-correto">
                ✅ Resposta correta!
                <div className="resposta-correta-display">
                  {perguntaAtual.respostaCorreta.join(' ')}
                </div>
              </div>
            )}

            <div className="area-palavras-disponiveis">
              <h3 className="titulo-palavras">Palavras disponíveis:</h3>
              <div className="botoes-palavras">
                {perguntaAtual.palavrasDisponiveis.map((palavra) => (
                  <button
                    key={palavra}
                    className="btn-palavra"
                    onClick={() => adicionarPalavra(palavra)}
                    disabled={statusVerificacao}
                  >
                    {palavra}
                  </button>
                ))}
              </div>
            </div>

            <div className="botoes-acao">
              {!statusVerificacao && (
                <button
                  className="btn-verificar"
                  onClick={handleVerificar}
                  disabled={isVerificarDisabled}
                >
                  Verificar
                </button>
              )}

              {statusVerificacao === 'correta' && (
                <button
                  className="btn-avancar"
                  onClick={handleProximaFrase}
                >
                  Próxima Frase »
                </button>
              )}
              {statusVerificacao === 'incorreta' && (
                <button
                  className="btn-tentar-novamente"
                  onClick={() => {
                    setFraseMontada([]);
                    setStatusVerificacao(null);
                  }}
                >
                  Tentar Novamente
                </button>
              )}
            </div>

          </section>
        </div>
      </div>

      {modal && (
        <FeedbackModal
          {...modal}
          acertos={acertos}
          total={totalPerguntas}
          onRefazer={reiniciarJogo}
          onVoltarAtividades={() => {
            if (modal.tipo === 'fim') {
              navigate('/atividades');
            } else {
              handleProximaFrase();
            }
          }}
        />
      )}

      <Rodape />
    </div>
  );
}