let prompt = require("prompt-sync")();

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

let robots = [];
let i = 0;

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

  robots.push([position, velocity]);
}

function step() {
  for (const [position, velocity] of robots) {
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

    if (grid[position[1]][position[0]] === ".") {
      grid[position[1]][position[0]] = 1;
    } else {
      grid[position[1]][position[0]] += 1;
    }
  }

  // if (grid[0].slice(0, 8).join("") === "........") {

  // }
}

let x1 = 201;
let y1 = 224;

while (true) {
  step();
  // print();

  if ((x1 === y1) === i + 1) {
    print();
    break;
  }

  if (i + 1 === x1) {
    print();
    x1 += 103;
  }
  if (i + 1 === y1) {
    print();
    y1 += 101;
  }

  // var n = prompt("More? ");
  grid = grid.map((el) => el.map((el) => "."));

  i += 1;
}

function print() {
  console.log(grid.map((el) => el.join("")).join("\n"));
  console.log(i + 1);
  var n = prompt("More? ");
}
