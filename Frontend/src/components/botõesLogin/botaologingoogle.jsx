import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; 
import GoogleIcon from '../../icons/google.png'; 

const BACKEND_URL = "http://localhost:5010";

export default function GoogleLoginButton() {
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
       const res = await axios.post(`${BACKEND_URL}/usuario/google`, { code: codeResponse.code 

       });

        const { token } = res.data;
        const userPayload = jwt_decode(token); 

        localStorage.setItem('authToken', token);
        alert(`Login com sucesso! Bem-vindo(a), ${userPayload.nome || userPayload.email}!`);
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
    <img
      src={GoogleIcon}
      alt="Login com Google"
      style={{ cursor: "pointer", width: 200 }}
      onClick={login} 
    />
  );
}