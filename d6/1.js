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

input = input.split("\n");

if (input[input.length - 1] === "") {
  input.pop();
}

const guy = [];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    // console.log(i,j)
    if (input[i][j] === "^") {
      guy.push(i);
      guy.push(j);
    }
  }
}

console.log(guy);
console.log(input);

const dirs = [
  [-1,0],
  [0,1],
  [1,0],
  [0,-1]
]

let currentDir = 0;
let visited = new Set();

while(inBounds(guy)){
  let [x,y] = guy;
  console.log(guy);
  visited.add(`${guy[0]},${guy[1]}`);

  nextX = x + dirs[currentDir][0];
  nextY = y + dirs[currentDir][1];

  if(inBounds([nextX,nextY]) && input[nextX][nextY] === "#"){
    currentDir += 1;
    currentDir %= 4;
  }else{
    guy[0] = nextX;
    guy[1] = nextY;  
  }
}


function inBounds(p){
  const [x,y] = p;
  if(x < 0 || y < 0 || x >= input.length || y >= input[0].length){
    return false;
  }
  return true
}

console.log(visited.size);