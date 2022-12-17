export {};

const ipt = Deno.readTextFileSync("./input.txt").trim().split("");

const rocks = [
  {
    form: [[1, 1, 1, 1]],
    height: 1,
    width: 4,
  },
  {
    form: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    height: 3,
    width: 3,
  },
  {
    form: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 1],
    ],
    height: 3,
    width: 3,
  },
  {
    form: [[1], [1], [1], [1]],
    height: 4,
    width: 1,
  },
  {
    form: [
      [1, 1],
      [1, 1],
    ],
    height: 2,
    width: 2,
  },
];

const checkCollision = (
  pos: [number, number],
  shape: typeof rocks[number],
  map: Map<string, boolean>
): boolean => {
  if (pos[1] < 0) return false;
  if (pos[0] < 0 || pos[0] + shape.width > 7) return false;
  for (let i = 0; i < shape.form.length; i++) {
    for (let j = 0; j < shape.form[0].length; j++) {
      if (shape.form[i][j] && map.has([pos[0] + j, pos[1] + i].toString())) {
        return false;
      }
    }
  }
  return true;
};

const map = new Map<string, boolean>();
let [height, count, rockIdx, windIdx] = [0, 0, 0, 0];

while (count < 2022) {
  const currRock = rocks[rockIdx % rocks.length];
  rockIdx++;
  let currPos = [2, height + 3];
  while (true) {
    if (
      ipt[windIdx % ipt.length] === ">" &&
      checkCollision([currPos[0] + 1, currPos[1]], currRock, map)
    ) {
      currPos = [currPos[0] + 1, currPos[1]];
    } else if (
      ipt[windIdx % ipt.length] === "<" &&
      checkCollision([currPos[0] - 1, currPos[1]], currRock, map)
    ) {
      currPos = [currPos[0] - 1, currPos[1]];
    }
    windIdx++;

    if (checkCollision([currPos[0], currPos[1] - 1], currRock, map)) {
      currPos = [currPos[0], currPos[1] - 1];
    } else {
      height = Math.max(height, currRock.height + currPos[1]);
      for (let i = 0; i < currRock.form.length; i++) {
        for (let j = 0; j < currRock.form[0].length; j++) {
          if (currRock.form[i][j])
            map.set(`${currPos[0] + j},${currPos[1] + i}`, true);
        }
      }
      break;
    }
  }
  count++;
}

console.log(height);
