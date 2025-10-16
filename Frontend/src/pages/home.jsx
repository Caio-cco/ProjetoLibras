
import Cabecalho from "../components/cabecalho";
import Inicio from "../components/inicio";
import Carousel from "../components/carousel";
import Nos from "../components/nos";
import Rodape from "../components/rodape";

import Fundadores from "../components/fundadores";

import "./home.scss";

export default function Home() {


  return (
    <div className="full">
      <Cabecalho
        
      />

      <div className="imagem">
        <Inicio />
      </div>

      <div className="carousel">
        <Carousel />
        <Nos />
        <Fundadores />
        
        <Rodape />
      </div>

      
    </div>
  );
}