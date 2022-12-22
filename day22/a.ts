export {};

const [map, path] = Deno.readTextFileSync("./input.txt").split("\n\n");

const mapArr = map.split("\n").map((line) => line.split(""));
const maxLen = mapArr.reduce((acc, cur) => Math.max(acc, cur.length), 0);
mapArr.forEach((line) => {
  while (line.length < maxLen) line.push(" ");
});

const pathArr = path.replaceAll("R", " R ").replaceAll("L", " L ").split(" ");

let facing = 0;
const pos = [0, mapArr[0].indexOf(".")]; // row, col

const turn = (dir: string) => {
  if (dir === "R") {
    facing = (facing + 1) % 4;
  } else {
    facing = (facing + 3) % 4;
  }
};

const move = (n: number) => {
  let i = 0;
  while (i < n) {
    if (facing === 0) {
      //right
      if (
        pos[1] + 1 > mapArr[pos[0]].length - 1 ||
        mapArr[pos[0]][pos[1] + 1] === " "
      ) {
        for (let j = 0; j <= mapArr[pos[0]].length - 1; j++) {
          if (mapArr[pos[0]][j] === "#") break;
          if (mapArr[pos[0]][j] === ".") {
            pos[1] = j;
            break;
          }
        }
      } else if (mapArr[pos[0]][pos[1] + 1] === ".") {
        pos[1]++;
      } else if (mapArr[pos[0]][pos[1] + 1] === "#") {
        break;
      }
    }
    if (facing === 1) {
      //down
      if (
        pos[0] + 1 > mapArr.length - 1 ||
        mapArr[pos[0] + 1][pos[1]] === " "
      ) {
        for (let j = 0; j <= mapArr.length - 1; j++) {
          if (mapArr[j][pos[1]] === "#") return;
          if (mapArr[j][pos[1]] === ".") {
            pos[0] = j;
            break;
          }
        }
      } else if (mapArr[pos[0] + 1][pos[1]] === ".") {
        pos[0]++;
      } else if (mapArr[pos[0] + 1][pos[1]] === "#") {
        break;
      }
    }
    if (facing === 2) {
      //left
      if (pos[1] - 1 < 0 || mapArr[pos[0]][pos[1] - 1] === " ") {
        for (let j = mapArr[pos[0]].length; j > 0; j--) {
          if (mapArr[pos[0]][j] === "#") return;
          if (mapArr[pos[0]][j] === ".") {
            pos[1] = j;
            break;
          }
        }
      } else if (mapArr[pos[0]][pos[1] - 1] === ".") {
        pos[1]--;
      } else if (mapArr[pos[0]][pos[1] - 1] === "#") {
        break;
      }
    }
    if (facing === 3) {
      //up
      if (pos[0] - 1 < 0 || mapArr[pos[0] - 1][pos[1]] === " ") {
        for (let j = mapArr.length - 1; j > 0; j--) {
          if (mapArr[j][pos[1]] === "#") return;
          if (mapArr[j][pos[1]] === ".") {
            pos[0] = j;
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
