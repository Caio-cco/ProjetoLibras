import { conection } from "./conection.js";

export async function validarCredenciais(email, senha) {
  const [rows] = await conection.execute(
    "SELECT * FROM usuario WHERE email = ? AND senha = MD5(?)",
    [email, senha]
  );
  return rows[0] || null;
}

export async function criarConta({ email, senha, name }) {
  const [result] = await conection.execute(
    "INSERT INTO usuario (email, senha, nome, login_social, role) VALUES (?, MD5(?), ?, 0, 'user')",
    [email, senha, name]
  );
  return result.insertId;
}

export async function upsertUsuarioSocial({ email, name, picture }) {
  if (!email) {
    throw new Error("Email obrigatório");
  }

  const [rows] = await conection.execute(
    "SELECT * FROM usuario WHERE email = ?",
    [email]
  );

  if (rows.length > 0) {
    const usuario = rows[0];

    await conection.execute(
      "UPDATE usuario SET nome = ?, foto_url = ?, login_social = 1 WHERE email = ?",
      [name, picture, email]
    );

    return {
      ...usuario,
      nome: name,
      foto_url: picture,
      login_social: 1,
    };
  }

  const [result] = await conection.execute(
    "INSERT INTO usuario (email, nome, foto_url, senha, login_social, role) VALUES (?, ?, ?, NULL, 1, 'user')",
    [email, name, picture]
  );

  return {
    id: result.insertId,
    email,
    nome: name,
    foto_url: picture,
    login_social: 1,
    role: "user",
  };
}