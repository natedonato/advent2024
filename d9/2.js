const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");

// input = `2333133121414131402`;

input = input.split("");
console.log(input.length);

let memory = [];
let id = 0;
const files = [];
const spaces = [];
let index = 0;

// create memory array
for (let i = 0; i < input.length; i++) {
  let val = ".";

  if (i % 2 === 0) {
    val = id;
    id += 1;
  }

  for (let j = 0; j < parseInt(input[i]); j++) {
    memory.push(val);
  }
  if (val === ".") {
    spaces.push({ index: index, size: parseInt(input[i]), id: "." });
  } else {
    files.push({ index: index, size: parseInt(input[i]), id: val });
  }

  index += parseInt(input[i]);
}

for (const file of files.reverse()) {
  spaceloop: for (const space of spaces) {
    if (space.size >= file.size && space.index < file.index) {
      // add new space in file's place
      spaces.push({ index: file.index, size: file.size, id: "." });
      // move file
      file.index = space.index;

      // adjust space
      space.size -= file.size;
      space.index += file.size;

      break spaceloop;
    } else if (space.index > file.index) {
      break spaceloop;
    }
  }

  // zipUp();
}

zipUp();
// make new mem from file and space arrays
function zipUp() {
  const total = files.concat(...spaces).sort((a, b) => a.index - b.index);
  memory = new Array();

  let i = 0;
  for (const item of total) {
    for (let j = 0; j < item.size; j++) {
      memory[i] = item.id;
      i += 1;
    }
  }

  // console.log(memory.join(""));
}

// checksum
let sum = 0;

for (let i = 0; i < memory.length; i++) {
  if (memory[i] === ".") {
    continue;
  }

  sum += i * memory[i];
}

console.log(sum);
