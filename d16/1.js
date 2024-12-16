const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

// input = `#################
// #...#...#...#..E#
// #.#.#.#.#.#.#.#.#
// #.#.#.#...#...#.#
// #.#.#.#.###.#.#.#
// #...#.#.#.....#.#
// #.#.#.#.#.#####.#
// #.#...#.#.#.....#
// #.#.#####.#.###.#
// #.#.#.......#...#
// #.#.###.#####.###
// #.#.#...#.....#.#
// #.#.#.#####.###.#
// #.#.#.........#.#
// #.#.#.#########.#
// #S#.............#
// #################`;

input = input.split("\n");

if (input[input.length - 1] === "") {
  input.pop();
}
let start;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (input[i][j] === "S") {
      start = { position: [i, j], dir: 0, score: 0 };
    }
  }
}

let dirs = [
  [0, 1], // east
  [1, 0], // south
  [0, -1], // west
  [-1, 0], // north
];

function check(pos) {
  return input[pos[0]][pos[1]];
}

function move(current) {
  let next = { ...current };
  next.position = [...current.position];

  next.position = [
    next.position[0] + dirs[next.dir][0],
    next.position[1] + dirs[next.dir][1],
  ];

  if (check(next.position) !== "#") {
    next.score += 1;
    return next;
  }

  return false;
}

function turn(current) {
  let nexts = [];

  let next = { ...current };
  next.position = [...current.position];
  next.dir = (current.dir + 1) % 4;

  next.score += 1000;
  nexts.push(move(next));

  next.dir = (current.dir - 1 + 4) % 4;
  nexts.push(move(next));

  return nexts.filter((el) => el !== false);
}

const set = new Set();
function visited(current) {
  if (set.has(current.position.join(",") + "," + current.dir)) {
    return true;
  } else {
    set.add(current.position.join(",") + "," + current.dir);
    return false;
  }
}

function bfs() {
  const queue = [start];
  while (queue.length > 0) {
    const current = queue.shift();

    // console.log(input.length - current.position[0] + input[0].length - current.position[1])

    if (check(current.position) === "E") {
      return current.score;
    }

    // console.log(set);
    if (visited(current)) {
      continue;
    }

    let forward = move(current);
    if (forward) {
      queue.push(forward);
    }

    let turns = turn(current);
    for (const el of turns) {
      queue.push(el);
    }

    queue.sort((a, b) => a.score - b.score);
  }
}

console.log("min score", bfs());
