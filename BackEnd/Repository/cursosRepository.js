import { conection } from './conection.js';

export async function dificuldadeTabela() {
    const comando = `
    select * from dificuldade;
    `;
    
    const [registros] = await conection.query(comando);
    return registros;
}

// export async function verificarProgresso() {
//     const comando = `
//         select usuario.id_usuario, usuario.nome, progresso.concluido
//             from usuario
//             inner join progresso on progresso.id_usuario = usuario.id_usuario;
//     `;

//     const [registros] = await conection.query(comando);
//     return registros;
// }

export async function verificarProgresso(id_usuario, id_curso) {
    const comando = `
        select *
            from usuario_curso
            where id_usuario = ? and id_curso = ?;
    `;

    const [registros] = await conection.query(comando, [id_usuario, id_curso]);
    return registros;
}

export async function salvarProgresso(id_usuario, id_curso, progresso, possuiProgresso) {
    const comando = '';
    const registros = [];
    
    if (possuiProgresso == false) {
        comando = `
            insert into usuario_curso (id_usuario, id_curso, progresso)
                values
                (?, ?, ?);
        `
        [registros] = await conection.query(comando, [id_usuario, id_curso, progresso]);
    }
    else {
        comando = `
            update usuario_curso
                set progresso = ?
                where id_usuario = ? and id_curso = ?;
        `
        [registros] = await conection.query(comando, [progresso, id_usuario, id_curso]);
    }
}

export async function verificarCursos() {
    const comando = `
        select * from curso
            inner join dificuldade on dificuldade.id_dificuldade = curso.id_dificuldade
            order by id_curso;
    `;

    const [registros] = await conection.query(comando);
    return registros;
}

export async function obterSinais(id1, id2) {
    const comando = `
        select * from imagem_sinal
            where id_imagem between ? and ?;
    `;
    const [registros] = await conection.query(comando, [id1, id2]);
    return registros;
}