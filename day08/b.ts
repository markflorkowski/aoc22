export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((line) => line.split("").map((num) => parseInt(num)));

const calcScore = (x: number, y: number) => {
  const score = [0, 0, 0, 0];

  for (let j = x - 1; j >= 0; j--) {
    score[0]++;
    if (ipt[j][y] >= ipt[x][y]) break;
  }

  for (let j = x + 1; j < ipt.length; j++) {
    score[1]++;
    if (ipt[j][y] >= ipt[x][y]) break;
  }

  for (let k = y - 1; k >= 0; k--) {
    score[2]++;
    if (ipt[x][k] >= ipt[x][y]) break;
  }

  for (let k = y + 1; k < ipt[x].length; k++) {
    score[3]++;
    if (ipt[x][k] >= ipt[x][y]) break;
  }

  return score.reduce((a, b) => a * b);
};

const maxScore = ipt
  .flatMap((line, x) => line.map((_, y) => calcScore(x, y)))
  .reduce((a, b) => Math.max(a, b));

console.log(maxScore);
