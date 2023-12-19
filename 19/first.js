import { input } from "./input.js";

let split = input.split("\n\n");

let workflows = new Map();

for (let match of split[0].matchAll(
  /(?<key>\w+)\{(?<rules>.+),(?<next>\w+)\}/g,
)) {
  let workflow = {
    rules: [
      ...match.groups.rules.matchAll(
        /(?<property>x|m|a|s)(?<operator><|>)(?<number>\d+):(?<action>\w+),?/g,
      ),
    ].map((rules) => ({
      ...rules.groups,
      number: parseInt(rules.groups.number),
    })),
    next: match.groups.next,
  };
  workflows.set(match.groups.key, workflow);
}

let sum = 0;

for (let partLine of split[1].split("\n")) {
  let part = {};

  for (let match of partLine.matchAll(/(?<property>\w+)=(?<value>\d+)/g)) {
    part[match.groups.property] = parseInt(match.groups.value);
  }

  let current = "in";

  processing: while (current !== "R" && current !== "A") {
    let workflow = workflows.get(current);

    for (let rule of workflow.rules) {
      if (rule.operator === ">") {
        if (part[rule.property] > rule.number) {
          current = rule.action;
          continue processing;
        }
      } else {
        if (part[rule.property] < rule.number) {
          current = rule.action;
          continue processing;
        }
      }
    }

    current = workflow.next;
  }

  if (current === "A") {
    Object.values(part).forEach((v) => {
      sum += v;
    });
  }
}

console.log(sum);
