import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { Mic, MicOff, Video, VideoOff, PhoneOff, PhoneCall } from "lucide-react";
import axios from "axios";
import "./chat.scss";

export default function VideoChat() {
  const [stream, setStream] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [chatAtivo, setChatAtivo] = useState(false);
  const [perfil, setPerfil] = useState({});
  const myVideo = useRef();
  const socket = useRef();

  const token = localStorage.getItem("authToken");

  // 🧠 Carrega perfil do usuário
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5010/user/perfil", {
          headers: { "x-access-token": token },
        })
        .then((res) => setPerfil(res.data.info[0]))
        .catch(() => console.warn("Erro ao buscar perfil."));
    }
  }, [token]);

  // 🎥 Inicia a chamada (câmera + socket)
  const iniciarChamada = async () => {
    try {
      const currentStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(currentStream);
      setChatAtivo(true);
      if (myVideo.current) myVideo.current.srcObject = currentStream;

      socket.current = io("http://localhost:5010", {
        auth: { token },
        transports: ["websocket", "polling"],
        withCredentials: true,
      });

      socket.current.on("connect", () => {
        console.log("✅ Conectado ao servidor:", socket.current.id);
      });
    } catch (err) {
      console.error("❌ Erro ao acessar câmera/microfone:", err);
      alert("Não foi possível acessar a câmera/microfone. Verifique as permissões.");
    }
  };

  // 🚫 Encerra a chamada
  const encerrarChamada = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    socket.current?.disconnect();
    setChatAtivo(false);
  };

  // 🎙️ Alterna microfone
  const toggleMic = () => {
    if (!stream) return;
    stream.getAudioTracks()[0].enabled = !micOn;
    setMicOn(!micOn);
  };

  // 🎥 Alterna câmera
  const toggleCamera = () => {
    if (!stream) return;
    stream.getVideoTracks()[0].enabled = !cameraOn;
    setCameraOn(!cameraOn);
  };

  // 🔐 Deslogar
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const baseURL = "http://localhost:5010/";
  const fotoPath = perfil.foto_url?.replace(/\\/g, "/");
  const fotoFinal = perfil.foto_url?.startsWith("https://")
    ? perfil.foto_url
    : `${baseURL}${fotoPath}`;

  return (
    <div className="chat-page">
      {/* 🧭 Barra lateral */}
      <aside className="sidebar">
        <div className="perfil">
          <img
            src={
              fotoFinal ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="foto perfil"
            className="perfil-foto"
          />
          <h3>{perfil.nome || "Usuário"}</h3>
          <p>{perfil.area || "Estudante"}</p>
        </div>
        <nav className="navegacao">
          <button>🏠 Início</button>
          <button>📚 Atividades</button>
          <button>👤 Perfil</button>
          <button className="sair" onClick={handleLogout}>
            🚪 Sair
          </button>
        </nav>
      </aside>

      {/* 🎥 Área principal */}
      <main className="video-area">
        {!chatAtivo ? (
          <div className="conectar-container">
            <h2>💬 Chat de Vídeo</h2>
            <p>Clique abaixo para iniciar sua chamada</p>
            <button className="connect-btn" onClick={iniciarChamada}>
              <PhoneCall /> Conectar à chamada
            </button>
          </div>
        ) : (
          <div className="video-container">
            <h2>💬 Chat de Vídeo</h2>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className="myVideo"
              style={{
                width: "400px",
                height: "300px",
                borderRadius: "12px",
                background: "#ddd",
              }}
            />
            <p>Você</p>

            <div className="controls">
              <button onClick={toggleMic}>
                {micOn ? <Mic /> : <MicOff />}
              </button>
              <button onClick={toggleCamera}>
                {cameraOn ? <Video /> : <VideoOff />}
              </button>
              <button className="end" onClick={encerrarChamada}>
                <PhoneOff />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
