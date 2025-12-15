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
  GOOGLE_CLIENT_SECRET
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
  } catch (err) {
    res.status(500).send({ erro: "Falha na autenticação" });
  }
});

endpoints.post("/usuario", async (req, res) => {
  try {
    const { email, senha, name } = req.body;

    if (!email || !senha || !name) {
      return res.status(400).send({ erro: "Dados obrigatórios ausentes" });
    }

    const id = await repo.criarConta({ email, senha, name });
    res.send({ novoId: id });
  } catch (err) {
    res.status(400).send({ erro: err.message || "Falha no cadastro" });
  }
});

endpoints.post("/usuario/google", async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).send({ erro: "Access token não recebido" });
    }

    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const payload = await response.json();

    if (!payload.email) {
      return res.status(400).send({ erro: "Email não retornado pelo Google" });
    }

    const usuario = await repo.upsertUsuarioSocial({
      email: payload.email,
      name: payload.name || payload.email,
      picture: payload.picture || null,
    });

    const token = generateToken(usuario);
    res.send({ token });
  } catch {
    res.status(500).send({ erro: "Falha na autenticação com Google" });
  }
});

export default endpoints;