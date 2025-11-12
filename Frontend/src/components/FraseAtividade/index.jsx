import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../cabecalho";
import Rodape from "../rodape";
import "./index.scss";


const API_URL = "http://localhost:5010/frasesAtiv/";

const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
};

export default function JogoDasFrasesImagens({ banner, titulo, descricao, dif, idCurso }) {
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
                const res = await fetch(`${API_URL}${dif}`, {
                    headers: token ? { "x-access-token": token } : undefined,
                });
                if (!res.ok) throw new Error(`Erro ao carregar: ${res.status}`);
                const data = await res.json();

                if (!data.frases || !data.palavras) {
                    throw new Error("Formato inválido: faltam frases ou palavras");
                }
                
                const allWordsMap = new Map();
                data.palavras.forEach(p => {
                    const caminho = `http://localhost:5010/palavrasEFrases/${p.url_img}`;
                    if (!allWordsMap.has(caminho)) {
                        allWordsMap.set(caminho, {
                            label: p.texto_img,
                            caminho: caminho,
                            id_frase: p.id_frase
                        });
                    }
                });
                const allUniqueWords = Array.from(allWordsMap.values());
                const MAX_DISTRACTORS = 4;

                const frasesCompletas = data.frases.map((frase) => {
                    const palavrasCorretas = data.palavras
                        .filter(p => p.id_frase === frase.id_frases)
                        .sort((a, b) => a.posicao - b.posicao);

                    const palavrasCorretasObj = palavrasCorretas.map(p => ({
                        label: p.texto_img,
                        caminho: `http://localhost:5010/palavrasEFrases/${p.url_img}`,
                    }));

                    const correctPaths = new Set(palavrasCorretasObj.map(p => p.caminho));
                    
                    let distractors = allUniqueWords.filter(word => 
                        !correctPaths.has(word.caminho)
                    );

                    distractors = shuffleArray(distractors).slice(0, MAX_DISTRACTORS);
                    
                    const distractorObjs = distractors.map(d => ({
                        label: d.label,
                        caminho: d.caminho,
                    }));

                    let palavrasDisponiveis = [...palavrasCorretasObj, ...distractorObjs];
                    palavrasDisponiveis = shuffleArray(palavrasDisponiveis);

                    return {
                        id: frase.id_frases,
                        frase: frase.texto,
                        nivel: frase.id_dificuldade,
                        palavrasDisponiveis: palavrasDisponiveis,
                        respostaCorreta: palavrasCorretas.map(
                            p => `http://localhost:5010/palavrasEFrases/${p.url_img}`
                        ),
                    };
                });

                setFrasesQuiz(frasesCompletas.slice(0, 5));
                setLoading(false);
            } catch (err) {
                setError(err.message || "Erro ao carregar dados.");
                setLoading(false);
            }
        };

        fetchData();
    }, [dif, token]);

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
                <div className="modal-content fim">
                    <h3>{mensagem}</h3>

                    {tipo === "fim" && (
                        <>
                            <p>Seu placar final: <strong>{acertos} de {total}</strong></p>
                            <div className="modal-actions">
                                <button className="btn-voltar" onClick={onVoltarAtividades}>
                                    Voltar para Atividades
                                </button>
                                <button className="btn-refazer" onClick={onRefazer}>
                                    Refazer Atividade
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    };

    const salvarProgresso = async ({ idAtividade, progresso }) => {
        return Promise.resolve(); 
    };

    const handleProximaFrase = async () => {
        if (indiceAtual < totalPerguntas - 1) {
            setIndiceAtual((i) => i + 1);
            setFraseMontada([]);
            setStatusVerificacao(null);
        } else {
            const mensagemFinal = acertos >= Math.ceil(totalPerguntas * 0.6)
                ? "🎉 Parabéns! Você completou o jogo com sucesso!"
                : "Que tal tentar novamente para melhorar sua pontuação?";

            const progresso = Math.round((acertos / totalPerguntas) * 100);
                        
            await salvarProgresso({
                idAtividade: idCurso,
                progresso,
            });

            setModal({ tipo: "fim", mensagem: mensagemFinal, acertos, total: totalPerguntas });
        }
    };

    const handleVerificar = () => {
        if (respostaEstaCorreta) {
            setAcertos((prev) => prev + 1);
            setStatusVerificacao("correta");
        } else {
            setStatusVerificacao("incorreta");
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
                <img src={banner} className="banner-imagem" />
                <div className="banner-texto">
                    <h1>{titulo}</h1>
                    <p>{descricao}</p>
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

                        {statusVerificacao === "correta" && perguntaAtual && (
                            <div className="feedback-correto">
                                ✅ Resposta correta!
                                <RespostaCorretaDisplay respostaCorreta={perguntaAtual.respostaCorreta} />
                            </div>
                        )}
                        
                        {statusVerificacao === "incorreta" && perguntaAtual && (
                                <div className="feedback-incorreto">
                                    ❌ Resposta incorreta. A resposta correta é:
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

                            {(statusVerificacao === "correta" || statusVerificacao === "incorreta") && (
                                <button className="btn-avancar" onClick={handleProximaFrase}>
                                    Próxima Frase »
                                </button>
                            )}
                        </div>

                    </section>
                </div>
            </div>

            {modal && modal.tipo === "fim" && (
                <FeedbackModal
                    {...modal}
                    acertos={acertos}
                    total={totalPerguntas}
                    onRefazer={reiniciarJogo}
                    onVoltarAtividades={() => navigate('/atividades')}
                />
            )}

            <Rodape />

            {loading && <div className="toasted-loading">Carregando atividade...</div>}
            {error && <div className="toasted-error">{error}</div>}
        </div>
    );
}