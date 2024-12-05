const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

let [rules, pages] = input.split("\n\n");

pages = pages.split("\n");

if (pages[pages.length - 1] === "") {
  pages.pop();
}

rules = rules.split("\n").map((el) => el.split("|"));

let incorrectPages = [];

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
      incorrectPages.push(line);
      continue pageLoop;
    }
  }
}

// console.log(incorrectPages);
let sum = 0;

for (let line of incorrectPages) {
  const map = new Map();

  for (let i = 0; i < line.length; i++) {
    map.set(line[i], i);
  }

  let swapped = true;
  while (swapped) {
    swapped = false;

    ruleLoop: for (const rule of rules) {
      if (!map.has(rule[0]) || !map.has(rule[1])) {
        continue ruleLoop;
      }

      if (map.get(rule[0]) > map.get(rule[1])) {
        swapped = true;
        let t = map.get(rule[0]);
        map.set(rule[0], map.get(rule[1]));
        map.set(rule[1], t);
      }
    }
  }

  const mid = Math.floor(line.length / 2);

  for (const [key, val] of map.entries()) {
    if (val === mid) {
      sum += parseInt(key);
    }
  }
}

console.log(sum);
