export {};

const [map, path] = Deno.readTextFileSync("./input.txt").split("\n\n");

const mapArr = map.split("\n").map((line) => line.split(""));
const maxLen = mapArr.reduce((acc, cur) => Math.max(acc, cur.length), 0);
mapArr.forEach((line) => {
  while (line.length < maxLen) line.push(" ");
});

const pathArr = path.replaceAll("R", " R ").replaceAll("L", " L ").split(" ");

let facing = 0;
let pos = [0, mapArr[0].indexOf(".")]; // row, col

const turn = (dir: string) => {
  if (dir === "R") {
    facing = (facing + 1) % 4;
  } else {
    facing = (facing + 3) % 4;
  }
};

// this only works for my input shape
const move = (n: number) => {
  let i = 0;
  while (i < n) {
    if (facing === 0) {
      if (
        pos[1] + 1 > mapArr[pos[0]].length - 1 ||
        mapArr[pos[0]][pos[1] + 1] === " "
      ) {
        if (pos[0] >= 0 && pos[0] < 50) {
          const newPos = [49 - pos[0] + 100, 99];

          if (mapArr[newPos[0]][newPos[1]] === ".") {
            pos = newPos;
            facing = 2;
          } else {
            break;
          }
        } else if (pos[0] >= 50 && pos[0] < 100) {
          const newPos = [49, pos[0] - 50 + 100];
          if (mapArr[newPos[0]][newPos[1]] === ".") {
            pos = newPos;
            facing = 3;
          } else {
            break;
          }
        } else if (pos[0] >= 100 && pos[0] < 150) {
          const newPos = [149 - pos[0], 149];
          if (mapArr[newPos[0]][newPos[1]] === ".") {
            pos = newPos;
            facing = 2;
          } else {
            break;
          }
        } else if (pos[0] >= 150 && pos[0] < 200) {
          const newPos = [149, pos[0] - 150 + 50];

          if (mapArr[newPos[0]][newPos[1]] === ".") {
            pos = newPos;
            facing = 3;
          } else {
            break;
          }
        }
      } else if (mapArr[pos[0]][pos[1] + 1] === ".") {
        pos[1]++;
      } else if (mapArr[pos[0]][pos[1] + 1] === "#") {
        break;
      }
    } else if (facing === 1) {
      if (
        pos[0] + 1 > mapArr.length - 1 ||
        mapArr[pos[0] + 1][pos[1]] === " "
      ) {
        if (pos[1] >= 0 && pos[1] < 50) {
          const newPos = [0, pos[1] + 100];
          if (mapArr[newPos[0]][newPos[1]] === ".") {
            pos = newPos;
          } else {
            break;
          }
        } else if (pos[1] >= 50 && pos[1] < 100) {
          const newPos = [150 + pos[1] - 50, 49];
          if (mapArr[newPos[0]][newPos[1]] === ".") {
            pos = newPos;
            facing = 2;
          } else {
            break;
          }
        } else if (pos[1] >= 100 && pos[1] < 150) {
          const newPos = [50 + pos[1] - 100, 99];
          if (mapArr[newPos[0]][newPos[1]] === ".") {
            pos = newPos;
            facing = 2;
          } else {
            break;
          }
        }
      } else if (mapArr[pos[0] + 1][pos[1]] === ".") {
        pos[0]++;
      } else if (mapArr[pos[0] + 1][pos[1]] === "#") {
        break;
      }
    } else if (facing === 2) {
      if (pos[1] - 1 < 0 || mapArr[pos[0]][pos[1] - 1] === " ") {
        if (pos[0] >= 0 && pos[0] < 50) {
          const newPos = [49 - pos[0] + 100, 0];
          if (mapArr[newPos[0]][newPos[1]] === ".") {
            pos = newPos;
            facing = 0;
          } else {
            break;
          }
        } else if (pos[0] >= 50 && pos[0] < 100) {
          const newPos = [100, pos[0] - 50];
          if (mapArr[newPos[0]][newPos[1]] === ".") {
            pos = newPos;
            facing = 1;
          } else {
            break;
          }
        } else if (pos[0] >= 100 && pos[0] < 150) {
          const newPos = [149 - pos[0], 50];
          if (mapArr[newPos[0]][newPos[1]] === ".") {
            pos = newPos;
            facing = 0;
          } else {
            break;
          }
        } else if (pos[0] >= 150 && pos[0] < 200) {
          const newPos = [0, pos[0] - 150 + 50];
          if (mapArr[newPos[0]][newPos[1]] === ".") {
            pos = newPos;
            facing = 1;
          } else {
            break;
          }
        }
      } else if (mapArr[pos[0]][pos[1] - 1] === ".") {
        pos[1]--;
      } else if (mapArr[pos[0]][pos[1] - 1] === "#") {
        break;
      }
    } else if (facing === 3) {
      if (pos[0] - 1 < 0 || mapArr[pos[0] - 1][pos[1]] === " ") {
        if (pos[1] >= 0 && pos[1] < 50) {
          const newPos = [pos[1] + 50, 50];
          if (mapArr[newPos[0]][newPos[1]] === ".") {
            pos = newPos;
            facing = 0;
          } else {
            break;
          }
        } else if (pos[1] >= 50 && pos[1] < 100) {
          const newPos = [150 + pos[1] - 50, 0];
          if (mapArr[newPos[0]][newPos[1]] === ".") {
            pos = newPos;
            facing = 0;
          } else {
            break;
          }
        } else if (pos[1] >= 100 && pos[1] < 150) {
          const newPos = [199, pos[1] - 100];
          if (mapArr[newPos[0]][newPos[1]] === ".") {
            pos = newPos;
          } else {
            break;
          }
        }
      } else if (mapArr[pos[0] - 1][pos[1]] === ".") {
        pos[0]--;
      } else if (mapArr[pos[0] - 1][pos[1]] === "#") {
        break;
      }
    }
    i++;
  }
};

pathArr.forEach((step) => {
  if (step === "L" || step === "R") turn(step);
  else move(parseInt(step));
});

const answer = 1000 * (pos[0] + 1) + 4 * (pos[1] + 1) + facing;
console.log(answer);
