import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "./perfil.scss";



export default function PerfilAluno() {

  const [nome, setNome] = useState("");

  const [bio, setBio] = useState("");

  const [telefone, setTelefone] = useState("");

  const [area, setArea] = useState("");

  const [foto, setFoto] = useState("");

  const [editando, setEditando] = useState(false);

  const [perfil, setPerfil] = useState([]);



  const navigate = useNavigate();



  const trocarFoto = (e) => {

    const arquivo = e.target.files[0];

    if (arquivo) {

      const url = URL.createObjectURL(arquivo);

      setFoto(url);

    }

  };



  const salvarAlteracoes = () => {

    setEditando(false);

  };





  function handleLogout() {

    localStorage.removeItem("authToken");

    localStorage.removeItem("name");

    navigate("/", { replace: true });  

    window.history.pushState(null, "", "/");

  }



  const fetchData = async (url, setter) => {

    try {

      const res = await fetch(url);

      if (!res.ok) throw new Error(`Erro ao buscar dados de ${url}`);

      const data = await res.json();

      setter(data.info || []);

    } catch (err) {

      console.error(err);

      setter([]);

    }

  };



  useEffect(() => {

    fetchData('http://localhost:5010/user/perfil', setPerfil);

  }, []);



  const name = localStorage.getItem("name");



  return (

    <div className="perfil-page">

      <aside className="sidebar">

        <div className="topo">

          <h2 className="logo" onClick={() => navigate("/")}>

            <span className="logo-icon">🤟</span> Falar é Magico

          </h2>



          <div className="sidebar-foto">

            <img src={foto} alt="Foto do aluno" />

            <p>{nome}</p>

          </div>

        </div>



        <nav>

          <button onClick={() => navigate("/homeL")}>🏠 Início</button>

          <button onClick={() => navigate("/atividades")} >📚 Atividades</button>

          <button className="ativo">👤 Perfil</button>

          <button onClick={handleLogout}> 🚪 Sair</button>

        </nav>

      </aside>



      <main className="perfil-conteudo">

        <h1>Perfil do Aluno</h1>



        <section className="info">

          <div className="foto-area">

            {/* <img src={foto} alt="Foto de perfil" className="foto" /> */}

            <img src={foto} alt="Foto de perfil" className="foto" />

            <label htmlFor="uploadFoto" className="trocar-foto">

              Trocar foto

            </label>

            <input

              id="uploadFoto"

              type="file"

              accept="image/*"

              onChange={trocarFoto}

              style={{ display: "none" }}

            />

          </div>



          <div className="dados">

            {editando ? (

              <>

                <input

                  value={nome}

                  onChange={(e) => setNome(e.target.value)}

                />

                <textarea

                  value={bio}

                  onChange={(e) => setBio(e.target.value)}

                />

                <input

                  value={telefone}

                  onChange={(e) => setTelefone(e.target.value)}

                />

                <input

                  value={area}

                  onChange={(e) => setArea(e.target.value)}

                />

                <div className="progresso-editar"></div>

                <button className="salvar" onClick={salvarAlteracoes}>

                  💾 Salvar

                </button>

              </>

            ) : (

              <>

                {/* <h2>{nome}</h2> */}

                <h2>{name}</h2>

                <p className="bio">{bio}</p>

                <p>

                  <strong>Telefone:</strong> {telefone}

                </p>

               



                <div className="botoes">

                  <button

                    className="editar"

                    onClick={() => setEditando(true)}

                  >

                    Editar perfil

                  </button>

                </div>

              </>

            )}

          </div>

        </section>

      </main>

    </div>

  );

}