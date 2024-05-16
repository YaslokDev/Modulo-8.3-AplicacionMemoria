import { Carta, Tablero } from "./model";

export const barajarCartas = (cartas: Carta[]): Carta[] => {
  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }
  return cartas;
};

export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  return (
    tablero.estadoPartida !== "PartidaNoIniciada" &&
    !tablero.cartas[indice].encontrada &&
    !tablero.cartas[indice].estaVuelta &&
    tablero.estadoPartida !== "DosCartasLevantadas"
  );
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    tablero.cartas[indice].estaVuelta = true;

    if (tablero.estadoPartida === "CeroCartasLevantadas") {
      tablero.estadoPartida = "UnaCartaLevantada";
      tablero.indiceCartaVolteadaA = indice;
    } else if (tablero.estadoPartida === "UnaCartaLevantada") {
      tablero.estadoPartida = "DosCartasLevantadas";
      tablero.indiceCartaVolteadaB = indice;

      if (sonPareja(tablero.indiceCartaVolteadaA!, tablero.indiceCartaVolteadaB!, tablero)) {
        parejaEncontrada(tablero, tablero.indiceCartaVolteadaA!, tablero.indiceCartaVolteadaB!);
      } else {
        setTimeout(() => {
          parejaNoEncontrada(tablero, tablero.indiceCartaVolteadaA!, tablero.indiceCartaVolteadaB!);
        }, 1000);
      }
    }
  }
};

const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;

  tablero.estadoPartida = esPartidaCompleta(tablero) ? "PartidaCompleta" : "CeroCartasLevantadas";

  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};

const parejaNoEncontrada = (tablero: Tablero, indiceA: number, indiceB: number): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;

  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};

export const iniciaPartida = (tablero: Tablero): void => {
  tablero.cartas = barajarCartas(tablero.cartas);
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};
