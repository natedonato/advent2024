const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

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

console.log(start);
console.log(end);

set(start, ".");

initialBfs(end);

let saves = [];

function findCheats(point) {
  let startDistance = get(point);
  if (startDistance === "#") {
    return;
  }

  for (const neighbor of getNeighbors(point)) {
    if (inBounds(neighbor) && get(neighbor) === "#") {
      for (const endPoint of getNeighbors(neighbor)) {
        if (!inBounds(endPoint)) {
          continue;
        }
        let endDistance = get(endPoint);
        if (endDistance !== "#" && endDistance < startDistance) {
          let timeSave = startDistance - endDistance - 2;
          if (timeSave !== 0) {
            saves.push(timeSave);
          }
        }
      }
    }
  }
}

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    findCheats([i, j]);
  }
}
// look for cheats
// for each position in grid:
// get neighbors once to find a wall to phase through
// get neighbors again to find a non-wall to return to
// if start time greater than end time
// distance minus end distance is time saved.  (minus two steps for the cheat moves?)

// console.log(saves.sort((a,b) => a - b));
console.log(saves.filter((el) => el >= 100).length);
