export {};

const ipt = [
  ...Deno.readTextFileSync("./input.txt")
    .split("\n\n")
    .flatMap((x) => x.split("\n").map((y) => JSON.parse(y))),
  [[2]],
  [[6]],
];

// deno-lint-ignore no-explicit-any
const compare = (a: any, b: any): number => {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  } else if (Array.isArray(a) && Array.isArray(b)) {
    let comparison = compare(a[0], b[0]);
    let index = 1;
    while (comparison === 0 && index < a.length && index < b.length) {
      comparison = compare(a[index], b[index]);
      index++;
    }
    if (comparison === 0) {
      if (a.length > b.length) return 1;
      if (a.length < b.length) return -1;
    }
    return comparison;
  } else if (typeof a === "number" && Array.isArray(b)) {
    return compare([a], b);
  } else if (Array.isArray(a) && typeof b === "number") {
    return compare(a, [b]);
  }
  return 0;
};

const ans = ipt
  .sort(compare)
  .map((x, i) => {
    const str = JSON.stringify(x);
    return str === "[[2]]" || str === "[[6]]" ? i + 1 : 0;
  })
  .filter((x) => x !== 0)
  .reduce((a, b) => a * b);

console.log(ans);
