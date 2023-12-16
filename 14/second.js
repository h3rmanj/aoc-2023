import { input } from "./input.js";

let rows = input.split("\n").map((l) => l.split(""));

let cache = new Map();

let results = [];
let keys = [];

let loopStart = -1;

for (let iteration = 0; iteration < 1_000_000_000; iteration++) {
  let key = rows.flat().join("");
  keys.push(key);

  if (cache.has(key)) {
    rows = cache.get(key);
    loopStart = keys.indexOf(key);
    break;
  }

  for (let rotation = 0; rotation < 4; rotation++) {
    let newRows = rows.map((r) => r.map((ar) => ar));

    for (let x = 0; x < newRows[0].length; x++) {
      let freeIndex = 0;
      for (let y = 0; y < newRows.length; y++) {
        switch (rows[y][x]) {
          case "#":
            freeIndex = y + 1;
            break;
          case "O":
            if (y !== freeIndex) {
              newRows[freeIndex][x] = "O";
              newRows[y][x] = ".";
            }
            freeIndex++;
            break;
        }
      }
    }

    // rotate

    let rotatedRows = [];

    for (let x = 0; x < newRows[0].length; x++) {
      rotatedRows.push(newRows.map((row) => row[x]).reverse());
    }

    rows = rotatedRows;
  }

  cache.set(key, rows);

  let sum = 0;
  for (let x = 0; x < rows[0].length; x++) {
    for (let y = 0; y < rows.length; y++) {
      if (rows[y][x] === "O") {
        sum += rows.length - y;
      }
    }
  }

  results.push(sum);
}

console.log(
  results[
    results.length -
      ((1_000_000_000 - loopStart + 1) % (results.length - loopStart))
  ],
);
