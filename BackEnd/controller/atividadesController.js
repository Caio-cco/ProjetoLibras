import * as repoAtv from '../Repository/adminRepository.js';
import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.post('/selectLetras', autenticador, async (req, resp) => {
    let registros = await repoAtv.selecionarLetras();

    resp.send(registros);
})

endpoints.post('/selectPalavras', autenticador, async (req, resp) => {
    let registros = await repoAtv.selecionarPalavras();

    resp.send(registros);
})

endpoints.post('/selectFrases', autenticador, async (req, resp) => {
    let registros = await repoAtv.selecionarFrases();

    resp.send(registros);
})

endpoints.post('/selectImagens', autenticador, async (req, resp) => {
    let registros = await repoAtv.selecionarImagens();

    resp.send(registros);
})
export default endpoints;