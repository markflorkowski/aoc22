export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((line) => line.split(" "));

let score = 0;
ipt.forEach((line) => {
  const [a, b] = line;

  //ties
  if (
    (a === "A" && b === "X") ||
    (a === "B" && b === "Y") ||
    (a === "C" && b === "Z")
  ) {
    score += 3;
  }

  //wins
  if (
    (a === "A" && b === "Y") ||
    (a === "B" && b === "Z") ||
    (a === "C" && b === "X")
  ) {
    score += 6;
  }

  // other cases are losses, just add value

  if (b === "X") score += 1;
  if (b === "Y") score += 2;
  if (b === "Z") score += 3;
});

console.log(score);
