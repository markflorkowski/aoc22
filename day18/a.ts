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

const grid = new Map<string, Set<string>>();

for (const { x, y, z } of ipt) {
  if (!grid.get(`${x},${y},${z}`)) {
    grid.set(`${x},${y},${z}`, new Set());
  }
  for (const { x: dx, y: dy, z: dz } of getAdjacent({ x, y, z })) {
    grid.get(`${x},${y},${z}`)?.add(`${dx},${dy},${dz}`);
  }
}

let surfaceArea = 0;
for (const { x, y, z } of ipt) {
  surfaceArea += 6;
  for (const { x: dx, y: dy, z: dz } of ipt) {
    if (grid.get(`${x},${y},${z}`)?.has(`${dx},${dy},${dz}`)) {
      surfaceArea -= 1;
    }
  }
}
console.log(surfaceArea);
