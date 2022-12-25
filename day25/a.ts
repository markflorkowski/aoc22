export {};

const ipt = Deno.readTextFileSync("./input.txt").split("\n");

const SNAFU: Record<string, number> = {
  "0": 0,
  "1": 1,
  "2": 2,
  "-": -1,
  "=": -2,
};

const convertToDecimal = (s: string): number => {
  let ret = 0;
  for (let i = 0; i < s.length; i++) {
    ret += 5 ** i * SNAFU[s[s.length - i - 1]];
  }
  return ret;
};

const convertToSnafu = (n: number): string => {
  if (n === 0) return "";
  for (const d in SNAFU) {
    if ((SNAFU[d] + 5) % 5 === n % 5) {
      return convertToSnafu(Math.floor((n - SNAFU[d]) / 5)) + d;
    }
  }
  return "";
};

const sum = ipt
  .map((line) => convertToDecimal(line))
  .reduce((a, b) => a + b, 0);

console.log(convertToSnafu(sum));
