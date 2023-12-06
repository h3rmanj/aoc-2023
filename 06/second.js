import { input } from "./input.js";

let lines = input.split("\n");

let totalTime = parseInt(
  lines[0]
    .split(":")[1]
    .split(" ")
    .filter((x) => x)
    .join(""),
);

let winningDistance = parseInt(
  lines[1]
    .split(":")[1]
    .split(" ")
    .filter((x) => x)
    .join(""),
);

function getDistance(buttonPress, totalTime) {
  let timeLeft = totalTime - buttonPress;

  return timeLeft * buttonPress;
}

let numberOfWaysToWin = 0;

const middle = Math.floor(totalTime / 2);

for (var i = middle; winningDistance < getDistance(i, totalTime); i++) {
  numberOfWaysToWin++;
}

for (var i = middle - 1; winningDistance < getDistance(i, totalTime); i--) {
  numberOfWaysToWin++;
}

console.log(numberOfWaysToWin);
