const fs = require("fs");
let input = fs.readFileSync('./input.txt','utf-8');

// input = `............
// ........0...
// .....0......
// .......0....
// ....0.......
// ......A.....
// ............
// ............
// ........A...
// .........A..
// ............
// ............`

input = input.split("\n").map(el => el.split(""));

if(input[input.length-1] === ""){
  input.pop();
}

const map = {};

for(let i = 0; i < input.length; i++){
  for(let j = 0; j < input.length; j++){
    if(input[i][j] !== "."){
      const char = input[i][j]
      if(!map[char]){
        map[char] = [];
      }
      map[char].push([i,j]);
    }
  }
}

const anti = new Set();

Object.values(map).forEach(arr => {
  for(const node of arr){
    for(const node2 of arr){
      if(node.join("") !== node2.join("")){
        let dx = node2[0] - node[0];
        let dy = node2[1] - node[1];

        let nextx = node2[0] + dx;
        let nexty = node2[1] + dy;
        if(inBounds(nextx, nexty)){

          anti.add(`${nextx},${nexty}`)
          input[nextx][nexty] = "#"
        }
      }
    }
  }

})

function inBounds(x,y) {
  if (x < 0 || y < 0 || x >= input.length || y >= input[0].length) {
    return false;
  }
  return true;
}

console.log(anti.size);

input = input.map(el => el.join(""));
console.log(input.join("\n"));