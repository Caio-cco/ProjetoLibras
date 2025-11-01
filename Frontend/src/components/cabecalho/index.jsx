import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./index.scss";

import Sidebar from '../Sidebar/index.jsx'; 


export default function Cabecalho({ onInscrever, logado = false }) {
  const [menuAberto, setMenuAberto] = useState(false); 
  const [menuLateralAberto, setMenuLateralAberto] = useState(false); 
  const [isMobile, setIsMobile] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState(null); 

  const alternarMenu = () => setMenuAberto(!menuAberto);
  const fecharMenu = () => setMenuAberto(false);

  const abrirMenuLateral = () => setMenuLateralAberto(true);
  const fecharMenuLateral = () => setMenuLateralAberto(false);

  useEffect(() => {
    const foto = localStorage.getItem("fotoPerfil");
    const nome = localStorage.getItem("name"); 
    setFotoPerfil(foto);
    setNomeUsuario(nome);
    
    const handleStorageChange = () => {
        setFotoPerfil(localStorage.getItem("fotoPerfil"));
        setNomeUsuario(localStorage.getItem("name"));
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
        window.removeEventListener("storage", handleStorageChange);
    };
  }, []);


  return (
    <>
      <header className="cabecalho">
        <div className="imagem">
            <Link to={logado ? "/homeL" : "/"} className="logo-link">
                <img src="/joker.jpg" alt="Falar é Mágico" />
            </Link>
        </div>

        {!isMobile && (
          <>
            <div className="cabecalho-centro">
                <Link to="/atividades">Atividades</Link>
                <Link to="/quem-somos">Quem Somos</Link>
                <Link to="/contato">Contato</Link>
            </div>
            
            <div className="cabecalho-direita">
              {!logado ? (
                <div className="botoes-login-cadastro">
                </div>
              ) : (
                <div className="icone-perfil" onClick={abrirMenuLateral}>
                  {fotoPerfil ? (
                    <img
                      src={fotoPerfil}
                      alt="Foto de perfil"
                      className="foto-perfil"
                    />
                  ) : (
                    <FaUserCircle size={35} />
                  )}
                </div>
              )}
            </div>
          </>
        )}

      </header>

      <Sidebar 
          estaAberto={menuLateralAberto} 
          fecharMenu={fecharMenuLateral}
          fotoPerfil={fotoPerfil}
          logado={logado}
          nomeUsuario={nomeUsuario}
      />
    </>
  );
}