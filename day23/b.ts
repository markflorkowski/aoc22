export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((line) => line.split(""));

const STEP_COUNT = 1000;

for (let i = 0; i < ipt.length; i++) {
  for (let j = 0; j < STEP_COUNT / 10; j++) {
    ipt[i].unshift(".");
    ipt[i].push(".");
  }
}
for (let i = 0; i < STEP_COUNT / 10; i++) {
  ipt.unshift(new Array(ipt[0].length).fill("."));
  ipt.push(new Array(ipt[0].length).fill("."));
}

const getAdjacent = (x: number, y: number) => {
  const adjacent = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      adjacent.push([x + i, y + j]);
    }
  }
  return adjacent;
};

const rules = [
  [
    [-1, 0],
    [-1, -1],
    [-1, 1],
    [-1, 0],
  ],
  [
    [1, 0],
    [1, -1],
    [1, 1],
    [1, 0],
  ],
  [
    [0, -1],
    [-1, -1],
    [1, -1],
    [0, -1],
  ],
  [
    [0, 1],
    [-1, 1],
    [1, 1],
    [0, 1],
  ],
];

let round = 0;
for (let i = 0; i < STEP_COUNT; i++) {
  round++;
  const suggested = new Map<string, string>();

  for (let j = 0; j < ipt.length; j++) {
    for (let k = 0; k < ipt[0].length; k++) {
      if (ipt[j][k] === "#") {
        const adjacent = getAdjacent(j, k);
        if (adjacent.every((adj) => ipt[adj[0]][adj[1]] === ".")) continue;

        for (let l = 0; l < rules.length; l++) {
          const check = rules[l].slice(0, 3).every((rule) => {
            const [x, y] = rule;
            return ipt[j + x][k + y] === ".";
          });
          if (check) {
            const [x, y] = rules[l][3];
            suggested.set(`${j},${k}`, `${j + x},${k + y}`);
            break;
          }
        }
      }
    }
  }

  const unique = new Set();
  for (const [key, value] of suggested) {
    let count = 0;
    for (const [, value2] of suggested) {
      if (value === value2) count++;
    }
    if (count === 1) unique.add(key);
  }

  if (unique.size === 0) break;

  for (const [key, value] of suggested) {
    if (unique.has(key)) {
      const [x, y] = key.split(",").map((n) => parseInt(n));
      const [x2, y2] = value.split(",").map((n) => parseInt(n));
      ipt[x2][y2] = "#";
      ipt[x][y] = ".";
    }
  }
  rules.push(rules.shift()!);
}

console.log(round);
