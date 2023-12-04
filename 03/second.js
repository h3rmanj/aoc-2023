import { input } from "./input.js";

let lines = input.split("\n");

let gearRatios = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  for (let match of line.matchAll(/[*]/g)) {
    let startIndex = match.index + 3 - 3;
    let endIndex = match.index + 3 + 4;

    let gears = [];

    for (
      let y = Math.max(0, i - 1);
      y <= Math.min(lines.length - 1, i + 1);
      y++
    ) {
      let string = ("..." + lines[y] + "...").substring(
        startIndex,
        endIndex + 1,
      );

      for (let numberMatch of string.matchAll(/(\d+)/g)) {
        let lastIndex = numberMatch.index + numberMatch[0].length - 1;
        if (
          (numberMatch.index >= 2 && numberMatch.index <= 4) ||
          (lastIndex >= 2 && lastIndex <= 4)
        ) {
          gears.push(parseInt(numberMatch[0]));
        }
      }
    }

    if (gears.length === 2) {
      gearRatios.push(gears[0] * gears[1]);
    }
  }
}

const gearRatiosSum = gearRatios.reduce((acc, cur) => acc + cur);

console.log(gearRatiosSum);
