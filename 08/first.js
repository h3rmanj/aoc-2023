import { input } from "./input.js";

const parts = input.split("\n\n");

const paths = parts[0].split("");

let endNode = "ZZZ";
let firstNode = "AAA";

const nodes = parts[1].split("\n").reduce((acc, cur) => {
  const split = cur.split(" = (");
  const leftRight = split[1].replace(")", "").split(", ");

  const node = split[0];
  const left = leftRight[0];
  const right = leftRight[1];

  if (node === left && left === right) {
    endNode = node;
  }

  acc.set(node, {
    L: left,
    R: right,
  });

  return acc;
}, new Map());

let i = 0;
let currentNode = firstNode;

while (currentNode !== endNode) {
  let node = nodes.get(currentNode);
  let path = paths[i % paths.length];

  currentNode = node[path];

  i++;
}

console.log(i);
