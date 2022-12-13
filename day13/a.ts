export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n\n")
  .map((x) => x.split("\n").map((y) => JSON.parse(y)));

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

let ans = 0;
ipt.forEach((pair, i) => {
  if (JSON.stringify([...pair].sort(compare)) === JSON.stringify(pair)) {
    ans += i + 1;
  }
});

console.log(ans);
