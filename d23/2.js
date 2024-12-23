const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

// input = `kh-tc
// qp-kh
// de-cg
// ka-co
// yn-aq
// qp-ub
// cg-tb
// vc-aq
// tb-ka
// wh-tc
// yn-cg
// kh-ub
// ta-co
// de-co
// tc-td
// tb-wq
// wh-td
// ta-ka
// td-qp
// aq-cg
// wq-ub
// ub-vc
// de-ta
// wq-aq
// wq-vc
// wh-yn
// ka-de
// kh-ta
// co-tc
// wh-qp
// tb-vc
// td-yn`;

input = input.split("\n");

if (input[input.length - 1] === "") {
  input.pop();
}

const graph = {};

const set = new Set();

for (const line of input) {
  let [c1, c2] = line.split("-");

  if (!graph[c1]) {
    graph[c1] = {
      children: [c1],
    };
  }
  if (!graph[c2]) {
    graph[c2] = {
      children: [c2],
    };
  }

  graph[c1].children.push(c2);
  graph[c2].children.push(c1);
  graph[c1][c2] = true;
  graph[c1][c1] = true;
  graph[c2][c1] = true;
  graph[c2][c2] = true;

  set.add(c1);
  set.add(c2);
}

let computers = Array.from(set.values());

// console.log(graph)

let biggestNetwork = [];

for (const computer of computers) {
  // try every combination of children?
  let subsets = getSubsets(graph[computer].children);

  for (const subset of subsets) {
    if (subset.length <= biggestNetwork.length) {
      continue;
    }

    // test if all subset contains each other
    if (validSubset(subset)) {
      biggestNetwork = subset;
    }
  }
}

console.log(biggestNetwork.sort().join(","));

function validSubset(subset) {
  for (const c of subset) {
    for (const c2 of subset) {
      if (graph[c][c2] !== true) {
        return false;
      }
    }
  }

  return true;
}

function getSubsets(arr) {
  return arr.reduce(
    (prev, curr) => prev.concat(prev.map((k) => k.concat(curr))),
    [[]]
  );
}
