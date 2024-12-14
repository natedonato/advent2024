const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

let h = 103;
let w = 101;

// h = 7;
// w = 11;

// input = `p=0,4 v=3,-3
// p=6,3 v=-1,-3
// p=10,3 v=-1,2
// p=2,0 v=2,-1
// p=0,0 v=1,3
// p=3,0 v=-2,-2
// p=7,6 v=-1,-3
// p=3,0 v=-1,-2
// p=9,3 v=2,3
// p=7,3 v=-1,2
// p=2,4 v=2,-3
// p=9,5 v=-3,-3`;

// input = 'p=2,4 v=2,-3'

input = input.split("\n");

if (input[input.length - 1] === "") {
  input.pop();
}

let positions = [];

let grid = new Array(h).fill(0).map((el) => new Array(w).fill("."));

for (const line of input) {
  let position = line
    .split(" ")[0]
    .slice(2)
    .split(",")
    .map((el) => parseInt(el));
  let velocity = line
    .split("v=")[1]
    .split(",")
    .map((el) => parseInt(el));

  console.log("p", position);
  console.log("v", velocity);

  function step() {
    position[0] += velocity[0];
    position[1] += velocity[1];

    while (position[0] < 0) {
      position[0] += w;
    }

    while (position[1] < 0) {
      position[1] += h;
    }

    position[0] %= w;
    position[1] %= h;
  }

  for (let i = 0; i < 100; i++) {
    step();
    // console.log(position);
  }

  if (grid[position[1]][position[0]] === ".") {
    grid[position[1]][position[0]] = 1;
  } else {
    grid[position[1]][position[0]] += 1;
  }
}

console.log(grid.map((el) => el.join("")));

// quadrants

let scores = [];

for (const [x, y] of [
  [0, 0],
  [0, Math.ceil(h / 2)],
  [Math.ceil(w / 2), 0],
  [Math.ceil(w / 2), Math.ceil(h / 2)],
]) {
  // console.log("X,Y")
  // console.log(x,y)

  let score = 0;
  for (let i = 0; i < Math.floor(h / 2); i++) {
    for (let j = 0; j < Math.floor(w / 2); j++) {
      // console.log(i + y);
      // console.log(j + x);
      if (grid[i + y][j + x] !== ".") {
        score += grid[i + y][j + x];
      }
      grid[i + y][j + x] = "X";
    }
  }
  console.log(score);
  scores.push(score);

  console.log(grid.map((el) => el.join("")));
}

console.log(scores.reduce((a, b) => a * b));
