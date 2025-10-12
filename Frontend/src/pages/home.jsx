import Cabecalho from "../components/cabecalho"
import Inicio from "../components/inicio"

export default function Home(){
    return(
        <div>
            <Cabecalho />
            <div className="imagem">
                <Inicio />
            </div>
            

        </div>
    )
}