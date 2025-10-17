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

  const irParaLogin = () => navigate("/login");
  const irParaCadastro = () => navigate("/cadastro");

  // === LOGIN COM GOOGLE ===
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
        navigate("/"); // redireciona para a home, por exemplo
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
    <div className="login-cadastro-page">
      <div className="forms-wrapper">
        {/* LOGIN */}
        <div className="form-card login-card">
          <h2>Bem vindo de volta</h2>
          <p>Faça login para continuar sua jornada de aprendizado</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Senha" />

            <div className="social-login">
              <img src={FacebookIcon} alt="Facebook" />
              {/* Aqui o clique chama o Google Login */}
              <img
                src={GoogleIcon}
                alt="Google"
                style={{ cursor: "pointer" }}
                onClick={loginGoogle}
              />
              <img src={AppleIcon} alt="Apple" />
            </div>

            <button type="button" onClick={irParaLogin}>
              Entrar
            </button>
          </form>

          <p className="footer-text">
            Não possui conta?{" "}
            <span className="highlight" onClick={irParaCadastro}>
              Cadastre-se aqui!
            </span>
          </p>

          <p className="texto-menor">
            <a href="#">Esqueceu sua senha?</a>
          </p>
        </div>

        {/* CADASTRO */}
        <div className="form-card cadastro-card">
          <h2>Cadastro</h2>
          <p>Bem vindo de volta</p>
          <form>
            <input type="text" placeholder="Nome" />
            <input type="email" placeholder="Email" />
            <input type="tel" placeholder="Telefone" />
            <input type="password" placeholder="Senha" />
            <input type="password" placeholder="Confirme sua senha" />

            <div className="social-login">
              <img src={FacebookIcon} alt="Facebook" />
              <img
                src={GoogleIcon}
                alt="Google"
                style={{ cursor: "pointer" }}
                onClick={loginGoogle}
              />
              <img src={AppleIcon} alt="Apple" />
            </div>

            <button type="submit">Entrar</button>
          </form>

          <p className="footer-text">
            Já possui uma conta?{" "}
            <span className="highlight" onClick={irParaLogin}>
              Entre agora!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}