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
    graph[c1] = [];
  }
  if (!graph[c2]) {
    graph[c2] = [];
  }

  graph[c1].push(c2);
  graph[c2].push(c1);

  set.add(c1);
  set.add(c2);
}

// console.log(graph)

let computers = Array.from(set.values());

let triplets = new Set();

for (const computer of computers) {
  for (const c2 of graph[computer]) {
    for (const c3 of graph[computer]) {
      if (computer[0] === "t" || c2[0] === "t" || c3 === "t") {
        if (c2 !== c3 && graph[c2].includes(c3)) {
          let trip = [computer, c2, c3].sort();
          triplets.add(trip.join(","));
        }
      }
    }
  }
}

console.log(triplets);
console.log(triplets.size);
