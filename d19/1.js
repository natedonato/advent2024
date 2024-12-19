const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

// input = `r, wr, b, g, bwu, rb, gb, br

// brwrr
// bggr
// gbbr
// rrbgbr
// ubwu
// bwurrg
// brgr
// bbrgwb`;

input = input.split("\n");

if (input[input.length - 1] === "") {
  input.pop();
}

let towels = input[0].split(", ").sort((a, b) => a.length - b.length);

// max input
let min = towels[0].length;
let max = towels[towels.length - 1].length;

towels = new Set(towels);
// console.log(towels);

let patterns = input.slice(2);

const memo = {};

function solve(pattern) {
  if (memo[pattern] !== undefined) {
    return memo[pattern];
  }

  if (pattern.length === 0) {
    return true;
  }

  for (let i = min; i <= max; i++) {
    if (i > pattern.length) {
      break;
    }

    const slice = pattern.slice(0, i);

    if (towels.has(slice)) {
      if (solve(pattern.slice(i))) {
        memo[pattern] = true;
        return true;
      }
    }
  }

  memo[pattern] = false;
  return false;
}

let count = 0;

for (const p of patterns) {
  // console.log("\nPattern", p);
  if (solve(p)) {
    count += 1;
  }
}

console.log(count);
