import { input } from "./input.js";

let all = [];

for (let i of input.split("\n")) {
  if (!i) {
    continue;
  }
  let first = null;
  let last = null;
  for (let y of i.split("")) {
    let number = parseInt(y);
    if (!isNaN(number)) {
      if (first === null) {
        first = number;
      }
      last = number;
    }
  }
  all.push(parseInt(`${first}${last}`));
}

console.log(all.reduce((acc, cur) => acc + cur));
