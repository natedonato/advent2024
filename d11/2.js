const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");


// input = `125 17`;
input = input.split(" ").map(el => parseInt(el));

let counts = new Map();

function increment(map, key, num){
  map.set(key, (map.get(key) ?? 0) + num);
}

for(const item of input){
  increment(counts, item, 1);
}

console.log(counts);

function step() {
  let next = new Map();
  for(const [key, val] of counts.entries()){
    // console.log(key, val)
    if (key === 0) {
      increment(next, 1, val);
    } else if (String(key).length % 2 === 0) {
      let s = String(key);
      let p1 = parseInt(s.slice(0, s.length / 2));
      let p2 = parseInt(s.slice(s.length / 2));
      increment(next, p1, val);
      increment(next, p2, val);

    } else {
      increment(next, key * 2024, val);
    }
  }

  counts = next;
}


for(let i = 0; i < 75; i++){
  step();
  // console.log(counts);
}

let sum = 0;
for(const num of counts.values()){
  sum += num;
}

console.log(sum);