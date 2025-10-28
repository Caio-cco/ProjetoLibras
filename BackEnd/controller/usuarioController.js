import * as repoUsuario from '../Repository/usuarioRepository.js';
import multer from 'multer';
import { Router } from 'express';

const endpoints = Router();
const upload = multer({ dest: 'public/storage' });

endpoints.put('/usuario/:id/addimg', upload.single('img'), async (req, resp) => {
    let imglink = req.file.path;
    let id = req.params.id;

    await repoUsuario.alterarImagem(id, imglink);
    resp.send({ resp: "Imagem alterada com sucesso" });
})

endpoints.put('/usuario/esqueciasenha', async (req, resp) => {
    let novaSenha = req.body;
    let nome = a;
    let email = a;

    await repoUsuario.esqueciASenha(nome, email, novaSenha);
    resp.send({ resp: "Senha Alterada com Sucesso" });
})

export default endpoints;