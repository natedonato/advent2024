const fs = require("fs");
let input = fs.readFileSync('./input.txt','utf-8')

// input = `#####
// .####
// .####
// .####
// .#.#.
// .#...
// .....

// #####
// ##.##
// .#.##
// ...##
// ...#.
// ...#.
// .....

// .....
// #....
// #....
// #...#
// #.#.#
// #.###
// #####

// .....
// .....
// #.#..
// ###..
// ###.#
// ###.#
// #####

// .....
// .....
// .....
// #....
// #.#..
// #.#.#
// #####`;

input = input.split("\n\n").map(el => el.split("\n"));

if(input[input.length-1] === ""){
  input.pop();
}

console.log(input)


let locks = [];
let keys = [];
for(const lock of input){
  if(lock[0] === "#####"){
    locks.push(lock)
  }else{
    keys.push(lock)
  }
}

let keyHeights = [];


for(const key of keys){
  // console.log(key.join("\n"))
  let heights = [];
  for(let j = 0; j < key[0].length; j++){
    for(let i = 0; i < key.length; i++){
      if(key[key.length - i - 1][j] === "."){
        heights.push(i)
        break;
      }
    }
  }
  keyHeights.push(heights);
}

let lockHeights = [];

for (const lock of locks) {
  console.log(lock.join("\n"));
  let heights = [];
  for (let j = 0; j < lock[0].length; j++) {
    for (let i = 0; i < lock.length; i++) {
      if (lock[i][j] === ".") {
        heights.push(i);
        break;
      }
    }
  }
  console.log(heights);
  lockHeights.push(heights);
}



let count = 0;
for(const key of keyHeights){
  l1: for(const lock of lockHeights){
    for(let i = 0; i < key.length; i++){

      if(key[i] + lock[i] > 7){
        continue l1;
      }

    }
    count += 1;
  }
}

console.log(count);