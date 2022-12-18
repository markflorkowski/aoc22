export {};

type Cube = { x: number; y: number; z: number };

const ipt = Deno.readTextFileSync("./input.txt")
  .trim()
  .split("\n")
  .map((line) => {
    const [x, y, z] = line.split(",").map((i) => parseInt(i));
    return { x, y, z };
  });

const neighbors = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

const getAdjacent = (a: Cube) => {
  return neighbors.map(([x, y, z]) => {
    return { x: a.x + x, y: a.y + y, z: a.z + z };
  });
};

const iptSet = new Set<string>(ipt.map(({ x, y, z }) => `${x},${y},${z}`));

const { maxx, maxy, maxz, minx, miny, minz } = (
  ["x", "y", "z"] as const
).reduce((acc, dimension) => {
  acc[`max${dimension}`] = Math.max(...ipt.map((c) => c[dimension])) + 1;
  acc[`min${dimension}`] = Math.min(...ipt.map((c) => c[dimension])) - 1;
  return acc;
}, {} as { [key: string]: number });

let toCheck: string[] = [`0,0,0`];
const external = new Set<string>();

while (toCheck.length > 0) {
  const parsePoints = [...toCheck];
  toCheck = [];
  parsePoints.forEach((nextPoint) => {
    if (external.has(nextPoint)) return;
    external.add(nextPoint);

    const [x, y, z] = nextPoint.split(",").map((i) => parseInt(i));

    for (const neighbor of getAdjacent({ x, y, z })) {
      const { x, y, z } = neighbor;
      if (
        x > maxx ||
        y > maxy ||
        z > maxz ||
        x < minx ||
        y < miny ||
        z < minz ||
        external.has(`${x},${y},${z}`) ||
        iptSet.has(`${x},${y},${z}`)
      ) {
        continue;
      }

      toCheck.push(`${x},${y},${z}`);
    }
  });
}

let count = 0;
for (const { x, y, z } of ipt) {
  count += getAdjacent({ x, y, z }).filter(({ x, y, z }) => {
    return iptSet.has(`${x},${y},${z}`)
      ? false
      : external.has(`${x},${y},${z}`);
  }).length;
}
console.log(count);
