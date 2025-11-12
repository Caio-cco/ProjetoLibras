import QuizAtividade from "../../components/QuizAtividade";

export const QuizBasico = () => (
  <QuizAtividade
    banner="/maoazul.png"
    titulo="Quiz de Libras"
    descricao="Teste seus conhecimentos"
    dif={1}
    idCurso={4}
  />
);

export const QuizIntermediario = () => (
  <QuizAtividade
    banner="/maolaranja.png"
    titulo="Quiz de Libras Intermediário"
    descricao="Teste seus conhecimentos sobre a gramática e estrutura da LIBRAS"
    dif={2}
    idCurso={5}
  />
);

export const QuizAvancado = () => (
  <QuizAtividade
    banner="/maovermelha.png"
    titulo="Quiz de Libras Avançado"
    descricao="Teste seus conhecimentos sobre a Língua Brasileira de Sinais"
    dif={3}
    idCurso={6}
  />
);