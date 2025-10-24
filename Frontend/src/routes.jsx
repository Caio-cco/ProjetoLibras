import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

// 📄 Páginas
import Home from "./pages/home";
import LoginCadastro from "./pages/login";
import Perfil from "./pages/perfil";
import HomeLogado from "./pages/homeLogado";

// 📄 Componentes
import Atividades from "./components/atividades";
import AssosiacaoBasico from "./components/AssosiacaoBasico"; // ✅ nome e caminho corrigidos

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
          path="/atividades"
          element={
            <ProtectedRoute>
              <Atividades />
            </ProtectedRoute>
          }
        />

        {/* ✅ Jogo de Associação (rota corrigida) */}
        <Route
          path="/associacao"
          element={
            <ProtectedRoute>
              <AssosiacaoBasico />
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
