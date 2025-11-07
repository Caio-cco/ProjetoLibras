import { conection } from "./conection.js"; 


export async function listarUsuariosComCursos(filtroNome) {
  let comando = `
    select 
      u.id_usuario as id,
      u.nome as nome,
      c.titulo as curso,
      uc.progresso as progresso
    from usuario u
    join usuario_curso uc on u.id_usuario = uc.id_usuario
    join curso c on uc.id_curso = c.id_curso
  `;

  const params = [];

  if (filtroNome) {
    comando += ` where u.nome like ?`;
    params.push(`%${filtroNome}%`);
  }

  const [registros] = await conection.query(comando, params);
  return registros;
}



export async function listarCursos() {
  const comando = `
    select 
      c.id_curso as id,
      c.titulo,
      d.nome as dificuldade,
      (
        select count(*) 
        from usuario_curso uc 
        where uc.id_curso = c.id_curso
      ) as totalAlunos
    from curso c
    join dificuldade d on c.id_dificuldade = d.id_dificuldade
  `;

  const [registros] = await conection.query(comando);
  return registros;
}