const imagen = document.querySelector("img");
const divCarta = document.getElementById("divCarta");

const girarCarta = (divCarta: any) => {
  if (imagen !== null && imagen !== undefined && imagen instanceof HTMLImageElement) {
    imagen.src = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png";
    divCarta.style.backgroundColor = "#b799fe";
  }
};

if (divCarta !== null && divCarta !== undefined && divCarta instanceof HTMLDivElement)
  divCarta.addEventListener("click", () => girarCarta(divCarta));
