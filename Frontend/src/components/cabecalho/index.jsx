import "./index.scss";

export default function Cabecalho({ onEntrar, onInscrever }) {
    return (
        <header className="cabecalho">
            <div className="imagem">
                <img
                    src="https://img.elo7.com.br/product/zoom/3A21A1B/matriz-de-bordado-libras-lingua-brasileira-de-sinais-linguagem-de-sinais.jpg"
                    alt="Logo LIBRAS"
                />
            </div>

            <div className="titulos">
                <a href="#atividades">Atividades</a>
                <a href="#quemsomos">Quem Somos</a>
                <a href="#contato">Contato</a>
            </div>

            <div className="botoes">
                <a href="#" onClick={(e) => { e.preventDefault(); onEntrar(); }}>
                    Login
                </a>
                <button className="bot" onClick={(e) => {e.preventDefault();onInscrever();}}>Inscrever-se</button>
            </div>
        </header>
    );
}
