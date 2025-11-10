import * as repoCursos from '../Repository/cursosRepository.js';
import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.get('/obtercursos', async (req, resp) => {
    let registros = await repoCursos.verificarCursos();
    resp.send(registros);
})

endpoints.get('/sinais/:id1/:id2', async (req, resp) => {
    let id1 = req.params.id1;
    let id2 = req.params.id2;
    let registros = await repoCursos.obterSinais(id1, id2);
    resp.send(registros);
})

endpoints.get('/cursos/progresso', autenticador, async (req, resp) => {
    let registros = await repoCursos.verificarProgresso();
    resp.send(registros);
})

endpoints.get('/dificuldades', autenticador, async (req, resp) => {
    let dif = await repoCursos.dificuldadeTabela();
    resp.send ({ dif });
})

export default endpoints;