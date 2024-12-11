const fs = require("fs");
let input = fs.readFileSync('./input.txt','utf-8');

// input = `125 17`;
input = input.split(" ").map(el => parseInt(el));

function step(){
  let next = [];
  for(const stone of input){
    if(stone === 0){
      next.push(1);
    }else if(String(stone).length % 2 === 0){
      let s = String(stone);
      next.push(parseInt(s.slice(0,s.length / 2)))
      next.push(parseInt(s.slice(s.length / 2)))
    }else{
      next.push(stone * 2024);
    }
  }

  input = next;
}


for (let i = 0; i < 25; i++) {
  console.log(i);
  step();
}

console.log(input.length);