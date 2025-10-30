import { conection } from "./conection.js";

export async function alterarImagem(id, imglink) {
    const comando = `
        update usuario
            set foto_url = ?
        where id_usuario = ?;
    `;
    
    const [info] = await conection.query(comando, [imglink, id]);
}

export async function esqueciASenha(nome, email, senha) {
    const comando = `
        update usuario
            set senha = MD5(?)
            where nome = ? and email = ?;
    `;

    const [info] = await conection.query(comando, [senha, nome, email]);
}

export async function perfilInformacoes(id) {
    const comando = `
        select nome, foto_url, telefone, 
            from usuario
            where id_usuario = ?;
    `;

    const [info] = await conection.query(comando, id);
    return info;
}