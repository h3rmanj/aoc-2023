import { input } from "./input";

function getNextDirection(direction, pipe) {
  if (pipe === "S") {
    return direction;
  }

  switch (direction + pipe) {
    case "N|":
      return "N";
    case "N7":
      return "W";
    case "NF":
      return "E";
    case "E-":
      return "E";
    case "E7":
      return "S";
    case "EJ":
      return "N";
    case "W-":
      return "W";
    case "WF":
      return "S";
    case "WL":
      return "N";
    case "S|":
      return "S";
    case "SL":
      return "E";
    case "SJ":
      return "W";
    default:
      return null;
  }
}

const lines = input.split("\n");

let currentY = lines.findIndex((line) => line.includes("S"));
let currentX = lines[currentY].indexOf("S");
let currentDirection;

if (getNextDirection("N", lines[currentY - 1][currentX])) {
  currentDirection = "N";
} else if (getNextDirection("E", lines[currentY][currentX + 1])) {
  currentDirection = "E";
} else if (getNextDirection("W", lines[currentY][currentX - 1])) {
  currentDirection = "W";
} else if (getNextDirection("S", lines[currentY + 1][currentX])) {
  currentDirection = "S";
}

let loopParts = {
  [currentY]: {
    [currentX]: true,
  },
};

while (true) {
  switch (currentDirection) {
    case "N":
      currentY--;
      break;
    case "E":
      currentX++;
      break;
    case "W":
      currentX--;
      break;
    case "S": {
      currentY++;
      break;
    }
  }

  loopParts[currentY] ??= {};
  loopParts[currentY][currentX] = true;

  const pipe = lines[currentY][currentX];

  if (pipe === "S") {
    break;
  }

  currentDirection = getNextDirection(currentDirection, pipe);
}

let enclosedTiles = 0;
let shouldCount = false;

for (let y = 0; y < lines.length; y++) {
  let lastCurve;
  for (let x = 0; x < lines[y].length; x++) {
    if (loopParts[y]?.[x]) {
      let pipe = lines[y][x];
      if (
        (pipe === "J" && lastCurve === "F") ||
        (pipe === "7" && lastCurve === "L") ||
        pipe === "|" ||
        pipe === "S"
      ) {
        shouldCount = !shouldCount;
      } else if (pipe !== "-") {
        lastCurve = pipe;
      }
    } else if (shouldCount) {
      enclosedTiles++;
    }
  }
}

console.log(enclosedTiles);
