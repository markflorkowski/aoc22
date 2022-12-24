export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((line) => line.split(""));

let startPos = [0, ipt[0].findIndex((l) => l === ".")];
let endPos = [ipt.length - 1, ipt[ipt.length - 1].findIndex((l) => l === ".")];

const walls = new Set([
  ...ipt.flatMap((l, i) => l.map((c, j) => c === "#" && [i, j].toString())),
  [startPos[0] - 1, startPos[1]].toString(),
  [endPos[0] + 1, endPos[1]].toString(),
]);

const dirs: Record<string, [number, number]> = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
};

const blizzards = ipt
  .flatMap((l, i) => l.map((c, j) => dirs[c] && { pos: [i, j], dir: dirs[c] }))
  .filter(Boolean) as { pos: [number, number]; dir: [number, number] }[];

const updateBlizzards = (): void => {
  blizzards.forEach((b) => {
    b.pos = b.pos.map((n, i) => n + b.dir[i]) as [number, number];
    if (b.pos[0] >= ipt.length - 1) b.pos = [1, b.pos[1]];
    if (b.pos[0] <= 0) b.pos = [ipt.length - 2, b.pos[1]];
    if (b.pos[1] >= ipt[0].length - 1) b.pos = [b.pos[0], 1];
    if (b.pos[1] <= 0) b.pos = [b.pos[0], ipt[0].length - 2];
  });
};

const bfs = (start: number[], finish: number[], time: number): number => {
  let queue = new Set<string>();
  queue.add(start.toString());
  while (queue.size > 0) {
    const nextQueue = new Set<string>();
    updateBlizzards();
    const blizzLocs = new Set<string>(blizzards.map((b) => b.pos.toString()));
    for (const pos of queue) {
      if (!blizzLocs.has(pos)) nextQueue.add(pos);
      if (pos === finish.toString()) return time;

      const currNumPos = pos.split(",").map(Number);
      Object.values(dirs).forEach((direction) => {
        const nextPos = currNumPos.map((n, i) => n + direction[i]).toString();
        if (!blizzLocs.has(nextPos) && !walls.has(nextPos))
          nextQueue.add(nextPos);
      });
    }
    queue = nextQueue;
    time++;
  }
  return time;
};

let total = 0;
for (let i = 0; i < 3; i++) {
  const answer = bfs(startPos, endPos, 0);
  total += answer;

  [startPos, endPos] = [endPos, startPos];
}

console.log(total + 2);
// +2 for the stops at each end. I don't know why this is necessary, but it is.
