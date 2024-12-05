const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

let [rules, pages] = input.split("\n\n");

pages = pages.split("\n");

if (pages[pages.length - 1] === "") {
  pages.pop();
}

rules = rules.split("\n").map((el) => el.split("|"));

let sum = 0;

pageLoop: for (let line of pages) {
  const map = new Map();

  line = line.split(",");

  for (let i = 0; i < line.length; i++) {
    map.set(line[i], i);
  }

  ruleLoop: for (const rule of rules) {
    if (!map.has(rule[0]) || !map.has(rule[1])) {
      continue ruleLoop;
    }

    if (map.get(rule[0]) > map.get(rule[1])) {
      continue pageLoop;
    }
  }

  const mid = Math.floor(line.length / 2);
  sum += parseInt(line[mid]);
}

console.log(sum);
