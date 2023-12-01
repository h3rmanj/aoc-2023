import { input } from "./input.js";

let numberMap = [
  "discard",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function getFirstNumber(line) {
  let index = line.length + 1;
  let number;

  for (let i = 1; i < 10; i++) {
    let lowestDigitIndex = line.indexOf(i);
    if (lowestDigitIndex > -1 && lowestDigitIndex < index) {
      index = lowestDigitIndex;
      number = i;
    }

    let lowestTextIndex = line.indexOf(numberMap[i]);
    if (lowestTextIndex > -1 && lowestTextIndex < index) {
      index = lowestTextIndex;
      number = i;
    }

    if (index === 0) {
      break;
    }
  }

  return number;
}

function getLastNumber(line) {
  let index = -1;
  let number;

  for (let i = 1; i < 10; i++) {
    let lowestDigitIndex = line.lastIndexOf(i);
    if (lowestDigitIndex > -1 && lowestDigitIndex > index) {
      index = lowestDigitIndex;
      number = i;
    }

    let lowestTextIndex = line.lastIndexOf(numberMap[i]);
    if (lowestTextIndex > -1 && lowestTextIndex > index) {
      index = lowestTextIndex;
      number = i;
    }

    if (index === line.length - 1) {
      break;
    }
  }

  return number;
}

let all = [];

for (let i of input.split("\n")) {
  if (!i) {
    continue;
  }
  let first = getFirstNumber(i);
  let last = getLastNumber(i);
  all.push(parseInt(`${first}${last}`));
}

console.log(all.reduce((acc, cur) => acc + cur));
