import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import "./index.scss";

export default function Cabecalho({ logado = false }) {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [perfil, setPerfil] = useState({});

  const token = localStorage.getItem("authToken");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 850);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchData = async (url, setter) => {
    try {
      const res = await fetch(url, {
        headers: {
            "x-access-token": token,
        },
      });
      if (!res.ok) throw new Error(`Erro ao buscar dados de ${url}`);
      const data = await res.json();
      setter(data.info[0] || {});

    } catch (err) {
      console.error(err);
      setter({});
    }
  };

  useEffect(() => {
    fetchData('http://localhost:5010/user/perfil', setPerfil);
  }, []);

  const toggleMenu = () => setMenuOpen((s) => !s);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const goToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 300);
    } else {
      scrollToSection(id);
    }
  };

  const baseURL = "http://localhost:5010/";
  const fotoPath = perfil.foto_url?.replace(/\\/g, "/");
  const fotoFinal =
    perfil.foto_url?.startsWith("https://")
      ? perfil.foto_url
      : `${baseURL}${fotoPath}`;

  return (
    <>
      <header className="cabecalho">
        {/* Logo — NÃO MEXER */}
        <div className="cabecalho-left">
          <div className="imagem">
            <Link to={logado ? "/homeL" : "/"}>
              <img src="/logo.png" alt="Logo Falar é Mágico" />
            </Link>
          </div>
        </div>

        {/* Links do meio */}
        <div className={`cabecalho-center ${menuOpen ? "open" : ""}`}>
          <nav className="titulos">
            <Link to="/atividades" onClick={() => setMenuOpen(false)}>
              Atividades
            </Link>

            <a
              href="#quem-somos"
              onClick={(e) => {
                e.preventDefault();
                goToSection("quem-somos");
              }}
            >
              Quem Somos
            </a>

            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                goToSection("contato");
              }}
            >
              Contato
            </a>
          </nav>
        </div>

        {/* Botões + Perfil */}
        <div className="cabecalho-right">
          {!logado ? (
            <div className="botoes-desktop">
              <Link to="/login" className="btn-login">
                Entrar
              </Link>
              <Link to="/cadastro" className="btn-inscrever">
                Inscrever-se
              </Link>
            </div>
          ) : (
            <Link to="/perfil" className="icone-perfil">
              {/* {fotoPerfil ? (
                <img
                  src={fotoPerfil}
                  alt="Foto perfil"
                  className="foto-perfil"
                />
              ) : (
                <FaUserCircle size={36} />
              )} */}
              <img src={fotoFinal} alt="Foto perfil" className="foto-perfil" />
            </Link>
          )}

          <button
            className={`hamburguer ${menuOpen ? "ativo" : ""}`}
            aria-label="Abrir menu"
            onClick={toggleMenu}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* MENU MOBILE */}
      <div
        className={`menu-mobile ${menuOpen ? "aberto" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className="menu-mobile-links">
          <Link to="/atividades" onClick={() => setMenuOpen(false)}>
            Atividades
          </Link>

          <a
            href="#quem-somos"
            onClick={(e) => {
              e.preventDefault();
              goToSection("quem-somos");
            }}
          >
            Quem Somos
          </a>

          <a
            href="#contato"
            onClick={(e) => {
              e.preventDefault();
              goToSection("contato");
            }}
          >
            Contato
          </a>
        </nav>

        <div className="menu-mobile-botoes">
          {!logado ? (
            <>
              <Link to="/login" className="btn-login full">
                Entrar
              </Link>
              <Link to="/cadastro" className="btn-inscrever full">
                Inscrever-se
              </Link>
            </>
          ) : (
            <Link to="/perfil" className="btn-login full">
              Meu Perfil
            </Link>
          )}
        </div>
      </div>

      {menuOpen && <div className="fundo-escuro" onClick={toggleMenu} />}
    </>
  );
}


