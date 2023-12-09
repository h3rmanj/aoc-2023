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

  for (let differy of differies) {
    sum += differy[differy.length - 1];
  }
}

console.log(sum);
