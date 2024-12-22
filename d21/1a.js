const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

let NUM_DIRECTIONAL_KEYPADS = 3;

let outputMoves = new Array(NUM_DIRECTIONAL_KEYPADS + 1).fill("");

input = `029A
980A
179A
456A
379A`;

// input = "379A";

input = input.split("\n");

if (input[input.length - 1] === "") {
  input.pop();
}

/*
+---+---+---+
| 7 | 8 | 9 |
+---+---+---+
| 4 | 5 | 6 |
+---+---+---+
| 1 | 2 | 3 |
+---+---+---+
    | 0 | A |
    +---+---+

    +---+---+
    | ^ | A |
+---+---+---+
| < | v | > |
+---+---+---+

*/

// everyone starts on A

// button layouts

const numpad = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  [null, "0", "A"],
];

const keypad = [
  [null, "^", "A"],
  ["<", "v", ">"],
];

// vector directions of arrows
const dirs = {
  "^": [-1, 0],
  v: [1, 0],
  "<": [0, -1],
  ">": [0, 1],
  A: [0, 0],
};

// memoize results
const memo = {};

// find a coordinate of a given character in a layout
function findCoord(char, arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] === char) {
        return [i, j];
      }
    }
  }
}

// process numpad buttons
function findNumButtons(line) {
  outputMoves = new Array(NUM_DIRECTIONAL_KEYPADS + 1).fill("");

  let length = 0;

  // console.log("\nline", line);
  line = line.split("");

  // start at A key
  let position = [3, 2];

  let moves = [];

  for (const char of line) {
    let startPosition = [...position];
    // console.log("Starting from numpad", numpad[position[0]][position[1]])
    // console.log("Moving to numpad", char)

    let target = findCoord(char, numpad);
    let baseMoveStr = "";

    while (target[0] > position[0]) {
      position[0] += 1;
      baseMoveStr += "v";
    }

    while (target[0] < position[0]) {
      position[0] -= 1;
      baseMoveStr += "^";
    }

    while (target[1] > position[1]) {
      position[1] += 1;
      baseMoveStr += ">";
    }

    while (target[1] < position[1]) {
      position[1] -= 1;
      baseMoveStr += "<";
    }

    let key = "keypad:" + baseMoveStr;

    //if memo key, use memoized version
    // if(memo[key] !== undefined){
    //   length += memo[key];
    //   continue;
    // }

    let moveOptions = permutate(baseMoveStr);
    moveOptions = moveOptions.filter((el) =>
      moveAvoidsGaps(el, startPosition, numpad)
    );
    // console.log("Move options for keypad move:", moveOptions);

    // need to test move options to see which is best
    // let bestMove = moveOptions[0];

    let bestMove;
    let bestLength;

    for (const moveOption of moveOptions) {
      let resultLength = arrowButtons(moveOption, 1);

      if (!bestLength || resultLength < bestLength) {
        bestLength = resultLength;
        bestMove = moveOption;
      }
    }

    // memo result
    memo[key] = bestLength;
    length += bestLength;
    outputMoves[0] += bestMove;
  }

  return length;
}

// process numpad buttons
function arrowButtons(line, padNumber) {
  // console.log("\nline", line);
  line = line.split("");

  if (padNumber === NUM_DIRECTIONAL_KEYPADS) {
    // console.log("Keypad 3:")
    // console.log("move length", line.length)
    return line.length;
  }

  // start at A key
  let position = [0, 2];

  let length = 0;

  for (const char of line) {
    let startPosition = [...position];
    // console.log("Starting from keypad", padNumber, keypad[position[0]][position[1]]);
    // console.log("Moving to keypad", padNumber, char);

    let target = findCoord(char, keypad);
    let baseMoveStr = "";

    while (target[0] > position[0]) {
      position[0] += 1;
      baseMoveStr += "v";
    }

    while (target[0] < position[0]) {
      position[0] -= 1;
      baseMoveStr += "^";
    }

    while (target[1] > position[1]) {
      position[1] += 1;
      baseMoveStr += ">";
    }

    while (target[1] < position[1]) {
      position[1] -= 1;
      baseMoveStr += "<";
    }

    let key = "keypad" + padNumber + ":" + baseMoveStr;

    // if memo key, use memoized version
    // if(memo[key] !== undefined){
    //   length += memo[key];
    //   continue;
    // }

    let moveOptions = permutate(baseMoveStr);
    moveOptions = moveOptions.filter((el) =>
      moveAvoidsGaps(el, startPosition, keypad)
    );
    // console.log("Move options for keypad move:", moveOptions);

    let bestLength;

    for (const moveOption of moveOptions) {
      let resultLength = arrowButtons(moveOption, padNumber + 1);

      if (!bestLength || resultLength < bestLength) {
        bestLength = resultLength;
      }
    }

    // memo result
    memo[key] = bestLength;
    length += bestLength;
    console.log();
  }

  return length;
}

// takes a set of moves and makes all possible permutations
function permutate(moveStr) {
  moveStr = moveStr.split("");

  let moveOptions = permutator(moveStr).map((el) => el.join(""));
  moveOptions = [...new Set(moveOptions)];
  moveOptions = moveOptions.map((el) => el + "A");
  // console.log(moveOptions);

  return moveOptions;
}

// permutation helper
function permutator(inputArr) {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
}

function moveAvoidsGaps(moveStr, position, arr) {
  let p = [...position];

  for (const char of moveStr) {
    const dir = dirs[char];
    p[0] += dir[0];
    p[1] += dir[1];

    if (arr[p[0]][p[1]] === null) {
      return false;
    }
  }

  return true;
}

// execute on all lines
let sum = 0;

for (let line of input) {
  let moves = findNumButtons(line);

  // console.log("total moves", moves);
  // console.log("outputmoves", outputMoves[0])
  //   // console.log(firstMoves.join());
  //   let secondMoves = arrowButtons(firstMoves);
  //   // console.log(secondMoves.join(""));
  //   let thirdMoves = arrowButtons(secondMoves);
  //   console.log(thirdMoves.join(""));
  //   console.log("length", thirdMoves.length);
  //   // console.log("numeric input", parseInt(line.slice(0, 3)));
  let complexity = parseInt(line.slice(0, 3)) * moves;
  console.log("complexity", complexity);
  sum += complexity;
}

console.log("final", sum);
