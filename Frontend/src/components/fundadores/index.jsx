import "./index.scss";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Fundadores() {
  const membros = [
    {
      nome: "Caio Mello",
      cargo: "CEO",
      descricao:"Profissional entusiasta da comunicação, times colaborativos e inovação. Atuo como desenvolvedor Back-End,com uma bagagem em banco de dados e gestão de projetos.",
      imagem: "./caio.jpg",
      linkedin: "https://www.linkedin.com/in/caio-sousa-mello-405254252/",
      instagram: "https://www.instagram.com/_eljadon/",
    },
    {
      nome: "João Pedro",
      cargo: "CEO",
      descricao:
        "Sou João Pedro, tenho 19 anos e curso Tecnologia da Informação. No TCC, participei do desenvolvimento do front-end, ficando encarregado principalmente das atividades do site.",
      imagem: "./joao.jpg",
      linkedin: "https://www.linkedin.com/in/pedro-santos-9728032b2?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      instagram: "https://www.instagram.com/_jotape06_?igsh=MXJ0cDUyNXRweHI1Nw==",
    },
    {
      nome: "Marcos Souza",
      cargo: "CEO",
      descricao:
        "Desenvolvedor interessado em se tornar FullStack. Atualmente com foco maior em Backend e interesse em aprender a Criação de Arte e Animação Digitais 2D e 3D. Formado em Desenvolvimento de Jogos.",
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
                <a
                  href={membro.linkedin}
                  target="_blank"   
                  rel="noopener noreferrer"
                  className="Linkdin"
                >
                  <FaLinkedin size={24} />
            
                </a>
             
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}