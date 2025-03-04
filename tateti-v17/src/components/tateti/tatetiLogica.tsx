import { useState, useEffect, useCallback, useRef } from "react";

export function useTatetiLogica() {
  const [cantClicks, setCantClicks] = useState(0);
  const [resultados, setResultados] = useState(Array(9).fill(""));

  const refGanador = useRef("Empezar a jugar!");

  const turno = () => setCantClicks((prev) => prev + 1);

  const refContenido = useRef("🌑");

  //useState con ref
  const actualizarResultado = (index: number, nuevoValor: string) => {
    setResultados((prevResultados) => {
      const nuevoArray = [...prevResultados];
      nuevoArray[index] = nuevoValor;
      return nuevoArray;
    });
  };

  const verificarClick = (position: number): boolean => resultados[position] === "";


  const actualizarContenido = useCallback(() => { refContenido.current = (cantClicks % 2 === 0 ? "☀️" : "🌑") }, [cantClicks]);


  const evaluarJugada = useCallback(
    (contentTurno: string) => {
      console.log(contentTurno);
      console.log(resultados);
      return (
        (resultados[0] === contentTurno && resultados[1] === contentTurno && resultados[2] === contentTurno) ||
        (resultados[3] === contentTurno && resultados[4] === contentTurno && resultados[5] === contentTurno) ||
        (resultados[6] === contentTurno && resultados[7] === contentTurno && resultados[8] === contentTurno) ||
        (resultados[0] === contentTurno && resultados[3] === contentTurno && resultados[6] === contentTurno) ||
        (resultados[1] === contentTurno && resultados[4] === contentTurno && resultados[7] === contentTurno) ||
        (resultados[2] === contentTurno && resultados[5] === contentTurno && resultados[8] === contentTurno) ||
        (resultados[0] === contentTurno && resultados[4] === contentTurno && resultados[8] === contentTurno) ||
        (resultados[2] === contentTurno && resultados[4] === contentTurno && resultados[6] === contentTurno)
      );
    },[resultados] )

const mensaje = useCallback (()=>{

    console.log("render de mensajes");
    if (evaluarJugada(refContenido.current)) {
      refGanador.current = "ganador " + refContenido.current;
    } else { 
      refGanador.current = "Sigue jugando";
      actualizarContenido();
    }

}, [actualizarContenido, evaluarJugada])

  const acciones = (index: number) => {
    if (verificarClick(index)) {
      actualizarResultado(index, refContenido.current);
      turno();
    }
  };

  const resetearVariables = () => {
    setResultados(["", "", "", "", "", "", "", "", ""]);
    setCantClicks(0);
    refContenido.current = "🌑";
  };

  useEffect(() => {
      mensaje();

  }, [mensaje]);

  return { cantClicks, contenido: refContenido.current, ganador: refGanador.current, resultados, acciones, resetearVariables };
}
