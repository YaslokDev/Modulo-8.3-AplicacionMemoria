import { iniciaPartida, voltearLaCarta } from "./motor";
import { Carta, tablero } from "./model";

const gameBoard = document.getElementById("game-board") as HTMLDivElement;
const startButton = document.getElementById("start-button") as HTMLButtonElement;
const intentosElement = document.getElementById("intentos") as HTMLSpanElement;

let intentos = 0;

const crearCartaUI = (indice: number) => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.setAttribute("data-indice-array", indice.toString());

  const img = document.createElement("img");
  img.setAttribute("src", "../img/dorso.jpg");
  img.setAttribute("data-indice-imagen", indice.toString());

  cardDiv.appendChild(img);
  gameBoard.appendChild(cardDiv);

  cardDiv.addEventListener("click", () => {
    // Evitar clicks en cartas volteadas o encontradas
    if (tablero.cartas[indice].estaVuelta || tablero.cartas[indice].encontrada) {
      alert("Esta carta ya está volteada o encontrada.");
      return;
    }

    voltearLaCarta(tablero, indice);
    actualizarUI();

    // Incrementar los intentos cuando se voltean dos cartas
    if (tablero.estadoPartida === "DosCartasLevantadas") {
      intentos++;
      intentosElement.textContent = intentos.toString();
    }
  });

  // Efecto hover
  cardDiv.addEventListener("mouseover", () => {
    cardDiv.classList.add("hover");
  });
  cardDiv.addEventListener("mouseout", () => {
    cardDiv.classList.remove("hover");
  });
};

const actualizarUI = () => {
  gameBoard.innerHTML = ""; // Limpiar el tablero

  tablero.cartas.forEach((carta: Carta, indice: number) => {
    crearCartaUI(indice);
    if (carta.estaVuelta) {
      const cardDiv = gameBoard.querySelector(`[data-indice-array="${indice}"]`) as HTMLDivElement;
      const img = cardDiv.querySelector("img") as HTMLImageElement;
      img.setAttribute("src", carta.imagen);

      cardDiv.classList.add("flip-animation");
    }
  });
};

startButton.addEventListener("click", () => {
  intentos = 0;
  intentosElement.textContent = "0";
  iniciaPartida(tablero);
  actualizarUI();
});
