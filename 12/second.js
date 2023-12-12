import { input } from "./input.js";

const cache = new Map();

function calculateCombos(conditions, damaged, start = 0, d = 0) {
  let maxStart = conditions.indexOf("#", start);
  let lowestPossible =
    conditions.length -
    (damaged.length - 1 - d) -
    damaged.reduce((acc, cur, i) => (i >= d ? acc + cur : acc), 0);

  if (maxStart < 0) {
    maxStart = lowestPossible;
  } else {
    maxStart = Math.min(maxStart, lowestPossible);
  }

  let key = conditions.substring(start) + damaged.slice(d).join(",");

  if (cache.has(key)) {
    return cache.get(key);
  }

  let sum = 0;

  main: for (let startI = start; startI <= maxStart; startI++) {
    if (conditions[startI + damaged[d]] === "#") {
      continue;
    }

    let indexOfDot = conditions.indexOf(".", startI);

    if (indexOfDot >= 0 && indexOfDot < startI + damaged[d]) {
      continue;
    }

    if (damaged.length - 1 === d) {
      if (conditions.lastIndexOf("#") > startI + damaged[d]) {
        continue;
      }
      sum++;
    } else {
      sum += calculateCombos(
        conditions,
        damaged,
        startI + damaged[d] + 1,
        d + 1,
      );
    }
  }

  cache.set(key, sum);

  return sum;
}

let rows = input.split("\n").map((line) => {
  let row = line.split(" ");
  return [
    new Array(5).fill(row[0]).join("?"),
    new Array(5).fill(row[1].split(",").map((n) => parseInt(n))).flat(),
  ];
});

let sum = 0;
for (let [conditions, damaged] of rows) {
  sum += calculateCombos(conditions, damaged);
}

console.log(sum);
