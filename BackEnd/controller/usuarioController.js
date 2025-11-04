import * as repoUsuario from '../Repository/usuarioRepository.js';
import multer from 'multer';
import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

const autenticador = getAuthentication();

const endpoints = Router();
const upload = multer({ dest: 'public/storage' });

endpoints.get('/user/perfil', autenticador, async (req, resp) => {
    let id = req.user.id;
    let info = await repoUsuario.perfilInformacoes(id);
    resp.send({ info });
})

endpoints.put('/user/attperfil', autenticador, async (req, resp) => {
    let id = req.user.id;
    let novoPerfil = req.body;
    
    await repoUsuario.attPerfil(id, novoPerfil);

    resp.send({ resp: "Dados modificados com sucesso!" });
})

endpoints.put('/user/:id/addimg', autenticador, upload.single('img'), async (req, resp) => {
    let imglink = req.file.path;
    let id = req.params.id;

    await repoUsuario.alterarImagem(id, imglink);
    resp.send({ resp: "Imagem alterada com sucesso" });
})

endpoints.put('/user/esqueciasenha', autenticador, async (req, resp) => {
    let novaSenha = req.body;
    let nome = a;
    let email = a;

    await repoUsuario.esqueciASenha(nome, email, novaSenha);
    resp.send({ resp: "Senha Alterada com Sucesso" });
})

export default endpoints;