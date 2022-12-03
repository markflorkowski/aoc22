export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) => [x.slice(0, x.length / 2), x.slice(x.length / 2, x.length)]);

const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

let sum = 0;
ipt.forEach((pair) => {
  //find character that appears in both strings
  const match = pair[0].split("").find((char) => {
    if (pair[1].includes(char)) return true;
    return false;
  });

  if (match) {
    sum += alpha.indexOf(match) + 1;
  }
});

console.log("part1:", sum);
