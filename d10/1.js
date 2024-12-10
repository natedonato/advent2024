const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

// input = `89010123
// 78121874
// 87430965
// 96549874
// 45678903
// 32019012
// 01329801
// 10456732`;

input = input.split("\n");

if (input[input.length - 1] === "") {
  input.pop();
}

const zeroes = [];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (input[i][j] === "0") {
      zeroes.push([i, j]);
    }
  }
}

function getNeighbors(x, y) {
  const ns = [];
  for (const vect of [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ]) {
    let x1 = x + vect[0];
    let y1 = y + vect[1];
    if (!(x1 < 0 || y1 < 0 || x1 >= input.length || y1 >= input[0].length)) {
      ns.push([x1, y1]);
    }
  }
  return ns;
}

let sum = 0;

for (const p of zeroes) {
  bfs(p);
}

console.log("sum", sum);

function bfs(zero) {
  let score = 0;
  const queue = [zero];
  const visited = new Set();

  while (queue.length > 0) {
    let node = queue.shift();
    let key = node.join(",");
    if (visited.has(key)) {
      continue;
    } else {
      visited.add(key);
    }

    let val = input[node[0]][node[1]];

    if (val === "9") {
      score += 1;
      continue;
    }

    let children = getNeighbors(node[0], node[1]);

    for (const child of children) {
      if (parseInt(input[child[0]][child[1]]) === parseInt(val) + 1) {
        queue.push(child);
      }
    }
  }

  // console.log(score);
  sum += score;
}
