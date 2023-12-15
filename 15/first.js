import { input } from "./input.js";

let sum = 0;

for (let step of input.split(",")) {
  let hash = 0;

  for (let char of step) {
    hash += char.charCodeAt();
    hash *= 17;
    hash %= 256;
  }

  sum += hash;
}

console.log(sum);
