import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import LoginCadastro from "./pages/login";
import Perfil from "./pages/perfil";

function Navegacao() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginCadastro />} />
          <Route path="/cadastro" element={<LoginCadastro />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navegacao;