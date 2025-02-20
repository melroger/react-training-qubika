import { useState, useEffect } from "react";

export function useTatetiLogica() {
  const [cantClicks, setCantClicks] = useState(0);
  const [ganador, setGanador] = useState("Empezar a jugar!");
  const [resultados, setResultados] = useState(Array(9).fill(""));

  const turno = () => setCantClicks((prev) => prev + 1);

  const actualizarResultado = (index: number, nuevoValor: string) => {
    setResultados((prevResultados) => {
      const nuevoArray = [...prevResultados];
      nuevoArray[index] = nuevoValor;
      return nuevoArray;
    });
  };

  const verificarClick = (position: number): boolean => resultados[position] === "";

  const contenido = () => (cantClicks % 2 === 0 ? "☀️" : "🌑");

  const evaluarJugada = (contentTurno: string) => {
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
  };

  const mensaje = () => {
    const nuevoCont = contenido();
    if (evaluarJugada(nuevoCont)) {
      setGanador("Ganador: " + nuevoCont);
      resetearVariables();
    } else {
      setGanador("Sigue jugando");
    }
  };

  const acciones = (index: number) => {
    if (verificarClick(index)) {
      const nuevoCont = contenido();
      actualizarResultado(index, nuevoCont);
      turno();
    }
  };

  const resetearVariables = () => {
    setResultados(["", "", "", "", "", "", "", "", ""]);
    setCantClicks(0);
  };

  useEffect(() => {
    mensaje();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultados]);

  return { cantClicks, ganador, resultados, acciones };
}
