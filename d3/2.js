const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");
// input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

const NUMS = "1234567890";
const nums = [];

const DO = "do()";
const DONT = "don't()";
let enabled = true;

for (let i = 0; i < input.length; i++) {
  if (input.slice(i, i + DO.length) === DO) {
    enabled = true;
  }

  if (input.slice(i, i + DONT.length) === DONT) {
    enabled = false;
  }

  if (enabled && input.slice(i, i + 4) === "mul(") {
    let number = "";
    let j = i + 4;
    while (NUMS.includes(input[j]) && number.length < 3) {
      number += input[j];
      j++;
    }

    if (number.length < 1) {
      continue;
    }

    if (input[j] !== ",") {
      continue;
    }
    j++;
    let number2 = "";
    while (NUMS.includes(input[j]) && number2.length < 3) {
      number2 += input[j];
      j++;
    }

    if (input[j] !== ")") {
      continue;
    } else {
      nums.push([number, number2]);
    }
  }
}

let sum = 0;

for (const pair of nums) {
  sum += parseInt(pair[0]) * parseInt(pair[1]);
}

console.log(sum);
