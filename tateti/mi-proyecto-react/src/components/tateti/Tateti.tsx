import Cuadrado from "../cuadrado/Cuadrado";
import "./tateti.css";
import { useState } from 'react';
import { useEffect } from "react";

const Tateti = () =>{

  //States
    const [cantClicks, setCantClicks] = useState(0);
    const [ganador, setGanador] = useState("Empezar a jugar!");
    const [resultados, setResultados] = useState(Array(9).fill(""));

  // Set state
    const turno = () => { setCantClicks((prev) => prev+1); console.log("TURNOOO, cantClicks: " + cantClicks)};
    const actualizarResultado = (index:number, nuevoValor:string) => {
      setResultados((prevResultados) => {
        const nuevoArray = [...prevResultados];
        nuevoArray[index] = nuevoValor;
        console.log("cantClicks: " + cantClicks);
        console.log("ActualizarResultado, nuevoValor: " + nuevoValor);
        return nuevoArray; 
      });
    };
    const mensaje = () => {
      const nuevoCont = contenido();
      if(evaluarJugada(nuevoCont)){
        setGanador("Ganador: " + nuevoCont);
        resetearVariables();
      }else{
        setGanador("Sigue jugando")
      }
    }

  // Functions
    const verificarClick = (position: number): boolean => (resultados[position]=== "" ? true : false);

    const contenido = () => (cantClicks % 2 === 0 ? "☀️" : "🌑​​");

    const evaluarJugada = (contentTurno: string) => {
        console.log("cantClicks: " + cantClicks);
        console.log("EvaluarJugada, contentTurno: " + contentTurno);
        if (
            (resultados[0] === contentTurno && resultados[1] === contentTurno && resultados[2] === contentTurno) ||
            (resultados[3] === contentTurno && resultados[4] === contentTurno && resultados[5] === contentTurno) ||
            (resultados[6] === contentTurno && resultados[7] === contentTurno && resultados[8] === contentTurno) ||
            (resultados[0] === contentTurno && resultados[3] === contentTurno && resultados[6] === contentTurno) ||
            (resultados[1] === contentTurno && resultados[4] === contentTurno && resultados[7] === contentTurno) ||
            (resultados[2] === contentTurno && resultados[5] === contentTurno && resultados[8] === contentTurno) ||
            (resultados[0] === contentTurno && resultados[4] === contentTurno && resultados[8] === contentTurno) ||
            (resultados[2] === contentTurno && resultados[4] === contentTurno && resultados[6] === contentTurno)
        ) {
            return true
        } else{
          return false
        }
    };

    const acciones = (index: number) => { 
        if (verificarClick(index)) {
          console.log("Acciones");
          
          const nuevoCont = contenido();
          console.log("cantClicks: " + cantClicks);
          console.log("Acciones, nuevoCont: " + nuevoCont);
          
          actualizarResultado(index, nuevoCont);
          turno();
        }
    };

    const resetearVariables = () => {
        setResultados(["", "", "", "", "", "", "", "", ""]);
        setCantClicks(0);
    };

  // useEffect
    useEffect(() => {
      if( cantClicks > 0 ){
        mensaje();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resultados]);

    return (
      <>
        <h1>{cantClicks}</h1>

        <div className="tateti">
          {resultados.map((value, index) => (
            <Cuadrado key={index} contenido={value} posicion={index} handleClick={() => acciones(index)} />
          ))}
        </div>

        <h2>{ganador}</h2>
      </>
    );
}

export default Tateti;