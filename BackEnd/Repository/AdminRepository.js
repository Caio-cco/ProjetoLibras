import { conection } from "./conection.js"; 


export async function listarUsuariosComCursos(filtroNome) {
  let comando = `
    SELECT 
      u.id_usuario AS id,
      u.nome AS nome,
      c.titulo AS curso,
      uc.progresso AS progresso
    FROM usuario u
    JOIN usuario_curso uc ON u.id_usuario = uc.id_usuario
    JOIN curso c ON uc.id_curso = c.id_curso
  `;

  const params = [];

  if (filtroNome) {
    comando += ` WHERE u.nome LIKE ?`;
    params.push(`%${filtroNome}%`);
  }

  const [registros] = await conection.query(comando, params);
  return registros;
}


export async function listarCursos() {
  const comando = `
    SELECT 
      c.id_curso AS id,
      c.titulo,
      d.nome AS dificuldade,
      (
        SELECT COUNT(*) 
        FROM usuario_curso uc 
        WHERE uc.id_curso = c.id_curso
      ) AS totalAlunos
    FROM curso c
    JOIN dificuldade d ON c.id_dificuldade = d.id_dificuldade
  `;

  const [registros] = await conection.query(comando);
  return registros;
}