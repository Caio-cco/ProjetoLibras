import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.scss";

import GoogleIcon from "../icons/google.png";

const BACKEND_URL =
  import.meta.env.MODE === "production"
    ? "https://projetolibras.onrender.com"
    : "http://localhost:5010";

const REDIRECT_URI =
  import.meta.env.MODE === "production"
    ? "https://projeto-libras-ten.vercel.app/login/google/callback"
    : "http://localhost:5173/login/google/callback";

export default function LoginCadastro() {
  const navigate = useNavigate();
  const [modo, setModo] = useState("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");
  const [cadNome, setCadNome] = useState("");
  const [cadEmail, setCadEmail] = useState("");
  const [cadSenha, setCadSenha] = useState("");
  const [cadConfSenha, setCadConfSenha] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp > now) {
          navigate("/");
        } else {
          localStorage.removeItem("authToken");
          localStorage.removeItem("name");
          localStorage.removeItem("id");
        }
      } catch {
        localStorage.removeItem("authToken");
        localStorage.removeItem("name");
        localStorage.removeItem("id");
      }
    }
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();

    if (!loginEmail || !loginSenha) {
      toast.warn("⚠️ Preencha todos os campos!");
      return;
    }

    const res = await axios.post(`${BACKEND_URL}/usuario/login`, {
      email: loginEmail,
      senha: loginSenha,
    });

    const { token } = res.data;
    const userPayload = jwt_decode(token);

    localStorage.setItem("authToken", token);
    localStorage.setItem("name", userPayload.nome);
    localStorage.setItem("id", userPayload.id);

    navigate("/homel");
  }

  async function handleCadastro(e) {
    e.preventDefault();

    if (!cadNome || !cadEmail || !cadSenha || !cadConfSenha) {
      toast.warn("⚠️ Preencha todos os campos!");
      return;
    }

    if (cadSenha !== cadConfSenha) {
      toast.error("❌ As senhas não coincidem!");
      return;
    }

    const res = await axios.post(`${BACKEND_URL}/usuario`, {
      email: cadEmail,
      senha: cadSenha,
      name: cadNome,
    });

    if (res.data.novoId) {
      setModo("login");
      setLoginEmail(cadEmail);
      setLoginSenha("");
    }
  }

const loginGoogle = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/usuario/google`,
        {
          access_token: tokenResponse.access_token,
        }
      );

      const { token } = res.data;
      const userPayload = jwt_decode(token);

      localStorage.setItem("authToken", token);
      localStorage.setItem("name", userPayload.nome);
      localStorage.setItem("id", userPayload.id);

      navigate("/homel");
    } catch {
      toast.error("❌ Falha na autenticação com o Google.");
    }
  },
  onError: () => {
    toast.error("❌ Falha na autenticação com o Google.");
  },
});

  return (
    <div className="login-cadastro-container">
      <ToastContainer position="top-right" theme="colored" />

      <div className="switch-container">
        <button
          className={`switch-btn ${modo === "login" ? "ativo" : ""}`}
          onClick={() => setModo("login")}
        >
          Login
        </button>
        <button
          className={`switch-btn ${modo === "cadastro" ? "ativo" : ""}`}
          onClick={() => setModo("cadastro")}
        >
          Cadastro
        </button>
        <div className={`slider ${modo}`}></div>
      </div>

      <div className="conteudo-container">
        {modo === "login" ? (
          <div className="login-section">
            <h2>Bem-vindo de volta</h2>
            <p>Faça login para continuar sua jornada de aprendizado</p>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                value={loginSenha}
                onChange={(e) => setLoginSenha(e.target.value)}
              />

              <button type="submit" className="btn">
                Entrar
              </button>

              <div className="social-login">
                <img
                  src={GoogleIcon}
                  alt="Google"
                  onClick={loginGoogle}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </form>

            <p className="link">
              Não possui conta?{" "}
              <span className="highlight" onClick={() => setModo("cadastro")}>
                Cadastre-se aqui!
              </span>
            </p>
          </div>
        ) : (
          <div className="cadastro-section">
            <h2>Cadastro</h2>
            <p>Crie sua conta e comece agora</p>

            <form onSubmit={handleCadastro}>
              <input
                type="text"
                placeholder="Nome"
                value={cadNome}
                onChange={(e) => setCadNome(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={cadEmail}
                onChange={(e) => setCadEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                value={cadSenha}
                onChange={(e) => setCadSenha(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirme sua senha"
                value={cadConfSenha}
                onChange={(e) => setCadConfSenha(e.target.value)}
              />

              <button type="submit" className="btn">
                Cadastrar
              </button>
            </form>

            <p className="link">
              Já possui uma conta?{" "}
              <span className="highlight" onClick={() => setModo("login")}>
                Entre agora!
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}






