import { useEffect, useRef } from "react";
import Cuadrado from "../cuadrado/Cuadrado";
import InfoTitle from "../infoTitle/infoTitle";
import "./tateti.css";
import { useTatetiLogica } from "./tatetiLogica";

const Tateti = () => {
  const { cantClicks, contenido, ganador, resultados, acciones, resetearVariables } = useTatetiLogica();

  const refDiv = useRef(null);
  console.log(refDiv.current);

    useEffect(() => {
        // eslint-disable-next-line no-extra-boolean-cast
        if(!!refDiv.current){
          console.log(refDiv.current);
        }
    });

  return (
    <>
      <InfoTitle contenido={cantClicks}></InfoTitle>
      <InfoTitle contenido={contenido}></InfoTitle>

      <div className="tateti" ref={refDiv} >
        {resultados.map((value, index) => (
          <Cuadrado key={index} contenido={value} posicion={index} handleClick={() => acciones(index)} />
        ))}
      </div>

      <InfoTitle contenido={ganador}></InfoTitle>
      <button onClick={() => resetearVariables()}>Reiniciar</button>
    </>
  );
};

export default Tateti;
