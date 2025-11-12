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

endpoints.get('/quiz/:dif', async (req, resp) => {
    const dificuldade = req.params.dif;
    const perguntas = await repoAtv.obterPerguntasQuiz(dificuldade);
    const respostas = await repoAtv.obterRespostasQuiz(dificuldade);

    resp.json({ perguntas, respostas });
})

// endpoints.post('/selectLetras', autenticador, async (req, resp) => {
//     let registros = await repoAtv.selecionarLetras();

//     resp.send(registros);
// })

// endpoints.post('/selectPalavras', autenticador, async (req, resp) => {
//     let registros = await repoAtv.selecionarPalavras();

//     resp.send(registros);
// })

// endpoints.post('/selectFrases', autenticador, async (req, resp) => {
//     let registros = await repoAtv.selecionarFrases();

//     resp.send(registros);
// })

// endpoints.post('/selectImagens', autenticador, async (req, resp) => {
//     let registros = await repoAtv.selecionarImagens();

//     resp.send(registros);
// })


export default endpoints;