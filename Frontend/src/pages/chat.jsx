import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
} from "lucide-react";
import "./chat.scss";

const socket = io("http://localhost:3001");

export default function VideoChat() {
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [userId, setUserId] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const startStream = async () => {
    try {
      const currentStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(currentStream);
      if (myVideo.current) {
        myVideo.current.srcObject = currentStream;
      }
    } catch (err) {
      console.error("Erro ao acessar câmera/microfone:", err);
      alert("Não foi possível acessar a câmera/microfone. Verifique permissões.");
    }
  };

  useEffect(() => {
    startStream();

    socket.on("callUser", ({ from, signal }) => {
      setReceivingCall(true);
      setCaller(from);
      connectionRef.current = signal;
    });

    socket.on("me", (id) => setUserId(id));

    return () => {
      socket.off("callUser");
      socket.off("me");
    };
  }, []);

  const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks()[0].enabled = !micOn;
      setMicOn(!micOn);
    }
  };

  const toggleCam = () => {
    if (stream) {
      stream.getVideoTracks()[0].enabled = !camOn;
      setCamOn(!camOn);
    }
  };

  const callUser = (id) => {
    if (!stream) return alert("O stream ainda não está pronto.");
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", { userToCall: id, signalData: data, from: userId });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });

    peer.signal(connectionRef.current);
    connectionRef.current = peer;
  };

  const endCall = () => {
    setCallAccepted(false);
    if (connectionRef.current) connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <div className="chat-container">
      <div className="videos">
        {stream && (
          <div className="video-wrapper">
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={`video ${!camOn ? "video-off" : ""}`}
            />
            {!micOn && <div className="mic-off-indicator">Mudo</div>}
            {!camOn && <div className="cam-off-indicator">Câmera Off</div>}
          </div>
        )}

        {callAccepted && (
          <div className="video-wrapper">
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className="video"
            />
          </div>
        )}
      </div>

      <div className="controls">
        <button onClick={toggleMic} className={`control-btn ${!micOn ? "off" : ""}`}>
          {micOn ? <Mic size={24} /> : <MicOff size={24} />}
        </button>
        <button onClick={toggleCam} className={`control-btn ${!camOn ? "off" : ""}`}>
          {camOn ? <Video size={24} /> : <VideoOff size={24} />}
        </button>
        <button onClick={endCall} className="control-btn end-call">
          <PhoneOff size={24} />
        </button>
      </div>

      {receivingCall && !callAccepted && (
        <div className="incoming-call">
          <p>Alguém está te ligando...</p>
          <button onClick={answerCall} className="answer-btn">Atender</button>
        </div>
      )}
    </div>
  );
}
