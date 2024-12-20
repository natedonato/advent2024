const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

let MAX_CHEATING = 20;
// MAX_CHEATING = 2;

let MINIMUM_SAVE = 100;

// input = `###############
// #...#...#.....#
// #.#.#.#.#.###.#
// #S#...#.#.#...#
// #######.#.#.###
// #######.#.#...#
// #######.#.###.#
// ###..E#...#...#
// ###.#######.###
// #...###...#...#
// #.#####.#.###.#
// #.#...#.#.#...#
// #.#.#.#.#.#.###
// #...#...#...###
// ###############`
// MINIMUM_SAVE = 50;

input = input.split("\n").map((el) => el.split(""));

if (input[input.length - 1] === "") {
  input.pop();
}

function getNeighbors(point) {
  const [x, y] = point;
  const ns = [];
  for (const vect of [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ]) {
    let x1 = x + vect[0];
    let y1 = y + vect[1];
    ns.push([x1, y1]);
  }
  return ns;
}

function inBounds(p) {
  const [x, y] = p;
  if (x < 0 || y < 0 || x >= input.length || y >= input[0].length) {
    return false;
  }
  return true;
}

function get(p) {
  return input[p[0]][p[1]];
}

function set(p, val) {
  input[p[0]][p[1]] = val;
}

let start, end;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (get([i, j]) === "S") {
      start = [i, j];
    } else if (get([i, j]) === "E") {
      end = [i, j];
    }
  }
}

// first we bfs from endpoint and give every reachable square it's distance from end.
function initialBfs(point) {
  let distance = 0;

  const queue = [point];
  while (queue.length > 0) {
    let size = queue.length;

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      set(node, distance);

      for (const neighbor of getNeighbors(node)) {
        if (inBounds(neighbor) && get(neighbor) === ".") {
          queue.push(neighbor);
        }
      }
    }

    distance += 1;
  }
}

set(start, ".");
initialBfs(end);

let saves = [];

function cheatBfs(point) {
  let visited = new Set();
  let distance = 0;

  let startDistance = get(point);
  if (startDistance === "#") {
    return;
  }

  const queue = [point];
  while (queue.length > 0) {
    let size = queue.length;

    for (let i = 0; i < size; i++) {
      const node = queue.shift();

      const key = node.join(",");
      if (visited.has(key)) {
        continue;
      } else {
        visited.add(key);
      }

      // handle cheating
      if (distance >= 2) {
        let endDistance = get(node);
        if (endDistance !== "#" && endDistance < startDistance) {
          let timeSave = startDistance - endDistance - distance;
          if (timeSave > 0) {
            saves.push(timeSave);
          }
        }
      }

      for (const neighbor of getNeighbors(node)) {
        if (inBounds(neighbor)) {
          queue.push(neighbor);
        }
      }
    }

    distance += 1;

    if (distance > MAX_CHEATING) {
      return;
    }
  }
}

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    cheatBfs([i, j]);
  }
}

// console.log(saves);
saves = saves.filter((el) => el >= MINIMUM_SAVE);

// saves = saves.sort((a,b) => a - b);
// let count = {};

// for(const save of saves){
//   count[save] = (count[save] ?? 0) + 1
// }

// console.log(count);

console.log(saves.length);
