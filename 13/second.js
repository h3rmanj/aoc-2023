import { input } from "./input.js";

function verify(lines, start, end) {
  if ((end - start) % 2 === 0) {
    return false;
  }

  let smudges = 0;

  for (let i = 0; start + i < end - i; i++) {
    for (let y = 0; y < lines[0].length; y++) {
      if (lines[start + i][y] !== lines[end - i][y]) {
        smudges++;
        if (smudges > 1) {
          return false;
        }
      }
    }
  }

  if (smudges !== 1) {
    return false;
  }

  return true;
}

function findLines(lines) {
  for (let i = 1; i < lines.length; i++) {
    let smudges = 0;

    for (let y = 0; y < lines[0].length; y++) {
      if (lines[0][y] !== lines[i][y]) {
        smudges++;
        if (smudges > 1) {
          break;
        }
      }
    }

    if (smudges < 2 && verify(lines, 0, i)) {
      return Math.ceil(i / 2);
    }
  }

  for (let i = lines.length - 2; i > 0; i--) {
    let smudges = 0;

    for (let y = 0; y < lines[0].length; y++) {
      if (lines[lines.length - 1][y] !== lines[i][y]) {
        smudges++;
        if (smudges > 1) {
          break;
        }
      }
    }

    if (smudges < 2 && verify(lines, i, lines.length - 1)) {
      return Math.ceil((lines.length - 1 - i) / 2 + i);
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
