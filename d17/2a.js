const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

// input = `Register A: 2024
// Register B: 0
// Register C: 0

// Program: 0,3,5,4,3,0`;

input = input.split("\n");

let a = parseInt(input[0].slice(12));
let b = parseInt(input[1].slice(12));
let c = parseInt(input[2].slice(12));

let program = input[4]
  .slice(9)
  .split(",")
  .map((el) => parseInt(el));

// console.log("input", a, b, c, program);

function getCombo(operand) {
  switch (operand) {
    case 0:
    case 1:
    case 2:
    case 3:
      return operand;
    case 4:
      return a;
    case 5:
      return b;
    case 6:
      return c;
    case 7:
      throw new Error("will not appear in valid programs");
  }
}

// Combo operands 0 through 3 represent literal values 0 through 3.
// Combo operand 4 represents the value of register A.
// Combo operand 5 represents the value of register B.
// Combo operand 6 represents the value of register C.
// Combo operand 7 is reserved and will not appear in valid programs.

// take an A value and tell me the output
function test(aVal) {
  a = aVal;
  b = 0;
  c = 0;

  let pointer = 0;
  let output = [];

  while (pointer < program.length) {
    let opcode = program[pointer];
    let operand = program[pointer + 1];

    switch (opcode) {
      case 0:
        // The adv instruction (opcode 0) performs division. The numerator is the value in the A register. The denominator is found by raising 2 to the power of the instruction's combo operand. (So, an operand of 2 would divide A by 4 (2^2); an operand of 5 would divide A by 2^B.) The result of the division operation is truncated to an integer and then written to the A register.
        // console.log("opcode", 0);

        operand = getCombo(operand);
        // console.log(operand);
        a = Math.trunc(a / 2 ** operand);
        // console.log("a", a);
        break;
      case 1:
        // The bxl instruction (opcode 1) calculates the bitwise XOR of register B and the instruction's literal operand, then stores the result in register B.

        b = Number(BigInt(b) ^ BigInt(operand));
        break;
      case 2:
        // The bst instruction (opcode 2) calculates the value of its combo operand modulo 8 (thereby keeping only its lowest 3 bits), then writes that value to the B register.
        b = getCombo(operand) % 8;
        break;
      case 3:
        // The jnz instruction (opcode 3) does nothing if the A register is 0. However, if the A register is not zero, it jumps by setting the instruction pointer to the value of its literal operand; if this instruction jumps, the instruction pointer is not increased by 2 after this instruction.
        if (a !== 0) {
          pointer = operand;
          continue;
        }
        break;
      case 4:
        // The bxc instruction (opcode 4) calculates the bitwise XOR of register B and register C, then stores the result in register B. (For legacy reasons, this instruction reads an operand but ignores it.)
        b = Number(BigInt(b) ^ BigInt(c));
        break;
      case 5:
        // The out instruction (opcode 5) calculates the value of its combo operand modulo 8, then outputs that value. (If a program outputs multiple values, they are separated by commas.)
        // console.log(5);
        // console.log("operand", operand);
        let combo = getCombo(operand);
        let value = combo % 8;
        // console.log("combo", combo);
        // console.log("value", value);
        output.push(value);
        break;
      case 6:
        // The bdv instruction (opcode 6) works exactly like the adv instruction except that the result is stored in the B register. (The numerator is still read from the A register.)
        operand = getCombo(operand);
        b = Math.floor(a / 2 ** operand);
        break;
      case 7:
        // The cdv instruction (opcode 7) works exactly like the adv instruction except that the result is stored in the C register. (The numerator is still read from the A register.)
        operand = getCombo(operand);
        c = Math.floor(a / 2 ** operand);
        break;
      default:
        // console.log(opcode);
        throw new Error("bad operator");
        break;
    }

    pointer += 2;
  }
  // console.log("tested output", output);

  return output;
}

console.log("target program:", program.join(","));

let p = [...program].reverse();

let validA = new Set();
validA.add(0);

let digits = 1;

while (digits <= p.length) {
  let target = p.slice(0, digits);

  console.log("target output", target);

  let prevValid = [...validA.values()];
  validA.clear();

  for (let prevA of prevValid) {
    prevA *= 8;
    for (let i = 0; i < 8; i++) {
      let newOut = test(prevA + i);

      // console.log("Output", newOut);
      if (newOut.reverse().join(",") === target.join(",")) {
        console.log("input A", prevA + i);
        console.log("matches target output");
        validA.add(prevA + i);
      }
    }
  }

  console.log("valid inputs to match", digits, "program digits:");
  console.log(validA.size);
  digits += 1;
}

let final = [...validA.values()].sort((a, b) => a - b);

console.log("final /min input", final[0]);
