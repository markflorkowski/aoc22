export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((itm) => {
    const [sx, sy, bx, by] = itm.match(/[-\d]+/g)?.map(Number)!;
    return { sx, sy, bx, by };
  });

const check = (x: number, y: number) => {
  for (const { sx, sy, bx, by } of ipt) {
    const dist1 = Math.abs(sx - bx) + Math.abs(sy - by);
    const dist2 = Math.abs(sx - x) + Math.abs(sy - y);
    if (dist2 < dist1) {
      return false;
    }
  }
  return true;
};

let ans = 0;
ipt.forEach(({ sx, sy, bx, by }) => {
  const dist = Math.abs(sx - bx) + Math.abs(sy - by);
  for (const xx of [-1, 1]) {
    for (const yy of [-1, 1]) {
      for (let dx = 0; dx <= dist + 1; dx++) {
        if (check(sx + dx * xx, sy + (dist + 1 - dx) * yy)) {
          ans = (sx + dx * xx) * 4000000 + (sy + (dist + 1 - dx) * yy);
        }
      }
    }
  }
});

console.log(ans);
