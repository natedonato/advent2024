const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8").split("\n");

if (input[input.length - 1] === "") {
  input.pop();
}

let count = 0;

for (let r = 0; r < input.length; r++) {
  for (let c = 0; c < input[0].length; c++) {
    check(r, c);
  }
}

// console.log(count);

function check(r, c) {
  const square = [];

  for (let x = -1; x <= 1; x++) {
    const row = [];
    for (let y = -1; y <= 1; y++) {
      const r1 = r + x;
      const c1 = c + y;

      if (r1 < 0 || c1 < 0 || r1 >= input.length || c1 >= input[0].length) {
        return 0;
      }
      row.push(input[r1][c1]);
    }
    square.push(row);
  }

  // console.log(square);
  if (checkSquare(square)) {
    count += 1;
  }
}

console.log(count);

function checkSquare(square) {
  const d1 = square[0][0] + square[1][1] + square[2][2];
  const d2 = square[0][2] + square[1][1] + square[2][0];

  if ((d1 === "SAM" || d1 === "MAS") && (d2 === "SAM" || d2 === "MAS")) {
    return true;
  }

  // const r1 = square[0][1] + square[1][1] + square[2][1];
  // const c1 = square[1][0] + square[1][1] + square[2][0];

  //  if ((r1 === "SAM" || r1 === "MAS") && (c1 === "SAM" || c1 === "MAS")) {
  //    return true;
  //  }

  return false;
}
