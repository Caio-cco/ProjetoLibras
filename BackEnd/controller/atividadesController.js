import * as repoAtv from '../Repository/atividadesRepository.js'
import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.get('/sinais/:id1/:id2', autenticador, async (req, resp) => {
    let id1 = req.params.id1;
    let id2 = req.params.id2;
    let registros = await repoAtv.obterSinais(id1, id2);
    resp.send(registros);
})

endpoints.get('/quiz/:dif', autenticador, async (req, resp) => {
    const dificuldade = req.params.dif;
    const perguntas = await repoAtv.obterPerguntasQuiz(dificuldade);
    const respostas = await repoAtv.obterRespostasQuiz(dificuldade);

    resp.json({ perguntas, respostas });
})

endpoints.get('/forca/:dif', autenticador, async (req, resp) => {
    const dificuldade = req.params.dif;
    let registros = await repoAtv.obterPalavrasForca(dificuldade);
    resp.send(registros);
})

endpoints.get('/frasesAtiv/:dif', autenticador, async (req, resp) => {
    const dificuldade = req.params.dif;
    const frases = await repoAtv.obterFrases(dificuldade);
    const palavras = await repoAtv.obterPalavrasFrases(dificuldade);

    resp.json({ frases, palavras });
})

export default endpoints;