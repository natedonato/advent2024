const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

input = input.split("\n\n").map((el) => el.split("\n"));

if (input[1][input[1].length - 1] === "") {
  input[1].pop();
}

let vals = input[0];
let ops = input[1];

const variables = new Map();

for (const val of vals) {
  let [variable, value] = val.split(": ");
  // value = Boolean(value);
  variables.set(variable, parseInt(value));
}

function setBin(bin, XorY){
  let size = 45;
  while (bin.length < size) {
    bin = "0" + bin;
  }

  bin = bin.split("").reverse().join("")

  for (let i = 0; i < size; i++) {
    let next = parseInt(bin[i]);
    if (i < 10) {
      i = "0" + i;
    }
    variables.set(XorY + i, next);
  }
}


function setVal(val, XorY){
  const size = 45;
  val = val.toString(2);

  while(val.length < size){
    val = "0" + val;
  }

  val = val.split("").reverse();

  for(let i = 0; i < size; i++){
    let next = parseInt(val[i])
    if(i < 10){
      i = "0" + i;
    }
    variables.set(XorY + i, next);

  }
}

//  Set different values of X and Y to help search for mismatched digits
setBin("1111111111111111111111111111111111111111111111111111111", "x");
setBin("1111111111111111111111111111111111111111111111111111111", "y");

console.log(variables);

function fillIn() {
  let nextOps = [];

  for (const opString of ops) {
    let split = opString.split(" ");
    let operation = split[1];

    let var1 = split[0];
    let var2 = split[2];
    let destination = split[4];
    if (variables.get(var1) === undefined || variables.get(var2) == undefined) {
      nextOps.push(opString);
      continue;
    }

    if (operation === "AND") {
      variables.set(destination, variables.get(var1) && variables.get(var2));
    } else if (operation === "OR") {
      variables.set(destination, variables.get(var1) || variables.get(var2));
    } else if (operation === "XOR") {
      variables.set(destination, variables.get(var1) ^ variables.get(var2));
    }
  }

  ops = nextOps;
  console.log(nextOps.length);
}

while (ops.length > 0) {
  fillIn();
}



// Show x, y, x+y, and z, both in binary and numeric form to look for mismatched digits

let arr = Array.from(variables.entries());
let x = arr
  .filter((el) => el[0][0] === "x")
  .sort()
  .reverse()
  .map((el) => el[1])
  .join("");

  let y = arr
    .filter((el) => el[0][0] === "y")
    .sort()
    .reverse()
    .map((el) => el[1])
    .join("");


let z = arr
  .filter((el) => el[0][0] === "z")
  .sort()
  .reverse()
  .map((el) => el[1])
  .join("");

console.log("x: ", x);
console.log(parseInt(x, 2));
console.log("y: ", y);
console.log(parseInt(y, 2));

let sum = (parseInt(x, 2) + parseInt(y, 2));
sum = sum.toString(2);
while(sum.length < 46){
  sum = "0" + sum;
}
console.log("s:", sum);
sum = (parseInt(x, 2) + parseInt(y, 2));
console.log(sum);


console.log("z:", z);
console.log(parseInt(z,2));
