export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) => x.split(",").map((y) => y.split("-").map((x) => parseInt(x))));

const checkContains = (range1: number[], range2: number[]) => {
  if (range1[0] <= range2[0] && range1[1] >= range2[1]) return true;
  return false;
};

let count = 0;
ipt.forEach((pair) => {
  if (checkContains(pair[0], pair[1]) || checkContains(pair[1], pair[0]))
    count++;
});

console.log("Part 1: ", count);
