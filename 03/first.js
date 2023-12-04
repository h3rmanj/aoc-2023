import { input } from "./input.js";

let symbols = new Set(
  input
    .replaceAll("\n", "")
    .replaceAll(".", "")
    .replaceAll(/(\d+)/g, "")
    .split(""),
);

let lines = input.split("\n");

let engineParts = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  number: for (let match of line.matchAll(/(\d+)/g)) {
    let startIndex = Math.max(0, match.index - 1);
    let endIndex = Math.min(line.length, match.index + match[0].length);

    let string = line.substring(startIndex, endIndex + 1);

    if (i > 0) {
      string += lines[i - 1].substring(startIndex, endIndex + 1);
    }
    if (i < lines.length - 1) {
      string += lines[i + 1].substring(startIndex, endIndex + 1);
    }

    for (let symbol of symbols) {
      if (string.includes(symbol)) {
        engineParts.push(parseInt(match[0]));
        continue number;
      }
    }
  }
}

const enginePartSum = engineParts.reduce((acc, cur) => acc + cur);

console.log(enginePartSum);
