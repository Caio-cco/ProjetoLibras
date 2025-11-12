import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../cabecalho";
import Rodape from "../rodape";
import "./index.scss";
import { salvarProgresso } from "../salvarProgresso";

export default function Quiz({ banner, titulo, descricao, dif, idCurso }) {

    const url = `http://localhost:5010/quiz/${dif}`;

    const token = localStorage.getItem("authToken");

    const navigate = useNavigate();

    const [perguntas, setPerguntas] = useState([]);
    const [rodadaAtual, setRodadaAtual] = useState(1);
    const [perguntaAtual, setPerguntaAtual] = useState(null);
    const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [acertosTotais, setAcertosTotais] = useState(0);
    const [errosTotais, setErrosTotais] = useState(0);
    const [modalData, setModalData] = useState(null);
    const [opcoesStatus, setOpcoesStatus] = useState({});
    const [carregando, setCarregando] = useState(true);

    const perguntasPlaceholder = [
        {
            pergunta: "Carregando perguntas...",
            opcoes: ["Aguarde..."],
            respostaCorreta: "Aguarde...",
        },
    ];

    async function carregarPerguntas() {
        try {
            const res = await fetch(url, {
                headers: token ? { "x-access-token": token } : undefined,
            });

            const data = await res.json();

            if (data.perguntas && data.respostas) {
                const perguntasComRespostas = data.perguntas.map((p) => {
                    const respostasDaPergunta = data.respostas.filter(
                        (r) => r.id_pergunta === p.id_pergunta
                    );

                    const opcoes = respostasDaPergunta.map((r) => r.texto);
                    const respostaCorreta = respostasDaPergunta.find((r) => r.correta === 1)?.texto || "";

                    return {
                        pergunta: p.enunciado,
                        opcoes,
                        respostaCorreta,
                    };
                });

                setPerguntas(perguntasComRespostas.slice(0, 5));
            }
            else {
                setPerguntas(perguntasPlaceholder);
            }

        } catch (e) {
            setPerguntas(perguntasPlaceholder);
        }

        setCarregando(false);
    }

    useEffect(() => {
        carregarPerguntas();
    }, []);

    useEffect(() => {
        if (perguntas.length > 0) {
            setPerguntaAtual(perguntas[rodadaAtual - 1]);
            setOpcaoSelecionada(null);
            setFeedback(null);
            setOpcoesStatus({});
        }
    }, [rodadaAtual, perguntas]);

    const totalRodadas = perguntas.length;

    function selecionarOpcao(opcao) {
        if (feedback || modalData || !perguntaAtual) return;


        if (perguntaAtual.pergunta === "Carregando perguntas...") return;

        setOpcaoSelecionada(opcao);
        checarResposta(opcao);
    }

    function avancarOuFinalizar(finalScore, finalErrors) {
        const scoreParaModal = finalScore !== undefined ? finalScore : acertosTotais;
        const errorsParaModal = finalErrors !== undefined ? finalErrors : errosTotais;

        if (rodadaAtual < totalRodadas) {
            setRodadaAtual((ant) => ant + 1);
        } else {
            const mensagem =
                scoreParaModal === totalRodadas
                    ? "Parabéns! Você acertou todas as perguntas!"
                    : `Quiz concluído! Você acertou ${scoreParaModal} de ${totalRodadas}.`;

            const progresso = Math.round((scoreParaModal / totalRodadas) * 100);

            salvarProgresso({
                idAtividade: idCurso,
                progresso,
            });

            setModalData({
                mensagem,
                acertos: scoreParaModal,
                erros: errorsParaModal,
                total: totalRodadas,
                tipo: "fim",
            });
        }
    }

    function checarResposta(opcao) {
        const respostaCorreta = perguntaAtual.respostaCorreta;
        const indexOpcaoCorreta = perguntaAtual.opcoes.indexOf(respostaCorreta);
        const indexOpcaoSelecionada = perguntaAtual.opcoes.indexOf(opcao);

        const acertou = (opcao === respostaCorreta);
        let proximoAcertoTotal = acertosTotais;
        let proximoErroTotal = errosTotais;

        if (acertou) {
            setFeedback("certo");
            proximoAcertoTotal += 1;
            setAcertosTotais((ant) => ant + 1);
            setOpcoesStatus({ [indexOpcaoSelecionada]: "certo" });

            setTimeout(() => {
                avancarOuFinalizar(proximoAcertoTotal, proximoErroTotal);
            }, 1000);
        } else {
            setFeedback("errado");
            proximoErroTotal += 1;
            setErrosTotais((ant) => ant + 1);
            setOpcoesStatus({
                [indexOpcaoSelecionada]: "errado",
                [indexOpcaoCorreta]: "certo",
            });

            setTimeout(() => {
                avancarOuFinalizar(proximoAcertoTotal, proximoErroTotal);
            }, 2000);
        }
    }

    const handleRefazer = () => {
        setRodadaAtual(1);
        setAcertosTotais(0);
        setErrosTotais(0);
        setModalData(null);
    };

    const handleVoltarAtividades = () => {
        navigate("/atividades");
    };

    const porcentagem = totalRodadas
        ? Math.round((rodadaAtual / totalRodadas) * 100)
        : 0;

    const mapeamentoLetra = (indice) => String.fromCharCode(65 + indice);

    const FeedbackModal = ({ mensagem, acertos, erros, total, onRefazer, onVoltarAtividades, tipo }) => {
        const totalQuestoes = acertos + erros;

        return (
            <div className="modal-overlay">
                <div className={`modal-content ${tipo}`}>
                    <h3>{mensagem}</h3>

                    {tipo === "fim" && (
                        <>
                            <p>
                                Seu placar final: <strong>{acertos} acertos | {erros} erros</strong> (Total: {totalQuestoes})
                            </p>
                            <div className="modal-actions">
                                <button className="btn-voltar" onClick={onVoltarAtividades}>
                                    Voltar para Atividades
                                </button>
                                <button className="btn-refazer" onClick={onRefazer}>
                                    Refazer Quiz
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="quiz-basico">

            {modalData && (
                <FeedbackModal
                    mensagem={modalData.mensagem}
                    acertos={modalData.acertos}
                    erros={modalData.erros}
                    total={modalData.total}
                    onRefazer={handleRefazer}
                    onVoltarAtividades={handleVoltarAtividades}
                    tipo={modalData.tipo}
                />
            )}

            <Cabecalho logado={true} />

            <div className="banner-conteudo quiz-banner">
                <img src={banner} className="banner-imagem" />
                <div className="banner-texto-overlay">

                    <h1>{titulo}</h1>
                    <p>{descricao}</p>
                </div>
            </div>

            {!perguntaAtual && (
                <p style={{ textAlign: "center" }}>Carregando...</p>
            )}

            {perguntaAtual && (
                <>
                    <section className="progresso-area">
                        <div className="barra-progresso">
                            <div className="preenchimento" style={{ width: `${porcentagem}%` }} />
                        </div>
                        <div className="legenda-progresso">
                            {rodadaAtual} de {totalRodadas} (Acertos: {acertosTotais} | Erros: {errosTotais})
                        </div>
                    </section>

                    <main className="conteudo" aria-busy={!!feedback || !!modalData}>
                        <div className="card">
                            <h2>{perguntaAtual.pergunta}</h2>

                            <div className="opcoes-quiz">

                                {perguntaAtual.opcoes.map((opcao, i) => {
                                    const status =
                                        opcoesStatus[i] ||
                                        (opcao === opcaoSelecionada ? feedback : null);

                                    const desabilitado = !!feedback || !!modalData;

                                    return (
                                        <button
                                            key={i}
                                            type="button"
                                            className={`botao-opcao ${status ? status : ""}`}
                                            onClick={() => selecionarOpcao(opcao)}
                                            disabled={desabilitado}
                                        >
                                            <span className={`letra-opcao ${status ? status : ""}`}>
                                                {mapeamentoLetra(i)}
                                            </span>
                                            {opcao}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </main>
                </>
            )}

            <Rodape />
        </div>
    );
}