export {};
const size = 14;

const ipt = Deno.readTextFileSync("./input.txt")
  .split("")
  .map((_, index, array) => new Set(array.slice(index - size, index)).size)
  .findIndex((value) => value === size);

console.log(ipt);
