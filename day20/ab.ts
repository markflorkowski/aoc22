export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .trim()
  .split("\n")
  .map((x) => parseInt(x));

function mix(numbers: number[], n: number, dk: number) {
  const list = numbers.map((x, i) => ({ val: x * dk, ind: i }));

  for (let i = 0; i < list.length * n; i++) {
    const currentInd = list.findIndex(({ ind }) => ind === i % list.length);
    const [el] = list.splice(currentInd, 1);
    list.splice((currentInd + el.val) % list.length, 0, el);
  }

  return list.map(({ val }) => val);
}

const solve = (arr: number[], n = 1, dc = 1) => {
  const mixed = mix(arr, n, dc);

  return [1000, 2000, 3000]
    .map((j) => mixed[(mixed.indexOf(0) + j) % mixed.length])
    .reduce((a, b) => a + b);
};

console.log("part1", solve(ipt));
console.log("part2", solve(ipt, 10, 811589153));
