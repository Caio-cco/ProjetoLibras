import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./index.scss";

const cards = [
  {
    title: "Libras para Iniciantes",
    subtitle: "Módulo 1: Primeiros Sinais",
    desc: "Ideal pra quem nunca teve contato, aprenda frases básicas.",
    image: "/imagem.png",
    button: "Inscrever-se Agora",
  },
  {
    title: "Libras para Intermediários",
    subtitle: "Módulo 2: Fluência Conversacional",
    desc: "Aprofunde seus conhecimentos e construa diálogos mais complexos.",
    image: "/imagem.png",
    button: "Saiba Mais",
  },
  {
    title: "Libras para Avançados",
    subtitle: "Expressão e Cultura",
    desc: "Domine sua interpretação, nuances culturais e diálogos complexos.",
    image: "/iniciante.png",
    button: "Ver Conteúdo",
  },
];

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextCard = () => setActiveIndex((prev) => (prev + 1) % cards.length);
  const prevCard = () => setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) nextCard();
    else if (info.offset.x > 50) prevCard();
  };

  return (
    <section className="carousel-section">
      <h2 className="carousel-title">Atividades</h2>

      <div className="carousel-container">
        <button onClick={prevCard} className="carousel-btn">
          <ChevronLeft size={24} />
        </button>

        <div className="carousel-card-container">
          {cards.map((card, i) => {
            const isActive = i === activeIndex;
            const offset = (i - activeIndex + cards.length) % cards.length;
            let xPos = 0;
            if (offset === 1) xPos = 180;
            if (offset === 2) xPos = -180;

            return (
              <motion.div
                key={i}
                className="carousel-card"
                animate={{
                  scale: isActive ? 1 : 0.8,
                  opacity: isActive ? 1 : 0.4,
                  x: isActive ? 0 : xPos,
                  zIndex: isActive ? 10 : 0,
                  filter: isActive ? "brightness(1)" : "brightness(0.6)",
                }}
                transition={{ type: "spring", stiffness: 120, damping: 15 }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
              >
                {card.image && (
                  <img className="card-image" src={card.image} alt={card.title} />
                )}

                <div>
                  <h3>{card.title}</h3>
                  <p className="subtitle">{card.subtitle}</p>
                  <p>{card.desc}</p>
                </div>
                <button>{card.button}</button>
              </motion.div>
            );
          })}
        </div>

        <button onClick={nextCard} className="carousel-btn">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="carousel-dots">
        {cards.map((_, i) => (
          <div
            key={i}
            className={`carousel-dot ${i === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
