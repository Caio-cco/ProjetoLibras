import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ReactPlayer from 'react-player';

import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";
import "../../components/AssosiacaoBasico/index.scss";
import "./index.scss";

const UPLOAD_URL = 'https://www.youtube.com/watch?v=EK6zOYT_ckk';

const IconeCamera = ({ className = 'card-icone' }) => <i className={`fas fa-camera ${className}`}></i>;
const IconePlay = ({ className = 'card-icone' }) => <i className={`fas fa-play-circle ${className}`}></i>;
const IconeLampada = () => <i className="fas fa-lightbulb icone"></i>;
const IconeIniciar = () => <i className="fas fa-play icone"></i>;
const IconeEnviar = () => <i className="fas fa-upload icone"></i>;
const IconeRefazer = () => <i className="fas fa-redo icone"></i>;

export default function ImiteOSinal() {
    const [tela, setTela] = useState("inicio");
    const [erroPermissao, setErroPermissao] = useState(null);
    const [videoGravadoURL, setVideoGravadoURL] = useState(null);
    const [videoGravadoBlob, setVideoGravadoBlob] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const [sinalVideoUrl, setSinalVideoUrl] = useState('https://www.youtube.com/watch?v=EK6zOYT_ckk');

    const previewRef = useRef(null);
    const streamRef = useRef(null);
    const gravadorRef = useRef(null);

    const navigate = useNavigate();


    const limparCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
        }
        if (gravadorRef.current && gravadorRef.current.state !== 'inactive') {
            try { gravadorRef.current.stop(); } catch (e) { }
        }
        gravadorRef.current = null;
    }


    useEffect(() => {
        return () => {
            limparCamera();
            if (videoGravadoURL) {
                URL.revokeObjectURL(videoGravadoURL);
            }
        };
    }, [videoGravadoURL]);



    function abrirVideoDemonstrativo() {
        setTela("video");
        setErroPermissao(null);
    }

    function solicitarPermissaoCamera() {
        setTela("permissao");
        setErroPermissao(null);
        if (videoGravadoURL) {
            URL.revokeObjectURL(videoGravadoURL);
            setVideoGravadoURL(null);
            setVideoGravadoBlob(null);
        }
    }

    async function permitirCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            streamRef.current = stream;

            if (previewRef.current) {
                previewRef.current.srcObject = stream;
                previewRef.current.play().catch(() => { });
            }
            setTela("preview");
        } catch (err) {
            setErroPermissao("Não foi possível acessar sua câmera. Verifique permissões e tente novamente.");
            setTela("permissao");
        }
    }

    function iniciarGravacao() {
        if (!streamRef.current) {
            return;
        }

        if (videoGravadoURL) URL.revokeObjectURL(videoGravadoURL);
        setVideoGravadoURL(null);
        setVideoGravadoBlob(null);

        try {
            const options = {};
            if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
                options.mimeType = 'video/webm;codecs=vp9';
            } else if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
                options.mimeType = 'video/webm;codecs=vp8';
            }

            const mediaRecorder = new MediaRecorder(streamRef.current, options);
            gravadorRef.current = mediaRecorder;
            const chunks = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);

                setVideoGravadoBlob(blob);
                setVideoGravadoURL(url);
                setTela("gravado");

                if (streamRef.current && previewRef.current) {
                    previewRef.current.srcObject = null;
                }
            };

            mediaRecorder.start();
            setTela("gravando");

        } catch (error) {
            setErroPermissao("Erro ao iniciar a gravação. Tente novamente.");
            setTela("preview");
        }
    }

    function pararGravacao() {
        if (gravadorRef.current && gravadorRef.current.state === 'recording') {
            gravadorRef.current.stop();
        }
    }

    function refazerGravacao() {
        if (videoGravadoURL) {
            URL.revokeObjectURL(videoGravadoURL);
            setVideoGravadoURL(null);
            setVideoGravadoBlob(null);
        }
        if (streamRef.current && previewRef.current) {
            previewRef.current.srcObject = streamRef.current;
            previewRef.current.play().catch(() => { });
        }
        setTela("preview");
    }


    async function enviarVideo() {
        if (!videoGravadoBlob) {
            return;
        }

        setIsUploading(true);

        const formData = new FormData();

        const videoFile = new File(
            [videoGravadoBlob],
            `sinal-${Date.now()}.webm`,
            { type: videoGravadoBlob.type || 'video/webm' }
        );

        formData.append('video', videoFile);

        try {
            await axios.post(UPLOAD_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            limparCamera();
            if (videoGravadoURL) URL.revokeObjectURL(videoGravadoURL);
            navigate("/atividades");

        } catch (error) {
            alert("Falha ao enviar o vídeo. Verifique o console para mais detalhes.");

        } finally {
            setIsUploading(false);
        }
    }


    return (
        <div className="associacao-basico imite-sinal">
            <Cabecalho logado={true} />

            <div className="banner-conteudo">
                <img src="/mãoazul.png" alt="Mão azul" className="banner-imagem" />
                <div className="banner-texto">
                    <h1>Imite o Sinal</h1>
                    <p>Assista, pratique e aprenda Língua Brasileira de Sinais</p>
                </div>
            </div>

            <main className="conteudo" aria-busy={isUploading}>
                <div className="card">

                    {tela === "inicio" && (
                        <>
                            <IconeCamera />
                            <h2>Prática de sinais</h2>
                            <p>Assista ao vídeo demonstrativo, depois grave você<br />Fazendo o mesmo sinal em LIBRAS</p>
                            <div className="modal-actions">
                                <button className="botao-significado" onClick={abrirVideoDemonstrativo}>
                                    <IconeIniciar /> Comece a praticar
                                </button>
                            </div>
                        </>
                    )}

                    {tela === "video" && (
                        <>
                            <IconePlay />
                            <h2>Vídeo demonstrativo</h2>
                            <p>Assista com atenção ao sinal que você deverá imitar</p>
                            <div className="video-container">
                                <ReactPlayer
                                    url={sinalVideoUrl}
                                    width='100%'
                                    height='100%'
                                    controls={true}
                                    className='react-player'
                                    config={{
                                        youtube: {
                                            playerVars: {
                                                modestbranding: 1,
                                                rel: 0,
                                                showinfo: 0
                                            }
                                        }
                                    }}
                                />
                            </div>

                            <p className="alerta-observacao">
                                <IconeLampada />
                                Observe: Preste atenção na posição das mãos, expressão facial e movimento do sinal
                            </p>

                            <div className="modal-actions">
                                <button className="botao-significado" onClick={solicitarPermissaoCamera}>
                                    <IconeCamera /> Gravar meu vídeo
                                </button>
                            </div>
                        </>
                    )}

                    {tela === "permissao" && (
                        <>
                            <IconeCamera />
                            <h2>Permissão de câmera necessária</h2>
                            <p>Para gravar seu sinal em LIBRAS, precisamos acessar sua câmera. Clique no botão abaixo para permitir o acesso</p>
                            {erroPermissao && <p className="alerta-erro">{erroPermissao}</p>}
                            <div className="modal-actions permissao-actions">
                                <button className="botao-significado" onClick={permitirCamera}>
                                    <IconeCamera /> Permitir Acesso à Câmera
                                </button>
                            </div>
                        </>
                    )}

                    {tela === "preview" && (
                        <>
                            <h2>Pré-visualização da câmera</h2>
                            <p>Verifique a posição das mãos e rosto. Quando estiver pronto, inicie a gravação.</p>
                            <div className="video-container">
                                <video ref={previewRef} className="video-camera" autoPlay muted />
                            </div>
                            <div className="modal-actions">
                                <button className="botao-significado" onClick={iniciarGravacao}>
                                    <IconeIniciar /> Começar Gravação
                                </button>
                                <button className="btn-refazer" onClick={() => { limparCamera(); setTela("video"); }}>
                                    Cancelar
                                </button>
                            </div>
                        </>
                    )}

                    {tela === "gravando" && (
                        <>
                            <IconeCamera />
                            <h2>Gravando...</h2>
                            <p>Continue fazendo o sinal até terminar. Clique em parar para finalizar.</p>
                            <div className="video-container">
                                <video ref={previewRef} className="video-camera" autoPlay muted />
                            </div>
                            <div className="modal-actions">
                                <button className="botao-significado" onClick={pararGravacao}>
                                    Parar Gravação
                                </button>
                            </div>
                        </>
                    )}

                    {tela === "gravado" && (
                        <>
                            <IconePlay />
                            <h2>Seu Sinal Gravado</h2>
                            <p>Revise seu vídeo. Se estiver bom, clique em Enviar. Caso contrário, refaça a gravação.</p>
                            <div className="video-container">
                                {videoGravadoURL && (
                                    <video
                                        src={videoGravadoURL}
                                        controls
                                        className="video-gravado"
                                        autoPlay
                                    />
                                )}
                            </div>
                            <div className="modal-actions">
                                <button
                                    className="botao-significado"
                                    onClick={enviarVideo}
                                    disabled={isUploading}
                                >
                                    {isUploading ? "Enviando..." : <><IconeEnviar /> Enviar Vídeo</>}
                                </button>
                                <button className="btn-refazer" onClick={refazerGravacao} disabled={isUploading}>
                                    <IconeRefazer /> Refazer Gravação
                                </button>
                            </div>
                        </>
                    )}

                </div>
            </main>

            <Rodape />
        </div>
    );
}