import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import LoginCadastro from "./pages/loginCadastro";
import Atividades from "./components/atividades";

function Navegacao() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginCadastro />} />
        <Route path="/atividades" element={<Atividades />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navegacao;
