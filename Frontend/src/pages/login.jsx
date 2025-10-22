import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./login.scss";

import GoogleIcon from "../icons/google.png";
import FacebookIcon from "../icons/facebook.png";
import AppleIcon from "../icons/apple.png";

const BACKEND_URL = "http://localhost:5010";

export default function LoginCadastro() {
  const navigate = useNavigate();
  const [modo, setModo] = useState("login"); // controla se está no modo login ou cadastro

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
        navigate("/");
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
      {/* Toggle superior */}
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

      {/* Conteúdo */}
      <div className="conteudo-container">
        {modo === "login" ? (
          <div className="login-section">
            <h2>Bem vindo de volta</h2>
            <p>Faça login para continuar sua jornada de aprendizado</p>

            <form onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Senha" />

              <button type="button" onClick={irParaLogin} className="btn">
                Entrar
              </button>

              <div className="social-login">
                <img src={FacebookIcon} alt="Facebook" />
                <img
                  src={GoogleIcon}
                  alt="Google"
                  onClick={loginGoogle}
                  style={{ cursor: "pointer" }}
                />
                <img src={AppleIcon} alt="Apple" />
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

            <form>
              <input type="text" placeholder="Nome" />
              <input type="email" placeholder="Email" />
              <input type="tel" placeholder="Telefone" />
              <input type="password" placeholder="Senha" />
              <input type="password" placeholder="Confirme sua senha" />

              <button type="submit" className="btn">
                Cadastrar
              </button>

              <div className="social-login">
                <img src={FacebookIcon} alt="Facebook" />
                <img
                  src={GoogleIcon}
                  alt="Google"
                  onClick={loginGoogle}
                  style={{ cursor: "pointer" }}
                />
                <img src={AppleIcon} alt="Apple" />
              </div>
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
