import { useNavigate } from "react-router-dom";
import Cabecalho from "../components/cabecalho";
import Inicio from "../components/inicio";
import Carousel from "../components/carousel";
import Nos from "../components/nos";
import Rodape from "../components/rodape";
import Fundadores from "../components/fundadores";

import "./home.scss";

export default function Home() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  return (
    <div className="full">
      <Cabecalho />


      <div className="imagem">
        <Inicio />
      </div>

      <div className="carousel">
        <Carousel />
        <Nos />
        <Fundadores />
        <Rodape />
      <div>
        <button onClick={handleLogout}>
          Sair
        </button>
      </div>
      </div>
    </div>
  );
}