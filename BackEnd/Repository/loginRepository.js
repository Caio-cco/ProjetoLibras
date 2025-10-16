import { conection } from './conection.js';


export async function validarCredenciais(email, senha) {

  const [rows] = await conection.execute(
    'SELECT * FROM usuario WHERE email = ? AND senha = ?',
    [email, senha]
  );
  return rows[0] || null;
}


export async function criarConta({ email, senha, name }) {

  const [result] = await conection.execute(
    'INSERT INTO usuario (email, senha, nome, login_social) VALUES (?, ?, ?, 0)',
    [email, senha, name]
  );
  return result.insertId;
}


export async function upsertUsuarioSocial({ email, name, picture }) {
  const [rows] = await conection.execute('SELECT * FROM usuario WHERE email = ?', [email]);
  const usuarioExistente = rows[0];

  if (usuarioExistente) {

    await conection.execute(
      'UPDATE usuario SET nome = ?, foto_url = ?, login_social = 1 WHERE email = ?',
      [name, picture, email]
    );

    return { ...usuarioExistente, nome: name, foto_url: picture, login_social: 1 };
  } else {

    const [result] = await conection.execute(
      'INSERT INTO usuario (email, nome, foto_url, senha, login_social) VALUES (?, ?, ?, NULL, 1)',
      [email, name, picture]
    );

    return { id: result.insertId, email, nome: name, foto_url: picture, senha: null, login_social: 1 };
 }
}