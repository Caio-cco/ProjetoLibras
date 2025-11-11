// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import Cabecalho from "../../components/cabecalho";
// import Rodape from "../../components/rodape";
// import "./index.scss";

// const MAX_ERROS = 6;
// const MAX_ROUNDS = 5;
// const API_URL = 'http://localhost:5010/palavras-forca';

// const DADOS_INICIAIS_ESTATICOS = [
//     { id: 1, palavra: "OI", dica: "Cumprimento básico em Libras (aceno simples).", url_sinal: "http://localhost:5010/sinais/sinal_oi.png" },
//     { id: 2, palavra: "SIM", dica: "Resposta afirmativa, com balanço da cabeça.", url_sinal: "http://localhost:5010/sinais/sinal_sim.png" },
//     { id: 3, palavra: "NAO", dica: "Resposta negativa, com balanço da cabeça e expressão facial.", url_sinal: "http://localhost:5010/sinais/sinal_nao.png" },
//     { id: 4, palavra: "VER", dica: "Sinalizado com o dedo indicador saindo da área dos olhos.", url_sinal: "http://localhost:5010/sinais/sinal_ver.png" },
//     { id: 5, palavra: "BOM", dica: "Sinal de 'positivo' ou 'tudo bem'.", url_sinal: "http://localhost:5010/sinais/sinal_bom.png" },
//     { id: 6, palavra: "LIBRAS", dica: "Nome da Língua Brasileira de Sinais.", url_sinal: "http://localhost:5010/sinais/sinal_libras.png" },
//     { id: 7, palavra: "EU", dica: "Pronome pessoal, sinalizado apontando para o peito.", url_sinal: "http://localhost:5010/sinais/sinal_eu.png" }
// ];

// const FeedbackModal = ({ mensagem, palavraSecreta, onContinuar, onVoltarAtividades, tipo, acertos, total }) => {
//     const isFim = tipo === 'fim';
//     const isVitoria = mensagem.includes("Parabéns") && !isFim;

//     const getTitulo = () => {
//         if (isFim) {
//             return acertos === total ? "🏆 Fim de Jogo!" : "Game Over";
//         }
//         return isVitoria ? "Acertou a Palavra!" : "Você Foi Enforcado!";
//     };

//     return (
//         <div className="modal-overlay">
//             <div className={`modal-content ${isFim ? (acertos === total ? 'vitoria' : 'derrota') : (isVitoria ? 'vitoria' : 'derrota')}`}>
//                 <h3>{getTitulo()}</h3>
//                 <p>{mensagem}</p>
//                 {palavraSecreta && !isVitoria && <p>A palavra era: <strong>{palavraSecreta}</strong></p>}

//                 <div className="modal-actions">
//                     <button className="btn-voltar" onClick={onVoltarAtividades}>
//                         Voltar para Atividades
//                     </button>
//                     <button className="btn-refazer" onClick={onContinuar}>
//                         {isFim ? "Jogar Novamente" : "Próxima Rodada"}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default function JogoDaForca() {
//     const [palavrasCarregadas, setPalavrasCarregadas] = useState(DADOS_INICIAIS_ESTATICOS);
//     const [palavrasSequencia, setPalavrasSequencia] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     const [palavraAtual, setPalavraAtual] = useState(null);
//     const [palavraExibida, setPalavraExibida] = useState("");

//     const [rodadaAtual, setRodadaAtual] = useState(0);
//     const [acertosTotais, setAcertosTotais] = useState(0);

//     const [letrasTentadas, setLetrasTentadas] = useState([]);
//     const [erros, setErros] = useState(0);
//     const [modal, setModal] = useState(null);
//     const navigate = useNavigate();

//     const token = localStorage.getItem("authToken");

//     const embaralharArray = (array) => {
//         const a = [...array];
//         for (let i = a.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [a[i], a[j]] = [a[j], a[i]];
//         }
//         return a;
//     };

//     const iniciarRodada = useCallback((palavraObj) => {
//         if (!palavraObj) return;

//         setPalavraAtual(palavraObj);
//         setPalavraExibida("_".repeat(palavraObj.palavra.length));
//         setLetrasTentadas([]);
//         setErros(0);
//         setModal(null);
//     }, []);

//     const iniciarSequencia = useCallback((palavras) => {
//         const palavrasParaJogar = embaralharArray(palavras).slice(0, MAX_ROUNDS);
//         setPalavrasSequencia(palavrasParaJogar);
//         setRodadaAtual(1);
//         setAcertosTotais(0);
//         iniciarRodada(palavrasParaJogar[0]);
//     }, [iniciarRodada]);


//     const avancarRodada = useCallback(() => {
//         const proximaRodada = rodadaAtual + 1;

//         if (proximaRodada <= palavrasSequencia.length && proximaRodada <= MAX_ROUNDS) {
//             setRodadaAtual(proximaRodada);
//             iniciarRodada(palavrasSequencia[proximaRodada - 1]);
//         } else {
//             const mensagem = `Você acertou ${acertosTotais} de ${MAX_ROUNDS} palavras!`;
//             setModal({
//                 mensagem,
//                 tipo: 'fim',
//                 acertos: acertosTotais,
//                 total: MAX_ROUNDS,
//             });
//         }
//     }, [rodadaAtual, palavrasSequencia, acertosTotais, iniciarRodada]);

//     const verificarFimDeRodada = useCallback((errosAtuais, palavraCompleta) => {
//         if (!palavraAtual) return false;

//         const palavraUpper = palavraAtual.palavra.toUpperCase();

//         let rodadaEncerrada = false;

//         if (palavraCompleta.replace(/\s/g, '') === palavraUpper) {
//             const novosAcertos = acertosTotais + 1;
//             setAcertosTotais(novosAcertos);
//             setModal({
//                 mensagem: `🎉 Parabéns! Você acertou a palavra: ${palavraUpper}`,
//                 palavraSecreta: palavraUpper,
//                 tipo: 'vitoria'
//             });
//             rodadaEncerrada = true;
//         } else if (errosAtuais >= MAX_ERROS) {
//             setModal({
//                 mensagem: `Você atingiu ${MAX_ERROS} erros.`,
//                 palavraSecreta: palavraUpper,
//                 tipo: 'derrota'
//             });
//             rodadaEncerrada = true;
//         }
//         return rodadaEncerrada;
//     }, [palavraAtual, acertosTotais]);


//     const fetchData = useCallback(async () => {
//         setIsLoading(true);
//         try {
//             const res = await fetch(API_URL, {
//                 headers: { "x-access-token": token },
//             });
//             if (!res.ok) throw new Error("Falha ao carregar palavras.");
//             const data = await res.json();
//             const palavras = data.palavras || [];
//             const palavrasFinais = palavras.length > 0 ? palavras : DADOS_INICIAIS_ESTATICOS;

//             setPalavrasCarregadas(palavrasFinais);
//             iniciarSequencia(palavrasFinais);

//         } catch (err) {
//             setPalavrasCarregadas(DADOS_INICIAIS_ESTATICOS);
//             iniciarSequencia(DADOS_INICIAIS_ESTATICOS);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [token, iniciarSequencia]);

//     useEffect(() => {
//         fetchData();
//     }, [fetchData]);

//     const handleAdivinhar = (letra) => {
//         if (modal || !palavraAtual) return;

//         const letraUpper = letra.toUpperCase();

//         if (letrasTentadas.includes(letraUpper)) return;

//         const novaLetrasTentadas = [...letrasTentadas, letraUpper];
//         setLetrasTentadas(novaLetrasTentadas);

//         const palavraUpper = palavraAtual.palavra.toUpperCase();
//         let novosErros = erros;
//         let palavraExibidaCompleta = "";

//         if (palavraUpper.includes(letraUpper)) {
//             let novoPalavraExibida = "";
//             for (let i = 0; i < palavraUpper.length; i++) {
//                 const char = palavraUpper[i];
//                 if (novaLetrasTentadas.includes(char)) {
//                     novoPalavraExibida += char;
//                     palavraExibidaCompleta += char;
//                 } else {
//                     novoPalavraExibida += "_";
//                     palavraExibidaCompleta += "_";
//                 }
//             }
//             setPalavraExibida(novoPalavraExibida);
//         } else {
//             novosErros = erros + 1;
//             setErros(novosErros);
//             palavraExibidaCompleta = palavraExibida; // Mantém a palavra exibida atual
//         }

//         // Verifica se a rodada atual terminou
//         verificarFimDeRodada(novosErros, palavraExibidaCompleta);
//     };

//     const handleReiniciar = () => {
//         iniciarSequencia(palavrasCarregadas);
//     };

//     const letrasDisponiveis = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//     return (
//         <div className="jogo-da-forca">
//             <Cabecalho logado={true} />

//             <div className="banner-conteudo">
//                 <img src="/mãoazul.png" alt="Mão azul" className="banner-imagem" />
//                 <div className="banner-texto">
//                     <h1>Jogo da Forca (LIBRAS)</h1>
//                     <p>Tente adivinhar as 5 palavras relacionadas a LIBRAS antes de ser enforcado!</p>
//                 </div>
//             </div>

//             <div className="conteudo-principal">
//                 <div className="card-atividade">
//                     {isLoading && <div className="loading-state"><p>Carregando palavras...</p></div>}

//                     {(!palavraAtual || palavrasSequencia.length === 0) && !isLoading && (
//                         <div className="loading-state">
//                             <p>Nenhuma sequência de palavras disponível.</p>
//                             <button className="btn-refazer" onClick={() => navigate('/atividades')}>Voltar para Atividades</button>
//                         </div>
//                     )}

//                     {palavraAtual && (
//                         <>
//                             <p className="status-rodada">Rodada {rodadaAtual} de {MAX_ROUNDS} | Acertos Totais: {acertosTotais}</p>

//                             <div className="forca-display">
//                                 <div className="forca-estrutura" data-erros={erros}>
//                                     <div className="mastro"></div>
//                                     <div className="travessa"></div>
//                                     <div className="corda"></div>

//                                     <div className="boneco-parte parte-cabeca"></div>
//                                     <div className="boneco-parte parte-corpo"></div>
//                                     <div className="boneco-parte parte-braco-e"></div>
//                                     <div className="boneco-parte parte-braco-d"></div>
//                                     <div className="boneco-parte parte-perna-e"></div>
//                                     <div className="boneco-parte parte-perna-d"></div>
//                                 </div>

//                                 <div className="sinal-palavra-area">
//                                     <img
//                                         src={palavraAtual.url_sinal}
//                                         alt={`Sinal de ${palavraAtual.palavra} em LIBRAS`}
//                                         className="sinal-palavra-img"
//                                         onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-sinal.png' }}
//                                     />
//                                 </div>

//                                 <div className="palavra-e-dica">
//                                     <h2 className="palavra-exibida">
//                                         {palavraExibida.split("").join(" ")}
//                                     </h2>
//                                     <p className="dica">Dica: {palavraAtual.dica}</p>
//                                     <p className="erros-restantes">Erros Restantes: {MAX_ERROS - erros}</p>
//                                 </div>
//                             </div>

//                             <section className="teclado">
//                                 <h3 className="titulo-teclado">Adivinhe uma letra:</h3>
//                                 <div className="botoes-letras">

//                                     {letrasDisponiveis.split("").map((letra) => {
//                                         const letraUpper = letra.toUpperCase();
//                                         const tentada = letrasTentadas.includes(letraUpper);
//                                         const acertada = tentada && palavraAtual.palavra.toUpperCase().includes(letraUpper);
//                                         const errada = tentada && !palavraAtual.palavra.toUpperCase().includes(letraUpper);

//                                         const imagemLetra = `http://localhost:5010/alfabetoLibras/Libras${letraUpper}.png`;

//                                         return (
//                                             <button
//                                                 key={letra}
//                                                 className={`btn-letra ${tentada ? 'tentada' : ''} ${acertada ? 'acertada' : ''} ${errada ? 'errada' : ''}`}
//                                                 onClick={() => handleAdivinhar(letra)}
//                                                 disabled={tentada || !!modal}
//                                             >
//                                                 <img
//                                                     src={imagemLetra}
//                                                     alt={`Letra ${letraUpper} em Libras`}
//                                                     className="img-letra"
//                                                 />
//                                             </button>
//                                         );
//                                     })}


//                                 </div>
//                             </section>

//                             <div className="botoes-acao">
//                                 <button className="btn-refazer" onClick={handleReiniciar} disabled={!!modal}>
//                                     Nova Sequência (5 Rodadas)
//                                 </button>
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>

//             {modal && (
//                 <FeedbackModal
//                     {...modal}
//                     onContinuar={modal.tipo === 'fim' ? handleReiniciar : avancarRodada}
//                     onVoltarAtividades={() => navigate('/atividades')}
//                 />
//             )}

//             <Rodape />
//         </div>
//     );
// }

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";
import "./index.scss";

const MAX_ERROS = 6;
const MAX_ROUNDS = 5;
const API_URL = 'http://localhost:5010/sinais/';
const ALFABETO_URL_BASE = 'http://localhost:5010/alfabetoLibras/';


const FeedbackModal = ({ mensagem, palavraSecreta, onContinuar, onVoltarAtividades, tipo, acertos, total }) => {
    const isFim = tipo === 'fim';
    const isVitoria = mensagem.includes("Parabéns") && !isFim;

    const getTitulo = () => {
        if (isFim) {
            return acertos === total ? "🏆 Fim de Jogo!" : "Game Over";
        }
        return isVitoria ? "Acertou a Palavra!" : "Você Foi Enforcado!";
    };

    return (
        <div className="modal-overlay">
            <div className={`modal-content ${isFim ? (acertos === total ? 'vitoria' : 'derrota') : (isVitoria ? 'vitoria' : 'derrota')}`}>
                <h3>{getTitulo()}</h3>
                <p>{mensagem}</p>
                {palavraSecreta && !isVitoria && <p>A palavra era: <strong>{palavraSecreta}</strong></p>}

                <div className="modal-actions">
                    <button className="btn-voltar" onClick={onVoltarAtividades}>
                        Voltar para Atividades
                    </button>
                    <button className="btn-refazer" onClick={onContinuar}>
                        {isFim ? "Jogar Novamente" : "Próxima Rodada"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function JogoDaForca() {
    const [palavrasCarregadas, setPalavrasCarregadas] = useState([]);
    const [palavrasSequencia, setPalavrasSequencia] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);
    
    const [palavraAtual, setPalavraAtual] = useState(null);
    const [palavraExibida, setPalavraExibida] = useState("");
    
    const [rodadaAtual, setRodadaAtual] = useState(0);
    const [acertosTotais, setAcertosTotais] = useState(0);

    const [letrasTentadas, setLetrasTentadas] = useState([]);
    const [erros, setErros] = useState(0);
    const [modal, setModal] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("authToken");

    const embaralharArray = (array) => {
        const a = [...array];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    const iniciarRodada = useCallback((palavraObj) => {
        if (!palavraObj) return;

        setPalavraAtual(palavraObj);
        setPalavraExibida("_".repeat(palavraObj.descricao.length));
        setLetrasTentadas([]);
        setErros(0);
        setModal(null);
    }, []);

    const iniciarSequencia = useCallback((palavras) => {
        if (palavras.length === 0) {
            setFetchError(true);
            return;
        }

        const palavrasParaJogar = embaralharArray(palavras).slice(0, MAX_ROUNDS);
        setPalavrasSequencia(palavrasParaJogar);
        setRodadaAtual(1);
        setAcertosTotais(0);
        iniciarRodada(palavrasParaJogar[0]);
    }, [iniciarRodada]);


    const avancarRodada = useCallback(() => {
        const proximaRodada = rodadaAtual + 1;
        
        if (proximaRodada <= palavrasSequencia.length && proximaRodada <= MAX_ROUNDS) {
            setRodadaAtual(proximaRodada);
            iniciarRodada(palavrasSequencia[proximaRodada - 1]);
        } else {
            const mensagem = `Você acertou ${acertosTotais} de ${MAX_ROUNDS} palavras!`;
            setModal({
                mensagem,
                tipo: 'fim',
                acertos: acertosTotais,
                total: MAX_ROUNDS,
            });
        }
    }, [rodadaAtual, palavrasSequencia, acertosTotais, iniciarRodada]);
    
    const verificarFimDeRodada = useCallback((errosAtuais, palavraCompleta) => {
        if (!palavraAtual) return false;

        const palavraUpper = palavraAtual.descricao.toUpperCase();
        
        let rodadaEncerrada = false;

        if (palavraCompleta.replace(/\s/g, '') === palavraUpper) {
            const novosAcertos = acertosTotais + 1;
            setAcertosTotais(novosAcertos);
            setModal({
                mensagem: `🎉 Parabéns! Você acertou a palavra: ${palavraUpper}`,
                palavraSecreta: palavraUpper,
                tipo: 'vitoria'
            });
            rodadaEncerrada = true;
        } else if (errosAtuais >= MAX_ERROS) {
            setModal({
                mensagem: `Você atingiu ${MAX_ERROS} erros.`,
                palavraSecreta: palavraUpper,
                tipo: 'derrota'
            });
            rodadaEncerrada = true;
        }
        return rodadaEncerrada;
    }, [palavraAtual, acertosTotais]);


    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setFetchError(false);
        try {
            const res = await fetch(`${API_URL}${48}/${52}`, {
                headers: { "x-access-token": token },
            });
            if (!res.ok) throw new Error("Falha ao carregar palavras.");
            const data = await res.json();
            //const palavras = data.palavras || []; 
            const palavras = data;
            
            if (!Array.isArray(palavras) || palavras.length === 0) {
                setFetchError(true);
                return;
            }
            
            setPalavrasCarregadas(palavras);
            iniciarSequencia(palavras);

        } catch (err) {
            setFetchError(true);
        } finally {
            setIsLoading(false);
        }
    }, [token, iniciarSequencia]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleAdivinhar = (letra) => {
        if (modal || !palavraAtual || typeof palavraAtual.descricao !== "string") return;

        const letraUpper = letra.toUpperCase();

        if (letrasTentadas.includes(letraUpper)) return;

        const novaLetrasTentadas = [...letrasTentadas, letraUpper];
        setLetrasTentadas(novaLetrasTentadas);

        const palavraUpper = palavraAtual.descricao.toUpperCase();

        let novosErros = erros;
        let palavraExibidaCompleta = "";

        if (palavraUpper.includes(letraUpper)) {
            let novoPalavraExibida = "";
            for (let i = 0; i < palavraUpper.length; i++) {
                const char = palavraUpper[i];
                if (novaLetrasTentadas.includes(char)) {
                    novoPalavraExibida += char;
                    palavraExibidaCompleta += char;
                } else {
                    novoPalavraExibida += "_";
                    palavraExibidaCompleta += "_";
                }
            }
            setPalavraExibida(novoPalavraExibida);
        } else {
            novosErros = erros + 1;
            setErros(novosErros);
            palavraExibidaCompleta = palavraExibida;
        }
        
        verificarFimDeRodada(novosErros, palavraExibidaCompleta);
    };

    const handleReiniciar = () => {
        if (palavrasCarregadas.length > 0) {
            iniciarSequencia(palavrasCarregadas);
        } else {
            fetchData();
        }
    };

    const letrasDisponiveis = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return (
        <div className="jogo-da-forca">
            <Cabecalho logado={true} />

            <div className="banner-conteudo">
                <img src="/mãoazul.png" alt="Mão azul" className="banner-imagem" />
                <div className="banner-texto">
                    <h1>Jogo da Forca (LIBRAS)</h1>
                    <p>Tente adivinhar as 5 palavras relacionadas a LIBRAS antes de ser enforcado!</p>
                </div>
            </div>

            <div className="conteudo-principal">
                <div className="card-atividade">
                    {isLoading && <div className="loading-state"><p>Carregando palavras...</p></div>}

                    {fetchError && !isLoading && (
                        <div className="loading-state error-state">
                            <p>❌ Não foi possível carregar as palavras do servidor.</p>
                            <p>Verifique a conexão ou se o backend está ativo (`{API_URL}`).</p>
                            <button className="btn-refazer" onClick={() => navigate('/atividades')}>Voltar para Atividades</button>
                        </div>
                    )}
                    
                    {palavraAtual && !fetchError && (
                        <>
                            <p className="status-rodada">Rodada {rodadaAtual} de {MAX_ROUNDS} | Acertos Totais: {acertosTotais}</p>
                            
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

                                <div className="sinal-palavra-area">
                                    <img 
                                        src={`http://localhost:5010${palavraAtual.url_imagem}`}
                                        alt={`Sinal de ${palavraAtual.descricao} em LIBRAS`} 
                                        className="sinal-palavra-img"
                                        onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-sinal.png' }}
                                    />
                                </div>
                                
                                <div className="palavra-e-dica">
                                    <h2 className="palavra-exibida">
                                        {palavraExibida.split("").join(" ")}
                                    </h2>
                                    <p className="erros-restantes">Erros Restantes: {MAX_ERROS - erros}</p>
                                </div>
                            </div>

                            <section className="teclado">
                                <h3 className="titulo-teclado">Adivinhe uma letra:</h3>
                                <div className="botoes-letras">

                                    {letrasDisponiveis.split("").map((letra) => {
                                        const letraUpper = letra.toUpperCase();
                                        const tentada = letrasTentadas.includes(letraUpper);
                                        const acertada = tentada && palavraAtual.descricao.toUpperCase().includes(letraUpper);
                                        const errada = tentada && !palavraAtual.descricao.toUpperCase().includes(letraUpper);

                                        const imagemLetra = `${ALFABETO_URL_BASE}Libras${letraUpper}.png`;

                                        return (
                                            <button
                                                key={letra}
                                                className={`btn-letra ${tentada ? 'tentada' : ''} ${acertada ? 'acertada' : ''} ${errada ? 'errada' : ''}`}
                                                onClick={() => handleAdivinhar(String(letra))}
                                                disabled={tentada || !!modal}
                                            >
                                                <img
                                                    src={imagemLetra}
                                                    alt={`Letra ${letraUpper} em Libras`}
                                                    className="img-letra"
                                                />
                                            </button>
                                        );
                                    })}


                                </div>
                            </section>

                            <div className="botoes-acao">
                                <button className="btn-refazer" onClick={handleReiniciar} disabled={!!modal}>
                                    Nova Sequência (5 Rodadas)
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {modal && (
                <FeedbackModal
                    {...modal}
                    onContinuar={modal.tipo === 'fim' ? handleReiniciar : avancarRodada}
                    onVoltarAtividades={() => navigate('/atividades')}
                />
            )}

            <Rodape />
        </div>
    );
}