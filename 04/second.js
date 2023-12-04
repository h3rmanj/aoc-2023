import { input } from "./input.js";

let cards = input.split("\n");

let totalCopiesOfEachCard = Array(cards.length).fill(1);

for (let i = 0; i < totalCopiesOfEachCard.length; i++) {
  const scratched = cards[i].split(": ")[1].split(" | ");
  const winningNumbers = scratched[0].split(" ").filter((n) => n);
  const numbers = scratched[1].split(" ").filter((n) => n);
  let won = 0;

  for (let number of numbers) {
    if (winningNumbers.includes(number)) {
      won += 1;
    }
  }

  for (let y = i + 1; y <= i + won; y++) {
    totalCopiesOfEachCard[y] += totalCopiesOfEachCard[i];
  }
}

let totalCardsWon = totalCopiesOfEachCard.reduce((acc, cur) => acc + cur);

console.log(totalCardsWon);
