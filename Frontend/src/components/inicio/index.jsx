import { FaChevronRight } from "react-icons/fa";
import './index.scss';

export default function Inicio() {
    return (
        
<section className="hero">
  <img src="./imagem.png" alt="" className="hero-bg" />
  <div className="overlay">
    <h1>Comece Sua Jornada no <br />Mundo da Libras</h1>
    <p>Conecte-se, Comunica-se, Transforma-se, Atraves da Linguagem Brasileira dos Sinais</p>
    <button className="btn">Comece Aprender LIBRAS Agora! <FaChevronRight /></button>
  </div>
</section>


    )
}

