export {};

const ipt = Deno.readTextFileSync("./example.txt").trim().split("");

const rocks = [
  {
    shape: [[1, 1, 1, 1]],
    height: 1,
    width: 4,
  },
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    height: 3,
    width: 3,
  },
  {
    shape: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 1],
    ],
    height: 3,
    width: 3,
  },
  {
    shape: [[1], [1], [1], [1]],
    height: 4,
    width: 1,
  },
  {
    shape: [
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
  for (let i = 0; i < shape.shape.length; i++) {
    for (let j = 0; j < shape.shape[0].length; j++) {
      if (shape.shape[i][j] && map.has([pos[0] + j, pos[1] + i].toString())) {
        return false;
      }
    }
  }
  return true;
};

const run = (iterations: number) => {
  const map = new Map<string, boolean>();
  const moves: { rock: number; pos: number }[] = [];
  let [height, count, rockIdx, windIdx] = [0, 0, 0, 0];

  while (count < iterations) {
    const currRock = rocks[rockIdx % rocks.length];
    rockIdx++;
    let currPos: [number, number] = [2, height + 3];
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
        for (let i = 0; i < currRock.shape.length; i++) {
          for (let j = 0; j < currRock.shape[0].length; j++) {
            if (currRock.shape[i][j])
              map.set(`${currPos[0] + j},${currPos[1] + i}`, true);
          }
        }
        moves.push({ rock: rockIdx % rocks.length, pos: currPos[0] });
        break;
      }
    }
    count++;
  }
  return {
    moves,
    height,
  };
};

const firstRun = run(2022);

let maxlen = -Infinity;
const loop = { start: 0, length: 0 };
for (let firstStart = 0; firstStart <= 2022; firstStart++) {
  for (let nextStart = firstStart + 1; nextStart <= 2022; nextStart++) {
    let first = firstStart;
    let next = nextStart;
    while (next < 2022) {
      if (
        !(
          firstRun.moves[first].rock === firstRun.moves[next].rock &&
          firstRun.moves[first].pos === firstRun.moves[next].pos
        )
      )
        break;
      first++;
      next++;
    }
    if (first - firstStart > maxlen) {
      maxlen = first - firstStart;
      loop.start = firstStart;
      loop.length = nextStart - firstStart;
    }
  }
}

const preLoopsHeight = run(loop.start).height;

const singleLoopHeight = run(loop.start + loop.length).height - preLoopsHeight;
const loopCount = Math.floor((1000000000000 - loop.start) / loop.length);
const totalLoopsHeight = loopCount * singleLoopHeight;

const postLoopsHeight =
  run(
    loop.start +
      loop.length +
      (1000000000000 - loop.start - loopCount * loop.length)
  ).height -
  singleLoopHeight -
  preLoopsHeight;

console.log(preLoopsHeight + totalLoopsHeight + postLoopsHeight);
