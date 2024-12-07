const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8").split("\n");
let count = 0;

for (let line of input) {
  line = line.split(" ").map((el) => parseInt(el));

  if (testLine(line)) {
    count += 1;
  }
}

console.log(count);

function testLine(line) {
  for (let i = 0; i < line.length - 1; i++) {
    if (line[1] > line[0]) {
      if (line[i + 1] - line[i] > 3 || line[i + 1] - line[i] < 1) {
        return false;
      }
    } else {
      if (line[i] - line[i + 1] > 3 || line[i] - line[i + 1] < 1) {
        return false;
      }
    }
  }
  return true;
}
