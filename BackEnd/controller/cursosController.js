import * as repoCursos from '../Repository/cursosRepository';
import { Router } from 'express';

const endpoints = Router();

endpoints.get('/cursos/progresso', async (req, resp) => {
    let registros = await repoCursos.VerificarProgresso();
    resp.send(registros);
})


export default endpoints;