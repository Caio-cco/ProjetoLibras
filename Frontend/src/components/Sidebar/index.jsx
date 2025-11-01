import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { FiHome, FiBookOpen, FiUser, FiLogOut } from 'react-icons/fi'; // Ícones
import { FaUserCircle } from "react-icons/fa"; // Para o ícone de fallback
import "./index.scss";

export default function Sidebar({ estaAberto, fecharMenu, fotoPerfil, nomeUsuario, logado }) {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("authToken"); 
        localStorage.removeItem("name");
        localStorage.removeItem("fotoPerfil"); 
        fecharMenu(); 
        navigate("/", { replace: true });  
        window.history.pushState(null, "", "/"); 
    }

    const overlayClass = estaAberto ? "sidebar-overlay aberto" : "sidebar-overlay";
    const sidebarClass = estaAberto ? "sidebar aberto" : "sidebar";

    const navegarEFechar = (caminho) => {
        navigate(caminho);
        fecharMenu();
    };

    return (
        <div className={overlayClass} onClick={fecharMenu}>
            
            <aside className={sidebarClass} onClick={e => e.stopPropagation()}>
                
                <div className="sidebar-topo">
                    <button className="fechar" onClick={fecharMenu}>
                        <FaTimes size={20} />
                    </button>
                </div>

                <div className="sidebar-perfil">
                    {fotoPerfil ? (
                        <img src={fotoPerfil} alt="Foto de perfil" className="foto-sidebar" />
                    ) : (
                        <FaUserCircle size={60} className="icone-placeholder" />
                    )}
                    <p className="nome-usuario">{nomeUsuario || "Aluno"}</p>
                </div>

                <nav className="sidebar-nav">
                    <button onClick={() => navegarEFechar("/homeL")}>
                        <FiHome size={20} /> Início
                    </button>
                    <button onClick={() => navegarEFechar("/atividades")}>
                        <FiBookOpen size={20} /> Atividades
                    </button>
                    <button onClick={() => navegarEFechar("/perfil")}>
                        <FiUser size={20} /> Perfil
                    </button>
                </nav>

                <div className="sidebar-sair">
                    <button className="btn-sair" onClick={handleLogout}>
                        <FiLogOut size={20} /> Sair
                    </button>
                </div>
            </aside>
        </div>
    );
}