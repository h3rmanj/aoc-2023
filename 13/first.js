import { input } from "./input.js";

function verify(lines, start, end) {
  if ((end - start) % 2 === 0) {
    return false;
  }
  for (let i = 0; start + i < end - i; i++) {
    if (lines[start + i] !== lines[end - i]) {
      return false;
    }
  }
  return true;
}

function findLines(lines) {
  for (
    let match = lines.indexOf(lines[0], 1);
    match > 0;
    match = lines.indexOf(lines[0], match + 1)
  ) {
    if (verify(lines, 0, match)) {
      return Math.ceil(match / 2);
    }
  }

  for (
    let match = lines.lastIndexOf(lines[lines.length - 1], lines.length - 2);
    match > 0;
    match = lines.lastIndexOf(lines[lines.length - 1], match - 1)
  ) {
    if (verify(lines, match, lines.length - 1)) {
      return Math.ceil((lines.length - 1 - match) / 2 + match);
    }
  }

  return -1;
}

let puzzles = input.split("\n\n");

let sum = 0;

for (let puzzle of puzzles) {
  let lines = puzzle.split("\n");

  let horizontal = findLines(lines);

  if (horizontal > 0) {
    sum += horizontal * 100;
    continue;
  }

  let rotated = [];

  for (var i = 0; i < lines[0].length; i++) {
    rotated[i] = lines.map((line) => line[i]).join("");
  }

  let vertical = findLines(rotated);

  if (vertical > 0) {
    sum += vertical;
  } else {
    console.log("help");
  }
}

console.log(sum);
