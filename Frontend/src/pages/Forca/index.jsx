import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";
import "./index.scss";

const MAX_ERROS = 6;
const API_URL = 'http://localhost:5010/palavras-forca';

const DADOS_INICIAIS_ESTATICOS = [
    { id: 1, palavra: "OI", dica: "Cumprimento básico em Libras (aceno simples)." },
    { id: 2, palavra: "SIM", dica: "Resposta afirmativa, com balanço da cabeça." },
    { id: 3, palavra: "NAO", dica: "Resposta negativa, com balanço da cabeça e expressão facial." },
    { id: 4, palavra: "VER", dica: "Sinalizado com o dedo indicador saindo da área dos olhos." },
    { id: 5, palavra: "BOM", dica: "Sinal de 'positivo' ou 'tudo bem'." },
    { id: 6, palavra: "LIBRAS", dica: "Nome da Língua Brasileira de Sinais." },
    { id: 7, palavra: "EU", dica: "Pronome pessoal, sinalizado apontando para o peito." }
];

const FeedbackModal = ({ mensagem, onRefazer, onVoltarAtividades }) => {
    const isVitoria = mensagem.includes("Parabéns");
    return (
        <div className="modal-overlay">
            <div className={`modal-content ${isVitoria ? 'vitoria' : 'derrota'}`}>
                <h3>{mensagem}</h3>
                <div className="modal-actions">
                    <button className="btn-voltar" onClick={onVoltarAtividades}>
                        Voltar para Atividades
                    </button>
                    <button className="btn-refazer" onClick={onRefazer}>
                        Jogar Novamente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function JogoDaForca() {
    const [palavrasCarregadas, setPalavrasCarregadas] = useState(DADOS_INICIAIS_ESTATICOS);
    const [isLoading, setIsLoading] = useState(false);
    const [palavraAtual, setPalavraAtual] = useState(null);
    const [palavraExibida, setPalavraExibida] = useState("");
    const [letrasTentadas, setLetrasTentadas] = useState([]);
    const [erros, setErros] = useState(0);
    const [modal, setModal] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("authToken");

    const sortearPalavra = useCallback((palavras) => {
        if (palavras.length === 0) return null;
        const indice = Math.floor(Math.random() * palavras.length);
        return palavras[indice];
    }, []);

    const iniciarJogo = useCallback((palavras) => {
        const novaPalavra = sortearPalavra(palavras);
        if (novaPalavra) {
            setPalavraAtual(novaPalavra);
            setPalavraExibida("_".repeat(novaPalavra.palavra.length));
            setLetrasTentadas([]);
            setErros(0);
            setModal(null);
        } else {
            setPalavraAtual(null);
        }
    }, [sortearPalavra]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch(API_URL, {
                headers: { "x-access-token": token },
            });
            if (!res.ok) throw new Error("Falha ao carregar palavras.");
            const data = await res.json();
            const palavras = data.palavras || [];
            setPalavrasCarregadas(palavras.length > 0 ? palavras : DADOS_INICIAIS_ESTATICOS);
            iniciarJogo(palavras.length > 0 ? palavras : DADOS_INICIAIS_ESTATICOS);
        } catch (err) {
            setPalavrasCarregadas(DADOS_INICIAIS_ESTATICOS);
            iniciarJogo(DADOS_INICIAIS_ESTATICOS);
        } finally {
            setIsLoading(false);
        }
    }, [token, iniciarJogo]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const verificarFimDeJogo = useCallback((errosAtuais, palavraCompleta) => {
        if (palavraAtual && palavraCompleta.replace(/\s/g, '') === palavraAtual.palavra.toUpperCase()) {
            setModal({
                mensagem: `🎉 Parabéns! Você acertou a palavra: ${palavraAtual.palavra}`,
            });
            return true;
        }
        if (errosAtuais >= MAX_ERROS) {
            setModal({
                mensagem: `💀 Game Over! A palavra era: ${palavraAtual.palavra}`,
            });
            return true;
        }
        return false;
    }, [palavraAtual]);

    const handleAdivinhar = (letra) => {
        if (modal || !palavraAtual) return;

        const letraUpper = letra.toUpperCase();

        if (letrasTentadas.includes(letraUpper)) return;
        
        const novaLetrasTentadas = [...letrasTentadas, letraUpper];
        setLetrasTentadas(novaLetrasTentadas);

        const palavraUpper = palavraAtual.palavra.toUpperCase();
        if (palavraUpper.includes(letraUpper)) {
            let novoPalavraExibida = "";
            let palavraExibidaCompleta = "";
            for (let i = 0; i < palavraUpper.length; i++) {
                if (novaLetrasTentadas.includes(palavraUpper[i])) {
                    novoPalavraExibida += palavraUpper[i];
                    palavraExibidaCompleta += palavraUpper[i];
                } else {
                    novoPalavraExibida += "_";
                    palavraExibidaCompleta += "_";
                }
            }
            setPalavraExibida(novoPalavraExibida);
            verificarFimDeJogo(erros, palavraExibidaCompleta);
        } else {
            const novosErros = erros + 1;
            setErros(novosErros);
            verificarFimDeJogo(novosErros, palavraExibida);
        }
    };

    const handleReiniciar = () => {
        iniciarJogo(palavrasCarregadas);
    };

    const letrasDisponiveis = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return (
        <div className="jogo-da-forca">
            <Cabecalho logado={true} />

            <div className="banner-conteudo">
                <img src="/mãoazul.png" alt="Mão azul" className="banner-imagem"/>
                <div className="banner-texto">
                    <h1>Jogo da Forca (LIBRAS)</h1>
                    <p>Tente adivinhar a palavra relacionada a LIBRAS antes de ser enforcado!</p>
                </div>
            </div>

            <div className="conteudo-principal">
                <div className="card-atividade">
                    {isLoading && <div className="loading-state"><p>Carregando palavras...</p></div>}
                    
                    {!palavraAtual && !isLoading && (
                        <div className="loading-state">
                            <p>Nenhuma palavra disponível.</p>
                            <button className="btn-refazer" onClick={() => navigate('/atividades')}>Voltar para Atividades</button>
                        </div>
                    )}

                    {palavraAtual && (
                        <>
                            <div className="forca-display">
                                <div className="forca-estrutura" data-erros={erros}>
                                    <div className="mastro"></div>
                                    <div className="travessa"></div>
                                    <div className="corda"></div>
                                    
                                    <div className="boneco-parte parte-cabeca"></div>
                                    <div className="boneco-parte parte-corpo"></div>
                                    <div className="boneco-parte parte-braco-e"></div>
                                    <div className="boneco-parte parte-braco-d"></div>
                                    <div className="boneco-parte parte-perna-e"></div>
                                    <div className="boneco-parte parte-perna-d"></div>
                                </div>
                                
                                <div className="palavra-e-dica">
                                    <h2 className="palavra-exibida">
                                        {palavraExibida.split("").join(" ")}
                                    </h2>
                                    <p className="dica">Dica: {palavraAtual.dica}</p>
                                    <p className="erros-restantes">Erros Restantes: {MAX_ERROS - erros}</p>
                                </div>
                            </div>

                            <section className="teclado">
                                <h3 className="titulo-teclado">Adivinhe uma letra:</h3>
                                <div className="botoes-letras">
                                    {letrasDisponiveis.split("").map((letra) => {
                                        const letraUpper = letra.toUpperCase();
                                        const tentada = letrasTentadas.includes(letraUpper);
                                        const acertada = tentada && palavraAtual.palavra.toUpperCase().includes(letraUpper);
                                        const errada = tentada && !palavraAtual.palavra.toUpperCase().includes(letraUpper);

                                        return (
                                            <button
                                                key={letra}
                                                className={`btn-letra ${tentada ? 'tentada' : ''} ${acertada ? 'acertada' : ''} ${errada ? 'errada' : ''}`}
                                                onClick={() => handleAdivinhar(letra)}
                                                disabled={tentada || !!modal}
                                            >
                                                {letra}
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>

                            <div className="botoes-acao">
                                <button className="btn-refazer" onClick={handleReiniciar} disabled={!!modal}>
                                    Nova Palavra
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {modal && (
                <FeedbackModal
                    {...modal}
                    onRefazer={handleReiniciar}
                    onVoltarAtividades={() => navigate('/atividades')}
                />
            )}

            <Rodape />
        </div>
    );
}