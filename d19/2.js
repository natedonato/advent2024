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

// input bounds
let min = towels[0].length;
let max = towels[towels.length - 1].length;

towels = new Set(towels);

let patterns = input.slice(2);

const memo = {};

function solve(pattern) {
  let solutions = 0;

  if (memo[pattern] !== undefined) {
    return memo[pattern];
  }

  if (pattern.length === 0) {
    return 1;
  }

  for (let i = min; i <= max; i++) {
    if (i > pattern.length) {
      break;
    }

    const slice = pattern.slice(0, i);
    if (towels.has(slice)) {
      let subsolutions = solve(pattern.slice(i));
      solutions += subsolutions;
    }
  }

  memo[pattern] = solutions;
  return solutions;
}

let count = 0;

for (const p of patterns) {
  const solutions = solve(p);
  console.log("\nPattern", p);
  console.log("Solution count:", solutions);

  count += solutions;
}

console.log("\ntotal solution count", count);
