import { conection } from "./conection.js"; 

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