import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Home from "./pages/home";
import LoginCadastro from "./pages/login";
import Perfil from "./pages/perfil";
import HomeLogado from "./pages/homeLogado";
import JogoDasFrases from "./pages/Frase"; 
import Teoria from "./pages/Teoria"; 
import FrasesIntermediario from "./pages/FraseIntermediario";
import { QuizBasico, QuizIntermediario, QuizAvancado } from "./pages/Quiz"; 
import TeoriaIntermediario from "./pages/TeoriaIntermediario";
import Admin from "./pages/admin";
import Atividades from "./components/atividades";
import { AssociacaoBasico, AssociacaoIntermediario, AssociacaoAvancado } from "./pages/Associacao";
import FraseAvancado from "./pages/FraseAvancado";
import { ForcaAvancado, ForcaBasico, ForcaIntermediario } from "./pages/Forca";

import Nos from "./components/nos"; 



function isAuthenticated() {
  const token = localStorage.getItem("authToken");
  if (!token) return false;

  try {
    const decoded = jwt_decode(token);
    const now = Date.now() / 1000;
    if (decoded.exp && decoded.exp < now) {
      localStorage.removeItem("authToken");
      return false;
    }
    return true;
  } catch {
    localStorage.removeItem("authToken");
    return false;
  }
}


function ProtectedRoute({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}


function PublicOnlyRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/homeL" replace />;
  }
  return children;
}


function Navegacao() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route
          path="/"
          element={
            <PublicOnlyRoute>
              <Home />
            </PublicOnlyRoute>
          }
        />

 
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginCadastro />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/cadastro"
          element={
            <PublicOnlyRoute>
              <LoginCadastro />
            </PublicOnlyRoute>
          }
        />

        <Route
            path="/quem-somos"
            element={<Nos />} 
        />
        
        <Route
            path="/contato"
            element={<Nos />} 
        />

       


        <Route
          path="/homeL"
          element={
            <ProtectedRoute>
              <HomeLogado />
            </ProtectedRoute>
          }
        />
   <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />


        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forca"
          element={
            <ProtectedRoute>
              <ForcaBasico />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forca-intermediario"
          element={
            <ProtectedRoute>
              <ForcaIntermediario />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forca-avancado"
          element={
            <ProtectedRoute>
              <ForcaAvancado />
            </ProtectedRoute>
          }
        />

        

        <Route
          path="/atividades"
          element={
            <ProtectedRoute>
              <Atividades />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <QuizBasico />
            </ProtectedRoute>
          }
        />


        <Route
          path="/quiz-intermediario"
          element={ 
            <ProtectedRoute>
              <QuizIntermediario />
            </ProtectedRoute>
          }
        />

        <Route
            path="/quiz-avancado"
            element={ 
              <ProtectedRoute>
                <QuizAvancado />
              </ProtectedRoute>
            }
        />

        <Route
          path="/associacao"
          element={
            <ProtectedRoute>
              <AssociacaoBasico />
            </ProtectedRoute>
          }
        />

        <Route
          path="/associacao-intermediario"
          element={
            <ProtectedRoute>
              <AssociacaoIntermediario />
            </ProtectedRoute>
          }
        />

        <Route
          path="/associacao-avancado"
          element={
            <ProtectedRoute>
              <AssociacaoAvancado />
            </ProtectedRoute>
          }
        />

        <Route
          path="/frase"
          element={
            <ProtectedRoute>
              <JogoDasFrases />
            </ProtectedRoute>
          }
        />

        <Route
          path="/frase-intermediario"
          element={
            <ProtectedRoute>
              <FrasesIntermediario />
            </ProtectedRoute>
          }
        />

        <Route
          path="/frase-avancado"
          element={
            <ProtectedRoute>
              <FraseAvancado />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teoria"
          element={
            <ProtectedRoute>
              <Teoria />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teoria-intermediario"
          element={
            <ProtectedRoute>
              <TeoriaIntermediario />
            </ProtectedRoute>
          }
        />


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navegacao;