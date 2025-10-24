import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./index.scss";

export default function Cabecalho({ onInscrever, logado = false }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const alternarMenu = () => setMenuAberto(!menuAberto);
  const fecharMenu = () => setMenuAberto(false);

  // Verifica se é mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 850);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Atualiza foto de perfil automaticamente
  useEffect(() => {
    const foto = localStorage.getItem("fotoPerfil");
    setFotoPerfil(foto);
    window.addEventListener("storage", () =>
      setFotoPerfil(localStorage.getItem("fotoPerfil"))
    );
  }, []);

  return (
    <header className="cabecalho">
      {/* Logo */}
      <div className="imagem">
        <img
          src="https://img.elo7.com.br/product/zoom/3A21A1B/matriz-de-bordado-libras-lingua-brasileira-de-sinais-linguagem-de-sinais.jpg"
          alt="Logo LIBRAS"
        />
      </div>

      {/* ====== MENU DESKTOP ====== */}
      {!isMobile && (
        <>
          <div className="cabecalho-centro">
            <nav className="menu">
              <div className="titulos">
                <Link to="/atividades">Atividades</Link>
                <a href="#nos">Quem Somos</a>
                <a href="#contato">Contato</a>
              </div>
            </nav>
          </div>

          <div className="cabecalho-direita">
            {!logado ? (
              <div className="botoes desktop-only">
                <Link to="/login" className="link-login">
                  Login
                </Link>
                <button className="bot">
                  <Link to="/login" className="link-login">
                    Cadastre-se
                  </Link>
                </button>
              </div>
            ) : (
              <Link to="/perfil" className="icone-perfil">
                {fotoPerfil ? (
                  <img
                    src={fotoPerfil}
                    alt="Foto de perfil"
                    className="foto-perfil"
                  />
                ) : (
                  <FaUserCircle size={35} />
                )}
              </Link>
            )}
          </div>
        </>
      )}

      {/* ====== MENU MOBILE ====== */}
      {isMobile && (
        <>
          {/* Ícone hambúrguer */}
          <div
            className={`hamburguer ${menuAberto ? "ativo" : ""}`}
            onClick={alternarMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Fundo escurecido */}
          {menuAberto && (
            <div className="fundo-escuro" onClick={fecharMenu}></div>
          )}

          {/* Menu lateral */}
          <nav className={`menu-mobile ${menuAberto ? "aberto" : ""}`}>
            <div className="titulos">
              <Link to="/atividades" onClick={fecharMenu}>
                Atividades
              </Link>
              <a href="/" onClick={fecharMenu}>
                Quem Somos
              </a>
              <a href="/" onClick={fecharMenu}>
                Contato
              </a>
            </div>

            {!logado ? (
              <div className="botoes mobile-only">
                <Link to="/login" className="link-login" onClick={fecharMenu}>
                  Login
                </Link>
                <button className="bot" onClick={onInscrever}>
                  Inscrever-se
                </button>
              </div>
            ) : (
              <Link to="/perfil" className="icone-perfil" onClick={fecharMenu}>
                {fotoPerfil ? (
                  <img
                    src={fotoPerfil}
                    alt="Foto de perfil"
                    className="foto-perfil"
                  />
                ) : (
                  <FaUserCircle size={35} />
                )}
              </Link>
            )}
          </nav>
        </>
      )}
    </header>
  );
}
