import { useState } from "react";
import "./perfil.scss";

export default function PerfilAluno() {
  const [nome, setNome] = useState("Pedro Henrique");
  const [bio, setBio] = useState("Aluno dedicado no curso de Libras.");
  const [telefone, setTelefone] = useState("(11) 99999-9999");
  const [area, setArea] = useState("Comunicação e Educação");
  const [progresso, setProgresso] = useState(70);
  const [foto, setFoto] = useState("./perfil.jpg");
  const [editando, setEditando] = useState(false);

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

  return (
    <div className="perfil-page">
      <aside className="sidebar">
        <div className="topo">
          <h2 className="logo" onClick={() => (window.location.href = "/")}>
            <span className="logo-icon">🤟</span> Falar é Magico
          </h2>

          <div className="sidebar-foto">
            <img src={foto} alt="Foto do aluno" />
            <p>{nome}</p>
          </div>
        </div>

        <nav>
          <button onClick={() => (window.location.href = "/")}>🏠 Início</button>
          <button className="ativo">👤 Perfil</button>
          <button onClick={() => (window.location.href = "/")}>📚 Sair</button>
        </nav>
      </aside>

      <main className="perfil-conteudo">
        <h1>Perfil do Aluno</h1>

        <section className="info">
          <div className="foto-area">
            <img src={foto} alt="Foto de perfil" className="foto" />
            <label htmlFor="uploadFoto" className="trocar-foto">Trocar foto</label>
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
                <input value={nome} onChange={(e) => setNome(e.target.value)} />
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
                <input value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                <input value={area} onChange={(e) => setArea(e.target.value)} />
                <div className="progresso-editar">
                  
               
                </div>
                <button className="salvar" onClick={salvarAlteracoes}>💾 Salvar</button>
              </>
            ) : (
              <>
                <h2>{nome}</h2>
                <p className="bio">{bio}</p>
                <p><strong>Telefone:</strong> {telefone}</p>
                <p><strong>Área de estudo:</strong> {area}</p>

               

                <div className="botoes">
                  <button className="editar" onClick={() => setEditando(true)}>Editar perfil</button>
                 
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
