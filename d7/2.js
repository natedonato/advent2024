const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8").split("\n");

// input = `190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20`.split("\n");

if (input[input.length - 1] === "") {
  input.pop();
}

let sum = 0;

for (let line of input) {
  line = line.split(": ");
  const target = parseInt(line[0]);
  const nums = line[1].split(" ").map((el) => parseInt(el));

  if (isSolvable(nums[0], 1)) {
    sum += target;
    // console.log("solvable:");
    // console.log(line);
  } else {
    // console.log("not solvable:")
    // console.log(line);
  }

  function isSolvable(current, i) {
    const num = nums[i];
    if (i >= nums.length - 1) {
      let concat = current.toString() + num.toString();
      concat = parseInt(concat);
      if (
        current + num === target ||
        current * num === target ||
        concat === target
      ) {
        return true;
      } else {
        return false;
      }
    }

    let add = current + num;
    let mult = current * num;

    let concat = current.toString() + num.toString();
    concat = parseInt(concat);

    return (
      isSolvable(add, i + 1) ||
      isSolvable(mult, i + 1) ||
      isSolvable(concat, i + 1)
    );
  }
}

console.log("total:", sum);
