export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((line) => line.split(" "));

let score = 0;
ipt.forEach((line) => {
  const [a, b] = line;
  let choice;

  // loss
  if (b === "X") {
    score += 0;
    if (a === "A") choice = "Z";
    if (a === "B") choice = "X";
    if (a === "C") choice = "Y";
  }

  //ties
  if (b === "Y") {
    score += 3;
    if (a === "A") choice = "X";
    if (a === "B") choice = "Y";
    if (a === "C") choice = "Z";
  }

  //wins
  if (b === "Z") {
    score += 6;
    if (a === "A") choice = "Y";
    if (a === "B") choice = "Z";
    if (a === "C") choice = "X";
  }

  // other cases are losses, just add value

  if (choice === "X") score += 1;
  if (choice === "Y") score += 2;
  if (choice === "Z") score += 3;
});

console.log(score);
