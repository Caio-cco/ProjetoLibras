import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // usar Link para SPA
import "./index.scss";

export default function Cabecalho({ onInscrever }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const alternarMenu = () => setMenuAberto(!menuAberto);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 850);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <header className="cabecalho">
      <div className="imagem">
        <img
          src="https://img.elo7.com.br/product/zoom/3A21A1B/matriz-de-bordado-libras-lingua-brasileira-de-sinais-linguagem-de-sinais.jpg"
          alt="Logo LIBRAS"
        />
      </div>

      <div className="hamburguer" onClick={alternarMenu}>
        <div className={`linha ${menuAberto ? "ativo" : ""}`}></div>
        <div className={`linha ${menuAberto ? "ativo" : ""}`}></div>
        <div className={`linha ${menuAberto ? "ativo" : ""}`}></div>
      </div>

      <div className={`cabecalho-centro ${menuAberto ? "aberto" : ""}`}>
        <nav className="menu">
          <div className="titulos">
            <Link to="/atividades">Atividades</Link>
            <a href="/">Quem Somos</a>
            <a href="/">Contato</a>
          </div>

          {/* Mobile */}
          {isMobile && (
            <div className="botoes mobile-only">
              <Link to="/login" className="link-login">
                Login
              </Link>
              <button
                className="bot"
                onClick={(e) => {
                  e.preventDefault();
                  onInscrever();
                }}
              >
                Inscrever-se
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* Desktop */}
      <div className="cabecalho-direita">
        <nav className="menu-botoes">
          {!isMobile && (
            <div className="botoes desktop-only">
              <Link to="/login" className="link-login">
                Login
              </Link>
              <button
                className="bot"
                onClick={(e) => {
                  e.preventDefault();
                  onInscrever();
                }}
              >
                <Link to="/login" className="link-login">
               Cadastre-se
                </Link>
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
