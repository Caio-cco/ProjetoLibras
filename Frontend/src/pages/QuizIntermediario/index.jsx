import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";
import "./index.scss";

const perguntasQuiz = [
    {
        id: 1,
        pergunta: 'Em LIBRAS, qual é o papel principal da Expressão Não-Manual (ENM) na frase "CASA GRANDE" para indicar o tamanho?',
        opcoes: [
            "É usada apenas para dar ênfase, mas não tem valor gramatical.",
            "É obrigatória para expressar o grau de intensidade (o quão grande é a casa).",
            "Substitui o sinal de CLASSIFICADOR.",
            "É usada apenas em diálogos formais."
        ],
        respostaCorreta: "É obrigatória para expressar o grau de intensidade (o quão grande é a casa).",
    },
    {
        id: 2,
        pergunta: 'O que é um Classificador em LIBRAS?',
        opcoes: [
            "Uma palavra que indica a classe gramatical de um sinal.",
            "Sinais que representam a forma, o tamanho ou o movimento de um objeto ou ser.",
            "Um conjunto de sinais usados apenas por intérpretes.",
            "O sinal de negação (NÃO)."
        ],
        respostaCorreta: "Sinais que representam a forma, o tamanho ou o movimento de um objeto ou ser.",
    },
    {
        id: 3,
        pergunta: 'Qual a principal diferença entre a ordem de palavras do Português (SVO) e a ordem comum em LIBRAS (que prioriza Tópico-Comentário)?',
        opcoes: [
            "Em LIBRAS, o verbo sempre vem antes do sujeito.",
            "Em LIBRAS, a ordem não importa, basta usar os sinais corretamente.",
            "Em LIBRAS, o Tópico (o que se fala) geralmente vem no início, seguido do Comentário (a informação nova).",
            "A LIBRAS usa a mesma ordem SVO do Português, mas com pausas maiores."
        ],
        respostaCorreta: "Em LIBRAS, o Tópico (o que se fala) geralmente vem no início, seguido do Comentário (a informação nova).",
    },
    {
        id: 4,
        pergunta: 'O sinal para "APRENDER" em LIBRAS, dependendo do movimento, pode se tornar "ESTUDAR". Isso é um exemplo de:',
        opcoes: [
            "Sinais icônicos.",
            "Pares mínimos, variando apenas o movimento.",
            "Regionalismo linguístico.",
            "Classificador de locomoção."
        ],
        respostaCorreta: "Pares mínimos, variando apenas o movimento.",
    },
    {
        id: 5,
        pergunta: 'Qual tipo de pronome em LIBRAS é frequentemente usado para se referir a pessoas, objetos ou lugares já mencionados, apontando para um ponto no espaço?',
        opcoes: [
            "Pronome demonstrativo.",
            "Pronome possessivo.",
            "Pronome pessoal (Ex: EU, VOCÊ).",
            "Pronome referencial ou de concordância."
        ],
        respostaCorreta: "Pronome referencial ou de concordância.",
    }
];

const FeedbackModal = ({ mensagem, acertos, total, onRefazer, onVoltarAtividades, tipo }) => {
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
                                    Refazer Quiz
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
            </div>
        </div>
    );
};


export default function Quiz() {
    const totalRodadas = perguntasQuiz.length;
    const [rodadaAtual, setRodadaAtual] = useState(1);
    const [perguntaAtual, setPerguntaAtual] = useState(null);
    const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [acertosTotais, setAcertosTotais] = useState(0);
    const [modalData, setModalData] = useState(null);
    const [opcoesStatus, setOpcoesStatus] = useState({});

    const navigate = useNavigate();

    function iniciarRodada() {
        if (rodadaAtual <= totalRodadas) {
            setPerguntaAtual(perguntasQuiz[rodadaAtual - 1]);
        }
        setOpcaoSelecionada(null);
        setFeedback(null);
        setOpcoesStatus({});
    }

    useEffect(() => {
        iniciarRodada();
    }, [rodadaAtual]);

    function selecionarOpcao(opcao) {
        if (feedback || modalData || !perguntaAtual) return;
        setOpcaoSelecionada(opcao);
        checarResposta(opcao);
    }

    function avancarOuFinalizar() {
        if (rodadaAtual < totalRodadas) {
            setRodadaAtual((ant) => ant + 1);
        } else {
            const mensagem = acertosTotais === totalRodadas
                ? "Parabéns! Você acertou todas as perguntas!"
                : `Quiz concluído! Você acertou ${acertosTotais} de ${totalRodadas}.`;

            setModalData({ mensagem, acertos: acertosTotais, total: totalRodadas, tipo: 'fim' });
        }
    }

    function checarResposta(opcao) {
        const respostaCorreta = perguntaAtual.respostaCorreta;
        const indexOpcaoCorreta = perguntaAtual.opcoes.indexOf(respostaCorreta);
        const indexOpcaoSelecionada = perguntaAtual.opcoes.indexOf(opcao);

        if (opcao === respostaCorreta) {
            setFeedback("certo");
            setAcertosTotais(ant => ant + 1);
            setOpcoesStatus({ [indexOpcaoSelecionada]: 'certo' });

            setTimeout(() => {
                avancarOuFinalizar();
            }, 1000);

        } else {
            setFeedback("errado");
            setOpcoesStatus({
                [indexOpcaoSelecionada]: 'errado',
                [indexOpcaoCorreta]: 'certo'
            });

            setTimeout(() => {
                avancarOuFinalizar();
            }, 2000);
        }
    }

    const handleRefazer = () => {
        setRodadaAtual(1);
        setAcertosTotais(0);
        setModalData(null);
    };

    const handleVoltarAtividades = () => {
        navigate("/atividades");
    };

    const porcentagem = Math.round((rodadaAtual / totalRodadas) * 100);

    const mapeamentoLetra = (indice) => String.fromCharCode(65 + indice);

    if (!perguntaAtual) return null;

    return (
        <div className="quiz-basico">
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

            <div className="banner-conteudo quiz-banner">
                <img src="/maolaranja.png"
                    alt="Mão laramja em LIBRAS"
                         className="banner-imagem" />
                <div className="banner-texto-overlay">
                    <h1>Quiz de Libras Intermediário</h1>
                    <p>Teste seus conhecimentos sobre a gramática e estrutura da LIBRAS</p>
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

            <main className="conteudo" aria-busy={!!feedback || !!modalData}>
                <div className="card">
                    <h2>{perguntaAtual.pergunta}</h2>

                    <div className="opcoes-quiz">
                        {perguntaAtual.opcoes.map((opcao, i) => {
                            const status = opcoesStatus[i] || (opcao === opcaoSelecionada ? feedback : null);
                            const desabilitado = !!feedback || !!modalData;

                            return (
                                <button
                                    key={i}
                                    type="button"
                                    className={`botao-opcao ${status ? status : ""}`}
                                    onClick={() => selecionarOpcao(opcao)}
                                    disabled={desabilitado}
                                >
                                    <span className={`letra-opcao ${status ? status : ""}`}>{mapeamentoLetra(i)}</span>
                                    {opcao}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </main>

            <Rodape />
        </div>
    );
}