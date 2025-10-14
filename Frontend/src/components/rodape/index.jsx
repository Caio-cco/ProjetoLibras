import './index.scss';
import { FaRegImages } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <FaRegImages className="icon" />
          </div>

          <div className="footer-info">
            <p className="politica">Política de Privacidade e Termos de Uso</p>
            <p className="creditos">
              Feito por: Pedro Henrique, Caio Mello, João Pedro e Marcos
            </p>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>© Educar é Mágico! Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
}
