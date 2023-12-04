import { input } from "./input.js";

let pointsFromCards = [];

for (const card of input.split("\n")) {
  const scratched = card.split(": ")[1].split(" | ");
  const winningNumbers = scratched[0].split(" ").filter((n) => n);
  const numbers = scratched[1].split(" ").filter((n) => n);

  let points;

  for (let number of numbers) {
    if (winningNumbers.includes(number)) {
      if (points !== undefined) {
        points *= 2;
      } else {
        points = 1;
      }
    }
  }

  if (points) {
    pointsFromCards.push(points);
  }
}

const pointsFromCardsSum = pointsFromCards.reduce((acc, cur) => acc + cur);

console.log(pointsFromCardsSum);
