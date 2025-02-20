import Cuadrado from "../cuadrado/Cuadrado";
import "./tateti.css";
import { useTatetiLogica } from "./tatetiLogica";

const Tateti = () => {
  const { cantClicks, contenido, ganador, resultados, acciones } = useTatetiLogica();

  return (
    <>
      <h1>{cantClicks}</h1>
      <h2>Turno: {contenido}</h2>

      <div className="tateti">
        {resultados.map((value, index) => (
          <Cuadrado key={index} contenido={value} posicion={index} handleClick={() => acciones(index)} />
        ))}
      </div>

      <h2>{ganador}</h2>
    </>
  );
};

export default Tateti;
