import React from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";
import "./index.scss";

export default function Teoria() {
    const navigate = useNavigate();

    return (
        <div className="teoria-page">
            <Cabecalho logado={true} />

            <div className="banner-conteudo">
                <img 
                    src="/maolaranja.png"
                    alt="Mão laraja" 
                    className="banner-imagem"
                />
                <div className="banner-texto">
                    <h1>Gramática, Classificadores e Expressões Não-Manuais</h1>
                    <p>Aprofunde seus conhecimentos sobre a estrutura da LIBRAS</p>
                </div>
            </div>

            <main className="conteudo">
                <div className="teoria-container">
                    <section className="gramatica-section">
                        <h2>Estrutura Gramatical da LIBRAS</h2>
                        <h3>Os Parâmetros Essenciais</h3>
                        
                        <div className="texto-conteudo">
                            <p>
                                A LIBRAS não é apenas mímica; é uma língua completa com sua própria gramática, 
                                articulada através de cinco parâmetros essenciais: Configuração de Mão (CM), 
                                Ponto de Articulação (PA), Movimento (M), Orientação/Direcionalidade (O) e as 
                                Expressões Não-Manuais (ENM). A alteração em qualquer um desses parâmetros pode 
                                mudar totalmente o significado do sinal, caracterizando o que chamamos de Pares Mínimos.
                            </p>
                            <p>
                                Por exemplo, o sinal para APRENDER e ESTUDAR pode ter a mesma Configuração de Mão 
                                e Ponto de Articulação, mas se diferenciam pelo Movimento (curto e único para Aprender; 
                                repetido e contínuo para Estudar).
                            </p>
                            
                        <h3>Classificadores e a Iconicidade</h3>
                            <p>
                                Os Classificadores (CL) são um recurso gramatical fundamental no nível intermediário. 
                                Eles utilizam formas de mão específicas para representar a forma, o tamanho, 
                                o movimento ou a localização de objetos, pessoas ou seres. 
                            </p>
                            <p>
                                Em vez de apenas sinalizar "CARRO ANDAR", o falante de Libras usa um Classificador 
                                que representa a forma do carro e demonstra seu percurso no espaço, tornando a comunicação 
                                altamente visual e espacial. O domínio dos CLs é crucial para a fluência descritiva.
                            </p>

                        <h3>Expressões Não-Manuais (ENM) e Estrutura Frasal</h3>
                            <p>
                                As ENMs (expressões faciais e movimentos de cabeça/corpo) não são opcionais; elas são 
                                parte integrante da gramática. Elas cumprem funções gramaticais (como indicar negação, 
                                interrogação, tempo verbal) e funções adverbiais (como intensidade).
                            </p>
                            <p>
                                A estrutura frasal em Libras frequentemente adota a ordem Tópico-Comentário (T-C). 
                                O Tópico (o assunto principal) é introduzido no início, geralmente acompanhado de uma 
                                Expressão Facial de Tópico (sobrancelhas levantadas e leve inclinação da cabeça). 
                                Isso ajuda a contextualizar a frase antes de transmitir o Comentário (a informação nova).
                            </p>
                        </div>

                        <div className="referencias">
                            <h3>Referências</h3>
                            <ul>
                                <li>
                                    <a href="https://gov.br" target="_blank" rel="noopener noreferrer">
                                        Feneis: Federação Nacional de Educação e Integração dos Surdos
                                    </a>
                                </li>
                                <li>
                                    <a href="https://institucional.ines.gov.br/" target="_blank" rel="noopener noreferrer">
                                        INES: Instituto Nacional de Educação de Surdos
                                    </a>
                                </li>
                                <li>
                                    Livros de Estudos Linguísticos da LIBRAS (Ex: QUADROS, Ronice Müller de; KARNOPP, Lodenir Becker. Língua de Sinais Brasileira: Estudos Linguísticos).
                                </li>
                            </ul>
                        </div>

                        <button 
                            className="btn-voltar"
                            onClick={() => navigate('/atividades')}
                        >
                            Voltar para Atividades
                        </button>
                    </section>
                </div>
            </main>

            <Rodape />
        </div>
    );
}