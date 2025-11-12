import JogoDasFrasesImagens from "../../components/FraseAtividade";

export const FrasesBasico = () => (
  <JogoDasFrasesImagens
    banner="/maoazul.png"
    titulo="Jogo da Frase (Sinais) Iniciante"
    descricao="Organize os sinais na estrutura correta de LIBRAS"
    dif={1}
    idCurso={7}
  />
);

export const FrasesIntermediario = () => (
  <JogoDasFrasesImagens
    banner="/maolaranja.png"
    titulo="Jogo da Frase (Sinais) Intermediário"
    descricao="Organize os sinais na estrutura correta de LIBRAS"
    dif={2}
    idCurso={8}
  />
);

export const FrasesAvancado = () => (
  <JogoDasFrasesImagens
    banner="/maovermelha.png"
    titulo="Jogo da Frase (Sinais) Avançado"
    descricao="Organize os sinais na estrutura correta de LIBRAS"
    dif={3}
    idCurso={9}
  />
);