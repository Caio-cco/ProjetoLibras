import { FaChevronRight } from "react-icons/fa";
import './index.scss';

export default function Card({ atividade, aoNavegar }) {
    
    const lidarComCliqueDoBotao = (evento) => {
        evento.stopPropagation(); 
        aoNavegar(atividade);
    };

    const nivelEmMinusculas = atividade.level.toLowerCase();

    return (
        <article
            className={`card card-level-${nivelEmMinusculas}`}
            onClick={() => aoNavegar(atividade)} 
            style={{ cursor: 'pointer' }}
        >
            <div className={`card-media ${atividade.imageClass}`}>
            </div>
            <div className="card-body">
                <h3>{atividade.title} - {atividade.level}</h3>
                <p className="subtitle">{atividade.subtitle}</p>
                <div className="card-footer-clean">
                    <button
                        className="cta"
                        onClick={lidarComCliqueDoBotao}
                    >
                        Abrir
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </article>
    );
}