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

export async function obterPalavrasForca(dificuldade) {
    const comando = `
        select id_imagem, url_imagem, descricao
            from forca_img
            where id_dificuldade = ?;
    `;
    const [registros] = await conection.query(comando, [dificuldade]);
    return registros;
}

export async function obterFrases(dificuldade) {
    const comando = `
        select * from frases_ativ
            where id_dificuldade = ?;
    `;

    const [registros] = await conection.query(comando, [dificuldade]);
    return registros;
}

export async function obterPalavrasFrases(dificuldade) {
    const comando =  `
        select id_fraseimg, id_frase, texto_img, url_img, posicao
            from frases_img
            inner join frases_ativ on frases_ativ.id_frases = frases_img.id_frase
            where id_dificuldade = ?
            order by id_frase, posicao;
        `;

    const [registros] = await conection.query(comando, [dificuldade]);
    return registros;
}