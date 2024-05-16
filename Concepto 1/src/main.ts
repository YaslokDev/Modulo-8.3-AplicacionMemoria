function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const cartas = ["🦒", "🐯", "🐘", "🐴", "🦓", "🦝"];
const cartasBarajadas: string[] = shuffle(cartas);
console.log(cartasBarajadas);
