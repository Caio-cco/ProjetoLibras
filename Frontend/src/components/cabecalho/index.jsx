import { useState, useEffect } from "react";
import "./index.scss";

export default function Cabecalho({ onEntrar, onInscrever }) {
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

            {/* Botão hambúrguer (visível apenas em telas pequenas) */}
            <div className="hamburguer" onClick={alternarMenu}>
                <div className={`linha ${menuAberto ? "ativo" : ""}`}></div>
                <div className={`linha ${menuAberto ? "ativo" : ""}`}></div>
                <div className={`linha ${menuAberto ? "ativo" : ""}`}></div>
            </div>

            <div className={`cabecalho-centro ${menuAberto ? "aberto" : ""}`}>
                <nav className="menu">
                    <div className="titulos">
                        <a href="#atividades">Atividades</a>
                        <a href="#">Quem Somos</a>
                        <a href="#contato">Contato</a>
                    </div>

                    {/* Versão mobile dos botões (aparece dentro do menu quando aberto) */}
                    {isMobile && (
                        <div className="botoes mobile-only">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onEntrar();
                            }}
                        >
                            Login
                        </a>
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
            <div className="cabecalho-direita">
                <nav className="menu-botoes">
                    {!isMobile && (
                        <div className="botoes desktop-only">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onEntrar();
                            }}
                        >
                            Login
                        </a>
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
        </header>
    );
}
