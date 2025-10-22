import express from "express";
import cors from "cors";
import loginEndpoints from "./controller/loginController.js";

const app = express();
const PORT = 5010;

app.use(cors({ origin: "http://localhost:5174", credentials: true }));
app.use(express.json());
app.use("/", loginEndpoints);

app.listen(PORT, () => console.log("API subiu com sucesso!"));