// import { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import Cabecalho from "../../components/cabecalho";
// import Rodape from "../../components/rodape";
// import "./index.scss";

// const frasesQuiz = [
//   {
//     id: 1,
//     frase: "Eu gosto de estudar LIBRAS",
//     respostaCorreta: [
//       "/sinais/eu.png",
//       "/sinais/gostar.png",
//       "/sinais/estudar.png",
//       "/sinais/libras.png"
//     ],
//     palavrasDisponiveis: [
//       { caminho: "/sinais/eu.png", label: "EU" },
//       { caminho: "/sinais/gostar.png", label: "GOSTAR" },
//       { caminho: "/sinais/estudar.png", label: "ESTUDAR" },
//       { caminho: "/sinais/libras.png", label: "LIBRAS" },
//       { caminho: "/sinais/voce.png", label: "VOCÊ" },
//       { caminho: "/sinais/nao.png", label: "NÃO" }
//     ]
//   },
//   {
//     id: 2,
//     frase: "Bom dia, tudo bem?",
//     respostaCorreta: ["/sinais/bom.png", "/sinais/dia.png", "/sinais/tudo.png", "/sinais/bem.png"],
//     palavrasDisponiveis: [
//       { caminho: "/sinais/tarde.png", label: "TARDE" },
//       { caminho: "/sinais/bom.png", label: "BOM" },
//       { caminho: "/sinais/noite.png", label: "NOITE" },
//       { caminho: "/sinais/tudo.png", label: "TUDO" },
//       { caminho: "/sinais/bem.png", label: "BEM" },
//       { caminho: "/sinais/dia.png", label: "DIA" }
//     ]
//   },
//   {
//     id: 3,
//     frase: "Qual é o seu nome?",
//     respostaCorreta: ["/sinais/qual.png", "/sinais/seu.png", "/sinais/nome.png"],
//     palavrasDisponiveis: [
//       { caminho: "/sinais/qual.png", label: "QUAL" },
//       { caminho: "/sinais/seu.png", label: "SEU" },
//       { caminho: "/sinais/idade.png", label: "IDADE" },
//       { caminho: "/sinais/nome.png", label: "NOME" },
//       { caminho: "/sinais/profissao.png", label: "PROFISSÃO" }
//     ]
//   },
//   {
//     id: 4,
//     frase: "Minha casa é amarela.",
//     respostaCorreta: ["/sinais/minha.png", "/sinais/casa.png", "/sinais/amarela.png"],
//     palavrasDisponiveis: [
//       { caminho: "/sinais/minha.png", label: "MINHA" },
//       { caminho: "/sinais/carro.png", label: "CARRO" },
//       { caminho: "/sinais/casa.png", label: "CASA" },
//       { caminho: "/sinais/azul.png", label: "AZUL" },
//       { caminho: "/sinais/amarela.png", label: "AMARELA" }
//     ]
//   },
//   {
//     id: 5,
//     frase: "Eu quero água agora.",
//     respostaCorreta: ["/sinais/eu.png", "/sinais/querer.png", "/sinais/agua.png", "/sinais/agora.png"],
//     palavrasDisponiveis: [
//       { caminho: "/sinais/voce.png", label: "VOCÊ" },
//       { caminho: "/sinais/querer.png", label: "QUERER" },
//       { caminho: "/sinais/agua.png", label: "ÁGUA" },
//       { caminho: "/sinais/comida.png", label: "COMIDA" },
//       { caminho: "/sinais/agora.png", label: "AGORA" },
//       { caminho: "/sinais/eu.png", label: "EU" }
//     ]
//   },
// ];

// export default function JogoDasFrasesImagens() {
//   const [indiceAtual, setIndiceAtual] = useState(0);
//   const [fraseMontada, setFraseMontada] = useState([]);
//   const [statusVerificacao, setStatusVerificacao] = useState(null);
//   const [acertos, setAcertos] = useState(0);
//   const [modal, setModal] = useState(null);
//   const navigate = useNavigate();

//   const perguntaAtual = frasesQuiz[indiceAtual];
//   const totalPerguntas = frasesQuiz.length;

//   const respostaEstaCorreta = useMemo(() => {
//     if (!perguntaAtual) return false;
//     if (fraseMontada.length !== perguntaAtual.respostaCorreta.length) {
//       return false;
//     }
//     return fraseMontada.every((caminho, index) => caminho === perguntaAtual.respostaCorreta[index]);
//   }, [fraseMontada, perguntaAtual]);

//   const adicionarPalavra = (palavraCaminho) => {
//     if (statusVerificacao) return;
//     setFraseMontada([...fraseMontada, palavraCaminho]);
//   };

//   const removerUltimaPalavra = () => {
//     if (statusVerificacao) return;
//     setFraseMontada(fraseMontada.slice(0, -1));
//   };

//   const FeedbackModal = ({ mensagem, acertos, total, onRefazer, onVoltarAtividades, tipo }) => {
//     return (
//       <div className="modal-overlay">
//         <div className={`modal-content ${tipo}`}>
//           <h3>{mensagem}</h3>

//           {tipo === 'fim' && (
//             <>
//               <p>Seu placar final: <strong>{acertos} de {total}</strong></p>
//               <div className="modal-actions">
//                 <button className="btn-voltar" onClick={onVoltarAtividades}>
//                   Voltar para Atividades
//                 </button>
//                 {acertos < Math.ceil(total * 0.6) && (
//                   <button className="btn-refazer" onClick={onRefazer}>
//                     Refazer Atividade
//                   </button>
//                 )}
//               </div>
//             </>
//           )}

//           {(tipo === 'certo-rodada' || tipo === 'erro-rodada') && (
//             <div className="modal-actions">
//               <button className="btn-continuar" onClick={onVoltarAtividades}>
//                 Próximo
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const handleVerificar = () => {
//     if (respostaEstaCorreta) {
//       setAcertos(prev => prev + 1);
//       setStatusVerificacao('correta');
//       setModal({
//         tipo: 'certo-rodada',
//         mensagem: '🎉 Muito bem! Você acertou!'
//       });
//     } else {
//       setStatusVerificacao('incorreta');
//       setModal({
//         tipo: 'erro-rodada',
//         mensagem: 'Ops! Tente novamente.'
//       });
//     }
//   };

//   const handleProximaFrase = () => {
//     if (indiceAtual < totalPerguntas - 1) {
//       setIndiceAtual(indiceAtual + 1);
//       setFraseMontada([]);
//       setStatusVerificacao(null);
//       setModal(null);
//     } else {
//       const mensagemFinal = acertos >= Math.ceil(totalPerguntas * 0.6)
//         ? "🎉 Parabéns! Você completou o jogo com sucesso!"
//         : "Que tal tentar novamente para melhorar sua pontuação?";

//       setModal({
//         tipo: 'fim',
//         mensagem: mensagemFinal,
//         acertos,
//         total: totalPerguntas
//       });
//     }
//   };

//   const reiniciarJogo = () => {
//     setIndiceAtual(0);
//     setFraseMontada([]);
//     setStatusVerificacao(null);
//     setAcertos(0);
//     setModal(null);
//   };

//   const getCampoRespostaClass = () => {
//     if (statusVerificacao === 'correta') return 'campo-resposta correta';
//     if (statusVerificacao === 'incorreta') return 'campo-resposta incorreta';
//     return 'campo-resposta';
//   };

//   const isVerificarDisabled = fraseMontada.length === 0 || statusVerificacao !== null;
//   const mostrarResultadoCorreto = statusVerificacao === 'correta';


//   // Componente auxiliar para renderizar a frase montada com imagens
//   const FraseMontadaDisplay = ({ fraseMontada, onRemover }) => (
//     <div
//       className={`${getCampoRespostaClass()} imagem-container`}
//       onClick={onRemover}
//     >
//       {fraseMontada.length > 0 ? (
//         fraseMontada.map((caminho, index) => (
//           <img
//             key={index}
//             src={caminho}
//             alt={`Sinal ${index + 1}`}
//             className="sinal-montado-img"
//           />
//         ))
//       ) : (
//         "Clique nos sinais abaixo para montar a frase"
//       )}
//     </div>
//   );

//   // Componente auxiliar para renderizar a resposta correta com imagens
//   const RespostaCorretaDisplay = ({ respostaCorreta }) => (
//     <div className="resposta-correta-display imagem-container">
//       {respostaCorreta.map((caminho, index) => (
//         <img
//           key={index}
//           src={caminho}
//           alt={`Sinal Correto ${index + 1}`}
//           className="sinal-montado-img"
//         />
//       ))}
//     </div>
//   );


//   return (
//     <div className="associacao-basico">
//       <Cabecalho logado={true} />

//       <div className="banner-conteudo">
//         <img
//           src="/mãoazul.png"
//           alt="Mão azul"
//           className="banner-imagem"
//         />
//         <div className="banner-texto">
//           <h1>Jogo da Frase (Sinais)</h1>
//           <p>Organize os sinais na estrutura correta de LIBRAS</p>
//         </div>
//       </div>

//       <div className="conteudo-principal">
//         <div className="card-atividade">

//           <div className="progress-container">
//             <span className="pergunta-numero">
//               Frase {indiceAtual + 1} de {totalPerguntas}
//             </span>
//             <div className="barra-progresso">
//               <div
//                 className="preenchimento"
//                 style={{ width: `${((indiceAtual + 1) / totalPerguntas) * 100}%` }}
//               ></div>
//             </div>
//           </div>

//           {/* Nova seção para exibir a frase alvo */}
//           <section className="secao-frase-alvo-visual">
//             <h2 className="titulo-frase-alvo">
//               "{perguntaAtual.frase}"
//             </h2>
//             <p className="instrucao-quiz">Monte a frase em LIBRAS, clicando nos sinais disponíveis abaixo.</p>
//           </section>

//           <section className="secao-resposta">
//             <div className="area-montagem-frase">
//               <h3 className="titulo-resposta">Sua resposta em Sinais:</h3>
//               <FraseMontadaDisplay
//                 fraseMontada={fraseMontada}
//                 onRemover={!statusVerificacao ? removerUltimaPalavra : undefined}
//               />
//             </div>

//             {mostrarResultadoCorreto && (
//               <div className="feedback-correto">
//                 ✅ Resposta correta!
//                 <RespostaCorretaDisplay
//                   respostaCorreta={perguntaAtual.respostaCorreta}
//                 />
//               </div>
//             )}

//             <div className="area-palavras-disponiveis">
//               <h3 className="titulo-palavras">Sinais disponíveis:</h3>
//               <div className="botoes-palavras">
//                 {perguntaAtual.palavrasDisponiveis.map((palavraObj, index) => (
//                   <button
//                     key={palavraObj.caminho}
//                     className="btn-palavra sinal-img-btn"
//                     onClick={() => adicionarPalavra(palavraObj.caminho)}
//                     disabled={statusVerificacao}
//                     title={`Adicionar ${palavraObj.label}`}
//                   >
//                     <img
//                       src={palavraObj.caminho}
//                       alt={palavraObj.label}
//                       className="sinal-disponivel-img"
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="botoes-acao">
//               {!statusVerificacao && (
//                 <button
//                   className="btn-verificar"
//                   onClick={handleVerificar}
//                   disabled={isVerificarDisabled}
//                 >
//                   Verificar
//                 </button>
//               )}

//               {statusVerificacao === 'correta' && (
//                 <button
//                   className="btn-avancar"
//                   onClick={handleProximaFrase}
//                 >
//                   Próxima Frase »
//                 </button>
//               )}
//               {statusVerificacao === 'incorreta' && (
//                 <button
//                   className="btn-tentar-novamente"
//                   onClick={() => {
//                     setFraseMontada([]);
//                     setStatusVerificacao(null);
//                   }}
//                 >
//                   Tentar Novamente
//                 </button>
//               )}
//             </div>

//           </section>
//         </div>
//       </div>

//       {modal && (
//         <FeedbackModal
//           {...modal}
//           acertos={acertos}
//           total={totalPerguntas}
//           onRefazer={reiniciarJogo}
//           onVoltarAtividades={() => {
//             if (modal.tipo === 'fim') {
//               navigate('/atividades');
//             } else {
//               handleProximaFrase();
//             }
//           }}
//         />
//       )}

//       <Rodape />
//     </div>
//   );
// }


import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";
import "./index.scss";


const API_URL = "http://localhost:5010/frases-quiz";

export default function JogoDasFrasesImagens() {
  const [frasesQuiz, setFrasesQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [fraseMontada, setFraseMontada] = useState([]);
  const [statusVerificacao, setStatusVerificacao] = useState(null);
  const [acertos, setAcertos] = useState(0);
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL, {
          headers: token ? { "x-access-token": token } : undefined,
        });
        if (!res.ok) throw new Error(`Erro ao carregar: ${res.status}`);
        const data = await res.json();



        if (!Array.isArray(data)) throw new Error("Formato de dados inválido (esperado array)");

        setFrasesQuiz(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message || "Erro ao carregar dados.");
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL, token]);

  const perguntaAtual = frasesQuiz[indiceAtual];
  const totalPerguntas = frasesQuiz.length;

  const respostaEstaCorreta = useMemo(() => {
    if (!perguntaAtual) return false;
    if (fraseMontada.length !== perguntaAtual.respostaCorreta.length) return false;
    return fraseMontada.every((caminho, index) => caminho === perguntaAtual.respostaCorreta[index]);
  }, [fraseMontada, perguntaAtual]);

  const adicionarPalavra = (palavraCaminho) => {
    if (statusVerificacao) return;
    setFraseMontada((prev) => [...prev, palavraCaminho]);
  };

  const removerUltimaPalavra = () => {
    if (statusVerificacao) return;
    setFraseMontada((prev) => prev.slice(0, -1));
  };

  const FeedbackModal = ({ mensagem, acertos, total, onRefazer, onVoltarAtividades, tipo }) => {
    return (
      <div className="modal-overlay">
        <div className={`modal-content ${tipo}`}>
          <h3>{mensagem}</h3>

          {tipo === "fim" && (
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

          {(tipo === "certo-rodada" || tipo === "erro-rodada") && (
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
      setAcertos((prev) => prev + 1);
      setStatusVerificacao("correta");
      setModal({ tipo: "certo-rodada", mensagem: "🎉 Muito bem! Você acertou!" });
    } else {
      setStatusVerificacao("incorreta");
      setModal({ tipo: "erro-rodada", mensagem: "Ops! Tente novamente." });
    }
  };

  const handleProximaFrase = () => {
    if (indiceAtual < totalPerguntas - 1) {
      setIndiceAtual((i) => i + 1);
      setFraseMontada([]);
      setStatusVerificacao(null);
      setModal(null);
    } else {
      const mensagemFinal = acertos >= Math.ceil(totalPerguntas * 0.6)
        ? "🎉 Parabéns! Você completou o jogo com sucesso!"
        : "Que tal tentar novamente para melhorar sua pontuação?";

      setModal({ tipo: "fim", mensagem: mensagemFinal, acertos, total: totalPerguntas });
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
    if (statusVerificacao === "correta") return "campo-resposta correta";
    if (statusVerificacao === "incorreta") return "campo-resposta incorreta";
    return "campo-resposta";
  };

  const isVerificarDisabled = fraseMontada.length === 0 || statusVerificacao !== null;
  const mostrarResultadoCorreto = statusVerificacao === "correta";

  const FraseMontadaDisplay = ({ fraseMontada, onRemover }) => (
    <div className={`${getCampoRespostaClass()} imagem-container`} onClick={onRemover}>
      {fraseMontada.length > 0 ? (
        fraseMontada.map((caminho, index) => (
          <img key={index} src={caminho} alt={`Sinal ${index + 1}`} className="sinal-montado-img" />
        ))
      ) : (
        "Clique nos sinais abaixo para montar a frase"
      )}
    </div>
  );

  const RespostaCorretaDisplay = ({ respostaCorreta }) => (
    <div className="resposta-correta-display imagem-container">
      {respostaCorreta.map((caminho, index) => (
        <img key={index} src={caminho} alt={`Sinal Correto ${index + 1}`} className="sinal-montado-img" />
      ))}
    </div>
  );


  return (
    <div className="associacao-basico">
      <Cabecalho logado={true} />

      <div className="banner-conteudo">
        <img src="/mãoazul.png" alt="Mão azul" className="banner-imagem" />
        <div className="banner-texto">
          <h1>Jogo da Frase (Sinais)</h1>
          <p>Organize os sinais na estrutura correta de LIBRAS</p>
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
                style={{ width: `${totalPerguntas ? ((indiceAtual + 1) / totalPerguntas) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          <section className="secao-frase-alvo-visual">
            <h2 className="titulo-frase-alvo">
              "{perguntaAtual ? perguntaAtual.frase : "Carregando..."}"
            </h2>
            <p className="instrucao-quiz">Monte a frase em LIBRAS, clicando nos sinais disponíveis abaixo.</p>
          </section>

          <section className="secao-resposta">
            <div className="area-montagem-frase">
              <h3 className="titulo-resposta">Sua resposta em Sinais:</h3>
              <FraseMontadaDisplay
                fraseMontada={fraseMontada}
                onRemover={!statusVerificacao ? removerUltimaPalavra : undefined}
              />
            </div>

            {mostrarResultadoCorreto && perguntaAtual && (
              <div className="feedback-correto">
                ✅ Resposta correta!
                <RespostaCorretaDisplay respostaCorreta={perguntaAtual.respostaCorreta} />
              </div>
            )}

            <div className="area-palavras-disponiveis">
              <h3 className="titulo-palavras">Sinais disponíveis:</h3>

              {perguntaAtual ? (
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
              ) : (
                <p>Carregando sinais...</p>
              )}
            </div>

            <div className="botoes-acao">
              {!statusVerificacao && (
                <button className="btn-verificar" onClick={handleVerificar} disabled={isVerificarDisabled}>
                  Verificar
                </button>
              )}

              {statusVerificacao === "correta" && (
                <button className="btn-avancar" onClick={handleProximaFrase}>
                  Próxima Frase »
                </button>
              )}

              {statusVerificacao === "incorreta" && (
                <button className="btn-tentar-novamente" onClick={() => { setFraseMontada([]); setStatusVerificacao(null); }}>
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
            if (modal.tipo === "fim") {
              navigate('/atividades');
            } else {
              handleProximaFrase();
            }
          }}
        />
      )}

      <Rodape />

      { }
      {loading && <div className="toasted-loading">Carregando atividade...</div>}
      {error && <div className="toasted-error">{error}</div>}
    </div>
  );
}
