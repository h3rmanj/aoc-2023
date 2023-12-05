import { input } from "./input.js";

const sections = input.split("\n\n");

const seeds = sections[0]
  .split(": ")[1]
  .split(" ")
  .map((seed) => parseInt(seed));

const walkthrough = sections.slice(1).map((section) =>
  section
    .split(":\n")[1]
    .split("\n")
    .map((range) => range.split(" ").map((num) => parseInt(num))),
);

let lowestLocation = Number.MAX_VALUE;

for (let seed of seeds) {
  let currentSource = seed;

  maps: for (let map of walkthrough) {
    for (let [destination, source, range] of map) {
      if (currentSource >= source && currentSource < source + range) {
        currentSource = currentSource + (destination - source);
        continue maps;
      }
    }
  }

  if (currentSource < lowestLocation) {
    lowestLocation = currentSource;
  }
}

console.log(lowestLocation);
