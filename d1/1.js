const fs = require("fs");
let input = fs.readFileSync('./input.txt','utf-8').split("\n");

const l = [];
const r = [];

for(const line of input){
  const [l1,r1] = line.split("   ");
  l.push(parseInt(l1));
  r.push(parseInt(r1));
}

l.sort((a,b) => a-b);
r.sort((a,b) => a-b);

let sum = 0;

for(let i = 0; i < input.length; i++){
  n = Math.abs(l[i] - r[i])
  console.log(n);
  sum += n;
}

console.log(sum);