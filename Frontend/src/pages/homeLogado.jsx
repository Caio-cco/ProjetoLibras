import { useNavigate } from "react-router-dom";
import Cabecalho from "../components/cabecalho";
import Inicio from "../components/inicio";
import Carousel from "../components/carousel";
import Nos from "../components/nos";
import Rodape from "../components/rodape";
import Forms from "../components/forms";
import Fundadores from "../components/fundadores";

import "./home.scss";

export default function Home() {


  return (
    <div className="full">
     <Cabecalho logado={true} /> 
      

      <div className="imagem">
        <Inicio />
      </div>

      <div className="carousel">
        <Carousel />
        <Nos />
        <Fundadores />
        <Forms />
        <Rodape />
      </div>

      
    </div>
  );
}