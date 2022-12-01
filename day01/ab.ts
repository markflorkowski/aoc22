export {};

const ipt = Deno.readTextFileSync("./input.txt").split("\n\n");

// Split the input by double newlines, then split each group by newlines.
// Then, for each group map to numnbers and sum them.

const sum = ipt.map((group) =>
  group
    .split("\n")
    .map((line) => +line)
    .reduce((a, b) => a + b, 0)
);

//Part 1
//find the max sum
const ans1 = Math.max(...sum);
console.log("part1:\n", ans1);

//Part 2
//find sum of the top three sums
const ans2 = sum
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((a, b) => a + b);

console.log("part2:\n", ans2);
