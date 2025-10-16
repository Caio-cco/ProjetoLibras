import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Camera, LogOut, Edit2, X } from "lucide-react";
import "./perfil.scss";

export default function Perfil() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nome: "Pedro Henrique",
    email: "pedro@email.com",
    curso: "Curso de Libras - Nível Intermediário",
    foto: "https://i.pravatar.cc/150?img=12",
    progresso: 65,
  });

  const [editarAtivo, setEditarAtivo] = useState(false);
  const [form, setForm] = useState(usuario);

  const sair = () => navigate("/");

  // Trocar foto **funciona tanto no card quanto no modal**
  const trocarFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fotoURL = URL.createObjectURL(file);

    // Atualiza foto do form e do usuario imediatamente
    setForm({ ...form, foto: fotoURL });
    setUsuario({ ...usuario, foto: fotoURL });
  };

  const salvarEdicao = () => {
    setUsuario(form);
    setEditarAtivo(false);
  };

  return (
    <div className="perfil">
      <div className="card-perfil">
        <button className="sair" title="Sair" onClick={sair}>
          <LogOut size={20} />
        </button>

        <div className="foto-container">
          <img src={usuario.foto} alt="Foto do usuário" className="foto" />
          <label htmlFor="foto" className="camera">
            <Camera size={16} />
            <input
              id="foto"
              type="file"
              accept="image/*"
              onChange={trocarFoto} // 🔑 Aqui funciona
            />
          </label>
        </div>

        <h2>{usuario.nome}</h2>
        <p className="email">{usuario.email}</p>

        <div className="info">
          <p>
            <span>Curso atual:</span> {usuario.curso}
          </p>
          <p>
            <span>Progresso:</span>
          </p>
          <div className="barra-progresso">
            <div
              className="progresso"
              style={{ width: `${usuario.progresso}%` }}
            ></div>
          </div>
        </div>

        <button className="editar" onClick={() => setEditarAtivo(true)}>
          <Edit2 size={16} /> Editar perfil
        </button>
      </div>

      {editarAtivo && (
        <div className="modal-edicao">
          <div className="modal-conteudo">
            <button className="fechar" onClick={() => setEditarAtivo(false)}>
              <X size={20} />
            </button>

            <h3>Editar Perfil</h3>
            <label>
              Nome
              <input
                type="text"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label>
              Curso
              <input
                type="text"
                value={form.curso}
                onChange={(e) => setForm({ ...form, curso: e.target.value })}
              />
            </label>
          
            <button className="salvar" onClick={salvarEdicao}>
              Salvar Alterações
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
