import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./perfil.scss";

export default function PerfilAluno() {
    const [nome, setNome] = useState("");
    const [bio, setBio] = useState("");
    const [telefone, setTelefone] = useState("");
    const [area, setArea] = useState("");
    const [foto, setFoto] = useState(null);
    const [editando, setEditando] = useState(false);
    const [perfil, setPerfil] = useState({});
    const [perfilatt,setPerfilatt] = useState({
      nome: "",
      telefone: "",
    });

    const navigate = useNavigate();

    const handleSubmit = async () => {
      
      const dadosParaEnviar = {
        ...perfilatt,
          nome: nome.trim() === "" ? perfil.nome: nome,
          telefone: telefone.trim() === "" ? perfil.telefone: telefone
      };
    
      try {
        const res = await fetch('http://localhost:5010/user/attperfil', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              "x-access-token": token
          },
          body: JSON.stringify(dadosParaEnviar),
        });
        if (!res.ok) {
          throw new Error('Erro ao atualizar perfil');
        }
        const data = await res.json();
        alert(data.resp);
        setPerfilatt({
          nome: '',
          telefone: '',
        });
        setEditando(false);
        window.location.reload();
      } catch (err) {
        console.error(err);
        alert('Falha ao cadastrar, verifique se as informações estão inseridas corretamente!');
      }
    } 

    const salvarAlteracoes = () => {
        setEditando(false);
    };

    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("id");

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("img", foto);

        const res = await fetch(`http://localhost:5010/user/${id}/addimg`, {
            method: "PUT",
            body: formData,
            headers: {"x-access-token": token},
        });

        const data = await res.json();
        alert(data.resp);
        window.location.reload();
    };

    useEffect(() => {
        if (!foto) return;
        handleUpload(foto);
    }, [foto]); 

    axios.get('http://localhost:5010/user/perfil', {
        headers: {
            'x-access-token': token
        }
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    navigate("/", { replace: true });  
    window.history.pushState(null, "", "/");
  }

  const fetchData = async (url, setter) => {
    try {
      const res = await fetch(url, {
        headers: {
            "x-access-token": token,
        },
      });
      if (!res.ok) throw new Error(`Erro ao buscar dados de ${url}`);
      const data = await res.json();
      setter(data.info[0] || {});

    } catch (err) {
      console.error(err);
      setter({});
    }
  };

  useEffect(() => {
    fetchData('http://localhost:5010/user/perfil', setPerfil);
  }, []);

  const baseURL = "http://localhost:5010/";
  const fotoPath = perfil.foto_url?.replace(/\\/g, "/");

  const pfppath1 = perfil.foto_url;
  const pfppath2 = `${baseURL}${fotoPath}`;
  let pfppath;

  if (pfppath1 && pfppath1.startsWith("https://")){
    pfppath = pfppath1;
  }
  else {
    pfppath = pfppath2
  }

  return (

    <div className="perfil-page">

      <aside className="sidebar">

        <div className="topo">

          <h2 className="logo" onClick={() => navigate("/")}>

            <span className="logo-icon">🤟</span> Falar é Magico

          </h2>

          <div className="sidebar-foto">

            <img src={pfppath} alt="Foto do aluno" />
            <p>{perfil.nome}</p>
          </div>
        </div>
        <nav>

          <button onClick={() => navigate("/homeL")}>🏠 Início</button>
          <button onClick={() => navigate("/chat")}>🎓 chat</button>
          <button onClick={() => navigate("/atividades")} >📚 Atividades</button>
          <button className="ativo">👤 Perfil</button>
          <button className="sair" onClick={handleLogout}>🚪 Sair</button>

        </nav>

      </aside>


      <main className="perfil-conteudo">

        <h1>Perfil do Aluno</h1>

        <section className="info">

          <div className="foto-area">

            <img src={pfppath} alt="Foto de perfil" className="foto" />

            <label htmlFor="uploadFoto" className="trocar-foto">

              Trocar foto

            </label>

            <input

              id="uploadFoto"

              type="file"

              accept="image/*"

              onChange={(e) => setFoto(e.target.files?.[0] ?? null)}

              style={{ display: "none" }}

            />

          </div>



          <div className="dados">

            {editando ? (

              <>

                <input

                  placeholder="nome"

                  value={nome}

                  onChange={(e) => setNome(e.target.value)}

                />

               
                <input

                  placeholder="telefone"

                  value={telefone}

                  onChange={(e) => setTelefone(e.target.value)}

                />

                <input

                  placeholder="area"

                  value={area}

                  onChange={(e) => setArea(e.target.value)}

                />

                <div className="progresso-editar"></div>

                <button className="salvar" onClick={handleSubmit}>

                  💾 Salvar

                </button>

              </>

            ) : (

              <>

                <h2>{perfil.nome}</h2>

                <p className="bio">{bio}</p>

                <p>

                  <strong>Telefone:</strong> {perfil.telefone}

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