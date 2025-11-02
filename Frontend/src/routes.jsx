import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

// 📄 Páginas
import Home from "./pages/home";
import LoginCadastro from "./pages/login";
import Perfil from "./pages/perfil";
import HomeLogado from "./pages/homeLogado";
import ImiteOSinal from "./pages/Imiteosinal";
import Chat from "./pages/chat";
import JogoDasFrases from "./pages/Frase"; 
import Teoria from "./pages/Teoria"; 
import AssociacaoIntermediario from "./pages/AssosiacaoIntermediario";
import FrasesIntermediario from "./pages/FraseIntermediario";
import Quiz from "./pages/Quiz"; 
import QuizIntermediario from "./pages/QuizIntermediario";
import TeoriaIntermediario from "./pages/TeoriaIntermediario";
import QuizAvancado from "./pages/QuizAvançado";
import AssosiacaoAvancado from "./pages/AssosiacaoAvancado";

// 📄 Componentes
import Atividades from "./components/atividades";
import AssosiacaoBasico from "./components/AssosiacaoBasico"; 

// =====================
// 🔐 Função de autenticação
// =====================
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

// =====================
// 🔒 Rotas protegidas
// =====================
function ProtectedRoute({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

// =====================
// 🔓 Rotas públicas (não logado)
// =====================
function PublicOnlyRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/homeL" replace />;
  }
  return children;
}

// =====================
// 🚀 Navegação principal
// =====================
function Navegacao() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página inicial (pública) */}
        <Route
          path="/"
          element={
            <PublicOnlyRoute>
              <Home />
            </PublicOnlyRoute>
          }
        />

        {/* Login e cadastro */}
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

        {/* Páginas logadas */}
        <Route
          path="/homeL"
          element={
            <ProtectedRoute>
              <HomeLogado />
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
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
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
        
        {/* Rota para o Quiz */}
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
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

        {/* Jogo de Associação */}
        <Route
          path="/associacao"
          element={
            <ProtectedRoute>
              <AssosiacaoBasico />
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
              <AssosiacaoAvancado />
            </ProtectedRoute>
          }
        />

        {/* Rota para Imite o Sinal */}
        <Route
          path="/imiteosinal"
          element={
            <ProtectedRoute>
              <ImiteOSinal />
            </ProtectedRoute>
          }
        />

        {/* Rota para o Jogo das Frases */}
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

        {/* Rota para Teoria */}
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

        {/* Qualquer outra rota leva para Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navegacao;
