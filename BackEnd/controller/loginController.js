import { OAuth2Client } from "google-auth-library";
import { Router } from "express";
import * as repo from "../Repository/loginRepository.js";
import { generateToken } from "../utils/jwt.js";

const endpoints = Router();

const GOOGLE_CLIENT_ID = "324833504461-pirdui28unoelj2lotec7m2e5fs09avl.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const REDIRECT_URI = "postmessage"; 
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI);



endpoints.post("/usuario/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).send({ erro: "Email ou senha obrigatórios." });

    const credenciais = await repo.validarCredenciais(email, senha);
    if (!credenciais) return res.status(401).send({ erro: "Credenciais inválidas" });

    const token = generateToken(credenciais);
    res.send({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ erro: "Falha ao autenticar usuário." });
  }
});


endpoints.post("/usuario", async (req, res) => {
  try {
    const novoLogin = req.body;
    if (!novoLogin.email || !novoLogin.senha) return res.status(400).send({ erro: "Email ou senha obrigatórios." });

    const id = await repo.criarConta(novoLogin);
    res.send({ novoId: id });
  } catch (err) {
    console.error(err);
    res.status(400).send({ erro: err.message || "Falha ao cadastrar usuário." });
  }
});


endpoints.post("/usuario/google", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).send({ erro: "Código de autorização não fornecido." });

    const { tokens } = await googleClient.getToken(code);
    if (!tokens.id_token) return res.status(400).send({ erro: "ID Token não retornado pelo Google." });

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
  } catch (err) {
    console.error("Erro no login com Google:", err);
    res.status(500).send({ erro: "Falha ao autenticar com o Google." });
  }
});

export default endpoints;