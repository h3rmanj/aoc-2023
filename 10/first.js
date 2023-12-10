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

let steps = 0;

while (true) {
  steps++;
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

  const pipe = lines[currentY][currentX];

  if (pipe === "S") {
    break;
  }

  currentDirection = getNextDirection(currentDirection, pipe);
}

console.log(Math.floor(steps / 2));
