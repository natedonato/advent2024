const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

// input = `##########
// #..O..O.O#
// #......O.#
// #.OO..O.O#
// #..O@..O.#
// #O#..O...#
// #O..O..O.#
// #.OO.O.OO#
// #....O...#
// ##########

// <vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
// vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
// ><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
// <<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
// ^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
// ^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
// >^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
// <><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
// ^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
// v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`;

// input = `#######
// #...#.#
// #.....#
// #..OO@#
// #..O..#
// #.....#
// #######

// <vv<<^^<<^^`

input = input.split("\n\n");

let maze = input[0].split("\n").map((el) => el.split(""));

const mapKey = {
  "#": "##",
  O: "[]",
  ".": "..",
  "@": "@.",
};

maze = maze.map((row) => row.map((el) => mapKey[el]));
maze = maze.map((row) => row.join("").split(""));

print();

let directions = input[1].split("\n").join("");

console.log(directions);

const map = {
  "^": [-1, 0],
  v: [1, 0],
  "<": [0, -1],
  ">": [0, 1],
};

let position;
for (let i = 0; i < maze.length; i++) {
  for (let j = 0; j < maze[0].length; j++) {
    if (maze[i][j] === "@") {
      position = [i, j];
    }
  }
}

console.log("Start", position);

print();

function print() {
  console.log(maze.map((el) => el.join("")).join("\n"));
  console.log("");
}

outer: for (const c of directions) {
  let vector = map[c];
  if (!vector) {
    throw new Error("bad direction");
  }

  let next = add(position, vector);

  if (c === "<" || c === ">") {
    // horizontal only should still work the same:
    while (maze[next[0]][next[1]] === "[" || maze[next[0]][next[1]] === "]") {
      next = add(next, vector);
    }

    if (maze[next[0]][next[1]] === ".") {
      vector2 = vector.map((el) => el * -1);
      // move everyone over
      let prev = add(next, vector2);
      while (prev[0] !== position[0] || prev[1] !== position[1]) {
        maze[next[0]][next[1]] = maze[prev[0]][prev[1]];
        next = [...prev];
        prev = add(prev, vector2);
      }

      prev = add(prev, vector);
      maze[prev[0]][prev[1]] = "@";
      maze[position[0]][position[1]] = ".";
      position = [...prev];
    }
  } else {
    // vertical movement

    let rocks = [];
    let visitedRocks = [];

    if (maze[next[0]][next[1]] === "]") {
      rocks.push([next[0], next[1] - 1]);
    } else if (maze[next[0]][next[1]] === "[") {
      rocks.push([next[0], next[1]]);
    }

    if (rocks.length === 0) {
      if (get(next) === ".") {
        maze[next[0]][next[1]] = "@";
        maze[position[0]][position[1]] = ".";
        position = [...next];
      }

      continue;
    }

    let valid = true;

    while (rocks.length > 0 && valid) {
      rock = rocks.shift();

      visitedRocks.push([...rock]);
      let t = test(rock, vector);
      if (t === false) {
        valid = false;
        break;
      }

      for (const r of t) {
        rocks.push(r);
      }
    }

    if (!valid) {
      continue;
    } else {
      // if test is good, move rocks
      // and move player
      for (const rock of visitedRocks.reverse()) {
        let t = add(rock, vector);
        maze[t[0]][t[1]] = "[";
        maze[t[0]][t[1] + 1] = "]";

        maze[rock[0]][rock[1]] = ".";
        maze[rock[0]][rock[1] + 1] = ".";
      }
      maze[next[0]][next[1]] = "@";
      maze[position[0]][position[1]] = ".";
      position = [...next];
    }
  }

  // print();
}

function test(rock, vector) {
  rock = add(rock, vector);
  let rock2 = [rock[0], rock[1] + 1];

  if (get(rock) === "#" || get(rock2) === "#") {
    return false;
  }

  let out = [];

  if (get(rock) === "[") {
    out.push(rock);
  } else if (get(rock2) === "[") {
    out.push(rock2);
  }
  if (get(rock) === "]") {
    out.push([rock[0], rock[1] - 1]);
  }

  return out;
}

// get what is in a square
function get(x) {
  return maze[x[0]][x[1]];
}

// function getRock(rock){
//   return get(rock);
//   return get([rock[0],rock[1] + 1]);
// }

function add(p, v) {
  return [p[0] + v[0], p[1] + v[1]];
}

let score = 0;

for (let i = 0; i < maze.length; i++) {
  for (let j = 0; j < maze[0].length; j++) {
    if (maze[i][j] === "[") {
      score += 100 * i + j;
    }
  }
}

console.log(score);
