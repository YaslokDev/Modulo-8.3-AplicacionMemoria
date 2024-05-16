const card = document.getElementById("card") as HTMLDivElement;
const img = card.querySelector("img") as HTMLImageElement;

card.addEventListener("click", () => {
  img.src = img.dataset.backImage || ""; // Esto asegura que dataset.backImage no sea undefined
  card.classList.add("flipped");
});
