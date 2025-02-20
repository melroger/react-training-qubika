import Cuadrado from "../cuadrado/Cuadrado";
import InfoTitle from "../infoTitle/infoTitle";
import "./tateti.css";
import { useTatetiLogica } from "./tatetiLogica";

const Tateti = () => {
  const { cantClicks, contenido, ganador, resultados, acciones, resetearVariables } = useTatetiLogica();

  return (
    <>
      <InfoTitle contenido={cantClicks}></InfoTitle>
      <InfoTitle contenido={contenido}></InfoTitle>

      <div className="tateti">
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
