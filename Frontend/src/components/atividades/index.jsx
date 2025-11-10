import { useNavigate } from "react-router-dom";
import Cabecalho from "../cabecalho";
import Rodape from "../rodape";
import "./index.scss";
import { useState, useEffect } from "react";
import Card from '../../components/Card';
import useFetch from "../FetchSinais/Index";

export default function Atividades() {
    const [dificuldade, setDificuldade] = useState([]);
    const [query, setQuery] = useState("");
    const [nivelFiltro, setNivelFiltro] = useState("Todos");
    const navegar = useNavigate();

    const token = localStorage.getItem("authToken");

    const fetchData = async (url, setter) => {
        try {
            const res = await fetch(url, {
                headers: { "x-access-token": token },
            });
            if (!res.ok) throw new Error(`Erro ao buscar dados de ${url}`);
            const data = await res.json();
            setter(data.dif || []);
        } catch (err) {
            console.error(err);
            setter([]);
        }
    };

    useEffect(() => {
        fetchData('http://localhost:5010/dificuldades', setDificuldade);
    }, []);

    const { data: cursos } = useFetch('http://localhost:5010/obtercursos', token);
    const filtered = cursos?.filter((c) => {
        const q = query.trim().toLowerCase();

        if (q && !`${c.titulo} ${c.descricao} ${c.nome}`.toLowerCase().includes(q)) return false;

        if (nivelFiltro && nivelFiltro !== "Todos") {
            return c.nome === nivelFiltro;
        }
        return true;
    }) || [];

    const lidarComNavegacao = (card) => {
        const title = card.titulo;
        const level = card.nome;
        let rota = null;

        if (title === "Associação") {
            if (level === "Iniciante") rota = "/associacao";
            else if (level === "Intermediário") rota = "/associacao-intermediario";
            else if (level === "Avançado") rota = "/associacao-avancado";
        } 
        
        else if (title === "Jogo das Frases") {
            if (level === "Iniciante") rota = "/frase";
            else if (level === "Intermediário") rota = "/frase-intermediario";
        } 
        
        else if (title === "Imite o Sinal") {
            rota = "/imiteosinal";
        } 
        
        else if (title === "Teoria") {
            if (level === "Iniciante") rota = "/teoria";
            else if (level === "Intermediário") rota = "/teoria-intermediario";
        } 
        
        else if (title === "Quiz") {
           if (level === "Iniciante") rota = "/quiz";
           else if (level === "Intermediário") rota = "/quiz-intermediario";
           else if (level === "Avançado") rota = "/quiz-avancado";
        }
        
        else if (title === "Em Breve") {
            alert("Em breve! Esta atividade ainda não está disponível.");
            return;
        }

        if (rota) {
            navegar(rota);
        } else {
            navegar(`/atividade/${card.id}`);
        }
    };

    return (
        <div>
            <Cabecalho logado={true} />

            <div className="atividades-page">
                <header className="atividades-header">
                    <br /><br /><br />
                    <div className="search-row">
                        <input
                            className="search-input"
                            placeholder="Buscar atividades..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />

                        <select
                            className="nivel-select"
                            value={nivelFiltro}
                            onChange={(e) => setNivelFiltro(e.target.value)}
                            aria-label="Selecionar nível"
                        >
                            <option value="Todos">Todos</option>

                            {dificuldade?.map((item) => (
                                <option key={item.id_dificuldade} value={item.nome}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </header>

                <main className="cards-grid">
                    {filtered.map((card) => (
                        <Card
                            key={card.id_curso}
                            atividade={card}
                            aoNavegar={lidarComNavegacao}
                        />
                    ))}
                </main>
                <br />
            </div>
            <Rodape />
        </div>
    );
}