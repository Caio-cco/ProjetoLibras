import React, { useState } from "react";
import "./index.scss";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

export default function ModalLoginCadastro({ onClose }) {
  const [modoCadastro, setModoCadastro] = useState(false);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <img src="./joker.jpg" alt="logo" className="logo" />

        <h2>Bem vindo de volta</h2>
        <p>
          {modoCadastro
            ? "Crie sua conta e comece sua jornada de aprendizado"
            : "Faça login para continuar sua jornada de aprendizado"}
        </p>

        <form>
          {modoCadastro && (
            <>
              <input type="text" placeholder="Nome" />
              <input type="tel" placeholder="Telefone" />
            </>
          )}
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Senha" />
          {modoCadastro && <input type="password" placeholder="Confirmar senha" />}

          <button type="submit" className="btn-amarelo">
            {modoCadastro ? "Cadastrar" : "Entrar"}
          </button>
        </form>

        <div className="divider">
          <span></span>
          <p>ou</p>
          <span></span>
        </div>

        <div className="social-icons">
          <FaGoogle />
          <FaFacebookF />
          <FaApple />
        </div>

        <div className="bottom-text">
          {modoCadastro ? (
            <p>
              Já possui uma conta?{" "}
              <button onClick={() => setModoCadastro(false)}>Entre aqui!</button>
            </p>
          ) : (
            <>
              <p>
                Não possui conta?{" "}
                <button onClick={() => setModoCadastro(true)}>Cadastre-se aqui!</button>
              </p>
              <a href="#">Esqueceu sua senha?</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
