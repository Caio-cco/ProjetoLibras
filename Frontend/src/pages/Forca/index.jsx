import ForcaAtividade from "../../components/ForcaAtividade";

export const ForcaBasico = () => (
  <ForcaAtividade
    banner="/maoazul.png"
    titulo="Jogo da Forca (LIBRAS) Iniciante"
    descricao="Tente adivinhar as 5 palavras relacionadas a LIBRAS antes de ser enforcado!"
    dif={1}
    idCurso={13}
  />
);

export const ForcaIntermediario = () => (
  <ForcaAtividade
    banner="/maolaranja.png"
    titulo="Jogo da Forca (LIBRAS) Intermediário"
    descricao="Tente adivinhar as 5 palavras relacionadas a LIBRAS antes de ser enforcado!"
    dif={2}
    idCurso={14}
  />
);

export const ForcaAvancado = () => (
  <ForcaAtividade
    banner="/maovermelha.png"
    titulo="Jogo da Forca (LIBRAS) Avançado"
    descricao="Tente adivinhar as 5 palavras relacionadas a LIBRAS antes de ser enforcado!"
    dif={3}
    idCurso={15}
  />
);