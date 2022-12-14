export {};

let [maxX, maxY] = [0, 0];
const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((x) =>
    x.split(" -> ").map((y) =>
      y.split(",").map((z, i) => {
        const val = parseInt(z);
        if (i === 0) maxX = Math.max(maxX, val);
        if (i === 1) maxY = Math.max(maxY, val);
        return val;
      })
    )
  );

const cave = Array(maxY + 1)
  .fill("0")
  .map(() => Array(maxX * 2).fill("."));

cave[0][500] = "+";

ipt.forEach((path) =>
  path.reduce((last, next) => {
    const [min, max] =
      last[0] !== next[0]
        ? [last[0], next[0]].sort((a, b) => a - b)
        : [last[1], next[1]].sort((a, b) => a - b);
    for (let i = min; i <= max; i++)
      cave[last[0] !== next[0] ? last[1] : i][
        last[0] !== next[0] ? i : last[0]
      ] = "#";
    return next;
  })
);

const step = (grid: string[][]): boolean => {
  let sand = [500, 0];
  if (grid[sand[1]][sand[0]] === "o") return false;
  let done = false;
  while (!done) {
    const [x, y] = sand;
    if (y === grid.length - 1 || x < 0 || x > grid[0].length - 1) return false;
    if (grid[y + 1][x] === ".") sand = [x, y + 1];
    else if (grid[y + 1][x - 1] === ".") sand = [x - 1, y];
    else if (grid[y + 1][x + 1] === ".") sand = [x + 1, y];
    else done = true;
  }
  grid[sand[1]][sand[0]] = "o";
  return true;
};

let count = 0;
while (step(cave)) count++;

console.log(count);
