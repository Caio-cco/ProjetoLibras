import { useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import "./index.scss";

export default function ContactForm() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    mensagem: "",
    aceitar: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.aceitar) {
      Swal.fire({
        icon: "warning",
        title: "Confirme o consentimento!",
        text: "Você precisa concordar com a política de privacidade antes de enviar.",
      });
      return;
    }

    Swal.fire({
      title: "Enviando...",
      text: "Aguarde um momento.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    emailjs
      .send(
        "service_pcpatwt", // substitua pelo seu Service ID
        "template_xr2fvz1", // substitua pelo seu Template ID
        {
          nome: form.nome,
          email: form.email,
          mensagem: form.mensagem,
        },
        "yGpOA-ERCi8LJDEr8" // substitua pelo seu Public Key
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Mensagem enviada!",
          text: "Obrigado por entrar em contato. Em breve retornaremos.",
          confirmButtonColor: "#c14e00",
        });
        setForm({
          nome: "",
          email: "",
          mensagem: "",
          aceitar: false,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Erro ao enviar!",
          text: "Ocorreu um erro. Tente novamente mais tarde.",
        });
      });
  };

  return (
    <section className="form-section" id="contato">
      <div className="form-container">
        <div className="form-text">
          <h2>Entre em contato<br />com a nossa equipe!</h2>
          <p>Preencha o formulário abaixo e responderemos o mais breve possível.</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="nome">Nome*</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite seu nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail*</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu e-mail"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="mensagem">Mensagem*</label>
            <textarea
              id="mensagem"
              name="mensagem"
              placeholder="Escreva sua mensagem..."
              rows="4"
              value={form.mensagem}
              onChange={handleChange}
              required
            ></textarea>
          </div>

      <div className="checkbox-group">
            <input
              type="checkbox"
              id="aceitar"
              name="aceitar"
              checked={form.aceitar}
              onChange={handleChange}
            />
            <label htmlFor="aceitar">
              Eu concordo em receber comunicações.
            </label>
          </div>



    <p className="politica">
            Ao informar meus dados, eu concordo com a{" "}
            <a href="#">Política de Privacidade</a>.
          </p>


          <button type="submit" className="btn-enviar">
            Enviar contato
          </button>
        </form>
      </div>
    </section>
  );
}
