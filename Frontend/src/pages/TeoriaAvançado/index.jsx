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
                    src="/maovermelha.png"
                    alt="Mão laraja"
                    className="banner-imagem"
                />
                <div className="banner-texto">
                    <h1>Parâmetros, Classificadores e ENM na LIBRAS</h1>
                    <p>Teoria completa baseada nas questões da atividade</p>
                </div>
            </div>

            <main className="conteudo">
                <div className="teoria-container">
                    <section className="gramatica-section">
                        <h2>Fundamentos da Estrutura da LIBRAS</h2>

                        <h3>Parâmetros e Pares Mínimos</h3>
                        <div className="texto-conteudo">
                            <p>
                                A LIBRAS é estruturada por cinco parâmetros essenciais: Configuração de Mão (CM),
                                Ponto de Articulação (PA), Movimento (M), Orientação/Direcionalidade (O) e as
                                Expressões Não-Manuais (ENM). Quando apenas um desses parâmetros é alterado, o sinal
                                pode ganhar um significado totalmente diferente, formando o que chamamos de Par Mínimo.
                            </p>
                            <p>
                                Isso significa que uma simples mudança na Orientação/Direcionalidade — mesmo mantendo
                                todas as outras características iguais — transforma o sinal em outro completamente
                                distinto. Por isso, compreender e dominar esses parâmetros é fundamental para evitar
                                ambiguidades e transmitir a mensagem correta.
                            </p>
                        </div>

                        <h3>Classificadores e Representação Espacial</h3>
                        <div className="texto-conteudo">
                            <p>
                                Os Classificadores (CL) são ferramentas visuais que permitem representar objetos,
                                pessoas e movimentos de forma altamente descritiva. Eles são indispensáveis para
                                explicações espaciais, percursos, tamanhos, formas, posições e direções.
                            </p>
                            <p>
                                No exemplo de "CARRO ANDAR", o sinalizante não repete os sinais isolados, mas utiliza
                                um Classificador para representar visualmente o carro e demonstrar o seu deslocamento
                                no espaço. Assim, o CL substitui e amplia a informação, tornando a mensagem mais clara
                                e natural.
                            </p>
                        </div>

                        <h3>Expressões Não-Manuais (ENM)</h3>
                        <div className="texto-conteudo">
                            <p>
                                As Expressões Não-Manuais fazem parte da gramática da LIBRAS e são essenciais para o
                                significado da frase. Elas podem indicar tempo, intensidade, condições, negação,
                                interrogação e diversos aspectos sintáticos. Sem elas, a frase fica incompleta ou
                                com sentido alterado.
                            </p>
                        </div>

                        <h3>Tópico–Comentário na LIBRAS</h3>
                        <div className="texto-conteudo">
                            <p>
                                A estrutura Tópico–Comentário é muito usada na LIBRAS. O Tópico aparece no início da
                                frase e é normalmente acompanhado de sinais não-manuais específicos: sobrancelhas
                                levantadas e leve inclinação da cabeça. Esses elementos indicam que o assunto foi
                                introduzido e que a informação seguinte será o Comentário, ou seja, aquilo que se quer
                                dizer sobre o tópico.
                            </p>
                        </div>

                        <div className="referencias">
                            <h3>Referências</h3>
                            <ul>
                                <li>Feneis – Federação Nacional de Educação e Integração dos Surdos</li>
                                <li>INES – Instituto Nacional de Educação de Surdos</li>
                                <li>QUADROS, Ronice; KARNOPP, Lodenir – Estudos Linguísticos da LIBRAS</li>
                            </ul>
                        </div>

                        <button className="btn-voltar" onClick={() => navigate('/atividades')}>
                            Voltar para Atividades
                        </button>
                    </section>
                </div>
            </main>

            <Rodape />
        </div>
    );
}