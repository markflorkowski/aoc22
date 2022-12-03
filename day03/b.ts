export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) => [x.slice(0, x.length / 2), x.slice(x.length / 2, x.length)]);

const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const ipt2 = Array(Math.ceil(ipt.length / 3))
  .fill(undefined)
  .map((_, index) => index * 3)
  .map((begin) => ipt.slice(begin, begin + 3));

let sum2 = 0;
ipt2.forEach((chunk) => {
  const match = chunk[0]
    .join("")
    .split("")
    .find((char) => {
      if (
        chunk[1].join("").includes(char) &&
        chunk[2].join("").includes(char)
      ) {
        return true;
      }
      return false;
    });

  if (match) {
    sum2 += alpha.indexOf(match) + 1;
  }
});

console.log("part2:", sum2);
