import { conection } from "./conection.js";

export async function validarCredenciais(email, senha) {
  const [rows] = await conection.execute(
    "select * from usuario where email = ? AND senha = MD5(?)",
    [email, senha]
  );
  return rows[0] || null;
}

export async function criarConta({ email, senha, name }) {
  const [result] = await conection.execute(
    "insert into usuario (email, senha, nome, login_social, role) VALUES (?, MD5(?), ?, 0, 'user')",
    [email, senha, name]
  );
  return result.insertId;
}

export async function upsertUsuarioSocial({ email, name, picture }) {
  const [rows] = await conection.execute("select * from usuario where email = ?", [email]);
  const usuarioExistente = rows[0];
  if (usuarioExistente) {
    await conection.execute(
      "update usuario set nome = ?, foto_url = ?, login_social = 1 where email = ?",
      [name, picture, email]
    );
    return { ...usuarioExistente, nome: name, foto_url: picture, login_social: 1 };
  } else {
    const [result] = await conection.execute(
      "insert into usuario (email, nome, foto_url, senha, login_social, role) VALUES (?, ?, ?, NULL, 1, 'user')",
      [email, name, picture]
    );
    return { id: result.insertId, email, nome: name, foto_url: picture, senha: null, login_social: 1, role: "user" };
  }
}