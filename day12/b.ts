export {};

// let start = [0, 0];
let end = [0, 0];

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((row, y) =>
    row.split("").map((cell, x) => {
      if (cell === "S") {
        // start = [x, y];
        return 0;
      } else if (cell === "E") {
        end = [x, y];
        return 25;
      } else {
        return "abcdefghijklmnopqrstuvwxyz".indexOf(cell);
      }
    })
  );

const getValueAt = (coord: number[]): number => {
  const [x, y] = coord;
  return ipt[y][x];
};
const validNeighbors = ([x, y]: number[]) =>
  [
    [x - 1, y],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y],
  ]
    .filter(([x, y]) => x >= 0 && y >= 0 && x < ipt[0].length && y < ipt.length)
    .filter((coord) => getValueAt(coord) >= getValueAt([x, y]) - 1);

const bfs = (start: number[]): number => {
  const queue: [number[], number][] = [[start, 0]];
  const visited = new Set<string>();
  while (queue.length) {
    const [current, stepCount] = queue.shift()!;
    if (visited.has(current.toString())) continue;
    if (getValueAt(current) === 0) return stepCount;
    visited.add(current.toString());

    queue.push(
      ...validNeighbors(current).map(
        (coord) => [coord, stepCount + 1] as [number[], number]
      )
    );
  }
  return Infinity;
};

console.log(bfs(end));
