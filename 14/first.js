import { input } from "./input.js";

let rows = input.split("\n");

let sum = 0;

for (let x = 0; x < rows[0].length; x++) {
  let rockPos = 0;
  for (let y = 0; y < rows.length; y++) {
    switch (rows[y][x]) {
      case "O":
        sum += rows.length - rockPos;
        rockPos++;
        break;
      case "#":
        rockPos = y + 1;
        break;
    }
  }
}

console.log(sum);
