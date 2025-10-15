import './index.scss';
import { FaRegImages } from "react-icons/fa";

export default function QuemSomos() {
  return (
    <section className="quem-somos">
      <div className="container">
        <div className="header">
          <h1>Quem Somos</h1>
          <p>Acreditamos que a Comunicação é para todos</p>
        </div>

        <div className="conteudo">
          <div className="imagem">
            <img className='imagem' src="./joker.jpg"/>
          </div>

          <div className="texto">
            <div className="bloco">
              <h2>Nossa Missão</h2>
              <p>
                Nossa missão é promover a inclusão e a acessibilidade por meio do ensino de LIBRAS,
                oferecendo uma plataforma fácil de usar, interativa e voltada para todos que desejam
                aprender a Língua Brasileira de Sinais. Acreditamos que a comunicação é a chave para
                um mundo mais justo e igualitário, e queremos capacitar novas pessoas surdas e
                conscientizar a comunidade sobre a importância da Libras.
              </p>
            </div>

            <div className="bloco">
              <h2>Nossa História</h2>
              <p>
                O [nome do site] nasceu de uma necessidade percebida durante o desenvolvimento do
                nosso TCC: criar uma plataforma acessível e prática para o ensino de LIBRAS. Com a
                ideia de promover inclusão e facilitar a comunicação com a comunidade surda,
                decidimos juntar nossos conhecimentos e desenvolver essa ferramenta.
              </p>
              <p>
                Nosso objetivo é tornar o aprendizado de LIBRAS mais fácil e acessível para todos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
