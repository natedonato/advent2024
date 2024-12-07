const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8").split("\n");

const l = [];
const r = [];

for (const line of input) {
  const [l1, r1] = line.split("   ");
  l.push(parseInt(l1));
  r.push(parseInt(r1));
}

const count = {};

for (const item of r) {
  count[item] = (count[item] ?? 0) + 1;
}

let score = 0;

for (const item of l) {
  score += item * (count[item] ?? 0);
}

console.log(score);
