const token = process.env.SESSIONTOKEN;
const year = 2024;
const fs = require("fs");

const initialJs = `const fs = require("fs");
let input = fs.readFileSync('./input.txt','utf-8').split("\\n");

if(input[input.length-1] === ""){
  input.pop();
}
`;

// get input
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What day to set up? ", (day) => {
  let d = parseInt(day);
  if (d < 1 || d > 25) {
    throw new Error("Invalid day");
  }
  console.log(`Creating day, ${day}!`);
  createDay(d);

  rl.close();
});

async function createDay(day) {
  const directory = "./d" + day;
  const dirExists = fs.existsSync(directory);

  if (!dirExists) {
    fs.mkdirSync(directory);
    console.log("creating directory", directory);
  } else {
    console.log("directory already exists");
  }

  const jsExists = fs.existsSync(directory + "/1.js");

  if (!jsExists) {
    console.log("creating JS scaffold");
    fs.writeFileSync(directory + "/1.js", initialJs, "utf-8");
    fs.writeFileSync(directory + "/2.js", initialJs, "utf-8");
  } else {
    console.log("JS already exists");
  }

  const inputExists = fs.existsSync(directory + "/input.txt");

  if (!inputExists) {
    console.log("fetching input");
    const inputUrl = `https://adventofcode.com/${year}/day/${day}/input`;
    let inputTxt;

    try {
      await fetch(inputUrl, {
        method: "get",
        headers: {
          "Content-Type": "text/plain",
          Cookie: `session=${token}`,
          "User-Agent": "node.js",
        },
      })
        .then((response) => response.text())
        .then((textString) => {
          inputTxt = textString;
        });
    } catch (e) {
      console.log("Error fetching input:", e);
    }

    fs.writeFileSync(directory + "/input.txt", inputTxt);
  }else{
    console.log("input already fetched");
  }
}
