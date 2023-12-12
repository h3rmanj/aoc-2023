import { input } from "./input.js";

function calculateCombos(conditions, damaged) {
  let maxStart = conditions.indexOf("#");
  let lowestPossible =
    conditions.length -
    (damaged.length - 1) -
    damaged.reduce((acc, cur) => acc + cur);

  if (maxStart < 0) {
    maxStart = lowestPossible;
  } else {
    maxStart = Math.min(maxStart, lowestPossible);
  }

  let sum = 0;

  main: for (let startI = 0; startI <= maxStart; startI++) {
    if (conditions[startI + damaged[0]] === "#") {
      continue;
    }
    if (
      damaged.length === 1 &&
      conditions.substring(startI + damaged[0]).includes("#")
    ) {
      continue;
    }
    if (conditions.substring(startI, startI + damaged[0]).includes(".")) {
      continue;
    }

    if (damaged.length === 1) {
      sum++;
    } else {
      sum += calculateCombos(
        conditions.substring(startI + damaged[0] + 1),
        damaged.slice(1),
      );
    }
  }

  return sum;
}

let rows = input.split("\n").map((line) => {
  let row = line.split(" ");
  return [row[0], row[1].split(",").map((n) => parseInt(n))];
});

let sum = 0;

for (let [conditions, damaged] of rows) {
  sum += calculateCombos(conditions, damaged);
}

console.log(sum);
