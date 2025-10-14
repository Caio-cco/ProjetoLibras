import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import LoginCadastro from "./pages/loginCadastro";

function Navegacao() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginCadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navegacao;
