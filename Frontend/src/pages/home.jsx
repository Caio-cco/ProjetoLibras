import { useState } from "react";
import Cabecalho from "../components/cabecalho";
import Inicio from "../components/inicio";
import Carousel from "../components/carousel";
import Nos from "../components/nos";
import Rodape from "../components/rodape";
import ModalLoginCadastro from "../components/modal";

import "./home.scss";

export default function Home() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoCadastro, setModoCadastro] = useState(false);

  return (
    <div>
      <Cabecalho
        onEntrar={() => {
          setModoCadastro(false);
          setMostrarModal(true);
        }}
        onInscrever={() => {
          setModoCadastro(true);
          setMostrarModal(true);
        }}
      />

      <div className="imagem">
        <Inicio />
      </div>

      <div className="carousel">
        <Carousel />
        <Nos />
        <Rodape />
      </div>

      {mostrarModal && (
        <ModalLoginCadastro
          onClose={() => setMostrarModal(false)}
          cadastroInicial={modoCadastro}
        />
      )}
    </div>
  );
}
