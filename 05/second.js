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

for (let i = 0; i < seeds.length; i += 2) {
  let ranges = [[seeds[i], seeds[i] + seeds[i + 1] - 1]];

  for (let map of walkthrough) {
    let newRanges = [];
    for (let [destination, source, mapRange] of map) {
      let leftOverRanges = [];
      for (let [rangeStart, rangeEnd] of ranges) {
        if (rangeStart < source + mapRange && rangeEnd >= source) {
          let diff = destination - source;
          let matchRangeStart = Math.max(rangeStart, source);
          let matchRangeEnd = Math.min(rangeEnd, source + mapRange - 1);
          newRanges.push([matchRangeStart + diff, matchRangeEnd + diff]);

          if (rangeStart < source) {
            leftOverRanges.push([rangeStart, source - 1]);
          }

          if (rangeEnd >= source + mapRange) {
            leftOverRanges.push([source + mapRange, rangeEnd]);
          }
        } else {
          leftOverRanges.push([rangeStart, rangeEnd]);
        }
      }
      ranges = leftOverRanges;
    }
    ranges = ranges.concat(newRanges);
  }

  for (var [rangeStart] of ranges) {
    if (rangeStart < lowestLocation) {
      lowestLocation = rangeStart;
    }
  }
}

console.log(lowestLocation);
