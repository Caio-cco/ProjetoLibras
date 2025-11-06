import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  LayoutDashboard,
  LogOut,
  Search,
  Filter,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./admin.scss";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState("dashboard");
  const [busca, setBusca] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("Todos");

  // Dados simulados
  const cursos = [
    { id: 1, nome: "Curso de Libras Iniciante", nivel: "Iniciante", alunos: 25 },
    { id: 2, nome: "Curso de Libras Intermediário", nivel: "Intermediário", alunos: 18 },
    { id: 3, nome: "Curso de Libras Avançado", nivel: "Avançado", alunos: 12 },
  ];

  const alunos = [
    { id: 1, nome: "Pedro Henrique", curso: "Iniciante", progresso: "80%" },
    { id: 2, nome: "Maria Eduarda", curso: "Intermediário", progresso: "45%" },
    { id: 3, nome: "João Silva", curso: "Avançado", progresso: "100%" },
    { id: 4, nome: "Laura Costa", curso: "Iniciante", progresso: "67%" },
  ];

  // Filtragem
  const cursosFiltrados = cursos.filter(
    (c) =>
      (filtroNivel === "Todos" || c.nivel === filtroNivel) &&
      c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const alunosFiltrados = alunos.filter((a) =>
    a.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const dadosGrafico = cursos.map((c) => ({
    nome: c.nivel,
    alunos: c.alunos,
  }));

  function handleLogout() {
    localStorage.removeItem("authToken");
    navigate("/", { replace: true });
  }

  return (
    <div className="admin-page">
      {/* Sidebar fixa */}
      <aside className="admin-sidebar">
        <h2 className="logo" onClick={() => navigate("/")}>
          🤟 Falar é Mágico
        </h2>

        <nav>
          <button
            className={abaAtiva === "dashboard" ? "ativo" : ""}
            onClick={() => setAbaAtiva("dashboard")}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>

          <button
            className={abaAtiva === "cursos" ? "ativo" : ""}
            onClick={() => setAbaAtiva("cursos")}
          >
            <BookOpen size={18} /> Cursos
          </button>

          <button
            className={abaAtiva === "alunos" ? "ativo" : ""}
            onClick={() => setAbaAtiva("alunos")}
          >
            <Users size={18} /> Alunos
          </button>

          <button onClick={handleLogout}>
            <LogOut size={18} /> Sair
          </button>
        </nav>
      </aside>

      {/* Conteúdo principal */}
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
                placeholder={`Pesquisar ${
                  abaAtiva === "cursos" ? "curso" : "aluno"
                }...`}
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            {abaAtiva === "cursos" && (
              <div className="filtro">
                <Filter size={18} />
                <select
                  value={filtroNivel}
                  onChange={(e) => setFiltroNivel(e.target.value)}
                >
                  <option value="Todos">Todos</option>
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>
            )}
          </div>
        </header>

        {/* Exibição de dados */}
        <section className="dados-lista">
          {abaAtiva === "dashboard" ? (
            <div className="dashboard-section">
              <div className="dashboard-cards">
                <div className="card">📚 {cursos.length} cursos ativos</div>
                <div className="card">👩‍🎓 {alunos.length} alunos cadastrados</div>
              </div>

              <div className="grafico-container">
                <h3>Alunos por Nível</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dadosGrafico} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
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
                <tr>
                  <th>Nome do Curso</th>
                  <th>Nível</th>
                  <th>Alunos</th>
                </tr>
              </thead>
              <tbody>
                {cursosFiltrados.map((curso) => (
                  <tr key={curso.id}>
                    <td>{curso.nome}</td>
                    <td>{curso.nivel}</td>
                    <td>{curso.alunos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nome do Aluno</th>
                  <th>Curso</th>
                  <th>Progresso</th>
                </tr>
              </thead>
              <tbody>
                {alunosFiltrados.map((aluno) => (
                  <tr key={aluno.id}>
                    <td>{aluno.nome}</td>
                    <td>{aluno.curso}</td>
                    <td>{aluno.progresso}</td>
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
