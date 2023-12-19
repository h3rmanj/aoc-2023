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

function getPossibleCombinations(workflowKey, ranges) {
  for (let range of Object.values(ranges)) {
    if (range[1] < range[0]) {
      return 0;
    }
  }

  if (workflowKey === "R") {
    return 0;
  } else if (workflowKey === "A") {
    return Object.values(ranges).reduce(
      (acc, cur) => acc * (cur[1] - cur[0] + 1),
      1,
    );
  }

  let workflow = workflows.get(workflowKey);

  let count = 0;

  for (let rule of workflow.rules) {
    if (rule.operator === ">") {
      count += getPossibleCombinations(rule.action, {
        x: [...ranges.x],
        m: [...ranges.m],
        a: [...ranges.a],
        s: [...ranges.s],
        [rule.property]: [rule.number + 1, ranges[rule.property][1]],
      });
      ranges[rule.property][1] = rule.number;
    } else {
      count += getPossibleCombinations(rule.action, {
        x: [...ranges.x],
        m: [...ranges.m],
        a: [...ranges.a],
        s: [...ranges.s],
        [rule.property]: [ranges[rule.property][0], rule.number - 1],
      });
      ranges[rule.property][0] = rule.number;
    }
  }

  count += getPossibleCombinations(workflow.next, ranges);

  return count;
}

console.log(
  getPossibleCombinations("in", {
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000],
  }),
);
