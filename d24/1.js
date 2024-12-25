const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

// input = `x00: 1
// x01: 0
// x02: 1
// x03: 1
// x04: 0
// y00: 1
// y01: 1
// y02: 1
// y03: 1
// y04: 1

// ntg XOR fgs -> mjb
// y02 OR x01 -> tnw
// kwq OR kpj -> z05
// x00 OR x03 -> fst
// tgd XOR rvg -> z01
// vdt OR tnw -> bfw
// bfw AND frj -> z10
// ffh OR nrd -> bqk
// y00 AND y03 -> djm
// y03 OR y00 -> psh
// bqk OR frj -> z08
// tnw OR fst -> frj
// gnj AND tgd -> z11
// bfw XOR mjb -> z00
// x03 OR x00 -> vdt
// gnj AND wpb -> z02
// x04 AND y00 -> kjc
// djm OR pbm -> qhw
// nrd AND vdt -> hwm
// kjc AND fst -> rvg
// y04 OR y02 -> fgs
// y01 AND x02 -> pbm
// ntg OR kjc -> kwq
// psh XOR fgs -> tgd
// qhw XOR tgd -> z09
// pbm OR djm -> kpj
// x03 XOR y03 -> ffh
// x00 XOR y04 -> ntg
// bfw OR bqk -> z06
// nrd XOR fgs -> wpb
// frj XOR qhw -> z04
// bqk OR frj -> z07
// y03 OR x01 -> nrd
// hwm AND bqk -> z03
// tgd XOR rvg -> z12
// tnw OR pbm -> gnj`;

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

console.log(variables);

let arr = Array.from(variables.entries());

arr = arr
  .filter((el) => el[0][0] === "z")
  .sort()
  .reverse();

console.log(arr);

console.log(parseInt(arr.map((el) => el[1]).join(""), 2));
