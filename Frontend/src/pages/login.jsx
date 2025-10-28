import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./login.scss";

import GoogleIcon from "../icons/google.png";


const BACKEND_URL =
  import.meta.env.MODE === "production"
    ? "https://projeto-libras-3sdnp2863-caio-ccos-projects.vercel.app"
    : "http://localhost:5010";

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
        }
      } catch {
        localStorage.removeItem("authToken");
      }
    }
  }, [navigate]);

  const irParaLogin = () => setModo("login");
  const irParaCadastro = () => setModo("cadastro");

 
  async function handleLogin(e) {
    e.preventDefault();
    try {
      if (!loginEmail || !loginSenha) {
        alert("Preencha todos os campos!");
        return;
      }

      const res = await axios.post(`${BACKEND_URL}/usuario/login`, {
        email: loginEmail,
        senha: loginSenha,
      });

      const { token } = res.data;
      const userPayload = jwt_decode(token);

      localStorage.setItem("authToken", token);
      alert(`Bem-vindo(a), ${userPayload.nome || userPayload.email}!`);
      navigate("/homel");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.erro || "Falha ao fazer login.");
    }
  }

  async function handleCadastro(e) {
    e.preventDefault();
    try {
      if (!cadNome || !cadEmail || !cadSenha || !cadConfSenha) {
        alert("Preencha todos os campos!");
        return;
      }
      if (/\d/.test(cadNome)) {
        alert("O nome não pode conter números!");
        return;
      }
      if (cadSenha !== cadConfSenha) {
        alert("As senhas não coincidem!");
        return;
      }
  
      const res = await axios.post(`${BACKEND_URL}/usuario`, {
        email: cadEmail,
        senha: cadSenha,
        name: cadNome,
      });
  
      if (res.data.novoId) {
        alert("Conta criada com sucesso! Faça login agora.");
        setModo("login");
        setLoginEmail(cadEmail);
        setLoginSenha("");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.erro || "Falha ao criar conta.");
    }
  }

  const loginGoogle = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        const res = await axios.post(`${BACKEND_URL}/usuario/google`, {
          code: codeResponse.code,
        });

        const { token } = res.data;
        const userPayload = jwt_decode(token);

        localStorage.setItem("authToken", token);
        alert(`Login com sucesso! Bem-vindo(a), ${userPayload.nome || userPayload.email}!`);
        navigate("/homel");
      } catch (error) {
        console.error("Erro ao autenticar com o backend:", error);
        alert("Falha na autenticação com o Google.");
      }
    },
    onError: (error) => {
      console.error("Erro no login com o Google:", error);
      alert("Erro ao tentar fazer login com o Google.");
    },
  });

 
  return (
    <div className="login-cadastro-container">

      <div className="switch-container">
        <button
          className={`switch-btn ${modo === "login" ? "ativo" : ""}`}
          onClick={irParaLogin}
        >
          Login
        </button>
        <button
          className={`switch-btn ${modo === "cadastro" ? "ativo" : ""}`}
          onClick={irParaCadastro}
        >
          Cadastro
        </button>
        <div className={`slider ${modo}`}></div>
      </div>

      <div className="conteudo-container">
        {modo === "login" ? (
          <div className="login-section">
            <h2>Bem vindo de volta</h2>
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
              <span className="highlight" onClick={irParaCadastro}>
                Cadastre-se aqui!
              </span>
            </p>

            <a href="#" className="forgot">
              Esqueceu sua senha?
            </a>
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
              <span className="highlight" onClick={irParaLogin}>
                Entre agora!
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}