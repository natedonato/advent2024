const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

// input = `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`;

/// SETUP

input = input.split("\n").map((el) => el.split(""));

if (input[input.length - 1] === "") {
  input.pop();
}

// FIND STARTING POSITION
const outerStart = [];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    // console.log(i,j)
    if (input[i][j] === "^") {
      outerStart.push(i);
      outerStart.push(j);
    }
  }
}

console.log(outerStart);
console.log(input);

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const rocks = new Set();
const outerVisited = new Set();

function doTraverse(start, currentDir, extraRock) {
  let guy = [...start];
  const visited = new Set();

  while (inBounds(guy)) {
    let [x, y] = guy;
    // console.log(guy);
    const key = `${guy[0]},${guy[1]},${currentDir}`;
    if (visited.has(key)) {
      return "LOOPED";
    } else {
      visited.add(`${guy[0]},${guy[1]},${currentDir}`);
    }

    if (!extraRock) {
      outerVisited.add(`${guy[0]},${guy[1]}`);
    }

    let nextX = x + dirs[currentDir][0];
    let nextY = y + dirs[currentDir][1];

    if (
      inBounds([nextX, nextY]) &&
      (input[nextX][nextY] === "#" ||
        (extraRock && nextX === extraRock[0] && nextY === extraRock[1]))
    ) {
      currentDir += 1;
      currentDir %= 4;
    } else {
      // if (!extraRock) {
      //   console.log(guy);
      //   console.log(nextX, nextY);
      // }

      // if candidate for a rock, start a test
      if (!extraRock && !outerVisited.has(`${nextX},${nextY}`)) {
        console.log("Start inner loop");
        let newStart = [...guy];
        let dir = currentDir;
        let nX = nextX;
        let nY = nextY;
        let extraRock = [nX, nY];

        if (doTraverse(newStart, dir, extraRock) === "LOOPED") {
          // console.log("inner loop");
          rocks.add(`${nextX},${nextY}`);
        } else {
          // console.log("inner exit");
        }
      }

      guy[0] = nextX;
      guy[1] = nextY;

      // test
      if (!extraRock && inBounds([nextX, nextY])) {
        input[nextX][nextY] = "X";
      }
    }
  }

  return "EXITED MAZE";
}

console.log(doTraverse(outerStart, 0));
console.log(input.map((el) => el.join("")).join("\n"));

function inBounds(p) {
  const [x, y] = p;
  if (x < 0 || y < 0 || x >= input.length || y >= input[0].length) {
    return false;
  }
  return true;
}

console.log(rocks.size);
