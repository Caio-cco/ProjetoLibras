import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./index.scss";
export default function Inicio() {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <img src="./imagem.png" alt="Fundo LIBRAS" className="hero-bg" />

      <div className="overlay">
        <h1>
          Comece Sua Jornada no <br /> Mundo da Libras
        </h1>
        <p>
          Conecte-se, Comunica-se, Transforma-se, Atraves da Linguagem Brasileira dos Sinais
        </p>

        <button
          className="btn"
          onClick={() => navigate("/forca")}
        >
          Jogo da Forca! Venha Jogar <FaChevronRight/>
        </button>
      </div>


      <div className="onda-fundo">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill=" #f9fbfd"
            d="M0,240 C320,360 1120,120 1440,240 L1440,320 L0,320 Z"
          />

        </svg>

      </div>

    </section>
  );
}
