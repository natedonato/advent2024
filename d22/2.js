const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

// input = "123";

// input = `1
// 2
// 3
// 2024`;

input = input.split("\n");

if (input[input.length - 1] === "") {
  input.pop();
}

input = input.map((el) => parseInt(el));

let priceSequences = new Map();

let sum = 0;

for (let number of input) {
  let priceChanges = [];

  let price = number % 10;

  const seen = new Set();

  for (let i = 0; i < 2000; i++) {
    let first = number * 64;

    number = mix(number, first);
    number = prune(number);

    let second = Math.floor(number / 32);
    number = mix(number, second);
    number = prune(number);

    let third = number * 2048;
    number = mix(number, third);
    number = prune(number);

    priceChanges.push((number % 10) - price);
    price = number % 10;

    if (priceChanges.length >= 4) {
      if (priceChanges.length > 4) {
        priceChanges.shift();
      }

      const key = priceChanges.join(",");
      if (seen.has(key)) {
        continue;
      } else {
        priceSequences.set(key, (priceSequences.get(key) ?? 0) + price);
        seen.add(key);
      }
    }
  }
}

const valuesArray = Array.from(priceSequences.values());

console.log(Math.max(...valuesArray));

// To mix a value into the secret number, calculate the bitwise XOR of the given value and the secret number. Then, the secret number becomes the result of that operation. (If the secret number is 42 and you were to mix 15 into the secret number, the secret number would become 37.)
function mix(secretNumber, value) {
  let mixed = Number(BigInt(secretNumber) ^ BigInt(value));

  return mixed;
}

// To prune the secret number, calculate the value of the secret number modulo 16777216. Then, the secret number becomes the result of that operation. (If the secret number is 100000000 and you were to prune the secret number, the secret number would become 16113920.)
function prune(secretNumber) {
  return secretNumber % 16777216;
}
