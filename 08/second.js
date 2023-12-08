import { input } from "./input.js";

const parts = input.split("\n\n");

const paths = parts[0].split("");

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

let startNodes = [...nodes.keys()].filter((node) => node.endsWith("A"));

// this seems to be a repeating pattern
let timesToZ = startNodes.map((currentNode) => {
  let i = 0;
  while (!currentNode.endsWith("Z")) {
    let node = nodes.get(currentNode);
    let path = paths[i % paths.length];

    currentNode = node[path];

    i++;
  }

  return i;
});

let max = Math.max(...timesToZ);
let lcm = max;

while (!timesToZ.every((n) => lcm % n === 0)) {
  lcm += max;
}

console.log(lcm);
