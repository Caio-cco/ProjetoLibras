import express from "express";
import cors from "cors";
import loginEndpoints from "./controller/loginController.js";

const app = express();
const PORT = 5010;

app.use(cors({ 
    origin: [
        
        "http://localhost:5173", 
        "https://projeto-libras-3sdnp2863-caio-ccos-projects.vercel.app",
        "https://projeto-libras-ten.vercel.app"
    ], 

    credentials: true }));

app.use(express.json());
app.use("/", loginEndpoints);

app.listen(PORT, () => console.log("API subiu com sucesso!"));