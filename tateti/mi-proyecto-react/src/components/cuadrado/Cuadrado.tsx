import "./cuadrado.css";

interface CuadradoProps {
  contenido: string;
  posicion: number;
  handleClick: (posicion: number) => void;
}

const Cuadrado = ({ contenido, posicion, handleClick }: CuadradoProps) => {
  return (
    <div className="cuadrado" onClick={() => handleClick(posicion)}>
      {contenido}
    </div>
  );
}

export default Cuadrado;