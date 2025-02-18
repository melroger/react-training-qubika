import Cuadrado from "../cuadrado/Cuadrado";
import "./tateti.css";
import { useState } from 'react';
import { useEffect } from "react";

const Tateti = () =>{

    const [cantClicks, setCantClicks] = useState(0);
    const [ganador, setGanador] = useState("Empezar a jugar!");
    const [resultados, setResultados] = useState(Array(9).fill(""));


    useEffect(() => {
      if( cantClicks > 0 ){
        const nuevocontenido = contenido();
        evaluarJugada(nuevocontenido)
      }
        
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resultados, cantClicks]);


    const turno = () => { setCantClicks((prev) => prev+1) };


    const actualizarResultado = (index:number, nuevoValor:string) => {
      setResultados((prevResultados) => {
        const nuevoArray = [...prevResultados];
        nuevoArray[index] = nuevoValor;
        return nuevoArray; 
      });
    };

    const resetearVariables = () => {
      setResultados(["", "", "", "", "", "", "", "", ""]);
      setCantClicks(0);
      setGanador("Empezar a jugar!");
    };

    const verificarClick = (position: number): boolean => (resultados[position]=== "" ? true : false);
      
    const contenido = () => (cantClicks % 2 === 0 ? "X" : "O");

    const evaluarJugada = (contenido: string) => {
      console.log(contenido);
      if (
          (resultados[0] === contenido && resultados[1] === contenido && resultados[2] === contenido) ||
          (resultados[3] === contenido && resultados[4] === contenido && resultados[5] === contenido) ||
          (resultados[6] === contenido && resultados[7] === contenido && resultados[8] === contenido) ||
          (resultados[0] === contenido && resultados[3] === contenido && resultados[6] === contenido) ||
          (resultados[1] === contenido && resultados[4] === contenido && resultados[7] === contenido) ||
          (resultados[2] === contenido && resultados[5] === contenido && resultados[8] === contenido) ||
          (resultados[0] === contenido && resultados[4] === contenido && resultados[8] === contenido) ||
          (resultados[2] === contenido && resultados[4] === contenido && resultados[6] === contenido)
      ) {
          setGanador("Ganador: " + contenido);
      } else if (!resultados.includes("")) {
          resetearVariables();
      }
  };


    const acciones = (index: number) => { 
      if (verificarClick(index)) {
        const nuevocontenido = contenido();
        actualizarResultado(index, nuevocontenido);
        turno();
      }
    };

    return (
      <>
        <h1>{cantClicks}</h1>
        <div className="tateti">

          {resultados.map((value, index) => (

            <Cuadrado key={index} contenido={value} posicion={index} handleClick={() => acciones(index)} />

          ))}

        <h2>{ganador}</h2>

        </div>
      </>

    );
}

export default Tateti;