import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./perfil.scss";

export default function PerfilAluno() {
  const [nome, setNome] = useState("");
  const [bio, setBio] = useState("");
  const [telefone, setTelefone] = useState("");
  const [area, setArea] = useState("");
  const [foto, setFoto] = useState(null);
  const [editando, setEditando] = useState(false);
  const [perfil, setPerfil] = useState({});
  const [perfilatt, setPerfilatt] = useState({
    nome: "",
    telefone: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const id = localStorage.getItem("id");

  function formatarTelefone(valor) {
    let apenasNumeros = valor.replace(/\D/g, "");

    if (apenasNumeros.startsWith("55")) {
      apenasNumeros = apenasNumeros.slice(0, 13);
      return apenasNumeros
        .replace(/^55(\d{2})(\d{5})(\d{0,4}).*/, "+55 ($1) $2-$3")
        .replace(/^55(\d{2})(\d{4})(\d{0,4}).*/, "+55 ($1) $2-$3")
        .trim();
    }

    if (apenasNumeros.length <= 10) {
      return apenasNumeros
        .replace(/^(\d{0,2})(\d{0,4})(\d{0,4}).*/, (_, a, b, c) =>
          [a ? `(${a})` : "", b, c ? `-${c}` : ""].join(" ").trim()
        )
        .trim();
    } else {
      return apenasNumeros
        .replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3")
        .trim();
    }
  }

  const handleSubmit = async () => {

    const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/.test(nome.trim()) || nome.trim() === "";
    const telefoneNumerico = telefone.replace(/\D/g, "");
    const telefoneValido = telefoneNumerico.length >= 8 && telefoneNumerico.length <= 15;

    if (!nomeValido) {
      toast.error("O nome deve conter apenas letras e espaços.", { position: "top-right" });
      return;
    }

    if (telefone.trim() !== "" && !telefoneValido) {
      toast.error("Telefone inválido. Use apenas números e DDD corretos.", { position: "top-right" });
      return;
    }

    const dadosParaEnviar = {
      ...perfilatt,
      nome: nome.trim() === "" ? perfil.nome : nome,
      telefone: 
        telefone.trim() === "" 
        ? perfil.telefone : telefone.replace(/\D/g, ""),
    };

    try {
      const res = await fetch("http://localhost:5010/user/attperfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(dadosParaEnviar),
      });

      if (!res.ok) throw new Error("Erro ao atualizar perfil");

      const data = await res.json();
      toast.success(data.resp, { position: "top-right" });
      setPerfilatt({ nome: "", telefone: "" });
      setEditando(false);
      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      console.error(err);
      toast.error(
        "Falha ao atualizar o perfil. Verifique as informações!",
        { position: "top-right" }
      );
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("img", foto);

    try {
      const res = await fetch(`http://localhost:5010/user/${id}/addimg`, {
        method: "PUT",
        body: formData,
        headers: { "x-access-token": token },
      });

      const data = await res.json();
      toast.success(data.resp, { position: "top-right" });
      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      toast.error("Erro ao enviar imagem", { position: "top-right" });
    }
  };

  useEffect(() => {
    if (foto) handleUpload(foto);
  }, [foto]);

  axios
    .get("http://localhost:5010/user/perfil", {
      headers: {
        "x-access-token": token,
      },
    })
    .catch((error) => {
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
        headers: { "x-access-token": token },
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
    fetchData("http://localhost:5010/user/perfil", setPerfil);
  }, []);

  const baseURL = "http://localhost:5010/";
  const fotoPath = perfil.foto_url?.replace(/\\/g, "/");
  const pfppath1 = perfil.foto_url;
  const pfppath2 = `${baseURL}${fotoPath}`;
  const pfppath = pfppath1?.startsWith("http") ? pfppath1 : pfppath2;

  return (
    <div className="perfil-page">
      <ToastContainer autoClose={2500} theme="colored" />

      <aside className="sidebar">
        <div className="topo">
          <h2 className="logo" onClick={() => navigate("/")}>
            <span className="logo-icon"></span> Falar é Mágico
          </h2>

          <div className="sidebar-foto">
            <img src={pfppath} alt="Foto do aluno" />
            <p>{perfil.nome}</p>
          </div>
        </div>

        <nav>
          <button onClick={() => navigate("/homeL")}>🏠 Início</button>
          <button onClick={() => navigate("/admin")}>🧾 Admin</button>
          <button onClick={() => navigate("/atividades")}>📚 Atividades</button>
          <button className="ativo">👤 Perfil</button>
          <button className="sair" onClick={handleLogout}>
            🚪 Sair
          </button>
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
                  onChange={(e) => {
                    const valor = e.target.value;
                    setTelefone(formatarTelefone(valor));
                  }}
                />

                <input
                  placeholder="área"
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
                  <strong>Telefone:</strong> {" "}
                    {perfil.telefone
                    ? formatarTelefone(perfil.telefone)
                    : "Não informado"}
                </p>

                <div className="botoes">
                  <button className="editar" onClick={() => {
                    setNome(perfil.nome || "");
                    setTelefone(formatarTelefone(perfil.telefone || ""));
                    setEditando(true)
                  }}
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