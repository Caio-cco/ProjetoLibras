import { conection } from "./conection.js";

export async function obterSinais(id1, id2) {
    const comando = `
        select * from imagem_sinal
            where id_imagem between ? and ?;
    `;
    const [registros] = await conection.query(comando, [id1, id2]);
    return registros;
}

export async function obterPerguntasQuiz(dificuldade) {
    const comando = `
        select id_pergunta, enunciado
            from pergunta_quiz
            where id_dificuldade = ?;
    `;
    const [registros] = await conection.query(comando, [dificuldade]);
    return registros;
}

export async function obterRespostasQuiz(dificuldade) {
    const comando = `
        select id_resposta, resposta_quiz.id_pergunta, texto, correta
            from resposta_quiz
            inner join pergunta_quiz on pergunta_quiz.id_pergunta = resposta_quiz.id_pergunta
            where id_dificuldade = ?;
    `;
    const [registros] = await conection.query(comando, [dificuldade]);
    return registros;
}