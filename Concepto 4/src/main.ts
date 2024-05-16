let firstCard: HTMLDivElement | null = null;

const cards = document.querySelectorAll(".card") as NodeListOf<HTMLDivElement>;

cards.forEach((card) => {
  const img = card.querySelector("img") as HTMLImageElement;

  card.addEventListener("click", () => {
    if (card === firstCard || card.classList.contains("flipped")) {
      return; // Ignorar clics en la misma carta o carta ya volteada
    }

    img.src = img.dataset.backImage || "https://via.placeholder.com/150";
    card.classList.add("flipped");

    if (firstCard === null) {
      // Primera carta volteada
      firstCard = card;
    } else {
      // Segunda carta volteada
      const firstImg = firstCard.querySelector("img") as HTMLImageElement;

      if (firstImg.dataset.backImage === img.dataset.backImage) {
        // Las cartas coinciden
        firstCard = null; // Restablecer la primera carta
      } else {
        // Las cartas no coinciden, voltearlas después de 1 segundo
        setTimeout(() => {
          if (firstCard) {
            // Verificar si firstCard no es null
            firstCard.classList.remove("flipped");
            const firstImg = firstCard.querySelector("img") as HTMLImageElement;
            firstImg.src = "../img/dorso.jpg";
          }
          card.classList.remove("flipped");
          img.src = "../img/dorso.jpg";
          firstCard = null;
        }, 1000);
      }
    }
  });
});
