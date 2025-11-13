import { OAuth2Client } from "google-auth-library";
import { Router } from "express";
import * as repo from "../Repository/loginRepository.js";
import { generateToken } from "../utils/jwt.js";
import { getAuthentication } from "../utils/jwt.js";

const endpoints = Router();
const autenticador = getAuthentication();

const GOOGLE_CLIENT_ID = "324833504461-pirdui28unoelj2lotec7m2e5fs09avl.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const isProduction = process.env.NODE_ENV === "production";
const REDIRECT_URI = isProduction
  ? "https://projeto-libras-ten.vercel.app"
  : "http://localhost:5173";

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI);

endpoints.post("/usuario/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha)
      return res.status(400).send({ erro: "Email e senha obrigatorios" });

    const credenciais = await repo.validarCredenciais(email, senha);
    if (!credenciais)
      return res.status(401).send({ erro: "Credenciais invalidas" });

    const token = generateToken(credenciais);
    res.send({ token });
  } catch (err) {
    res.status(500).send({ erro: "Falha na autenticação" });
  }
});

endpoints.post("/usuario", async (req, res) => {
  try {
    const novoLogin = req.body;
    if (!novoLogin.email || !novoLogin.senha)
      return res.status(400).send({ erro: "Email e senha são campos obrigatórios" });

    const id = await repo.criarConta(novoLogin);
    res.send({ novoId: id });
  } catch (err) {
    res.status(400).send({ erro: err.message || "Falha no cadastro" });
  }
});

endpoints.post("/usuario/google", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code)
      return res.status(400).send({ erro: "codigo de alteração não recebido" });

    const { tokens } = await googleClient.getToken({
      code,
      redirect_uri: REDIRECT_URI,
    });

    if (!tokens.id_token)
      return res.status(400).send({ erro: "IDToken não teve retorno do Google." });

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
    res.status(500).send({ erro: "Falha na autenticação com google" });
  }
});

export default endpoints;