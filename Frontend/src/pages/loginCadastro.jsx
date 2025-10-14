import "./loginCadastro.scss";
import GoogleIcon from "../icons/google.png";
import FacebookIcon from "../icons/facebook.png";
import AppleIcon from "../icons/apple.png";

export default function LoginCadastro() {
  return (
    <div className="login-cadastro-page">
      <div className="forms-wrapper">

        {/* Login */}
        <div className="form-card login-card">
          <h2>Bem vindo de volta</h2>
          <p>Faça login para continuar sua jornada de aprendizado</p>
          <form>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Senha" />
            <div className="social-login">
              <img src={FacebookIcon} alt="Facebook" />
              <img src={GoogleIcon} alt="Google" />
              <img src={AppleIcon} alt="Apple" />
            </div>
            <button type="submit">Entrar</button>
          </form>
          <p className="footer-text">
            Não possui conta? <span className="highlight">Cadastre-se aqui!</span>
          </p>
          <p className="footer-text"><span className="highlight">Esqueceu sua senha?</span></p>
        </div>

        {/* Cadastro */}
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
              <img src={GoogleIcon} alt="Google" />
              <img src={AppleIcon} alt="Apple" />
            </div>
            <button type="submit">Entrar</button>
          </form>
          <p className="footer-text">
            Já possui uma conta? <span className="highlight">Entre agora!</span>
          </p>
        </div>

      </div>
    </div>
  );
}
