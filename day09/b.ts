export {};

type Direction = "U" | "D" | "L" | "R";

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((line) => line.split(" "))
  .flatMap((line) => Array(parseInt(line[1])).fill(line[0])) as Direction[];

const movements = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
};

const positions = Array(10)
  .fill(0)
  .map(() => [0, 0]);

const isAdjacent = (a: number[], b: number[]) => {
  return Math.abs(a[0] - b[0]) <= 1 && Math.abs(a[1] - b[1]) <= 1;
};

const tailVisited = new Set(["0,0"]);

ipt.forEach((dir) => {
  positions[0][0] += movements[dir][0];
  positions[0][1] += movements[dir][1];

  for (let i = 1; i < positions.length; i++) {
    const [headPos, tailPos] = [positions[i - 1], positions[i]];
    if (!isAdjacent(headPos, tailPos)) {
      const xDiff = headPos[0] - tailPos[0];
      const yDiff = headPos[1] - tailPos[1];

      if (Math.abs(xDiff) === 2 && yDiff === 0) {
        if (xDiff > 0) tailPos[0]++;
        if (xDiff < 0) tailPos[0]--;
      } else if (Math.abs(yDiff) === 2 && xDiff === 0) {
        if (yDiff > 0) tailPos[1]++;
        if (yDiff < 0) tailPos[1]--;
      } else if (xDiff !== 0 && yDiff !== 0) {
        if (xDiff > 0) tailPos[0]++;
        if (xDiff < 0) tailPos[0]--;
        if (yDiff > 0) tailPos[1]++;
        if (yDiff < 0) tailPos[1]--;
      }

      if (i === positions.length - 1) tailVisited.add(tailPos.join(","));
    }
  }
});

console.log(tailVisited.size);
