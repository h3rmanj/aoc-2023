import { input } from "./input.js";

const lines = input.split("\n");

const galaxies = [];

const yValues = new Array(lines.length).fill(1_000_000);
const xValues = new Array(lines[0].length).fill(1_000_000);

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    if (lines[y][x] === "#") {
      galaxies.push([x, y]);
      yValues[y] = 1;
      xValues[x] = 1;
    }
  }
}

let sum = 0;

for (let i = 0; i < galaxies.length; i++) {
  let [x, y] = galaxies[i];

  for (let j = i + 1; j < galaxies.length; j++) {
    let [x2, y2] = galaxies[j];

    for (let k = Math.min(x, x2) + 1; k <= Math.max(x, x2); k++) {
      sum += xValues[k];
    }

    for (let k = Math.min(y, y2) + 1; k <= Math.max(y, y2); k++) {
      sum += yValues[k];
    }
  }
}

console.log(sum);
