import { input } from "./input.js";

let lines = input.split("\n");

let times = lines[0]
  .split(":")[1]
  .split(" ")
  .filter((x) => x);

let distances = lines[1]
  .split(":")[1]
  .split(" ")
  .filter((x) => x);

function getDistance(buttonPress, totalTime) {
  let timeLeft = totalTime - buttonPress;

  return timeLeft * buttonPress;
}

let totalNumberOfWaysToWin = 1;

for (var raceIndex = 0; raceIndex < times.length; raceIndex++) {
  let numberOfWaysToWin = 0;

  const totalTime = times[raceIndex];
  const middle = Math.floor(times[raceIndex] / 2);
  const winningDistance = distances[raceIndex];

  for (var i = middle; winningDistance < getDistance(i, totalTime); i++) {
    if (getDistance(i, totalTime) > winningDistance) {
      numberOfWaysToWin++;
    }
  }

  for (var i = middle - 1; winningDistance < getDistance(i, totalTime); i--) {
    if (getDistance(i, totalTime) > winningDistance) {
      numberOfWaysToWin++;
    }
  }

  totalNumberOfWaysToWin *= numberOfWaysToWin;
}

console.log(totalNumberOfWaysToWin);
