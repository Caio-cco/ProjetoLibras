import { conection } from 'conections.js';

export async function VerificarProgresso() {
    const comando = `
        select usuario.id_usuario, usuario.nome, progresso.concluido
            from usuario
            inner join progresso on progresso.id_usuario = usuario.id_usuario;
    `;

    const [registros] = await conection.query(comando);
    return registros;
}