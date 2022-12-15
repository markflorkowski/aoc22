export {};

const endpoints: [number, boolean][] = [];

Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((itm) => {
    const [sx, sy, bx, by] = itm.match(/[-\d]+/g)?.map(Number)!;
    return { sx, sy, bx, by };
  })
  .map(({ sx, sy, bx, by }) => {
    const leftover =
      Math.abs(sx - bx) + Math.abs(sy - by) - Math.abs(2000000 - sy);

    if (leftover >= 0) {
      endpoints.push([sx - leftover, true]);
      endpoints.push([sx + leftover + 1, false]);
    }
  });

let ans = -1;
let count = 0;
let last = -1000000;

endpoints
  .sort((a, b) => a[0] - b[0])
  .forEach(([x, isStart]) => {
    if (count > 0) ans += x - last;
    if (isStart) count++;
    else count--;

    last = x;
  });

console.log(ans);
