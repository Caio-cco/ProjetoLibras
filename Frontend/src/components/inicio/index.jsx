import { FaChevronRight } from "react-icons/fa";
import './index.scss';

export default function Inicio() {
    return (
        <div class="hero">
            <div class="overlay">
                <h1>Comece Sua Jornada no <br />  Mundo da Libras</h1>
                <p>Conecte-se, Comunica-se, Transforma-se, Atraves da Linguagem Brasileira dos Sinais</p>
                <button className="btn">
                    Comece Aprender LIBRAS Agora! <FaChevronRight />
                </button>
            </div>
         
        </div>
    )
}