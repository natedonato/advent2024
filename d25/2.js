const fs = require("fs");
let input = fs.readFileSync('./input.txt','utf-8').split("\n");

if(input[input.length-1] === ""){
  input.pop();
}
