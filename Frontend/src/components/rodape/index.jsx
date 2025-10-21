// Footer.jsx
import "./index.scss";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <img src="/imagem.png" alt="Logo" />
          <p>Falar é Mágico!</p>
        </div>

        <div className="footer__links">
          <a href="#">Política de Privacidade</a>
          <a href="#">Termos de Uso</a>
        </div>

        <div className="footer__credits">
          <p>
            Feito por <strong>Pedro Henrique</strong>, <strong>Caio Mello</strong>,{" "}
            <strong>João Pedro</strong> e <strong>Marcos</strong>.
          </p>
     
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2025 Falar é Mágico! Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
