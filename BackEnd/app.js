import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
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
  res.send("API está rodando e protegendo o chat!");
});


io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("Token ausente."));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "chavesecreta");
    socket.user = decoded;
    next();
  } catch (err) {
    console.error("Token inválido:", err);
    next(new Error("Autenticação inválida."));
  }
});


io.on("connection", (socket) => {
  console.log(` Usuário conectado: ${socket.user.email} | Socket ID: ${socket.id}`);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`Usuário ${socket.user.email} entrou na sala ${roomId}`);
    socket.to(roomId).emit("user-joined", socket.user.email);
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
    console.log(`Usuário desconectado! ${socket.user.email}`);
  });
});

server.listen(PORT, () => {
  console.log(`Api rodando `);
});