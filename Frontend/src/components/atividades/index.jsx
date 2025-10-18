import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { useState } from "react";

const sampleCards = [
  { id: 1, title: "Jogo de Associação", subtitle: "Jogo de associação", tag: "Em destaque", level: "Básico" },
  { id: 2, title: "Desafio do Quiz", subtitle: "Teste seus conhecimentos", tag: "Novo", level: "Intermediário" },
  { id: 3, title: "Imite o Sinal", subtitle: "Pratique sinais", tag: "Recomendado", level: "Básico" },
  { id: 4, title: "Jogo das Frases", subtitle: "Pratique frases", tag: "Praticar", level: "Intermediário" },
  { id: 5, title: "Conteúdo Teórico", subtitle: "Aprenda mais", tag: "Aprender", level: "Avançado" },
  { id: 6, title: "Em Breve", subtitle: "Conteúdo em desenvolvimento", tag: "Em breve", level: "Básico" }
];

export default function Atividades() {
  const [query, setQuery] = useState("");
  const [nivelFiltro, setNivelFiltro] = useState("Todos");

  const filtered = sampleCards.filter((c) => {
    const q = query.trim().toLowerCase();
    if (q && !`${c.title} ${c.subtitle}`.toLowerCase().includes(q)) return false;
    if (nivelFiltro && nivelFiltro !== "Todos") {
      return c.level === nivelFiltro;
    }
    return true;
  });

  return (
    <div className="atividades-page">
      <header className="atividades-header">
        <h2>Curso de Libras</h2>

        <div className="search-row">
          <input
            className="search-input"
            placeholder="Buscar cursos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            className="nivel-select"
            value={nivelFiltro}
            onChange={(e) => setNivelFiltro(e.target.value)}
            aria-label="Selecionar nível"
          >
            <option value="Todos">Nivel</option>
            <option value="Básico">Básico</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
        </div>
      </header>

      <main className="cards-grid">
        {filtered.map((card) => (
          <article className="card" key={card.id}>
            <div className="card-media">
              <div className="media-placeholder">Imagem</div>
            </div>
            <div className="card-body">
              <h3>{card.title}</h3>
              <p className="subtitle">{card.subtitle}</p>
              <div className="card-footer">
                <span className="tag">{card.tag}</span>
                <button className="cta">Abrir</button>
              </div>
              <div className="card-level">Nível: {card.level}</div>
            </div>
          </article>
        ))}
      </main>

      <footer className="onda-footer">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,20 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" fill="#6e8594" opacity="0.15" />
          <path d="M0,40 C360,90 1080,10 1440,80 L1440,120 L0,120 Z" fill="#556b7b" opacity="0.2" />
        </svg>
      </footer>
    </div>
  );
}