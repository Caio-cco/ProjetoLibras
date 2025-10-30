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
                    src="/mãoazul.png"
                    alt="Mão azul" 
                    className="banner-imagem"
                />
                <div className="banner-texto">
                    <h1>História, conceitos e importância da Língua Brasileira de Sinais</h1>
                    <p>Aprenda sobre LIBRAS</p>
                </div>
            </div>

            <main className="conteudo">
                <div className="teoria-container">
                    <section className="historia-section">
                        <h2>História da LIBRAS</h2>
                        <h3>História dos Surdos</h3>
                        
                        <div className="texto-conteudo">
                            <p>
                                Em todo o mundo, são poucos os registros históricos de pessoas surda. O pouco que se é encontrado é entendido que os 
                                surdos tinham dificuldades para serem reconhecidos como humanos.
                            </p>
                            <p>
                                Grandes filósofos da antiguidade, acreditavam que se a pessoa não falasse, ela era não era um ser pensante. Dessa forma,
                                Na década de 70, houve pouca mudança na gestão e no tratamento das pessoas com surdez. A exclusão social ainda permanecia uma constante na vida dessas pessoas,
                                mas também surgia a Imperatrice Debret. Porém, em 1880, o Congresso de Milão proibiu o uso das línguas de sinais,
                                impondo o oralismo, que dominou até a década de 1960, quando William Stokoe reconheceu a língua de sinais como legítima.
                            </p>
                            <p>
                                No Brasil, o francês surdo Hernest Huet fundou, em 1857, o Instituto Nacional de Surdos Mudos (atual INES), que usava a
                                língua de sinais. Com o tempo, o INES variou o método, mas nos meados de 1970 e 1980 passou a aplicar a
                                comunicação total e o bilinguismo, consolidando o reconhecimento da Libras no país.
                            </p>
                        </div>

                        <div className="referencias">
                            <h3>Referências</h3>
                            <a href="https://gov.br" target="_blank" rel="noopener noreferrer">
                                https://gov.br
                            </a>
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