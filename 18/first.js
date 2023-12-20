import { input } from "./input.js";

let actions = input
  .split("\n")
  .map((a) => a.split(" ").slice(0, -1))
  .map(([direction, distance]) => [direction, parseInt(distance)]);

let dimensions = {
  U: 0,
  R: 0,
  L: 0,
  D: 0,
};

for (let [direction, distance] of actions) {
  dimensions[direction] += distance;
}

let grid = new Array(dimensions.R * 2 + 1)
  .fill(null)
  .map(() => new Array(dimensions.U * 2 + 1).fill("."));

let x = dimensions.R;
let y = dimensions.U;

for (let [direction, distance] of actions) {
  switch (grid[x][y] + direction) {
    case "DR":
    case "LU":
      grid[x][y] = "L";
      break;
    case "UR":
    case "LD":
      grid[x][y] = "F";
      break;
    case "DL":
    case "RU":
      grid[x][y] = "J";
      break;
    case "UL":
    case "RD":
      grid[x][y] = "7";
      break;
  }

  if (direction === "U") {
    let destination = y - distance;
    while (y > destination) {
      y--;
      grid[x][y] = "U";
    }
  }

  if (direction === "D") {
    let destination = y + distance;
    while (y < destination) {
      y++;
      grid[x][y] = "D";
    }
  }

  if (direction === "R") {
    let destination = x + distance;
    while (x < destination) {
      x++;
      grid[x][y] = "R";
    }
  }

  if (direction === "L") {
    let destination = x - distance;
    while (x > destination) {
      x--;
      grid[x][y] = "L";
    }
  }
}

grid[x][y] = "7";

let sum = 0;

for (let line of grid) {
  let isInside = false;
  for (let tile of line) {
    if ("FLRL".includes(tile)) {
      isInside = !isInside;
    }

    if ("F7LJRLUD".includes(tile) || isInside) {
      sum++;
    }
  }
}

console.log(sum);
