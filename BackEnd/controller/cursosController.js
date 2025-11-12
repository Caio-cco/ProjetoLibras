import * as repoCursos from '../Repository/cursosRepository.js';
import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.get('/obtercursos', autenticador, async (req, resp) => {
    let registros = await repoCursos.verificarCursos();
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

endpoints.post('/attprogresso', autenticador, async (req, resp) => {
    let id_usuario = req.user.id;
    let id_curso = req.body.id_curso;

    let testeProgresso = await repoCursos.verificarProgresso(id_usuario, id_curso);

    let possuiProgresso = testeProgresso && testeProgresso.length > 0;;

    let progresso = req.body.progresso;

    await repoCursos.salvarProgresso(id_usuario, id_curso, progresso, possuiProgresso);

    let resposta = "Progresso Salvo com Sucesso";

    resp.send({ resposta });
})

export default endpoints;