import express from "express";
import cors from "cors";
import loginEndpoints from "./controller/loginController.js";
import { adicionarRotas } from "./rotas.js";

const app = express();


const PORT = process.env.PORT || 5010;


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://projeto-libras-3sdnp2863-caio-ccos-projects.vercel.app",
    "https://projeto-libras-ten.vercel.app" 
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

adicionarRotas(app);
//app.use("/", loginEndpoints);


app.get("/", (req, res) => {
  res.send("API Projeto Libras está rodando ✅");
});


app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));