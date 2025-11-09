import express from "express";
import cors from "cors";
import { adicionarRotas } from "./rotas.js";

const api = express();
const PORT = process.env.PORT || 5010;
const JWT_SECRET = process.env.JWT_SECRET || "borapracima";

api.use(express.json());
api.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://projeto-libras-ten.vercel.app",
      "https://projeto-libras-3sdnp2863-caio-ccos-projects.vercel.app",
    ],
    credentials: true,
  })
);

adicionarRotas(api);

api.get("/", (req, res) => {
  res.send("api rodando");
});

api.listen(PORT, () => {
  console.log(`Servidor rodando!`);
});