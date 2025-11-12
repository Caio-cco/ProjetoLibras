import { conection } from './conection.js';

export async function dificuldadeTabela() {
    const comando = `
    select * from dificuldade;
    `;
    
    const [registros] = await conection.query(comando);
    return registros;
}

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
    
    if (!possuiProgresso) {
        const comando = `
            insert into usuario_curso (id_usuario, id_curso, progresso, data_inicio, data_conclusao)
                values
                (?, ?, ?, now(), case when ? >= 100 then now() else null end);
        `
        const [registros] = await conection.query(comando, [id_usuario, id_curso, progresso, progresso]);
        return registros;
    }
    else {
        const comando = `
            update usuario_curso
                set progresso = ?,
                    data_conclusao = case when ? >= 100 then now() else data_conclusao end
                where id_usuario = ? and id_curso = ?;
        `
        const [registros] = await conection.query(comando, [progresso, progresso, id_usuario, id_curso]);
        return registros;
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