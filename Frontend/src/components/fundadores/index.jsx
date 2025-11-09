import "./index.scss";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Fundadores() {
  const membros = [
    {
      nome: "Caio Mello",
      cargo: "CEO",
      descricao:
        "Publicitário e especialista em comunicação estratégica. Cofundador e Diretor Executivo da Hand Talk, uma das startups mais premiadas do Brasil. Reconhecido pela ONU e eleito Empreendedor do Ano pela EY.",
      imagem: "./caio.jpg",
      linkedin: "https://www.linkedin.com/in/caio-sousa-mello-405254252/",
      instagram: "https://www.instagram.com/_eljadon/",
    },
    {
      nome: "João Pedro",
      cargo: "CEO",
      descricao:
        "Diretor de Tecnologia e cofundador da Hand Talk, com mais de 20 anos de experiência em desenvolvimento de software. Eleito Empreendedor Social do Futuro pela Folha de São Paulo.",
      imagem: "https://i.imgur.com/qkg9SDo.jpg",
      linkedin: "https://www.linkedin.com/in/caiomello/",
      instagram: "https://www.instagram.com",
    },
    {
      nome: "Marcos Souza",
      cargo: "CEO",
      descricao:
        "Diretor de Inteligência Artificial e cofundador da Hand Talk. Formado em Arquitetura e especializado em animação 3D no Canadá. Google Developer Expert e mentor do Google for Startups.",
      imagem: "./marcos.png",
      linkedin: "https://www.linkedin.com/in/marcos-souza-do-carmo-697044265/",
      instagram: "https://www.instagram.com/markcyss15?igsh=cHRveTE5b3pueHVz",
    },
    {
      nome: "Pedro Henrique",
      cargo: "CEO",
      descricao:
        "Sou Pedro Henrique, tenho 18 anos e curso Tecnologia da Informação. Neste TCC, atuei na parte de front-end, desenvolvendo a interface do projeto e aprimorando meus conhecimentos na área de TI.",
      imagem: "./pedro.jpg",
      linkedin: "https://www.linkedin.com/in/pedro-henrique-642177266",
      instagram: "https://www.instagram.com/ph_ferreira.__",
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
              <div className="redes-sociais">
                <a
                  href={membro.instagram}
                  target="_blank"   
                  rel="noopener noreferrer"
                  className="Instagram"
                >
                  <FaInstagram size={24} />
                </a>
             
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}