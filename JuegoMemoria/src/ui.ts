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

  // Verificar si la carta está encontrada
  if (!tablero.cartas[indice].encontrada) {
    cardDiv.addEventListener("click", () => {
      if (tablero.cartas[indice].estaVuelta || tablero.cartas[indice].encontrada) {
        alert("Esta carta ya está volteada");
        return;
      }

      voltearLaCarta(tablero, indice);
      actualizarUI();

      if (tablero.estadoPartida === "DosCartasLevantadas") {
        intentos++;
        intentosElement.textContent = intentos.toString();
      }
    });

    cardDiv.addEventListener("mouseover", () => {
      cardDiv.classList.add("hover");
    });
    cardDiv.addEventListener("mouseout", () => {
      cardDiv.classList.remove("hover");
    });
  } else {
    // Si la carta está encontrada, mostrar la imagen
    img.setAttribute("src", tablero.cartas[indice].imagen);
    cardDiv.addEventListener("click", () => {
      alert("Esta pareja ya se ha encontrado.");
    });
  }
};

const actualizarUI = () => {
  gameBoard.innerHTML = ""; // Limpiar el tablero

  tablero.cartas.forEach((carta: Carta, indice: number) => {
    crearCartaUI(indice);

    if (carta.estaVuelta && !carta.encontrada) {
      const cardDiv = gameBoard.querySelector(`[data-indice-array="${indice}"]`) as HTMLDivElement;
      const img = cardDiv.querySelector("img") as HTMLImageElement;
      img.setAttribute("src", carta.imagen);
      cardDiv.classList.add("flip-animation");
    } else if (carta.encontrada) {
      // Si la carta está encontrada, mostrar la imagen sin animación
      const cardDiv = gameBoard.querySelector(`[data-indice-array="${indice}"]`) as HTMLDivElement;
      const img = cardDiv.querySelector("img") as HTMLImageElement;
      img.setAttribute("src", carta.imagen);
    }
  });
};

startButton.addEventListener("click", () => {
  intentos = 0;
  intentosElement.textContent = "0";

  // Reiniciar el estado de las cartas antes de iniciar la partida
  tablero.cartas.forEach((carta) => {
    carta.estaVuelta = false;
    carta.encontrada = false;
  });

  iniciaPartida(tablero);
  actualizarUI();
});
