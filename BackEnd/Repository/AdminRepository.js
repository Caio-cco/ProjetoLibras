import { conection } from "./conection.js"; 

export async function cadastro(novoCadastro) {
    const comando = `
        insert into registro 
        (nome, telefone, email, senha)
        values (?, ?, ?, ?)
    `;

    const [info] = await conection.query(comando, [novoCadastro.nome, novoCadastro.telefone, novoCadastro.email, novoCadastro.senha]);

    return info.insertId;
}