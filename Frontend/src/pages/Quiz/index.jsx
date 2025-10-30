import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../../components/cabecalho"; 
import Rodape from "../../components/rodape"; 
import "./index.scss"; 

const perguntasQuiz = [
    {
        id: 1,
        pergunta: 'Qual é o sinal correto para "Obrigado" em LIBRAS?',
        opcoes: [
            "Mão no queixo e na testa, movendo pra frente",
            "Mão fechada batendo no peito",
            "Dedos indicador e médio fazendo um V",
            "Palma da mão voltada para cima"
        ],
        respostaCorreta: "Mão no queixo e na testa, movendo pra frente",
    },
    {
        id: 2,
        pergunta: 'Qual é a configuração de mão correta para a letra "A" no alfabeto manual da LIBRAS?',
        opcoes: [
            "Mão aberta com todos os dedos separados",
            "Mão fechada com o polegar para fora, ao lado do indicador",
            "Mão fechada com o polegar junto aos outros dedos",
            "Dedos indicador e médio esticados"
        ],
        respostaCorreta: "Mão fechada com o polegar junto aos outros dedos",
    },
    {
        id: 3,
        pergunta: 'Em LIBRAS, qual o sinal que geralmente acompanha um "Olá / Oi"?',
        opcoes: [
            "Mão batendo levemente no ombro",
            "Mão em L movendo para cima e para baixo",
            "Palma da mão aberta movendo-se lateralmente na altura da cabeça",
            "Mão fechada com polegar para cima"
        ],
        respostaCorreta: "Palma da mão aberta movendo-se lateralmente na altura da cabeça",
    },
    {
        id: 4,
        pergunta: 'O que significa o sinal de "joinha" (👍) na LIBRAS?',
        opcoes: [
            "Legal / Beleza / Bom",
            "Ajuda",
            "Perguntar",
            "Não"
        ],
        respostaCorreta: "Legal / Beleza / Bom",
    },
    {
        id: 5,
        pergunta: 'Qual elemento é fundamental para a gramática da LIBRAS, além da configuração de mão e movimento?',
        opcoes: [
            "O som da voz (fala)",
            "A expressão facial e corporal (não-manual)",
            "A altura do corpo",
            "O uso de objetos de apoio"
        ],
        respostaCorreta: "A expressão facial e corporal (não-manual)",
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
                <img src="/mãoazul.png" alt="Mão azul em LIBRAS" className="banner-imagem"/>
                <div className="banner-texto-overlay"> 
                    <h1>Quiz de Libras</h1>
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