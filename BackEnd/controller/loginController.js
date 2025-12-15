import { OAuth2Client } from "google-auth-library";
import { Router } from "express";
import * as repo from "../Repository/loginRepository.js";
import { generateToken } from "../utils/jwt.js";

const endpoints = Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const isProduction = process.env.NODE_ENV === "production";

const REDIRECT_URI = isProduction
  ? "https://projeto-libras-ten.vercel.app/login/google/callback"
  : "http://localhost:5173/login/google/callback";

const googleClient = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);

endpoints.post("/usuario/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).send({ erro: "Email e senha obrigatórios" });
    }

    const credenciais = await repo.validarCredenciais(email, senha);

    if (!credenciais) {
      return res.status(401).send({ erro: "Credenciais inválidas" });
    }

    const token = generateToken(credenciais);
    res.send({ token });
  } catch {
    res.status(500).send({ erro: "Falha na autenticação" });
  }
});

endpoints.post("/usuario", async (req, res) => {
  try {
    const { email, senha, name } = req.body;

    if (!email || !senha) {
      return res.status(400).send({ erro: "Email e senha são obrigatórios" });
    }

    const id = await repo.criarConta({ email, senha, name });
    res.send({ novoId: id });
  } catch (err) {
    res.status(400).send({ erro: err.message || "Falha no cadastro" });
  }
});

endpoints.post("/usuario/google", async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).send({ erro: "Código OAuth não recebido" });
    }

    const { tokens } = await googleClient.getToken(code);

    if (!tokens.id_token) {
      return res.status(400).send({ erro: "ID Token não retornado pelo Google" });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const usuario = await repo.upsertUsuarioSocial({
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    });

    const token = generateToken(usuario);
    res.send({ token });
  } catch {
    res.status(500).send({ erro: "Falha na autenticação com Google" });
  }
});

export default endpoints;