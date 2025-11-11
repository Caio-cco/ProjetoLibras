import AssosiacaoAtividade from "../../components/AssosiacaoAtividade";

export const AssociacaoBasico = () => (
  <AssosiacaoAtividade
    banner="/maoazul.png"
    titulo="Alfabeto em Libras (Datilologia)"
    descricao="Associe o sinal com a letra do alfabeto"
    idInicial={1}
    idFinal={27}
    idCurso={1}
  />
);

export const AssociacaoIntermediario = () => (
  <AssosiacaoAtividade
    banner="/maolaranja.png"
    titulo="Palavras em Libras"
    descricao="Associe o sinal com sua palavra correspondente"
    idInicial={28}
    idFinal={37}
    idCurso={2}
  />
);

export const AssociacaoAvancado = () => (
  <AssosiacaoAtividade
    banner="/maovermelha.png"
    titulo="Frases em Libras"
    descricao="Associe os sinais às frases"
    idInicial={38}
    idFinal={47}
    idCurso={3}
  />
);