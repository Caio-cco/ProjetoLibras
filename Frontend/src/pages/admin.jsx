import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  LayoutDashboard,
  Search,
  Filter,
} from "lucide-react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./admin.scss";

const API_URL = "http://localhost:5010";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState("dashboard");
  const [busca, setBusca] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("Todos");
  const [cursos, setCursos] = useState([]);
  const [alunos, setAlunos] = useState([]);

  // ✅ Verifica se o usuário é admin
  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }
      const decoded = jwt_decode(token);
      if (decoded.role !== "admin") {
        toast.warn("Acesso restrito! 🚫");
        navigate("/homeL", { replace: true });
      }
    } catch {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    buscarAlunos();
  }, [busca]);

  async function buscarAlunos() {
    try {
      const token = localStorage.getItem("authToken");
      const resp = await axios.get(`${API_URL}/admin/usuarios`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { nome: busca || null },
      });
      setAlunos(resp.data);
    } catch (err) {
      console.error("Erro ao carregar alunos:", err);
      toast.error("Erro ao carregar alunos 😢");
    }
  }

  useEffect(() => {
    async function buscarCursos() {
      try {
        const token = localStorage.getItem("authToken");
        const resp = await axios.get(`${API_URL}/cursos`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCursos(resp.data);
      } catch (err) {
        console.error("Erro ao carregar cursos:", err);
        toast.error("Erro ao carregar cursos 😢");
      }
    }
    buscarCursos();
  }, []);

  const dadosGrafico = cursos.map((c) => ({
    nome: c.titulo || c.nome,
    alunos: c.totalAlunos || 0,
  }));

  function handleLogout() {
    localStorage.removeItem("authToken");
    toast.info("Sessão encerrada 👋");
    setTimeout(() => navigate("/", { replace: true }), 1500);
  }

  return (
    <div className="admin-page">
      <ToastContainer theme="colored" />

      <aside className="admin-sidebar">
        <h2 className="logo" onClick={() => navigate("/")}>Falar é Mágico</h2>

        <nav>
          <button className={abaAtiva === "dashboard" ? "ativo" : ""} onClick={() => setAbaAtiva("dashboard")}>
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button className={abaAtiva === "cursos" ? "ativo" : ""} onClick={() => setAbaAtiva("cursos")}>
            <BookOpen size={18} /> Cursos
          </button>
          <button className={abaAtiva === "alunos" ? "ativo" : ""} onClick={() => setAbaAtiva("alunos")}>
            <Users size={18} /> Alunos
          </button>
          <button onClick={() => navigate("/perfil")}>👤 Perfil</button>
          <button className="sair" onClick={handleLogout}>🚪 Sair</button>
        </nav>
      </aside>

      <main className="admin-conteudo">
        <header>
          <h1>
            {abaAtiva === "dashboard"
              ? "Visão Geral"
              : abaAtiva === "cursos"
              ? "Gerenciar Cursos"
              : "Gerenciar Alunos"}
          </h1>

          <div className="header-actions">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder={`Pesquisar ${abaAtiva === "cursos" ? "curso" : "aluno"}...`}
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            {abaAtiva === "cursos" && (
              <div className="filtro">
                <Filter size={18} />
                <select value={filtroNivel} onChange={(e) => setFiltroNivel(e.target.value)}>
                  <option value="Todos">Todos</option>
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>
            )}
          </div>
        </header>

        <section className="dados-lista">
          {abaAtiva === "dashboard" ? (
            <div className="dashboard-section">
              <div className="dashboard-cards">
                <div className="card">📚 {cursos.length} cursos ativos</div>
                <div className="card">👩‍🎓 {alunos.length} alunos cadastrados</div>
              </div>

              <div className="grafico-container">
                <h3>Alunos por Curso</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dadosGrafico}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nome" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="alunos" fill="#ffcc00" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : abaAtiva === "cursos" ? (
            <table>
              <thead>
                <tr><th>Nome do Curso</th><th>Nível</th><th>Alunos</th></tr>
              </thead>
              <tbody>
                {cursos.map((curso) => (
                  <tr key={curso.id}>
                    <td>{curso.titulo}</td>
                    <td>{curso.nivel || "—"}</td>
                    <td>{curso.totalAlunos || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table>
              <thead>
                <tr><th>Nome do Aluno</th><th>Curso</th><th>Progresso</th></tr>
              </thead>
              <tbody>
                {alunos.map((aluno) => (
                  <tr key={aluno.id}>
                    <td>{aluno.nome}</td>
                    <td>{aluno.curso}</td>
                    <td>{aluno.progresso}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}
