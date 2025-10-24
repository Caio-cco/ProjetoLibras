import { conection } from "./conection.js";

export async function alterarImagem(id, imglink) {
    const comando = `
        update usuario
            set foto_url = ?
        where id_usuario = ?;
    `;
    
    const [info] = await conection.query(comando, [imglink, id]);
}