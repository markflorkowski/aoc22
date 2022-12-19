export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .trim()
  .split("\n")
  .map((line) => {
    return [...line.matchAll(/(\d+)/g)!].slice(1).map((m) => parseInt(m[1]));
  })
  .slice(0, 3);

console.time("timer");
const total = ipt
  .map(([oo, co, bo, bc, go, gb]) => {
    const best = (...args: number[]): number => {
      const [o, c, b, or, cr, br, t] = args;
      if (t === 0) return 0;
      if (go <= o && gb <= b) {
        return (
          t - 1 + best(o + or - go, c + cr, b + br - gb, or, cr, br, t - 1)
        );
      }
      if (bo <= o && bc <= c) {
        return best(o + or - bo, c + cr - bc, b + br, or, cr, br + 1, t - 1);
      }
      let res = 0;
      if (oo <= o) {
        res = Math.max(
          res,
          best(o + or - oo, c + cr, b + br, or + 1, cr, br, t - 1)
        );
      }
      if (co <= o) {
        res = Math.max(
          res,
          best(o + or - co, c + cr, b + br, or, cr + 1, br, t - 1)
        );
      }
      if (o < 5) {
        // to prevent always making oreBots. kinda hacky.
        res = Math.max(res, best(o + or, c + cr, b + br, or, cr, br, t - 1));
      }
      return res;
    };

    return best(0, 0, 0, 1, 0, 0, 32);
  })
  .reduce((a, b) => a * b, 1);
console.timeEnd("timer");

console.log(total);
