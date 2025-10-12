import "./index.scss"

export default function Cabecalho() {
    return (
        <header className="cabecalho">
            <div className="imagem">
                <img src="https://img.elo7.com.br/product/zoom/3A21A1B/matriz-de-bordado-libras-lingua-brasileira-de-sinais-linguagem-de-sinais.jpg" />
            </div>
            <div className="titulos">
                <a href="">Atividades</a>
                <a href="">Quem Somos</a>
                <a href="">Contato</a>
            </div>

            <div className="botoes">
                <a href="">Entrar</a>
                <a href=""><button>Inscrever-se</button></a>
            </div>
        </header>
    )
}