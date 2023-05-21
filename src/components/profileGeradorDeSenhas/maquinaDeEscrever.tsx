import React, { useState, useEffect } from "react";

interface TextoMaquinaEscreverProps {
  texto: string;
  velocidade: number;
  tamanhoFonte?: string;
}

const TextoMaquinaEscrever: React.FC<TextoMaquinaEscreverProps> = ({
  texto,
  velocidade,
  tamanhoFonte,
}) => {
  const [textoExibido, setTextoExibido] = useState("");

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    let index = 0;

    const escreverTexto = () => {
      setTextoExibido(texto.substring(0, index));
      index++;

      if (index > texto.length) {
        clearTimeout(timerId);
      } else {
        timerId = setTimeout(escreverTexto, velocidade);
      }
    };

    timerId = setTimeout(escreverTexto, velocidade);

    return () => {
      clearTimeout(timerId);
    };
  }, [texto, velocidade]);

  return <span style={{ fontSize: tamanhoFonte }}>{textoExibido}</span>;
};

export default TextoMaquinaEscrever;
