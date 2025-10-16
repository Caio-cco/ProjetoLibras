import * as repoCursos from '../Repository/cursosRepository.js';
import { Router } from 'express';

const endpoints = Router();

endpoints.get('/cursos/progresso', async (req, resp) => {
    let registros = await repoCursos.verificarProgresso();
    resp.send(registros);
})

endpoints.post('/cursos/inserircurso', async (req, resp) => {
    let cursoInfo = req.body;
    let id = await repoCursos.criarCurso(cursoInfo);

    resp.send({ NovoId: id });
})

export default endpoints;