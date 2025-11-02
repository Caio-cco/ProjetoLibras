import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import loginEndpoints from "./controller/loginController.js";
import { adicionarRotas } from "./rotas.js";

const app = express();
const server = createServer(app); 
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://projeto-libras-3sdnp2863-caio-ccos-projects.vercel.app",
      "https://projeto-libras-ten.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 5010;


app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://projeto-libras-3sdnp2863-caio-ccos-projects.vercel.app",
      "https://projeto-libras-ten.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
    credentials: true,
  })
);

adicionarRotas(app);
app.use(loginEndpoints);

app.get("/", (req, res) => {
  res.send("API está rodando ");
});


io.on("connection", (socket) => {
  console.log("🟢 Novo usuário conectado:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`Usuário ${socket.id} entrou na sala ${roomId}`);
    socket.to(roomId).emit("user-joined", socket.id);
  });

  socket.on("offer", (data) => {
    socket.to(data.roomId).emit("offer", data);
  });

  socket.on("answer", (data) => {
    socket.to(data.roomId).emit("answer", data);
  });

  socket.on("ice-candidate", (data) => {
    socket.to(data.roomId).emit("ice-candidate", data.candidate);
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado:", socket.id);
  });
});



server.listen(PORT, () => {
  console.log(` Servidor rodando `);
});