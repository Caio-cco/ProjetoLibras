import * as repoAdmin from "../Repository/AdminRepository.js";
import { Router } from "express";
import { getAuthentication } from "../utils/jwt.js";

const endpoints = Router();
const autenticador = getAuthentication();
const autenticadorAdmin = getAuthentication((user) => user.role === "admin");

endpoints.get("/cursos", autenticador, async (req, resp) => {
  try {
    const cursos = await repoAdmin.listarCursos();
    resp.send(cursos);
  } catch {
    resp.status(500).send({ erro: "Erro ao listar cursos." });
  }
});

endpoints.get("/admin/usuarios", autenticadorAdmin, async (req, resp) => {
  try {
    const filtro = req.query.nome || null;
    const usuarios = await repoAdmin.listarUsuariosComCursos(filtro);
    resp.send(usuarios);
  } catch {
    resp.status(500).send({ erro: "Erro ao buscar usuários." });
  }
});

export default endpoints;