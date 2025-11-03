import * as repoCursos from '../Repository/cursosRepository.js';
import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.get('/cursos/progresso', autenticador, async (req, resp) => {
    let registros = await repoCursos.verificarProgresso();
    resp.send(registros);
})

endpoints.get('/dificuldades', autenticador, async (req, resp) => {
    let dif = await repoCursos.dificuldadeTabela();
    resp.send ({ dif });
})

endpoints.post('/cursos/inserircurso', async (req, resp) => {
    let cursoInfo = req.body;
    let id = await repoCursos.criarCurso(cursoInfo);

    resp.send({ NovoId: id });
})

export default endpoints;