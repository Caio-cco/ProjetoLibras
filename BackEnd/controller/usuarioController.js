import * as repoUsuario from '../Repository/usuarioRepository.js';
import multer from 'multer';
import { Router } from 'express';

const endpoints = Router();
const upload = multer({ dest: 'public/storage' });

endpoints.put('/usuario/:id/addimg', upload.single('img'), async (req, resp) => {
    let imglink = req.file.path;
    let id = req.params.id;
    let resp = 'Imagem alterada com sucesso';

    await repoUsuario.alterarImagem(id, imglink);
    resp.send({ resp });
})

export default endpoints;