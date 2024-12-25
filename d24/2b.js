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
  variables.set(variable, parseInt(value));
}

const vis = {};
const visOps = {};

for (const opString of ops) {
  let split = opString.split(" ");
  let operation = split[1];

  let var1 = split[0];
  let var2 = split[2];
  let destination = split[4];

  if (destination[0] === "z" && operation !== "XOR") {
    console.log("WRONG OP:", destination);
  }

  vis[destination] = [var1, var2];
  visOps[destination] = operation;
}

function getDependencies(nodeName) {
  let dependencies = [];
  let children = vis[nodeName];

  for (const child of children) {
    if (child[0] === "x" || child[0] === "y") {
      dependencies.push(child);
    } else {
      let subdependencies = getDependencies(child);
      dependencies.push(...subdependencies);
    }
  }
  return dependencies.sort();
}

function getDependenciesAdvanced(nodeName) {
  let dependencies = [];
  let children = vis[nodeName];
  let op = visOps[nodeName];

  let output = "(";
  let c1;
  let c2;

  for (const child of children.slice(0, 1)) {
    if (child[0] === "x" || child[0] === "y") {
      c1 = child;
    } else {
      let subdependencies = getDependenciesAdvanced(child);
      c1 = subdependencies;
    }
  }

  for (const child of children.slice(1)) {
    if (child[0] === "x" || child[0] === "y") {
      c2 = child;
    } else {
      let subdependencies = getDependenciesAdvanced(child);
      c2 = subdependencies;
    }
  }

  let kids = [c1, c2].sort();

  output += kids[0] + " " + op + " " + kids[1];

  output += ")";

  return output;
}

function expectedDependencies(node) {
  let num = parseInt(node.slice(1));
  let dependencies = [];
  for (let i = 0; i <= num; i++) {
    let k = i.toString();
    if (k.length < 2) {
      k = "0" + k;
    }

    dependencies.push("x" + k);
    dependencies.push("y" + k);
    if (i !== 0 && i !== num) {
      dependencies.push("x" + k);
      dependencies.push("y" + k);
    }
  }

  return dependencies.sort();
}

let eds = new Array();

for (let i = 0; i < 46; i++) {
  let k = i.toString();

  if (k.length < 2) {
    k = "0" + k;
  }

  k = "z" + k;
  eds.push(expectedDependencies(k).join(","));
}

console.log(eds.slice(0, 6));

function findPossibleSwaps(num) {
  console.log("possible swaps:");
  for (const node of Object.keys(vis)) {
    let dep = getDependencies(node).join(",");
    let idx = eds.indexOf(dep);
    if (idx === num) {
      console.log(node);
    }
  }
}

for (let i = 0; i < 46; i++) {
  let is = i.toString();
  if (is.length < 2) {
    is = "0" + is;
  }
  let key = "z" + is;

  if (getDependencies(key).join(",") !== eds[i]) {
    console.log("dependency mismatch", key);
    console.log(getDependencies(key).join(","));
    console.log(eds[i]);
    findPossibleSwaps(i);
  }
}

console.log(getDependenciesAdvanced("z00"));
console.log("");
console.log(getDependenciesAdvanced("z01"));
console.log("");
console.log(getDependenciesAdvanced("z02"));
console.log("");
console.log(getDependenciesAdvanced("z03"));
console.log("");
console.log(getDependenciesAdvanced("z04"));
console.log("");
console.log(getDependenciesAdvanced("z09"));
console.log("");
console.log(getDependenciesAdvanced("z10"));

/// swapping jst and z05
/// swapping dnt and z15
/// swapping gwc and z30
/// swapping mcm and GDF
// z10 wrong

console.log("mcm");
console.log(getDependencies("mcm"));
console.log("tdw");
console.log(getDependencies("tdw"));
