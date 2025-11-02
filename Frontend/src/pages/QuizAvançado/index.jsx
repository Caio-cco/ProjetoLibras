import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";
import "./index.scss";

const perguntasQuiz = [
    {
        id: 1,
        pergunta: 'Em LIBRAS, qual é o princípio que rege a concordância verbal em verbos direcionais (ou de concordância)?',
        opcoes: [
            "O verbo se move da posição do objeto (destino) para a posição do sujeito (origem).",
            "O verbo se move da posição do sujeito (origem) para a posição do objeto (destino).",
            "O verbo sempre é sinalizado no espaço neutro, sem movimento direcional, independentemente do sujeito/objeto.",
            "A concordância é marcada apenas pelo uso de pronomes pessoais antes e depois do verbo."
        ],
        respostaCorreta: "O verbo se move da posição do sujeito (origem) para a posição do objeto (destino).",
    },
    {
        id: 2,
        pergunta: 'O que a presença de uma Configuração de Mão (CM) de Classificador em um sinal verbal (ex: \'carro-ir\') indica sobre a categoria gramatical desse sinal?',
        opcoes: [
            "Que o sinal é uma forma nominalizada do verbo.",
            "Que o verbo pertence à categoria de Verbos Simples (que não concordam).",
            "Que o sinal é uma forma de **Verbo Classificador**, combinando ação (verbo) e propriedades do objeto (classificador).",
            "Que a frase está em uma ordem SVO e deve ser traduzida literalmente."
        ],
        respostaCorreta: "Que o sinal é uma forma de **Verbo Classificador**, combinando ação (verbo) e propriedades do objeto (classificador).",
    },
    {
        id: 3,
        pergunta: 'Na estrutura frasal da LIBRAS, como se chama o mecanismo em que um item é apresentado no início da frase, com expressão não-manual (ENM) específica, e o restante da frase comenta sobre esse item?',
        opcoes: [
            "Estrutura Sujeito-Verbo-Objeto (SVO).",
            "Estrutura Tópico-Comentário.",
            "Incorporação de Classificadores.",
            "Marcação de Aspecto Visual."
        ],
        respostaCorreta: "Estrutura Tópico-Comentário.",
    },
    {
        id: 4,
        pergunta: 'Qual dos traços fonológicos de um sinal em LIBRAS está diretamente relacionado à sua **orientação no espaço** (Ex: para cima, para baixo, para a frente)?',
        opcoes: [
            "Ponto de Articulação (PA).",
            "Movimento (M).",
            "Expressão Não-Manual (ENM).",
            "Orientação da Palma da Mão (OPM)."
        ],
        respostaCorreta: "Orientação da Palma da Mão (OPM).",
    },
    {
        id: 5,
        pergunta: 'Em um diálogo, o sinal **JÁ-PASSOU** é feito com movimento rápido e forte. Em termos linguísticos, o que essa variação no movimento (aspecto) indica?',
        opcoes: [
            "Uma forma de negação (NÃO-PASSOU).",
            "Marcação de aspecto 'continuativo' da ação.",
            "Marcação de **aspecto ‘repentino/completivo’** da ação (que a ação terminou de repente ou completamente).",
            "Variação regional do sinal."
        ],
        respostaCorreta: "Marcação de **aspecto ‘repentino/completivo’** da ação (que a ação terminou de repente ou completamente).",
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
                <img src="/maovermelha.png"
                    alt="Mão laramja em LIBRAS"
                          className="banner-imagem" />
                <div className="banner-texto-overlay">
                    <h1>Quiz de Libras Avançado</h1>
                    <p>Teste seus conhecimentos sobre a Língua Brasileira de Sinais</p>
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