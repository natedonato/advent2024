const fs = require("fs");
let input = fs.readFileSync('./input.txt','utf-8')

let bounds = 70;

// input = `5,4
// 4,2
// 4,5
// 3,0
// 2,1
// 6,3
// 2,4
// 1,5
// 0,6
// 3,3
// 2,6
// 5,1
// 1,2
// 5,5
// 2,5
// 6,5
// 1,4
// 0,4
// 6,4
// 1,1
// 6,1
// 1,0
// 0,5
// 1,6
// 2,0`;
// bounds = 6;


input = input.split("\n");

if(input[input.length-1] === ""){
  input.pop();
}



let first = 1024;

let grid = new Array(bounds + 1).fill(0).map(el => new Array(bounds + 1).fill("."));

for(let i = 0; i < first; i++){
  let line = input[i];
  line = line.split(",").map(el => parseInt(el));
  console.log(line);
  grid[line[1]][line[0]] = "#";

}

console.log(grid.map(el => el.join("")).join("\n"));

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
  if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length) {
    return false;
  }
  return true;
}

function get(p){
  return grid[p[0]][p[1]];
}

function bfs(){
  let p = [0,0];
  let queue = [p];
  let visited = new Set();
  let steps = 0;
  while(queue.length > 0){
    let l = queue.length;
    for(let i = 0; i < l; i++){
      let current = queue.shift();
      let key = current.join(",")
      console.log(current);
      if(current[0] === bounds && current[1] === bounds){
        return steps;
      }
      if(visited.has(key)){
        continue;
      }else{
        visited.add(key);
      }

      for(const n of getNeighbors(current)){
        if(inBounds(n) && get(n) !== "#"){
          queue.push(n);
        }
      }
    }
    steps += 1;
  }
}

console.log(bfs());
