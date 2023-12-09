import { input } from "./input.js";

const histories = input
  .split("\n")
  .map((line) => line.split(" ").map((i) => parseInt(i)));

let sum = 0;

for (const history of histories) {
  let differies = [history];

  while (!differies[differies.length - 1].every((i) => i === 0)) {
    let curr = differies[differies.length - 1];
    let next = [];

    for (let i = 0; i < curr.length - 1; i++) {
      next.push(curr[i + 1] - curr[i]);
    }

    differies.push(next);
  }

  // idk why this works
  for (let i = 0; i < differies.length - 1; i += 2) {
    sum += differies[i][0];
  }
  for (let i = 1; i < differies.length - 1; i += 2) {
    sum -= differies[i][0];
  }
}

console.log(sum);
