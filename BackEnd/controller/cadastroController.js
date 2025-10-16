import { cadastro } from '../Repository/cadastroRepository.js';
import { Router } from 'express';

const api = Router();

api.post('/cadastro', async (req, resp) => {
    let novoCadastro = req.body;
    let id = await cadastro(novoCadastro);
    resp.send({ novoId: id });
});

export default api;