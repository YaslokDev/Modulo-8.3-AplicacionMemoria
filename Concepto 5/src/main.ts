interface InfoCarta {
  idFoto: number;
  imagen: string;
}

const arrayCartas: InfoCarta[] = [
  {
    idFoto: 1,
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png",
  },
  {
    idFoto: 2,
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png",
  },
  {
    idFoto: 3,
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png",
  },
  {
    idFoto: 4,
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/4.png",
  },
  {
    idFoto: 5,
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/5.png",
  },
  {
    idFoto: 6,
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png",
  },
  {
    idFoto: 1,
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png",
  },
  {
    idFoto: 2,
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png",
  },
  {
    idFoto: 3,
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png",
  },
  {
    idFoto: 4,
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/4.png",
  },
  {
    idFoto: 5,
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/5.png",
  },
  {
    idFoto: 6,
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png",
  },
];

const gameBoard = document.getElementById("game-board") as HTMLDivElement;

arrayCartas.forEach((carta, indice) => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.setAttribute("data-indice-id", indice.toString());

  const img = document.createElement("img");
  img.setAttribute("src", "../img/dorso.jpg");
  img.setAttribute("data-foto-id", carta.idFoto.toString());
  img.setAttribute("data-imagen-url", carta.imagen);

  cardDiv.appendChild(img);
  gameBoard.appendChild(cardDiv);

  cardDiv.addEventListener("click", () => {
    const indiceCarta = parseInt(cardDiv.dataset.indiceId || "0", 10); // Asegura que dataset.indiceId no sea undefined
    const cartaSeleccionada = arrayCartas[indiceCarta];
    img.src = cartaSeleccionada.imagen;
    cardDiv.classList.add("flipped");
  });
});
