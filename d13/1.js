const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

// input = `Button A: X+94, Y+34
// Button B: X+22, Y+67
// Prize: X=8400, Y=5400

// Button A: X+26, Y+66
// Button B: X+67, Y+21
// Prize: X=12748, Y=12176

// Button A: X+17, Y+86
// Button B: X+84, Y+37
// Prize: X=7870, Y=6450

// Button A: X+69, Y+23
// Button B: X+27, Y+71
// Prize: X=18641, Y=10279`;

input = input.split("\n\n").map((el) => el.split("\n"));

if (input[input.length - 1] === "") {
  input.pop();
}

let sum = 0;

for (const set of input) {
  let a = set[0]
    .split(": X+")[1]
    .split(", Y+")
    .map((el) => parseInt(el));
  let b = set[1]
    .split(": X+")[1]
    .split(", Y+")
    .map((el) => parseInt(el));
  let target = set[2]
    .split(": X=")[1]
    .split(", Y=")
    .map((el) => parseInt(el));

  let best;

  for (let aPushes = 0; aPushes <= 100; aPushes++) {
    let x = 0;
    let y = 0;

    x += aPushes * a[0];
    y += aPushes * a[1];

    if (x > target[0] || y > target[1]) {
      break;
    }

    let remainderX = target[0] - x;
    let remainderY = target[1] - y;

    let bPushes = remainderX / b[0];

    if (
      remainderX - bPushes * b[0] !== 0 ||
      remainderY - bPushes * b[1] !== 0
    ) {
      continue;
    }

    score = 3 * aPushes + bPushes;
    if (best === undefined || best > score) {
      best = score;
    }
  }

  if (best) {
    sum += best;
  }
}

console.log(sum);
