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
    // .map((el) => parseInt(el));
    .map((el) => parseInt(el) + 10000000000000);

  let m = a[1] / a[0];
  let n = b[1] / b[0];
  let tx = target[0];
  let ty = target[1];

  // console.log(m, n, tx, ty)

  let aX = (ty - n * tx) / (m - n);

  aX = Math.round(aX);

  if (aX % a[0] !== 0) {
    // console.log("invalid")
    continue;
  }

  aPushes = aX / a[0];

  let aY = aPushes * a[1];

  if (aPushes < 0) {
    // console.log("invalid");
    continue;
  }

  // console.log("A pushes", aPushes);
  // console.log("Intersection point", aX, aY);

  let rX = tx - aX;
  let rY = ty - aY;

  // console.log("Remainder", rX, rY);

  if (rX % b[0] !== 0 || rY % b[1] !== 0 || rX / b[0] !== rY / b[1]) {
    // console.log("invalid");
    continue;
  }

  let bPushes = rX / b[0];

  // console.log("bPushes", bPushes);
  if (bPushes < 0) {
    // console.log("invalid");
  }

  let score = 3 * aPushes + bPushes;
  sum += score;
  // console.log("score", score);
}

console.log("sum", sum);
