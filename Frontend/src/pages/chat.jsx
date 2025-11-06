import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./chat.scss";

const socket = io("http://localhost:3001");

export default function VideoChat() {
  const navigate = useNavigate();
  const [stream, setStream] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [perfil, setPerfil] = useState({});
  const myVideo = useRef();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    // Inicializa câmera/microfone
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream);
      if (myVideo.current) myVideo.current.srcObject = currentStream;
    });

    // Busca dados do perfil
    if (token) {
      axios
        .get("http://localhost:5010/user/perfil", {
          headers: { "x-access-token": token },
        })
        .then((res) => setPerfil(res.data.info[0]))
        .catch(() => console.warn("Erro ao buscar perfil."));
    }
  }, [token]);

  const toggleMic = () => {
    if (!stream) return;
    stream.getAudioTracks()[0].enabled = !micOn;
    setMicOn(!micOn);
  };

  const toggleCamera = () => {
    if (!stream) return;
    stream.getVideoTracks()[0].enabled = !cameraOn;
    setCameraOn(!cameraOn);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    navigate("/");
  };

  // Corrigir caminho da foto
  const baseURL = "http://localhost:5010/";
  const fotoPath = perfil.foto_url?.replace(/\\/g, "/");
  const fotoFinal =
    perfil.foto_url?.startsWith("https://") ? perfil.foto_url : `${baseURL}${fotoPath}`;

  return (
    <div className="chat-page">
      {/* Sidebar fixa */}
      <aside className="sidebar">
        <div className="perfil">
          <img
            src={fotoFinal || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="foto perfil"
            className="perfil-foto"
          />
          <h3>{perfil.nome || "Usuário"}</h3>
          <p>{perfil.area || "Estudante"}</p>
        </div>
        <nav className="navegacao">
          <button onClick={() => navigate("/homel")}>🏠 Início</button>
          <button onClick={() => navigate("/atividades")} >📚 Atividades</button>
          <button onClick={() => navigate("/perfil")}>👤 Perfil</button>
          <button className="sair" onClick={handleLogout}>🚪 Sair</button>
        </nav>
      </aside>

      {/* Área principal da chamada */}
      <main className="video-area">
        <div className="video-container">
          {stream && <video playsInline muted ref={myVideo} autoPlay className="myVideo" />}
        </div>

        <div className="controls">
          <button onClick={toggleMic}>{micOn ? <Mic /> : <MicOff />}</button>
          <button onClick={toggleCamera}>{cameraOn ? <Video /> : <VideoOff />}</button>
          <button className="end" onClick={() => navigate("/homel")}><PhoneOff /></button>
        </div>
      </main>
      
    </div>
  );
}
