export {};

const ipt = await Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((line) => line.split("").map((num) => parseInt(num)));

const visible = (x: number, y: number) => {
  let visible = true;
  for (let j = x - 1; j >= 0; j--) {
    if (ipt[j][y] >= ipt[x][y]) visible = false;
  }
  if (visible) return true;

  visible = true;
  for (let j = x + 1; j < ipt.length; j++) {
    if (ipt[j][y] >= ipt[x][y]) visible = false;
  }
  if (visible) return true;

  visible = true;
  for (let k = y - 1; k >= 0; k--) {
    if (ipt[x][k] >= ipt[x][y]) visible = false;
  }
  if (visible) return true;

  visible = true;
  for (let k = y + 1; k < ipt[x].length; k++) {
    if (ipt[x][k] >= ipt[x][y]) visible = false;
  }
  if (visible) return true;

  return false;
};

const visibleTrees = ipt
  .flatMap((line, x) => line.map((_, y) => visible(x, y)))
  .filter((v) => v).length;

console.log(visibleTrees);
