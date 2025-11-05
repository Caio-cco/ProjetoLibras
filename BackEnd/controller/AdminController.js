import * as repoAdmin from '../Repository/adminRepository.js';
import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.post('/cursos/inserircurso', autenticador, async (req, resp) => {
    let cursoInfo = req.body;
    let id = await repoAdmin.criarCurso(cursoInfo);

    resp.send({ NovoId: id });
})
export default api;