const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

// input = `2333133121414131402`;

input = input.split("");

console.log(input.length);

const memory = [];
let id = 0;

for (let i = 0; i < input.length; i++) {
  let val = ".";

  if (i % 2 === 0) {
    val = id;
    id += 1;
  }

  for (let j = 0; j < input[i]; j++) {
    memory.push(val);
  }
}

let l = 0;
let r = memory.length - 1;

while (l < r) {
  while (memory[l] !== ".") {
    l += 1;
    continue;
  }

  while (memory[r] === ".") {
    r -= 1;
    continue;
  }

  if (l >= r) {
    break;
  }
  memory[l] = memory[r];
  memory[r] = ".";
}

console.log(memory.join(""));

let sum = 0;

// checksum
for (let i = 0; i < memory.length; i++) {
  if (memory[i] === ".") {
    continue;
  }

  sum += i * memory[i];
}

console.log(sum);
