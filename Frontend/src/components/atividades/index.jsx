// import { FaChevronRight } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Cabecalho from "../cabecalho";
// import Rodape from "../rodape";
// import "./index.scss";
// import { useState, useEffect } from "react";


// const sampleCards = [
//   { id: 1, title: "Associação", subtitle: "Associe a palavra ao sinal", tag: "Fácil", level: "Iniciante", imageClass: "associacao-img" },
//   { id: 2, title: "Associação", subtitle: "Associe a frase ao sinal", tag: "Teste", level: "Intermediário", imageClass: "associacao-img" },
//   { id: 3, title: "Associação", subtitle: "Associe o contexto ao sinal", tag: "Desafio", level: "Avançado", imageClass: "associacao-img" },

//   { id: 4, title: "Quiz", subtitle: "Teste de sinais básicos", tag: "Fácil", level: "Iniciante", imageClass: "quiz-img" },
//   { id: 5, title: "Quiz", subtitle: "Teste de frases e vocabulário", tag: "Teste", level: "Intermediário", imageClass: "quiz-img" },
//   { id: 6, title: "Quiz", subtitle: "Teste de gramática e contexto", tag: "Desafio", level: "Avançado", imageClass: "quiz-img" },

//   { id: 10, title: "Jogo das Frases", subtitle: "Construa frases simples", tag: "Fácil", level: "Iniciante", imageClass: "frases-img" },
//   { id: 11, title: "Jogo das Frases", subtitle: "Use classificadores e verbos", tag: "Teste", level: "Intermediário", imageClass: "frases-img" },
//   { id: 12, title: "Jogo das Frases", subtitle: "Crie textos completos", tag: "Desafio", level: "Avançado", imageClass: "frases-img" },

//   { id: 13, title: "Teoria", subtitle: "Alfabeto, números e cumprimentos", tag: "Aprender", level: "Iniciante", imageClass: "teorico-img" },
//   { id: 14, title: "Teoria", subtitle: "Gramática e estrutura da Libras", tag: "Aprender", level: "Intermediário", imageClass: "teorico-img" },
//   { id: 15, title: "Teoria", subtitle: "História, cultura e regionalismos", tag: "Aprender", level: "Avançado", imageClass: "teorico-img" },

//   { id: 16, title: "Em Breve", subtitle: "Novas atividades e desafios", tag: "Novidade", level: "Iniciante", imageClass: "em-breve-img" }
// ];


// export default function Atividades() {
//   const [dificuldade, setDificuldade] = useState([]);
//   const [query, setQuery] = useState("");
//   const [nivelFiltro, setNivelFiltro] = useState("Todos");
//   const navigate = useNavigate();

//   const filtered = sampleCards.filter((c) => {
//     const q = query.trim().toLowerCase();

//     if (q && !`${c.title} ${c.subtitle} ${c.level}`.toLowerCase().includes(q)) return false;

//     if (nivelFiltro && nivelFiltro !== "Todos") {
//       return c.level === nivelFiltro;
//     }
//     return true;
//   });

//   const token = localStorage.getItem("authToken");

//   const fetchData = async (url, setter) => {
//     try {
//       const res = await fetch(url, {
//     headers: {
//         "x-access-token": token,
//     },
// });
//       if (!res.ok) throw new Error(`Erro ao buscar dados de ${url}`);
//       const data = await res.json();
//       setter(data.dif || []); 
//     } catch (err) {
//       console.error(err);
//       setter([]); 
//     }
//   };

//   useEffect(() => {
//     fetchData('http://localhost:5010/dificuldades', setDificuldade);
//   }, []);


//   const handleNavigation = (card) => {
//     const title = card.title;
//     const level = card.level;
//     let route = null;

//     // --- JOGO DE ASSOCIAÇÃO ---
//     if (title === "Associação") {
//       if (level === "Iniciante") route = "/associacao";
//       else if (level === "Intermediário") route = "/associacao-intermediario";
//           else if (level === "Avançado") route = "/associacao-avancado";
//     } 
//     
//     // --- JOGO DAS FRASES ---
//     else if (title === "Jogo das Frases") {
//       if (level === "Iniciante") route = "/frase";
//       else if (level === "Intermediário") route = "/frase-intermediario";
//     } 
//     
//     // --- IMITE O SINAL ---
//     else if (title === "Imite o Sinal") {
//       route = "/imiteosinal";
//     } 
//     
//     // --- CONTEÚDO TEÓRICO ---
//     else if (title === "Teoria") {
//       if (level === "Iniciante") route = "/teoria";
//       else if (level === "Intermediário") route = "/teoria-intermediario";
//     } 
//     
//     // --- QUIZ --- 
//     else if (title === "Quiz") {
//      if (level === "Iniciante") route = "/quiz";
//      else if (level === "Intermediário") route = "/quiz-intermediario";
//      else if (level === "Avançado") route = "/quiz-avancado";
//     }
//     
//     // --- EM BREVE / FALHA ---
//     else if (title === "Em Breve") {
//       alert("Em breve! Esta atividade ainda não está disponível.");
//       return;
//     }

//     if (route) {
//       navigate(route);
//     } else {
//       navigate(`/atividade/${card.id}`); 
//     }
//   };


//   return (
//     <div>
//       <Cabecalho logado={true} />

//       <div className="atividades-page">
//         <header className="atividades-header">
//           <br />
//           <br />
//           <br />
//           <div className="search-row"><input
//             className="search-input"
//             placeholder="Buscar atividades..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />

//             <select
//               className="nivel-select"
//               value={nivelFiltro}
//               onChange={(e) => setNivelFiltro(e.target.value)}
//               aria-label="Selecionar nível"
//             >
//               <option value="Todos">Todos</option>

//               {dificuldade?.map((item) => (
//                 <option key={item.id} value={item.nome}>
//                   {item.nome}
//                 </option>
//               ))}
//             </select>
//             
//           </div>
//         </header>

//         <main className="cards-grid">
//           {filtered.map((card) => (
//             <article
//               className={`card card-level-${card.level.toLowerCase()}`}
//               key={card.id}>
//               <div className={`card-media ${card.imageClass}`}>
//               </div>
//               <div className="card-body">
//                 <h3>{card.title} - {card.level}</h3>
//                 <p className="subtitle">{card.subtitle}</p>
//                 <div className="card-footer-clean">
//                   <button
//                     className="cta"
//                     onClick={() => handleNavigation(card)}
//                   >
//                     Abrir
//                     <FaChevronRight />
//                   </button>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </main>
//         <br />
//       </div>
//       <Rodape />
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import Cabecalho from "../cabecalho";
import Rodape from "../rodape";
import "./index.scss";
import { useState, useEffect } from "react";
import Card from '../../components/Card';
import useFetch from "../FetchSinais/Index";


const sampleCards = [
    { id: 1, title: "Associação", subtitle: "Associe a palavra ao sinal", tag: "Fácil", level: "Iniciante", imageClass: "associacao-img" },
    { id: 2, title: "Associação", subtitle: "Associe a frase ao sinal", tag: "Teste", level: "Intermediário", imageClass: "associacao-img" },
    { id: 3, title: "Associação", subtitle: "Associe o contexto ao sinal", tag: "Desafio", level: "Avançado", imageClass: "associacao-img" },

    { id: 4, title: "Quiz", subtitle: "Teste de sinais básicos", tag: "Fácil", level: "Iniciante", imageClass: "quiz-img" },
    { id: 5, title: "Quiz", subtitle: "Teste de frases e vocabulário", tag: "Teste", level: "Intermediário", imageClass: "quiz-img" },
    { id: 6, title: "Quiz", subtitle: "Teste de gramática e contexto", tag: "Desafio", level: "Avançado", imageClass: "quiz-img" },

    { id: 10, title: "Jogo das Frases", subtitle: "Construa frases simples", tag: "Fácil", level: "Iniciante", imageClass: "frases-img" },
    { id: 11, title: "Jogo das Frases", subtitle: "Use classificadores e verbos", tag: "Teste", level: "Intermediário", imageClass: "frases-img" },
    { id: 12, title: "Jogo das Frases", subtitle: "Crie textos completos", tag: "Desafio", level: "Avançado", imageClass: "frases-img" },

    { id: 13, title: "Teoria", subtitle: "Alfabeto, números e cumprimentos", tag: "Aprender", level: "Iniciante", imageClass: "teorico-img" },
    { id: 14, title: "Teoria", subtitle: "Gramática e estrutura da Libras", tag: "Aprender", level: "Intermediário", imageClass: "teorico-img" },
    { id: 15, title: "Teoria", subtitle: "História, cultura e regionalismos", tag: "Aprender", level: "Avançado", imageClass: "teorico-img" },

    { id: 16, title: "Em Breve", subtitle: "Novas atividades e desafios", tag: "Novidade", level: "Iniciante", imageClass: "em-breve-img" }
];


export default function Atividades() {
    const [dificuldade, setDificuldade] = useState([]);
    const [query, setQuery] = useState("");
    const [nivelFiltro, setNivelFiltro] = useState("Todos");
    //const [cursos, setCursos] = useState([]);
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

        // --- JOGO DE ASSOCIAÇÃO ---
        if (title === "Associação") {
            if (level === "Iniciante") rota = "/associacao";
            else if (level === "Intermediário") rota = "/associacao-intermediario";
            else if (level === "Avançado") rota = "/associacao-avancado";
        } 
        
        // --- JOGO DAS FRASES ---
        else if (title === "Jogo das Frases") {
            if (level === "Iniciante") rota = "/frase";
            else if (level === "Intermediário") rota = "/frase-intermediario";
        } 
        
        // --- IMITE O SINAL ---
        else if (title === "Imite o Sinal") {
            rota = "/imiteosinal";
        } 
        
        // --- CONTEÚDO TEÓRICO ---
        else if (title === "Teoria") {
            if (level === "Iniciante") rota = "/teoria";
            else if (level === "Intermediário") rota = "/teoria-intermediario";
        } 
        
        // --- QUIZ --- 
        else if (title === "Quiz") {
           if (level === "Iniciante") rota = "/quiz";
           else if (level === "Intermediário") rota = "/quiz-intermediario";
           else if (level === "Avançado") rota = "/quiz-avancado";
        }
        
        // --- EM BREVE / FALHA ---
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

                {/* <main className="cards-grid">
                    {filtered.map((card) => (
                        <Card
                            key={card.id}
                            atividade={card}
                            aoNavegar={lidarComNavegacao}
                        />
                    ))}
                </main> */}
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