import { conection } from './conection.js';

export async function criarCurso(cursoInfo) {
    const comando = `
        insert into curso (titulo, descricao, id_dificuldade, id_instrutor)
            values
            (?, ?, ?, ?);
    `;

    const [info] = await conection.query(comando, [
        cursoInfo.titulo,
        cursoInfo.descricao,
        cursoInfo.dificuldade,
        cursoInfo.instrutor
    ])

    return info.insertId;
}


export async function verificarProgresso() {
    const comando = `
        select usuario.id_usuario, usuario.nome, progresso.concluido
            from usuario
            inner join progresso on progresso.id_usuario = usuario.id_usuario;
    `;

    const [registros] = await conection.query(comando);
    return registros;
}

export async function dificuldadeTabela() {
    const comando = `
        select * from dificuldade;
    `;

    const [registros] = await conection.query(comando);
    return registros;
}