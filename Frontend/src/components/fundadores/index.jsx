import "./index.scss";

export default function Fundadores() {
  const membros = [
    {
      nome: "Pedro Henrique",
      cargo: "CEO da Hand Talk",
      descricao:
        "Publicitário e especialista em comunicação estratégica. Cofundador e Diretor Executivo da Hand Talk, uma das startups mais premiadas do Brasil. Reconhecido pela ONU e eleito Empreendedor do Ano pela EY.",
      imagem: "imagem.png",
      linkedin: "https://www.linkedin.com/in/pedro-henrique-642177266",
    },
    {
      nome: "Caio Mello",
      cargo: "CTO da Hand Talk",
      descricao:
        "Diretor de Tecnologia e cofundador da Hand Talk, com mais de 20 anos de experiência em desenvolvimento de software. Eleito Empreendedor Social do Futuro pela Folha de São Paulo.",
      imagem: "https://i.imgur.com/qkg9SDo.jpg",
      linkedin: "https://www.linkedin.com/in/caiomello/",
    },
    {
      nome: "Marcos",
      cargo: "CAIO da Hand Talk",
      descricao:
        "Diretor de Inteligência Artificial e cofundador da Hand Talk. Formado em Arquitetura e especializado em animação 3D no Canadá. Google Developer Expert e mentor do Google for Startups.",
      imagem: "https://i.imgur.com/nSfFX9O.jpg",
      linkedin: "https://www.linkedin.com/in/marcos/",
    },
    {
      nome: "Joao Pedro",
      cargo: "COO da Hand Talk",
      descricao:
        "Gestora de Operações com foco em inovação e impacto social. Lidera equipes multidisciplinares e estratégias voltadas à inclusão digital. Participou de programas do MIT e da ONU.",
      imagem: "https://i.imgur.com/kQZQb8z.jpg",
      linkedin: "https://www.linkedin.com/in/joaopedro/",
    },
  ];

  return (
    <section className="fundadores" id="fundadores">
      <h2>Conheça nossos fundadores</h2>
      <div className="carousel-wrapper">
        <div className="cards-container">
          {membros.map((membro, i) => (
            <div className="card" key={i}>
              <div className="foto">
                <img src={membro.imagem} alt={membro.nome} />
              </div>
              <h3>
                <a
                  href={membro.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {membro.nome}
                </a>
              </h3>
              <h4>{membro.cargo}</h4>
              <p>{membro.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}