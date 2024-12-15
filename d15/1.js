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

input = input.split("\n\n");

let maze = input[0].split("\n").map((el) => el.split(""));

let directions = input[1].split("\n").join("");

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

for (const c of directions) {
  let vector = map[c];
  if (!vector) {
    throw new Error("bad direction");
  }

  let next = add(position, vector);
  // console.log("Move ", c);

  // console.log("position", position);

  while (maze[next[0]][next[1]] === "O") {
    next = add(next, vector);
  }

  // console.log("Next", next);

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

  // print();
}

function add(p, v) {
  return [p[0] + v[0], p[1] + v[1]];
}

let score = 0;

for (let i = 0; i < maze.length; i++) {
  for (let j = 0; j < maze[0].length; j++) {
    if (maze[i][j] === "O") {
      score += 100 * i + j;
    }
  }
}

console.log(score);
