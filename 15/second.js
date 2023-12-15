import { input } from "./input.js";

let boxes = new Array(256).fill(null).map(() => []);

for (let step of input.split(",")) {
  let hash = 0;

  let stepSplit = step.split(/(-|=)/);

  for (let char of stepSplit[0]) {
    hash += char.charCodeAt();
    hash *= 17;
    hash %= 256;
  }

  if (stepSplit[1] === "-") {
    boxes[hash] = boxes[hash].filter((lens) => lens.label !== stepSplit[0]);
  }

  if (stepSplit[1] === "=") {
    let index = boxes[hash].findIndex((lens) => lens.label === stepSplit[0]);

    if (index >= 0) {
      boxes[hash][index].focalLength = stepSplit[2];
    } else {
      boxes[hash].push({ label: stepSplit[0], focalLength: stepSplit[2] });
    }
  }
}

let sum = 0;

boxes.forEach((slots, box) => {
  slots.forEach((lens, slot) => {
    sum += (1 + box) * (1 + slot) * lens.focalLength;
  });
});

console.log(sum);
