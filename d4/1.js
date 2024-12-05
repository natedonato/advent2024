const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8").split("\n");

if (input[input.length - 1] === "") {
  input.pop();
}

let count = 0;

for (let r = 0; r < input.length; r++) {
  for (let c = 0; c < input[0].length; c++) {
    count += check(r, c);
  }
}

console.log(count);

function check(r, c) {
  const strs = [];

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (!(x === 0 && y === 0)) {
        let s = input[r][c];
        l1: for (let i = 1; i <= 3; i++) {
          let r1 = r + x * i;
          let c1 = c + y * i;
          if (r1 < 0 || c1 < 0 || r1 >= input.length || c1 >= input[0].length) {
            break l1;
          }
          s += input[r1][c1];
        }

        strs.push(s);
      }
    }
  }

  console.log(strs);
  return strs.filter((el) => el === "XMAS").length;
}
